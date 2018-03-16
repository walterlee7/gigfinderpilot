import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Alert, Text, ImageBackground } from 'react-native';
import { Card } from 'react-native-elements';
import { Picker } from 'react-native-picker-dropdown';

import * as searchService from '../services/search';
import * as searchResultsService from '../services/searchResults';

import SearchResult from './SearchResult';


export default class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            locations: [],
            instruments: [],
            artists: [],
            location_name: '',
            instrument_name: '',
        };

        this.onValueChange = this.handleValueChange.bind(this)
        this.onValChange = this.handValueChange.bind(this)
    }

    componentDidMount() {

        this.getLocations();
        this.getInstruments();

    }

    handleValueChange(location_name) {
        this.setState({ location_name });
    }

    handValueChange(instrument_name) {
        this.setState({ instrument_name });
    }

    getLocations() {
        searchService.allLocations()
            .then((locations) => {
                locations.sort(function (a, b) {
                    var textA = a.location_name.toUpperCase();
                    var textB = b.location_name.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
                this.setState({ locations });
            }).catch((err) => {
                console.log(err);
            });
    }

    getInstruments() {
        searchService.allInstruments()
            .then((instruments) => {
                instruments.sort(function (a, b) {
                    var textA = a.instrument_name.toUpperCase();
                    var textB = b.instrument_name.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
                this.setState({ instruments });
            }).catch((err) => {
                console.log(err);
            });
    }

    handleSubmit(e) {
        const locationIndex = this.state.location_name;
        const instrumentIndex = this.state.instrument_name;

        if (locationIndex !== '' && instrumentIndex !== '') {
            console.log('both');
            let selectedLocation = this.state.locations[locationIndex].location_name;
            let selectedInstrument = this.state.instruments[instrumentIndex].instrument_name;

            searchResultsService.getArtist(selectedLocation, selectedInstrument)
                .then((results) => {
                    console.log('searchResults:' + results);
                    // Alert.alert('Location and Instrument Search Results');
                    this.props.navigation.navigate('SearchResult', { results });
                }).catch((err) => {
                    console.log(err);
                    alert("No Search Results!!!!");
                })
        } else if (locationIndex !== '') {

            let selectedLocation = this.state.locations[locationIndex].location_name;

            searchResultsService.getArtistLocation(selectedLocation)
                .then((results) => {
                    // Alert.alert('Location Search Results');
                    results.sort(function (a, b) {
                        var textA = a.name.toUpperCase();
                        var textB = b.name.toUpperCase();
                        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                    });
                    this.props.navigation.navigate('SearchResult', { results });
                }).catch((err) => {
                    console.log(err);
                    alert("No Search Results!!!!");
                })
        } else if (instrumentIndex !== '') {

            let selectedInstrument = this.state.instruments[instrumentIndex].instrument_name;

            searchResultsService.getArtistInstrument(selectedInstrument)
                .then((results) => {
                    // Alert.alert('Instrument Search');
                    results.sort(function (a, b) {
                        var textA = a.name.toUpperCase();
                        var textB = b.name.toUpperCase();
                        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                    });
                    this.props.navigation.navigate('SearchResult', { results });
                }).catch((err) => {
                    console.log(err);
                    alert("No Search Results!!!!");
                })
        } else if (locationIndex === '' || instrumentIndex === '') {
            Alert.alert('Please choose an instrument or a location');
        } else {
            Alert.alert('Search Error');
        }
    }

    handleReset() {
        this.props.navigation.navigate('HomeScreen');
    }

    render() {
        return (
            <ImageBackground source={{ uri: 'https://static.tumblr.com/e31f3012fa7c249095a8dddbfc58f0c4/rgmmpty/K3Tmpmf2h/tumblr_static_brick_wall_night_texture_by_kaf94-d373s49.jpg' }} style={styles.container}>
            <View style={styles.container}>
                <View>
                    <Text style={{ color: 'lightgrey', fontSize: 17 }}>Choose Location</Text>
                </View>
                <Picker
                    selectedValue={this.state.location_name}
                    onValueChange={this.onValueChange}
                    prompt="Search By Location"
                    style={styles.picker}
                    textStyle={styles.pickerText}
                    cancel
                >
                    {this.state.locations.map((item, index) => {
                        return (
                            <Picker.Item label={item.location_name} value={index} key={index} />
                        );
                    })}

                </Picker>
                <View>
                    <Text style={{ color: 'lightgrey', fontSize: 17 }}>Choose Instrument</Text>
                </View>
                <Picker
                    selectedValue={this.state.instrument_name}
                    onValueChange={this.onValChange}
                    prompt="Search By Instrument"
                    style={styles.picker}
                    textStyle={styles.pickerText}
                    cancel
                >
                    {this.state.instruments.map((item, index) => {
                        return (
                            <Picker.Item label={item.instrument_name} value={index} key={index} />
                        );
                    })}

                </Picker>
                    <View style={{ flexDirection: 'row'}}>
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={(e) => this.handleSubmit(e)}
                >
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity >

                <TouchableOpacity style={styles.buttonContainer}
                    onPress={(e) => this.handleReset(e)}
                >
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity >
                </View>

            </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    picker: {
        alignSelf: 'center',
        backgroundColor: '#f2f2f2',
        margin: 20,
        borderRadius: 10,
        width: 250,
        height: 40
    },
    buttonContainer: {
        backgroundColor: '#15a3a3',
        borderColor: '#21ffff',
        borderWidth: 1,
        borderRadius: 40,
        height: 30,
        width: 120,
        margin: 5,
        alignSelf: 'center',
        borderBottomWidth: 0
    },
    buttonText: {
        color: '#f2f2f2',
        fontSize: 17,
        alignSelf: 'center',
        paddingTop: 3
    },
})