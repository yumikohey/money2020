#!flask/bin/python
from flask import Flask, request, jsonify
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler  
import requests 
import pandas as pd
import numpy as np
import datetime 
import json

app = Flask(__name__)

@app.route('/myapp/api/v1.0/', methods=['GET'])
def create_plan():
    #for demo purpose, use login from local now
    # api_host = request.headers.get('host')
    # api_cob_session = request.headers.get('cobSession')
    # api_user_session = request.headers.get('userSession')
    # api_cobrand_name = request.headers.get('cobrandName')

    api_host, api_cob_session, api_user_session, api_cobrand_name = yodlee_sandbox_login()
    api_data = yodlee_api(api_host, api_cob_session, api_user_session, api_cobrand_name)
    # return jsonify(api_data)
    df_challenges = read_open_challenges_table()
    df_topics = read_challenges_events_table()
    df_users = read_user_info_table()
    user_analysis = transactions_analysis(api_data)    
    df_recommendation = challenges_recommendation(user_analysis, df_challenges, df_topics, df_users)
    results = transform_recomm2json(df_recommendation, df_topics, df_users)
    
    return jsonify({'openChallenge':results})

def yodlee_sandbox_login(host='https://developer.api.yodlee.com/ysl', \
                         cobrandName='restserver', \
                         loginName='sbMemd7c6fc7764284dcde280de2ded80fd3b1a2',\
                         password='sbMemd7c6fc7764284dcde280de2ded80fd3b1a2#123',\
                         cobrandLogin='sbCobd7c6fc7764284dcde280de2ded80fd3b1a',\
                         cobrandPassword='473c6038-f49c-4e66-b09a-4a1e28ab4ab9'):
    from_date = str(datetime.datetime.now().date() - datetime.timedelta(days=2000))
    cobrand_login = '{0}/cobrand/login'.format(host) 
    cobrand_body = json.dumps({
                        "cobrand":{
                            "cobrandLogin": cobrandLogin,
                            "cobrandPassword": cobrandPassword,
                            "locale":"en_US"
                        }
                    })
    r = requests.post(cobrand_login, headers={'Cobrand-Name': cobrandName, \
                                          'Api-Version': '1.1', \
                                          'Content-Type': 'application/json'},\
                                    data=cobrand_body)
    cob_session_dict = r.json()
    cob_session = cob_session_dict['session']['cobSession']

    user_login = '{0}/user/login'.format(host) 
    user_header = {'Cobrand-Name': cobrandName, \
                   'Api-Version': '1.1', \
                   'Authorization': 'cobSession={0}'.format(cob_session),\
                   'Content-Type': 'application/json'}
    user_body = json.dumps({
                    "user":{
                        "loginName": loginName,
                        "password":password,
                        "locale":"en_US"
                    }
                })
    r = requests.post(user_login, headers=user_header, data=user_body)
    user_session_dict = r.json()
    user_session = user_session_dict['user']['session']['userSession']
    return host, cob_session, user_session, cobrandName

def yodlee_api(host, cob_session, user_session, cobrand_name):
    from_date = str(datetime.datetime.now().date() - datetime.timedelta(days=2000))
    yodlee_uri = '{0}/transactions?fromDate={1}'.format(host,from_date) 
    auth_value = 'cobSession={0},userSession={1}'.format(cob_session, user_session)
    response = requests.get(yodlee_uri, headers={'Authorization': auth_value, \
                                          'Api-Version': '1.1', \
                                          'Cobrand-Name': cobrand_name})
    data = response.json()
    return data

def transactions_analysis(data):
    transactions = data['transaction']
    user_analysis = {}
    #Purchases:
    purchases = [item for item in transactions if ('type' in item) and (item['type'] == 'PURCHASE')]
    # online_purchases = [item for item in purchases if (item['sub_type'] == 'ONLINE_PURCHASE')]
    #cosmatics

    #credict card payment:
    user_analysis['credit_payment'] = np.sum([item['amount']['amount'] for item in transactions if (item['categoryId'] == 26)])
    #Income:
    user_analysis['income'] = np.sum([item['amount']['amount'] for item in transactions if ((item['categoryId'] == 92) \
                    or (item['categoryId'] == 29) or (item['categoryId'] == 30))])
    #subscriptions purchase:
    subs = [item['amount']['amount'] for item in purchases if (item['categoryId'] == 108)]
    user_analysis['subscription_number'] = len(subs)
    user_analysis['subscription_amount'] = np.sum(subs)

    #restaurant purchase:
    restaurant_purchases = [item['amount']['amount'] for item in purchases if (item['categoryId'] == 22)]
    user_analysis['restaurant_number'] = len(restaurant_purchases)
    user_analysis['restaurant_amount'] = np.sum(restaurant_purchases)
    
    entertainment_purchases = [item['amount']['amount'] for item in purchases if (item['categoryId'] == 7)]
    user_analysis['entertainment_number'] = len(entertainment_purchases)
    user_analysis['entertainment_amount'] = np.sum(entertainment_purchases)

    return user_analysis

