import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import firebase from 'react-native-firebase';
import LinearGradient from "react-native-linear-gradient";

class AccountInfo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <LinearGradient
                    start={{x: 0.0, y: 0.5}} end={{x: 1, y: 0.5}}
                    style={styles.headerContainer}
                    colors={['#0B645A', '#0F8174', '#0B645A']}>
                    <Text style={styles.header}>USER INFORMATION</Text>
                </LinearGradient>
                <View style={{alignItems: 'center', padding: 10, marginLeft: 10, marginTop: 10, marginRight: 10,
                    backgroundColor: 'white', elevation:1}}>
                    <Image source={require('../assets/userIcon.png')} style={{height:180, width:180}}></Image>
                    <Text style={styles.displayName}>
                        {firebase.auth().currentUser.displayName}
                    </Text>
                </View>
                <View style={{padding: 10, marginLeft: 10, marginTop: 10, marginRight: 10, backgroundColor: 'white', elevation:1}}>
                    <Text style={{fontSize: 18, padding: 5, fontWeight: 'bold'}}>
                        User ID
                    </Text>
                    <Text style={{fontSize: 18, padding: 5}}>
                        {firebase.auth().currentUser.uid}
                    </Text>
                </View>
                <View style={{padding: 10, marginLeft: 10, marginTop: 10, marginRight: 10, backgroundColor: 'white', elevation:1}}>
                    <Text style={{fontSize: 18, padding: 5, fontWeight: 'bold'}}>
                        E-mail
                    </Text>
                    <Text style={{fontSize: 18, padding: 5}}>
                        {firebase.auth().currentUser.email}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1'
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

    displayName: {
        fontSize: 28,
        fontWeight: 'bold',
    }
});

export default AccountInfo;