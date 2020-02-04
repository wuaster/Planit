import * as React from 'react';
import {Text, View, StyleSheet, ImageBackground, StatusBar, TouchableOpacity, FlatList, Image, Linking, Button} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import LinearGradient from 'react-native-linear-gradient';
import ModalBox from "react-native-modalbox";
import firebase from 'react-native-firebase';
import {LOCALHOST} from 'react-native-dotenv';

export default class SavedItineraries extends React.Component {

  state = {
    modalVisibility: false,
    itineraryName: '',
    itineraryTags: '',
    itineraryItems: [],
    itineraryImg: 'empty',

    itineraryList: [],
  };

  componentDidMount() {
    let id = firebase.auth().currentUser.uid
    fetch(`http://${LOCALHOST}:5000/user/getUserItineraries/` + id, {
      method: 'GET',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
    }).then(res => res.json())
        .then((itineraries) => {
              itineraries.map((itineraries) => {
                this.setState({itineraryList: [...this.state.itineraryList, itineraries]} )
              })
            }
        )
  }
  sendActivityRating(rating, activity) {
    var id = firebase.auth().currentUser.uid;
    fetch(`http://${LOCALHOST}:5000/user/updateUserRating/` + id, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({
        "activity": activity,
        "like": rating,
      })
    });
    alert("Rating Provided");
  }

  fetchItineraryDetails(index){
    this.setState({modalVisibility: true})
    let id = firebase.auth().currentUser.uid
    fetch(`http://${LOCALHOST}:5000/user/getUserItineraries/` + id, {
      method: 'GET',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
    }).then(res => res.json())
        .then((itinerary) => {
          this.setState({itineraryName: itinerary[index].name})
          this.setState({itineraryTags: itinerary[index].tags})
          this.setState({itineraryImg: itinerary[index].imageRef})
          const itineraryActivities = itinerary[index].activities
          itineraryActivities.map((activities) => {
            this.setState({itineraryItems: [...this.state.itineraryItems, activities]} )
          })
        }
    )
  }

  closeDetails() {
    this.setState({modalVisibility: false, itineraryItems: []})
    this.setState({itineraryName: ''})
    this.setState({itineraryTags: ''})
    this.setState({itineraryItems: []})
    this.setState({itineraryImg: 'empty'})
  }

  render() {
    let itineraryCards = this.state.itineraryList.map((itinerary, index)=>{
      return(
          <TouchableOpacity key={index} onPress={() => {this.fetchItineraryDetails(index)}}>
            <ImageBackground style={styles.exampleimg} imageStyle={{ borderRadius: 25, opacity: 0.9}} source=
                {{uri: itinerary.imageRef}}>
              <Text style={styles.imageLabel}>{itinerary.name}</Text>
              <Text style={styles.imageSupportLabel}>Tap for more details</Text>
            </ImageBackground>
          </TouchableOpacity>
      );
    })
    StatusBar.setBarStyle('light-content', true);
    return (
      <View style={styles.container}>
        <LinearGradient
            //colors={['#149788', '#149788', '#0f7d70']}
            colors={['#ecf0f1', '#ecf0f1', '#ecf0f1']}
            style={{ backgroundColor: '#ecf0f1', alignItems: 'center'}}>
          <LinearGradient
              start={{x: 0.0, y: 0.5}} end={{x: 1, y: 0.5}}
              style={styles.headerContainer}
              colors={['#0B645A', '#0F8174', '#0B645A']}>
            <Text style={styles.header}>SAVED ITINERARIES</Text>
          </LinearGradient>
            <SwiperFlatList
            showPagination
            paginationDefaultColor='#b8b8b8'
            paginationActiveColor='#000000'
            paginationStyleItem={ styles.paginationStyle }
            paginationStyle={ styles.paginationContainer }>
              {
                itineraryCards
              }
            </SwiperFlatList>
        </LinearGradient>
        {/*Modal for Itinerary*/}
        <ModalBox
            style={styles.itineraryDetails}
            onClosed={()=>this.closeDetails()}
            isOpen={this.state.modalVisibility}
            swipeThreshold={20}
            swipeArea={150}
            swipeToClose={ true }>
          <View
              style={{borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: 'white', elevation: 10}}>
          <ImageBackground style={styles.detailsImg} imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20,}}
                           source={{uri: this.state.itineraryImg}}>
            <View style={{backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20,
              alignItems: 'center', height: 25, width: '100%'}}>
              <View style={{borderRadius: 5, backgroundColor: '#c7c7c7', height:5, top:10, width:'10%'}}>
              </View>
            </View>
          </ImageBackground>
          <View>
            <Text style={styles.detailsTitle}>{this.state.itineraryName}</Text>
          </View>
          <View>
            <Text style={styles.detailsTags}>Tags: {this.state.itineraryTags}</Text>
          </View>
          </View>
          <LinearGradient
              //colors={['#149788', '#2e998d', '#50a198']}
              colors={['#ecf0f1', '#ecf0f1', '#ecf0f1']}
              style={{flex: 1}}>
          <FlatList
            style={styles.itineraryFlatlist}
            data={this.state.itineraryItems}
            renderItem={({item}) =>
                    <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', elevation: 2, width: '95%',
                     padding: 30, left:10, marginBottom: 10}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.detailsTime}>
                          {item.activityTime}
                        </Text>
                        <Text style={styles.detailsActivity}>
                          {item.activityName}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => this.sendActivityRating(1, item.activityType)}>
                          <Image
                            style={styles.button}
                            source={require('../assets/thumbs_up.png')}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.sendActivityRating(0, item.activityType)}>
                          <Image
                            style={styles.button}
                            source={require('../assets/thumbs_down.png')}
                          />
                        </TouchableOpacity>
                      </View>
                        <Button color="#ff5c11" title="Reserve" onPress={() => Linking.openURL(item.reservationLink)}/>
                    </View>
          }
              keyExtractor={item => item.activityName}
          />
          </LinearGradient>
        </ModalBox>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#ecf0f1',
    //backgroundColor: '#149788',
  },
  header: {
    margin: 24,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  headerContainer: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#149788',
    elevation: 20,
  },

  exampleimg: {
    height: 550,
    width: 365,
    bottom: 5,
    margin: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },

  imageLabel: {
    bottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 50,
    color: '#FFFFFF',
  },

  imageSupportLabel: {
    bottom: 10,
    textAlign: 'center',
    fontSize: 12,
    color: '#FFFFFF',
  },
  paginationStyle: {
    width: 5,
    height: 5,
    marginLeft: 3,
    marginRight: 3,
    bottom: 4,
  },
  paginationContainer: {
    width: 0,
    height: -5,
  },
  itineraryDetails: {
    flex: 1,
    elevation:30,
    marginTop: 35,
    borderRadius: 20,
  },
  detailsTitle: {
    fontSize: 36,
    left: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  detailsTags: {
    fontSize: 18,
    color: 'black',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  detailsTime: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  detailsActivity: {
    fontSize: 20,
    left: 40,
    width: 200,
  },
  itineraryFlatlist: {
    marginBottom: 20,
  },

  detailsImg: {
    width: '100%',
    height: 250,

  },

  button: {
    margin: 10
  },

  });
