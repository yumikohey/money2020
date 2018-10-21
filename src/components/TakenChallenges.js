import React, { Component } from 'react';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import { ListItem } from 'react-native-elements';

export default class TakenChallenges extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const avatar_url = "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg";
        return (
            <ListItem
                component={TouchableScale}
                friction={90}
                tension={100}
                activeScale={0.95}
                linearGradientProps={{
                    colors: ['#FF9800', '#F44336'],
                    start: [1, 0],
                    end: [0.2, 0],
                }}
                ViewComponent={LinearGradient}
                leftAvatar={{ rounded: true, source: { uri: avatar_url } }}
                title="Chris Jackson"
                titleStyle={{ color: 'white', fontWeight: 'bold' }}
                subtitleStyle={{ color: 'white' }}
                subtitle="Vice Chairman"
                chevronColor="white"
                chevron
            />
        );
    }
}