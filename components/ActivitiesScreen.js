import * as React from 'react';
import { View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
  Linking
 } from 'react-native';

import { Text, Card, Header } from 'react-native-elements';
import { Snackbar } from 'react-native-paper'; 
import {LOCALHOST} from 'react-native-dotenv';
import firebase from 'react-native-firebase';
import Images from './ImageComponent';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');


export default class RecommendedActivities extends React.Component {
_onPressActivity() {
    // Add to itinerary list
    this.setState(state => ({ visible: !state.visible }))
  }
  state = {
    visible: false,
    jsonData: [],
    activityType: '',
    actDes: '',
    address: '',
    arrActivities: '',
    scrollActivities: [],
  };
  componentDidMount() {
    const { navigation } = this.props;
    var activityType = JSON.stringify(navigation.getParam('act', 'No Activity Given')).slice(1,-1);
    var address = JSON.stringify(navigation.getParam('add', 'No Address Given'));
    this.activityType = activityType;
    this.address = address;
    var isCustom = JSON.stringify(navigation.getParam('isCustom', ''));
    if (isCustom) {
      var id = firebase.auth().currentUser.uid;
      var activityEndPoint = `http://${LOCALHOST}:5000/yelp/customItinerary/` + id;
    }
    else {
      var activityEndPoint = `http://${LOCALHOST}:5000/yelp/searchInterest`;
    }
    
    fetch(activityEndPoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "address": this.address,
        "target": this.activityType,
        "radius": '2500'
      }),
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({ jsonData: data[0]})
      this.setState({ arrActivities: data[0].name})
      var activities = [];
      for(var i=0;i<data.length;i++){
              activities.push(
                 data[i]
                );
      }
      this.setState({scrollActivities: activities})
    })
    .catch(console.log)

    // Get activity type and remove quotation marks
   
    this.actDes = 'Please select an activity type in the previous page';
    if (this.activityType == 'Food') {
      this.actDes = 'A quick bite. A culinary adventure. The choice is yours.';
    }
    else if (this.activityType == 'Entertainment') {
      this.actDes = 'An assault on all senses. An escape from life. Enjoy in moderation.';
    }
    else if (this.activityType == 'Hiking') {
      this.actDes = 'Walk through the forest. Do whatever. Stay hydrated.';
    }
    else if (this.activityType == 'Museums') {
      this.actDes = 'A blast to the past.';
    } 
    else if (this.activityType == "Landmarks & Historical Sites") {      
      this.actDes = 'As seen on TV. Take a picture, it\'ll last longer.';
    } else {
      this.activityType = "Just For You";
      this.actDes = "An outing made just how you like it."
    }


  }

  saveItinerary(activities) {
    const { navigation } = this.props;
    var startTime = navigation.getParam('start', new Date());
    var jsonData = {
      activities: activities,
      startTime: startTime
    };
    var id = firebase.auth().currentUser.uid;
    fetch(`http://${LOCALHOST}:5000/user/addItinerary/` + id, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify(jsonData)
    });
    alert("Saved Itinerary");
  }

  getRoute(destinations) {
    const { navigation } = this.props;
    var origin = JSON.stringify(navigation.getParam('add', 'No Address Given')).toString();
    var destinations = destinations;
    return fetch(`http://${LOCALHOST}:5000/route/getRoute/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({
        origin: origin, 
        destinations: destinations
      })
    }).then((response) => response.json())
      .then((responseJson) => {
         Linking.openURL(responseJson.url);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { navigation } = this.props;
    var startTime = navigation.getParam('start', new Date());
    var endTime = navigation.getParam('end', new Date());
    var allActivities = this.state.scrollActivities;
    var elements = [];
    for (var i = 0; i < allActivities.length; i ++) {
      
      var time = startTime;
      (i > 0) ? time.setHours( startTime.getHours() + 1 ) : null;
      var startTimeString = time.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: true });

      elements.push(
        <Card 
          containerStyle={styles.card}
          image={Images.activityTypes[this.activityType]}
          imageStyle={styles.cardimage}
          featuredTitle={ allActivities[i].name }
          featuredTitleStyle={ styles.cardTitle }
          featuredSubtitle={ startTimeString }>
          <Text style={styles.cardText}>
            {allActivities[i].address}
          </Text>
          <Text style={styles.cardText}>
            {allActivities[i].rating}
          </Text>   
      </Card>
      )
    }
    
    return (
      <View style={styles.container}>
        <Text h1 style={styles.header}>
          {this.activityType}
        </Text>
        <Text style={styles.subtitle}>
          {this.actDes}
        </Text>

        <Text style={styles.paragraph}>
          Recommended Activities
        </Text>
        <ScrollView vertical={true}>
          <View>
            {/* <TouchableHighlight onPress={this._onPressActivity.bind(this)} underlayColor="white">   */}
                {elements}
              {/* </TouchableHighlight> */}
            </View>
        </ScrollView>
        <Snackbar
          visible={this.state.visible}
          onDismiss={() => this.setState({ visible: false })}
          action={{
            label: 'Undo',
            onPress: () => {
              // Do something
            },
          }}
        >
          Activity added to Itinerary!
        </Snackbar>
        <View ><Button title="View Route" color="#ff5c11" onPress={() => this.getRoute(this.state.scrollActivities)}/></View>
        <View ><Button title="Save Trip" onPress={() => this.saveItinerary(this.state.scrollActivities)}/></View>
      </View>
    );
  }

}
const cardHeight = '70%';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#ecf0f1'
  },
  subtitle: {
    paddingTop: 20,
    paddingLeft: 20,
    fontSize: 20,
  },
  header: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    fontWeight:'bold',
    //textAlign: 'center',
  },
  paragraph: {
    paddingLeft: 20,
    paddingTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
  },
  card: {
   width: SCREEN_WIDTH - 30,
   // height: Dimensions.get('window').height - 400,
  },
  cardTitle: {
    fontSize: 24,
    textAlign: "center",
  },
  cardText: {
    fontSize: 20,
    margin: 3,
  },
});
