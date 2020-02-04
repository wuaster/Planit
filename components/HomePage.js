//import liraries
import React, { Component } from 'react';
import {View, Text, StyleSheet, Button, Alert, Image, TouchableOpacity} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import firebase from 'react-native-firebase';
import AccountInfo from './AccountInfo';
import SavedItineraries from './SavedItineraries';
import FilterScreen from './FilterScreen';
import { signOutUser } from './Auth';
import LinearGradient from "react-native-linear-gradient";


// create a component
class HomeScreen extends Component {
    static navigationOptions = {
        header: null,
      };
    render() {
        return (
            <View style={styles.container}>
                    <LinearGradient
                        start={{x: 0.0, y: 0.5}} end={{x: 1, y: 0.5}}
                        style={styles.headerContainer}
                        colors={['#0B645A', '#0F8174', '#0B645A']}>
                    <Text style={styles.header}>{"Welcome " + firebase.auth().currentUser.displayName.split(' ')[0]}</Text>
                    </LinearGradient>
                {/* create logo and text */}
                <View style={styles.welcomeContainer}>
                    <View style={{paddingTop:40}}>
                    <Image source={require('../assets/planit.png')} style={{height:180, width:180}}></Image>
                    </View>
                </View>
    
                <View style={styles.tripMenuContainer}>
                        {/* <Text style={styles.subHeadingTitle}>Last Trip</Text> */}
                        <View >
                            <LinearGradient
                                start={{x: 0.0, y: 0.5}} end={{x: 0.9, y: 0}}
                                style={styles.tripButton}
                                colors={['#0B645A', '#0F8174', '#149788']}>
                            <TouchableOpacity
                                style={styles.subTripButton}
                                    onPress={() => this.props.navigation.navigate('FilterScreen')}>
                                <Text style={styles.buttonText}>CREATE ITINERARIES</Text>
                            </TouchableOpacity>
                            </LinearGradient>
                            <LinearGradient
                                start={{x: 0.0, y: 0.5}} end={{x: 0.8, y: 0.5}}
                                style={styles.tripButton}
                                colors={['#0B645A', '#0F8174', '#149788']}>
                            <TouchableOpacity
                                style={styles.subTripButton}
                                    onPress={() => this.props.navigation.navigate('SavedItineraries')}>
                                <Text style={styles.buttonText}>SAVED ITINERARIES</Text>
                            </TouchableOpacity>
                            </LinearGradient>
                        </View>
                        <View >
                            <LinearGradient
                                start={{x: 0.0, y: 0.5}} end={{x: 0.9, y: 0.5}}
                                style={styles.tripButton}
                                colors={['#0B645A', '#0F8174', '#149788']}>
                            <TouchableOpacity
                                style={styles.subTripButton}
                                       onPress={() => this.props.navigation.navigate('Account')}>
                                <Text style={styles.buttonText}>USER INFO</Text>
                            </TouchableOpacity>
                            </LinearGradient>
                            <LinearGradient
                                start={{x: 0.0, y: 0.5}} end={{x: 0.9, y: 0.5}}
                                style={styles.tripButton}
                                colors={['#C40000', '#FF1E1E', '#FF8639']}>
                            <TouchableOpacity
                                style={styles.subTripButton}
                                       onPress={() => signOutUser()}>
                                <Text style={styles.buttonText}>LOG OUT</Text>
                            </TouchableOpacity>
                            </LinearGradient>
                        </View>
                </View>

                {/* <View style={styles.itineraryContainer}>
                    <View style={styles.subHeading}>
                        <Text style={styles.subHeadingTitle}>Upcoming Trip</Text>
                    </View>
                    <View style={styles.itineraryDisplay}>
                        <Text ></Text>
                    </View>
                </View>
                
                <View style={styles.itineraryContainer}>
                    <View style={styles.subHeading}>
                        <Text style={styles.subHeadingTitle}>Last Trip</Text>
                    </View>
                    <View style={styles.itineraryDisplay}>
                        <Text ></Text>
                    </View>
                </View> */}
            </View>
        );
    }
};

const AppNavigator = createStackNavigator(
    {
      Home: HomeScreen,
      Account: AccountInfo,
      SavedItineraries: SavedItineraries,
      FilterScreen: FilterScreen,
    },
    {
      initialRouteName: 'Home',
      defaultNavigationOptions: {
        header: null
      },
    }

  );

const AppContainer = createAppContainer(AppNavigator);

export default class HomePage extends Component {
    render() {
      return <AppContainer style={styles.container}/>;
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },

    headerContainer: {
        height: 60,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#149788',
        elevation: 20,
    },

    header: {
        margin: 24,
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },

    welcomeContainer:{
        justifyContent: 'center',
        alignItems: 'center',
    },

    tripMenuContainer: {
        flexDirection: 'row',
        paddingTop: '20%'
    },

    itineraryContainer:{
        alignSelf: "stretch",
    },

    heading: {
        alignItems: 'center',
        padding: 20
    },

    itineraryDisplay: {
        margin: 20,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 15
    },

    tripButton: {
        width: 185,
        height: 60,
        top: 20,
        margin: 10,
        borderRadius: 50,
        backgroundColor: 'white',
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    subTripButton: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        fontSize: 16,
        color: 'white',
    },

    h1: {
        fontFamily: 'sans-serif-light',
        fontSize: 40,

    },
    subHeadingTitle: {
        fontFamily: 'sans-serif-light',
        fontSize: 20,
    },
});
