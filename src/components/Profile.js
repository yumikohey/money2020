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
            <View style={styles.profileView} >
                <TouchableOpacity onPress={() => this.props.changePageWithPageIndex(2)} >
                <View style={styles.profileContainer}>
                    <Avatar
                        medium
                        rounded
                        source={{uri: "https://images.unsplash.com/photo-1517630800677-932d836ab680?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8df5cbde7cb099c1565a250f910a42b0&auto=format&fit=crop&w=934&q=80"}}
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
                </TouchableOpacity>
            </View>
        );
    }
}