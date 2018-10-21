import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles/index.style';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';

export default class TakenChallenges extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const colors = [['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF'], ['#FF9800', '#F44336']];
        return (
            <View style={styles.takenChallengesContainer}>
                <View style={styles.overallContainer}>
                    <View style={styles.overallCellWithBorder}>
                        <Text style={styles.overallTextDescription}>Done</Text>
                        <Text style={styles.overallTextScore}>3</Text>
                    </View>
                    <View style={styles.overallCellWithBorder}>
                        <Text style={styles.overallTextDescription}>Earned</Text>
                        <Text style={styles.overallTextScore}>$40.40</Text>
                    </View>
                    <View style={styles.overallCellwoBorder}>
                        <Text style={styles.overallTextDescription}>IRA</Text>
                        <Text style={styles.overallTextScore}>$40.40</Text>
                    </View>
                </View>
                <FlatList
                    data={[
                        {
                          "userID": 205,
                          "action": "On day #",
                          "userName": "Christina",
                          "userPercentProgress": 0.6666666667,
                          "userProgress": 20,
                          "userPic": "https://images.unsplash.com/photo-1525450280520-7d542a86e065?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4259c07277dbffd4dbef268e24ab7998&auto=format&fit=crop&w=1950&q=80",
                        },
                        {
                          "userID": 205,
                          "action": "Saved $",
                          "userName": "Kenneth",
                          "userPercentProgress": 0.6,
                          "userProgress": 180,
                          "userPic": "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1e289110e319d49417dccfc2de46ea3a&auto=format&fit=crop&w=2376&q=80"
                        },
                        {
                            "userID": 205,
                            "action": "Saved $",
                            "userName": "Sally",
                            "userPercentProgress": 0,
                            "userProgress": 0,
                            "userPic": "https://images.unsplash.com/photo-1517630800677-932d836ab680?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8df5cbde7cb099c1565a250f910a42b0&auto=format&fit=crop&w=934&q=80"
              
                        }
                      
                    ]}
                    renderItem={({item, index}) => {
                        return (
                            <LinearGradient start={{x: 1, y: 0.2}} end={{x: 0, y: 0}}  colors={index % 2 === 0 ? colors[0] : colors[1]} style={styles.challengeItemContainer}>
                                <View style={styles.takenChallengeItemContainer}>
                                    {index === 0 ? <Image
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
                                        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>{item.userName}</Text>
                                        <Text style={{fontSize: 14, color: 'white', fontStyle: 'italic', marginTop: 6}}>
                                            Completed challenges: 3
                                            Earned: $40.40
                                        </Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        );
                    }}
                />
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