import React, {Component} from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import { ENTRIES1, ENTRIES2 } from '../static/entries';
import styles, { colors } from '../styles/index.style';
import SliderEntry from './SliderEntry';
import Profile from './Profile';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-elements';

export default class Main extends Component {

    constructor(props) {
        super(props);
        this._clickSupport = this._clickSupport.bind(this);
    }


    _renderLightItem ({item, index}) {
        return <SliderEntry data={item} even={false} />;
    }

    _renderItem ({item, index}) {
        return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
    }

    _clickSupport () {
        this.props.changePageWithPageIndex(1);
        // alert('support');
    }

    layoutExample (number, title, type) {
        const isTinder = type === 'tinder';
        return (
            <View>
                <Profile />
                <View style={[styles.exampleContainer, isTinder ? styles.exampleContainerDark : styles.exampleContainerLight]}>
                        <Carousel
                            data={isTinder ? ENTRIES2 : ENTRIES1}
                            renderItem={isTinder ? this._renderLightItem : this._renderItem}
                            sliderWidth={sliderWidth}
                            itemWidth={itemWidth}
                            containerCustomStyle={styles.slider}
                            contentContainerCustomStyle={styles.sliderContentContainer}
                            layout={type}
                            loop={true}
                        />
                </View>
                <View style={styles.buttonContainer}>
                    <LinearGradient
                        colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
                        start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                        style={styles.buttonLinearGradient}
                        >
                           <TouchableOpacity style={styles.touchableButton} onPress={this._clickSupport}>
                                <Text style={styles.buttonText}>
                                    Accept Challenge
                                </Text>
                            </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        );
    }

    render () {
        const example3 = this.layoutExample(3, '"Stack of cards" layout | Loop', 'stack');

        return (
            <View style={styles.exampleContainer}>
                { example3 }
            </View>
        );
    }
}
