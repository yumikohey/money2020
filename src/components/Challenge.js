import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles, { colors } from '../styles/index.style';
import { Card, ListItem, Button } from 'react-native-elements'
import { ENTRIES1, ENTRIES2 } from '../static/entries';
import SliderEntry from './SliderEntry';
import PayPal from 'react-native-paypal-wrapper';

export default class Challenge extends Component {


    constructor(props) {
        super(props);
        this.payByPaypal = this.payByPaypal.bind(this);
    }


    payByPaypal() {
        
        // 3 env available: NO_NETWORK, SANDBOX, PRODUCTION
        PayPal.initialize(PayPal.SANDBOX, "Abi--ut6W_Ro2ZP3nesMBjEb0QLZ9_m0sNAp9B7LGM4GAP1y_wKNzO0VPY_G8qTNYJZryHb8iM3VA2Rg");
        PayPal.pay({
        price: '20.20',
        currency: 'USD',
        description: ENTRIES1[this.props.itemIndex].title,
        }).then(
            // TODO: show ok message? dismiss views?
            confirm => console.log(confirm)
        )
        .catch(error => console.log(error));

        
    }


    render() {
        
        
        return (
        <View>
            <SliderEntry data={ENTRIES1[this.props.itemIndex]} even={(this.props.itemIndex + 1) % 2 === 0} />


            <Button
            onPress={this.payByPaypal}
            title="Learn More"
            color="#841584"
            />
        </View>
        );
    }
}
