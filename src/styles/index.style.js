import { StyleSheet } from 'react-native';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.black
    },
    container: {
        flex: 1,
        backgroundColor: colors.background1
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonLinearGradient: { height: 48, width: 200, alignItems: 'center', justifyContent: 'center', borderRadius: 4},
    touchableButton: {
        width: 200,
        alignItems: 'center'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        padding: 15,
        marginLeft: 1,
        marginRight: 1,
        width: 198
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    scrollview: {
        flex: 1
    },
    exampleContainer: {
    },
    exampleContainerDark: {
        backgroundColor: colors.black
    },
    exampleContainerLight: {
        backgroundColor: 'white'
    },
    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titleDark: {
        color: colors.black
    },
    subtitle: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        marginTop: 15,
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 10 // for custom animation
    },
    paginationContainer: {
        paddingVertical: 8
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    },

    /**
     * Profile
     */
    profileView: {
        marginHorizontal: 30,
    },
    profileContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    profileText: {
        marginHorizontal: 10
    },
    profileSubtitle: {
        marginTop: 6,
        color: '#36acaa',
        fontSize: 14,
        fontStyle: 'italic'
    },
    challengeItemText: {
        width: 200,
        left: 20
    },
    /**
     * TakenChallenges 
     */
    takenChallengesContainer: {
        flex: 1,
        marginVertical: 80,
        marginHorizontal: 10
    },
    overallContainer: {
        flex: 1,
        flexDirection: 'row',
        height: 100,
    },
    overallCellWithBorder: {
        height: 80,
        borderRightWidth: 5,
        borderRightColor: '#0C309A',
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    overallCellwoBorder: {
        height: 80,
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    overallTextDescription: {
        color: '#0C309A',
        fontSize: 20,
        fontWeight: 'bold'
    },
    overallTextScore: {
        color: '#438eff',
        fontSize: 28,
        fontWeight: 'bold'
    },
    challengeItemContainer: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        paddingVertical: 15,
        borderRadius: 5,
        height: 80,
        marginVertical: 15,
    },
    itemText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    takenChallengeItemContainer: {
        flex: 1,
        flexDirection: 'row'
    }
});
