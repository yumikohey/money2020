import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles, { colors } from '../styles/index.style';
import SliderEntry from './SliderEntry';
import * as Progress from 'react-native-progress';
import { Avatar } from 'react-native-elements';
import { openChallenge } from '../static/entries';
// import PayPal from 'react-native-paypal-wrapper';

export default class Challenge extends Component {
    constructor(props) {
        super(props);
        // this.payByPaypal = this.payByPaypal.bind(this);
    }




    // payByPaypal() {
        
    //     // 3 env available: NO_NETWORK, SANDBOX, PRODUCTION
    //     PayPal.initialize(PayPal.SANDBOX, "Abi--ut6W_Ro2ZP3nesMBjEb0QLZ9_m0sNAp9B7LGM4GAP1y_wKNzO0VPY_G8qTNYJZryHb8iM3VA2Rg");
    //     PayPal.pay({
    //     price: '20.20',
    //     currency: 'USD',
    //     description: openChallenge[this.props.itemIndex].title,
    //     }).then(
    //         // TODO: show ok message? dismiss views?
    //         confirm => console.log(confirm)
    //     )
    //     .catch(error => console.log(error));

        
    // }


    render() {
        const colors = [['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF'], ['#FF9800', '#F44336']];

        // let data = JSON.parse(JSON.stringify({}, openChallenge[this.props.itemIndex]));
        // console.log(data);
        // data.userInfo.push(
        //     {
        //       "userID": 205,
        //       "userName": "Sally",
        //       "userPercentProgress": 0,
        //       "userProgress": 0,
        //       "userPic": "https://images.unsplash.com/photo-1517630800677-932d836ab680?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8df5cbde7cb099c1565a250f910a42b0&auto=format&fit=crop&w=934&q=80"
        //     })
        return (
            <View style={{flex: 1, paddingVertical: 80, paddingVertical: 20}}>
                <View style={{ marginTop: 50, marginBottom: 20, marginHorizontal: 15 }}>
                    <Text style={styles.challengeStatusTitle}>Challenge Status</Text>
                </View>
                <View style={{width: '95%'}}>
                    <SliderEntry isChallangeStatusPage={true} data={openChallenge[this.props.itemIndex]} even={(this.props.itemIndex + 1) % 2 === 0} />
                </View>
                <View style={{ marginHorizontal: 15 }}>
                    <FlatList
                        data={openChallenge[this.props.itemIndex].userInfo}
                        renderItem={({item, index}) => {
                            return (
                                <LinearGradient key={index} start={{x: 1, y: 0.2}} end={{x: 0, y: 0}}  colors={index % 2 === 0 ? colors[0] : colors[1]} style={styles.challengeItemContainer}>
                                    <View style={styles.takenChallengeItemContainer}>
                                        {index % 2 === 0 ? <Image
                                            style={{top: 5, width: 25, height: 25}}
                                            source={require('../static/img/badge.png')} />
                                            :
                                            <View style={{width: 25, height: 25}} />
                                        }
                                        <Avatar
                                            medium
                                            rounded
                                            source={{uri: item.userPic}}
                                            activeOpacity={0.7}
                                            containerStyle={{marginLeft: 15, width: 40}}
                                        />
                                        <View style={styles.challengeItemText}>
                                            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>{item.userName}: {item.action}{item.userProgress}</Text>
                                            <View style={{ marginTop: 10}}>
                                                <Progress.Bar progress={item.userPercentProgress} width={200} borderColor={index % 2 === 0 ? '#FF9800' : 'rgba(0, 122, 255, 1)' } color={index % 2 === 0 ? '#F44336': 'rgba(0, 122, 255, 1)'} borderWidth={1} animated={true} />
                                            </View>
                                        </View>
                                    </View>
                                </LinearGradient>
                            );
                        }}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <LinearGradient
                        colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
                        start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                        style={styles.buttonLinearGradient}
                        >
                           <TouchableOpacity style={styles.touchableButton} onPress={() => this.props.changePageWithPageIndex(0)}>
                                <Text style={styles.buttonText}>
                                    Home
                                </Text>
                            </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        );
    }
}
