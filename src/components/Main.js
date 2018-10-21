import React, {Component} from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import { ENTRIES1, ENTRIES2 } from '../static/entries';
import styles, { colors } from '../styles/index.style';
import SliderEntry from './SliderEntry';
import Profile from './Profile';
import LinearGradient from 'react-native-linear-gradient';
import { Avatar, Button } from 'react-native-elements';
import Modal from "react-native-modal";
import * as Progress from 'react-native-progress';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
          itemIndex: 0,
          isModalVisible: false
        }
        this._clickSupport = this._clickSupport.bind(this);
        this._onCarouselChanged = this._onCarouselChanged.bind(this);
    }

    _renderLightItem ({item, index}) {
        return <SliderEntry data={item} even={false} />;
    }

    _renderItem ({item, index}) {
        return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
    }

    _clickSupport () {
        this.props.changePageWithPageIndexAndItemIndex(1, this.state.itemIndex);
    }

    _onCarouselChanged (index){
        this.setState({itemIndex: index});
    }

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    getPaymentAmount = () => {
        return 'Paypal';
    }

    layoutExample (number, title, type) {
        const isTinder = type === 'tinder';
        return (
            <View>
                <Profile changePageWithPageIndex={this.props.changePageWithPageIndex}/>
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
                            onSnapToItem={this._onCarouselChanged}
                        />
                </View>
                <View style={styles.buttonContainer}>
                    <LinearGradient
                        colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
                        start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                        style={styles.buttonLinearGradient}
                        >
                           <TouchableOpacity style={styles.touchableButton} onPress={this._toggleModal}>
                                <Text style={styles.buttonText}>
                                    Accept Challenge
                                </Text>
                            </TouchableOpacity>
                    </LinearGradient>
                </View>
                <Modal animationIn={'slideInUp'} isVisible={this.state.isModalVisible}>
                    <View style={{ flex: 1, backgroundColor: 'white', marginHorizontal: 15, marginVertical: 150, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar
                            large
                            rounded
                            source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
                            activeOpacity={0.7}
                            containerStyle={{top: -10}}
                        />
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                            Hello World
                        </Text>
                        <View style={{paddingHorizontal: 25, marginVertical: 15}}>
                            <Text style={{lineHeight: 20, color: '#888', fontSize: 20, fontStyle: 'italic'}}>
                                Are you ready to bet <Text style={{color:'#4C64FF'}}>$20.20</Text> on accepting this challenge? If you win, we will deposit <Text style={{color:'#4C64FF'}}>$40.40</Text> to your IRA.
                            </Text>
                        </View>
                        <TouchableOpacity onPress={this._toggleModal}>
                            <Progress.Circle borderWidth={5} size={80} showsText={true} formatText={this.getPaymentAmount} textStyle={{fontSize: 16, color: '#4C64FF', fontWeight: 'bold'}}/>
                        </TouchableOpacity>
                    </View>
                </Modal>
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
