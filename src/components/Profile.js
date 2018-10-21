import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/index.style';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

export default class Profile extends Component {
    render() {
        const user = [
            {
                name: 'brynn',
                avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
            }
        ];
        return (
            <View style={styles.profileView}>
                <ListItem key={1} roundAvatar title={user.name} avatar={{uri:user.avatar}} />
            </View>
        );
    }
}