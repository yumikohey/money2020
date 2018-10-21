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
                        {key: 'Devin', description:''},
                        {key: 'Jackson', description:''},
                        {key: 'James', description:''},
                    ]}
                    renderItem={({item, index}) => {
                        return (
                            <LinearGradient start={{x: 1, y: 0.2}} end={{x: 0, y: 0}}  colors={index % 2 === 0 ? colors[0] : colors[1]} style={styles.challengeItemContainer}>
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
                                        source={{uri: "https://images.unsplash.com/photo-1517630800677-932d836ab680?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8df5cbde7cb099c1565a250f910a42b0&auto=format&fit=crop&w=934&q=80"}}
                                        activeOpacity={0.7}
                                        containerStyle={{marginLeft: 15, width: 40}}
                                    />
                                    <View style={styles.challengeItemText}>
                                        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Sally</Text>
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