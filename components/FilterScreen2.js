import * as React from 'react';

import { Switch, View, Text, Image, StyleSheet, Button, TextInput, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { Divider, Input } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { RadioButton } from 'react-native-paper';
import ActivitiesScreen from './ActivitiesScreen';
import DateTimePicker from "react-native-modal-datetime-picker";
import SelectMultiple from 'react-native-select-multiple'
import FilterScreen from './FilterScreen';
import LinearGradient from "react-native-linear-gradient";
import { object } from 'prop-types';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const renderLabel = (label, style) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ width: 42, height: 42 }} source={require('../assets/planit.png')} />
            <View style={{ marginLeft: 10 }}>
                <Text style={style}>{label}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
    },
    container: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },

    tripMenuContainer: {
        //flexDirection: 'row',
        alignItems: 'baseline',
        //justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        flex: 1,
        //justifyContent: 'flex-end',
        marginBottom: 36
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

    actionButton: {
        width: 30,
        height: 30,
        top: 15,
        right: 10,
        borderRadius: 50,
        backgroundColor: 'white',
        elevation: 10,
        alignItems: 'baseline',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0
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

    paragraph: {
        paddingLeft: 20,
        paddingTop: 20,
        fontSize: 22,
        fontWeight: 'bold',
    },

    header: {
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        fontWeight: 'bold',
        //textAlign: 'center',
    },

    fullpage: {
        flex: 1,
        alignItems: 'center',
        fontSize: 20,
    },

});

export default class Filter2 extends React.Component {

    _onPressActivity() {
        // Add to itinerary list
        this.setState(state => ({ visible: !state.visible }))
    }

    state = {
        activityList: ['Food', 'Entertainment', 'Hiking', 'Landmarks & Historical Sites', 'Museums'],
        visible: true,
        jsonData: [],
        activityType: [],
        actDes: '',
        address: '',
        arrActivities: '',
        scrollActivities: [],
        selectedItems: [],
        budget: '',
        startDate: new Date('2020-06-12T04:00:00'),
        endDate: new Date('2020-06-12T03:59:59'),
        mode: 'time',
    };

    onSelectionsChange = (selectedItems) => {
        this.setState({ selectedItems })
    }

    openTextField() {
        if (this.state.visible) {
            this.state.visible = false;
        } else {
            this.state.visible = true;
        }
        this.addtoArray();
    }

    addtoArray() {
        this.state.activityList[this.state.activityList.length] = this.state.addressText;
        //this.addressText.current.clear();
        //this.addressText.current.shake();
        this.forceUpdate();
    }

    componentDidMount() {
        const { navigation } = this.props;
        var address = JSON.stringify(navigation.getParam('add', 'No Address Given'));
        this.address = address;
        var isCustom = JSON.stringify(navigation.getParam('isCustom', ''));
        this.isCustom = isCustom;
        //var startTime = JSON.stringify(navigation.getParam('start', ''));
    }

    render() {
        const { navigation } = this.props;
        this.state.address = navigation.getParam('add', 'No Address Given');

        return (
            <View>
                <Text h1 style={styles.paragraph}>
                    Choose a something you like
                </Text>
                <SelectMultiple
                    items={this.state.activityList}
                    renderLabel={renderLabel}
                    selectedItems={this.state.selectedItems}
                    onSelectionsChange={this.onSelectionsChange} />
                <Button title="Next" style={styles.tripButton} onPress={
                    () => this.props.navigation.navigate('ActivitiesScreen', {
                        act: this.state.selectedItems[0].value,
                        add: this.state.address,
                        start: this.state.startDate,
                        end: this.state.endDate,
                        isCustom: false,
                    })
                } />
                <View >
                    <Input
                        style={{ height: 10, margin: 40, fontSize: 12, color: 'blue', }}
                        placeholder="Tell me something you like to do?"
                        onChangeText={(addressText) => this.setState({ addressText })}
                        value={this.state.addressText}
                    />
                    <LinearGradient
                        start={{ x: 0.0, y: 0.5 }} end={{ x: 0.9, y: 0 }}
                        style={styles.actionButton}
                        colors={['#0B645A', '#0F8174', '#149788']}>
                        <TouchableOpacity
                            style={styles.subTripButton}
                            onPress={() => this.openTextField()}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
            //</View>
            //                <View style={styles.tripMenuContainer}>
        )
    }
}