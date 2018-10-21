import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/index.style';
import { Avatar } from 'react-native-elements';

export default class Profile extends Component {
    render() {
        const users = [
            {
                name: 'brynn',
                avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
            }
        ];
        const user = users[0];
        return (
            <View style={styles.profileView}>
                <View style={styles.profileContainer}>
                    <Avatar
                        medium
                        rounded
                        source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
                        activeOpacity={0.7}
                        containerStyle={{top: -10}}
                    />
                    <View style={styles.profileText}>
                        <Text>Sally</Text>
                        <Text style={styles.profileSubtitle}>
                            Completed challenges: 3
                            Earned: $40.40
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}