import * as React from 'react';

import { View, Text, StyleSheet, Button, TextInput, Picker, TouchableOpacity, Image, Slider, } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { RadioButton } from 'react-native-paper';
import ActivitiesScreen from './ActivitiesScreen';
import FilterScreen2 from './FilterScreen2';
import DateTimePicker from "react-native-modal-datetime-picker";
import LinearGradient from "react-native-linear-gradient";
import HomePage from "./HomePage";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      onChangeText: '',
      activityType: 'No Activity Type Given',
      checked: 'none',
      budget: '',
      startDate: new Date('2020-06-12T04:00:00'),
      endDate: new Date('2020-06-12T03:59:59'),
      mode: 'time',
      startDateTimePickerVisible: false,
      endDateTimePickerVisible: false,
    };
  }
  showStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: true });

  showEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: true });

  hideStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: false });

  hideEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: false });

  handleStartDatePicked = date => {
    this.setState({ startDate: date });
    this.hideStartDateTimePicker();
  };

  handleEndDatePicked = date => {
    this.setState({ endDate: date });
    this.hideEndDateTimePicker();
  };

  sliderUpdate(sliderValue) {
    this.setState({ sliderValue: sliderValue })
    if (sliderValue == 0) {
      this.setState({ budget: '$' })
      this.setState({ sliderLabel: 'under $10' })
    }
    else if (sliderValue == 1) {
      this.setState({ budget: '$$' })
      this.setState({ sliderLabel: '$11 - $30' })
    }
    else if (sliderValue == 2) {
      this.setState({ budget: '$$$' })
      this.setState({ sliderLabel: '$31 - $60' })
    }
    else if (sliderValue == 3) {
      this.setState({ budget: '$$$$' })
      this.setState({ sliderLabel: 'over $60' })
    }
  }

  static navigationOptions = {
    header: null,
  };
  render() {
    const { checked, startDate, endDate, mode } = this.state;
    return (
      <View style={styles.container}>
        <LinearGradient
          start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
          style={styles.headerContainer}
          colors={['#0B645A', '#0F8174', '#0B645A']}>
          <Text style={styles.header}>CREATE ITINERARY</Text>
        </LinearGradient>
        {/* <TextInput
          style={{ height: 60, margin: 10, fontSize: 24 }}
          placeholder="Starting Location Address"
          onChangeText={(addressText) => this.setState({ addressText })}
          value={this.state.addressText}
        /> */}
        <TextInput
          style={{
            height: 60, margin: "2%", borderRadius: 5, fontSize: 20, backgroundColor: 'white', elevation: 5,
            paddingLeft: 10
          }}
          placeholder="Starting Location Address"
          onChangeText={(addressText) => this.setState({ addressText })}
          value={this.state.addressText}
        />

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", margin: "2%" }}>
            Budget
                   </Text>
          <Text style={{ fontSize: 18, marginLeft: "55%", marginTop: "4%", textAlign: 'right' }}>
            {this.state.sliderLabel}
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Slider
            value={this.state.sliderValue}
            step={1}
            minimumValue={0}
            maximumValue={3}
            style={{ width: "95%" }}
            minimumTrackTintColor={'#24a392'}
            maximumTrackTintColor={'#9bcfc8'}
            thumbTintColor={'#0F8174'}
            onValueChange={sliderValue => this.sliderUpdate(sliderValue)} />
        </View>
        <View>
          <Text style={{ fontSize: 24, fontWeight: "bold", margin: "2%" }}>
            Time Frame
            </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button
            title={(this.state.startDate.getHours() > 9 ?
              this.state.startDate.getHours().toString() : "0" + this.state.startDate.getHours().toString())
              + ':' +
              (this.state.startDate.getMinutes() > 9 ?
                this.state.startDate.getMinutes().toString() : "0" + this.state.startDate.getMinutes().toString())}
            onPress={this.showStartDateTimePicker}
            buttonStyle={{
              padding: 2, borderColor: "black", borderRadius: 5,
              backgroundColor: 'white'
            }}
            containerStyle={{ width: "44%", margin: "2%", elevation: 5 }}
            titleStyle={{ fontSize: 36, color: "black" }} />
          <DateTimePicker
            isVisible={this.state.startDateTimePickerVisible}
            onConfirm={this.handleStartDatePicked}
            onCancel={this.hideStartDateTimePicker}
            mode={mode}
            date={startDate}
          />
          <Text style={{ fontSize: 16, marginTop: 5, margin: "2%" }}>
            to
              </Text>
          <Button
            title={(this.state.endDate.getHours() > 9 ?
              this.state.endDate.getHours().toString() : "0" + this.state.endDate.getHours().toString())
              + ':' +
              (this.state.endDate.getMinutes() > 9 ?
                this.state.endDate.getMinutes().toString() : "0" + this.state.endDate.getMinutes().toString())}
            onPress={this.showEndDateTimePicker}
            buttonStyle={{
              padding: 2, borderColor: "black", borderRadius: 5,
              backgroundColor: 'white'
            }}
            containerStyle={{ width: "44%", margin: "2%", elevation: 5 }}
            titleStyle={{ fontSize: 36, color: "black" }} />
          <DateTimePicker
            isVisible={this.state.endDateTimePickerVisible}
            onConfirm={this.handleEndDatePicked}
            onCancel={this.hideEndDateTimePicker}
            mode={mode}
            date={endDate}
          />
        </View>


        {/* <Picker
          selectedValue={this.state.budget}
          style={{ height: 50, width: 175, }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ budget: itemValue })
          }>
          <Picker.Item label="Select a Budget" value="placeholder" />
          <Picker.Item label="under $10" value="$" />
          <Picker.Item label="$11 - $30" value="$$" />
          <Picker.Item label="$31 - $60" value="$$$" />
          <Picker.Item label="over $60" value="$$$$" />
        </Picker> */}
        {/* <View style={styles.buttonContainer}>
            <Text style={styles.text}>Food</Text>
            <RadioButton
              value="first"
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => {     
                this.setState({ checked: 'first' });
                this.setState({ activityType: 'Food' });
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.text}>Entertainment</Text>
            <RadioButton
              value="second"
              status={checked === 'second' ? 'checked' : 'unchecked'}
              onPress={() => { 
                this.setState({ checked: 'second' });
                this.setState({ activityType: 'Entertainment' });
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.text}>Hiking</Text>
            <RadioButton
              value="third"
              status={checked === 'third' ? 'checked' : 'unchecked'}
              onPress={() => { 
                this.setState({ checked: 'third' });
                this.setState({ activityType: 'Hiking' });
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.text}>Washrooms</Text>
            <RadioButton
              value="fourth"
              status={checked === 'fourth' ? 'checked' : 'unchecked'}
              onPress={() => { 
                this.setState({ checked: 'fourth' });
                this.setState({ activityType: 'Washrooms' });
              }}
            />
          </View> */}
        {/* <View>
          <Button title="Start Time" onPress={this.showStartDateTimePicker} />
          <DateTimePicker
            isVisible={this.state.startDateTimePickerVisible}
            onConfirm={this.handleStartDatePicked}
            onCancel={this.hideStartDateTimePicker}
            mode={mode}
            date={startDate}
          />
        </View>
        <View>
          <Button title="End Time" onPress={this.showEndDateTimePicker} />
          <DateTimePicker
            isVisible={this.state.endDateTimePickerVisible}
            onConfirm={this.handleEndDatePicked}
            onCancel={this.hideEndDateTimePicker}
            mode={mode}
            date={endDate}
          />
        </View> */}
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: "10%" }}>
          <LinearGradient
            start={{ x: 0.0, y: 0.5 }} end={{ x: 0.9, y: 0.5 }}
            style={styles.tripButton}
            colors={['#0B645A', '#0F8174', '#149788']}>
            <TouchableOpacity
              style={styles.subTripButton}
              onPress={
                () => this.props.navigation.navigate('FilterScreen2', {
                  //act: this.state.activityType,
                  add: this.state.addressText,
                  start: this.state.startDate,
                  end: this.state.endDate,
                  isCustom: false,
                })
                //() => alert(this.state.addressText)
              }>
              <Text style={styles.buttonText}>Choose Activity Type</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* <Button
            title="Choose your Activity"
            buttonStyle={{ backgroundColor: '#27f56c', borderTopLeftRadius: 30, borderBottomLeftRadius: 30 }}
            containerStyle={{ width: "47.5%", elevation: 5, borderTopLeftRadius: 30, borderBottomLeftRadius: 30 }}
            titleStyle={{ fontSize: 36, color: "white" }}
            onPress={
              () => this.props.navigation.navigate('FilterScreen2', {
                //act: this.state.activityType,
                add: this.state.addressText,
                start: this.state.startDate,
                end: this.state.endDate,
                isCustom: false,
              })
              //() => alert(this.state.addressText)
            } /> */}
          <LinearGradient
            start={{ x: 0.0, y: 0.5 }} end={{ x: 0.9, y: 0.5 }}
            style={styles.tripButton}
            colors={['#C40000', '#FF1E1E', '#FF8639']}>
            <TouchableOpacity
              style={styles.subTripButton}
              onPress={
                () => this.props.navigation.navigate('ActivitiesScreen', {
                  add: this.state.addressText,
                  start: this.state.startDate,
                  end: this.state.endDate,
                  isCustom: true,
                })
                //() => alert(this.state.addressText)
              }>
              <Text style={styles.buttonText}>I Am Feeling Lucky</Text>
            </TouchableOpacity>
          </LinearGradient>
          {/* <Button
            title="I am feeling lucky"
            buttonStyle={{ backgroundColor: '#2795f5', borderTopRightRadius: 30, borderBottomRightRadius: 30 }}
            containerStyle={{ width: "47.5%", elevation: 5, borderTopRightRadius: 30, borderBottomRightRadius: 30 }}
            titleStyle={{ fontSize: 36, color: "white" }}
            onPress={
              () => this.props.navigation.navigate('ActivitiesScreen', {
                add: this.state.addressText,
                start: this.state.startDate,
                end: this.state.endDate,
                isCustom: true,
              })
              //() => alert(this.state.addressText)
            } /> */}
        </View>

        {/* <View>
          <Button title="Activities" style={styles.tripButton} onPress={
            () => this.props.navigation.navigate('FilterScreen2', {
              add: this.state.addressText,
              start: this.state.startDate,
              end: this.state.endDate,
              isCustom: false,
            })
            //() => alert(this.state.addressText)
          } />
        </View>
        <View>
          <Button title="I am Feeling Lucky" style={styles.tripButton} onPress={
            () => this.props.navigation.navigate('ActivitiesScreen', {
              add: this.state.addressText,
              start: this.state.startDate,
              end: this.state.endDate,
              isCustom: true,
            })
            //() => alert(this.state.addressText)
          } />
        </View> */}

      </View >
    );
  }
}
const AppNavigator = createStackNavigator(
  {
    FilterScreen: Filter,
    FilterScreen2: FilterScreen2,
    ActivitiesScreen: ActivitiesScreen,
  },
  {
    initialRouteName: 'FilterScreen',
    defaultNavigationOptions: {
      header: null
    },
  }
);
const AppContainer = createAppContainer(AppNavigator);
export default class FilterScreen extends React.Component {
  render() {
    return <AppContainer style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
  header: {
    margin: 24,
    fontSize: 16,
    alignSelf: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  headerContainer: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#149788',
    elevation: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
});