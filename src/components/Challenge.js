import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles, { colors } from '../styles/index.style';
import { Card, ListItem, Button } from 'react-native-elements'
import { ENTRIES1, ENTRIES2 } from '../static/entries';
import SliderEntry from './SliderEntry';

export default class Challenge extends Component {

    render() {
        
        
        return (
        <View>
            <SliderEntry data={ENTRIES1[this.props.itemIndex]} even={(this.props.itemIndex + 1) % 2 === 0} />
        </View>
        );
    }
}
