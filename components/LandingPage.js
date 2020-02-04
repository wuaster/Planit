//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {onFBLoginOrRegister, onGLoginOrRegister} from './Auth';

// create a component
const LandingPage = () => {
    return (
        <View style={styles.container}>
            
            {/* create logo and text */}
            <View style={styles.logoContainer}>
                <View style={styles.titletext}>
                    <Text style={styles.h1}>Planit</Text>
                    <Text>Create Your Ideal Trip</Text>
                </View>
                <Image source={require('../assets/planit.png')} style={{height:150, width:150}}></Image>
            </View>

            {/* Create Google Login Button */}
            <View style={styles.buttonsContainer}>
              {/* <TouchableOpacity style={styles.googlebutton} activeOpacity={0.5}>
                  <Image
                  source={require('../assets/google.jpg')}
                  style={styles.ImageIconStyle}
                  />
                  <Text onPress={() => onGLoginOrRegister()} style={styles.buttonText}> Sign up with Google </Text>
                  <Text onPress={() => onGLoginOrRegister()} style={styles.buttonText}> Sign up with Google </Text>
              </TouchableOpacity> */}

              {/* Create Facebook Login button */}
              <TouchableOpacity style={styles.facebookbutton} activeOpacity={0.5}>
                  <Image
                  source={require('../assets/facebook.png')}
                  style={styles.ImageIconStyle}
                  />
                  {/* <Text onPress={() => onFBLoginOrRegister()} style={styles.buttonText}> Sign up with Facebook </Text> */}
                  <Text onPress={() => onFBLoginOrRegister()} style={styles.buttonText}> Sign up with Facebook </Text>
              </TouchableOpacity>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ecf0f1',

    },

    titletext: {
        alignItems: 'center',
        paddingRight: 30

    },

    logoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:50
    },

    buttonsContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 2,
    },

    buttonText: {
        color: "white",
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 10 
    },

    h1: {
        fontFamily: 'sans-serif-light',
        fontSize: 40,

    },

    facebookbutton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#485a96',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        width: 220,
        margin: 5,
      },

      googlebutton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eb7a34',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        width: 220,
        margin: 5,
      },

      ImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
      },
});

//make this component available to the app
export default LandingPage;
