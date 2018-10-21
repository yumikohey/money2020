import React, {Component} from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import { openChallenge, ENTRIES2 } from '../static/entries';
import styles, { colors } from '../styles/index.style';
import SliderEntry from './SliderEntry';
import Profile from './Profile';
import LinearGradient from 'react-native-linear-gradient';
import { Avatar, Button } from 'react-native-elements';
import Modal from "react-native-modal";
import * as Progress from 'react-native-progress';
import PayPal from 'react-native-paypal-wrapper';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
          itemIndex: 0,
          isModalVisible: false
        }
        this._clickSupport = this._clickSupport.bind(this);
        this._onCarouselChanged = this._onCarouselChanged.bind(this);
        this.payByPaypal = this.payByPaypal.bind(this);
    }

    _renderLightItem ({item, index}) {
        return <SliderEntry data={item} even={false} styleTall={true} />;
    }

    _renderItem ({item, index}) {
        return <SliderEntry data={item} even={(index + 1) % 2 === 0} styleTall={true} />;
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

    payByPaypal() {
        // 3 env available: NO_NETWORK, SANDBOX, PRODUCTION
        PayPal.initialize(PayPal.NO_NETWORK, "Abi--ut6W_Ro2ZP3nesMBjEb0QLZ9_m0sNAp9B7LGM4GAP1y_wKNzO0VPY_G8qTNYJZryHb8iM3VA2Rg");
        PayPal.pay({
        price: '20.20',
        currency: 'USD',
        description: openChallenge[this.state.itemIndex].title,
        }).then(()=>{

            this._toggleModal();
            this.props.changePageWithPageIndexAndItemIndex(1, this.state.itemIndex);
        })
        .catch(error => this._toggleModal());
    }

    layoutExample (number, title, type) {
        const isTinder = type === 'tinder';
        return (
            <View>
                <Profile changePageWithPageIndex={this.props.changePageWithPageIndex}/>
                <View style={[styles.exampleContainer, isTinder ? styles.exampleContainerDark : styles.exampleContainerLight]}>
                        <Carousel
                            data={isTinder ? ENTRIES2 : openChallenge}
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
                            source={{uri: "https://images.unsplash.com/photo-1517630800677-932d836ab680?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8df5cbde7cb099c1565a250f910a42b0&auto=format&fit=crop&w=934&q=80"}}
                            activeOpacity={0.7}
                            containerStyle={{top: -10}}
                            onPress={this._toggleModal}
                        />
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                            Sally
                        </Text>
                        <View style={{paddingHorizontal: 25, marginVertical: 15}}>
                            <Text style={{lineHeight: 20, color: '#888', fontSize: 20, fontStyle: 'italic'}}>
                                Are you ready to bet <Text style={{color:'#4C64FF'}}>$20.20</Text> on accepting this challenge? If you win, we will deposit <Text style={{color:'#4C64FF'}}>$40.40</Text> to your IRA.
                            </Text>
                        </View>
                        <TouchableOpacity onPress={this.payByPaypal}>
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
