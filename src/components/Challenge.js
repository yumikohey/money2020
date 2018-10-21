import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles, { colors } from '../styles/index.style';
import { Card, ListItem, Button } from 'react-native-elements'

export default class Challenge extends Component {

    render() {
        return (
        <View>
            <Card
                title='HELLO WORLD'
                image={require('../images/pic2.jpg')}
                borderRadius={15}
                >
                <Text style={{marginBottom: 10}}>
                    The idea with React Native Elements is more about component structure than actual design.
                </Text>
                <Button
                    icon={{name: 'code'}}
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='VIEW NOW' />
                </Card>

        </View>
        );
    }
}