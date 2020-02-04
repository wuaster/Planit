import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View, Text, StyleSheet } from 'react-native';
import LandingPage from './LandingPage';
import HomeScreen from './HomePage';
import ActivitiesScreen from './ActivitiesScreen';

//create a component
class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      loggedIn: false,
    };
  }
    /**
   * When the App component mounts, we listen for any authentication
   * state changes in Firebase.
   * Once subscribed, the 'user' parameter will either be null 
   * (logged out) or an Object (logged in)
   */
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      var isLoggedIn = false;
      if (user != null) {
        isLoggedIn = true;
      }
      this.setState({
        loading: false,
        user,
        loggedIn: isLoggedIn,
      });
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }



  renderContent = () => {
    switch(this.state.loggedIn) {
      case false:
        return <LandingPage/>
      case true:
        return <HomeScreen/>
    }

  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderContent()}
      </View>
    );
  }
}

//define styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      height:'100%',
      width:'100%'
  },
});

export default App;