def read_open_challenges_table():
    df_challenges = pd.read_csv('challenge_event.csv')
    return df_challenges

def read_challenges_events_table():
    df_topics = pd.read_csv('challenge_topic.csv')
    return df_topics

def read_user_info_table():
    df_users = pd.read_csv('user_info.csv')
    return df_users

def challenges_recommendation(user_analysis, df_challenges, df_topics, df_users):
    y_train = df_users[df_users.columns[0:2]]
    x_train = df_users.drop(["userName","userID"],1)
    columns_name=list(x_train.columns.values)

    for k, v in user_analysis.iteritems():
        user_analysis[k] = [v]
    x_test = pd.DataFrame.from_dict(user_analysis)

    scaler = StandardScaler()  
    scaler.fit(x_train)
    x_train = scaler.transform(x_train)  
    x_test = scaler.transform(x_test)  

    nbrs = NearestNeighbors(n_neighbors=3, algorithm='ball_tree').fit(x_train)
    distances, indices = nbrs.kneighbors(x_test)

    y_train = y_train.loc[indices[0][0:2]]
 
    df = df_challenges[(df_challenges.status == "activate")& (df_challenges.userID.isin(y_train.userID))]

    sorter = y_train.userID.tolist()
    df["order"] = pd.Categorical(df.userID, categories = sorter, ordered =True)

    df_recommendation = df.sort_values('order')
    return df_recommendation

def transform_recomm2json(df_recommendation, df_topics, df_users):
    columns_return = ['title', 'challengeId', 'goal', 'unit', 'description']
    unique_challenges = df_recommendation.challengeId.unique() 
    df_event_return = df_topics[df_topics.challengeId.isin(unique_challenges)][columns_return]
    df_rec_sub = df_recommendation[['challengeId','startDate','endDate','bestCurrentProgress', 'status', \
                                    'winner']].drop_duplicates(keep='first')
    df_return = df_event_return.merge(df_rec_sub, on='challengeId')
    df_recom_users = df_recommendation.merge(df_users, on=['userID'])
    df_user_info = pd.DataFrame(columns=['challengeId', 'userInfo'])
    for idx, challengeId in enumerate(unique_challenges):
        user_info = df_recom_users[df_recom_users.challengeId == challengeId][['userID', 'userName', 'userProgress', 'userPercentProgress']].to_dict('records')
        df_user_info.loc[idx] = [challengeId, user_info]
    df_results = df_return.merge(df_user_info, on='challengeId')
    df_results['challengeAmount'] = 20.20
    return df_results.to_dict('records')

# recommend_challenges = {'openChallenge': [{'challengeId': 0,\
#                                                 'title': 'Spend less in restaurant', \
#                                                 'description': 'In the following month(30 days), I will not go out for dinner!', \
#                                                 'rank': 0, \
#                                                 'challengeAmount': 20.20,\
#                                                 'startDate': '2018-10-01',\
#                                                 'endDate': '2018-11-01',\
#                                                 'goal': 30,\
#                                                 'unit': 'days',\
#                                                 'userStatus': [{'userID': 1, 'userName': 'KyleChanChan', 'userProgress': 20, 'userPercentProgress': 66},\
#                                                                {'userID': 2, 'userName': 'ViVi', 'userProgress': 10, 'userPercentProgress': 33}\
#                                                                 ],\
#                                                 'currentProgress': 20, \
#                                                 'percentProgress': 66, \
#                                                 'status': 'active',\
#                                                 'winer': None,
#                                                 'recommendReason': 'kyle_chan and you both like to go out for dinner and it is time to save some money'\
#                                               },\
#                                                {'challengeId': 1,\
#                                                 'title': 'Save more in 401K', 'description': 'I need to save more money for my retirement plan for the next 3 years', \
#                                                 'rank': 1, \
#                                                 'challengeAmount': 20.20,\
#                                                 'startDate': '2017-10-01',\
#                                                 'endDate': '2018-10-01',\
#                                                 'goal': 12,\
#                                                 'unit': 'months',\
#                                                 'userStatus': [{'userID': 1, 'userName': 'KyleChanChan', 'userProgress': 12, 'userPercentProgress': 100},\
#                                                                {'userID': 2, 'userName': 'ViVi', 'userProgress': 11, 'userPercentProgress': 92}\
#                                                                 ],\
#                                                 'currentProgress': 12, \
#                                                 'percentProgress': 100,\
#                                                 'status': 'closed',\
#                                                 'winner': 'KyleChanChan',\
#                                                 'recommendReason': ''\
                                            #   }]}
if __name__ == '__main__':
    app.run(debug=True)
