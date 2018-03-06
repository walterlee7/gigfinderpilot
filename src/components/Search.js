import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
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
                    Alert.alert('Location and Instrument Search Results');
                    this.props.navigation.navigate('SearchResult', { results });
                }).catch((err) => {
                    console.log(err);
                    alert("No Search Results!!!!");
                })

            // searchResultsService.getArtistLocation(selectedLocation)
            //     .then((results) => {
            //         console.log(results);
            //         let selectedInstrument = this.state.instruments[instrumentIndex].instrument_name;
            //         console.log('SI:' + selectedInstrument);
            //         searchResultsService.getArtistInstrument(selectedInstrument)
            //             .then((results) => {
            //                 console.log(results);
            //                 this.props.navigation.navigate('SearchResult', { results });
            //             })
            //     }).catch((err) => {
            //         console.log(err);
            //         alert("No Search Results!!!!");
            //     })
        } else if (locationIndex !== '') {

            let selectedLocation = this.state.locations[locationIndex].location_name;

            searchResultsService.getArtistLocation(selectedLocation)
                .then((results) => {
                    Alert.alert('Location Search Results');
                    this.props.navigation.navigate('SearchResult', { results });
                }).catch((err) => {
                    console.log(err);
                    alert("No Search Results!!!!");
                })
        } else if (instrumentIndex !== '') {

            let selectedInstrument = this.state.instruments[instrumentIndex].instrument_name;

            searchResultsService.getArtistInstrument(selectedInstrument)
                .then((results) => {
                    Alert.alert('Instrument Search');
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
        this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <View style={styles.container}>

                <Text>Choose Location</Text>

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

                <Text>Choose Instrument</Text>

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

                <TouchableOpacity style={styles.buttonContainer}
                    onPress={(e) => this.handleSubmit(e)}
                >
                    <Text style={styles.buttonText}>SEARCH</Text>
                </TouchableOpacity >

                <TouchableOpacity style={styles.buttonContainer}
                    onPress={(e) => this.handleReset(e)}
                >
                    <Text style={styles.buttonText}>RESET</Text>
                </TouchableOpacity >

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    picker: {
        alignSelf: 'stretch',
        backgroundColor: 'cadetblue',
        paddingHorizontal: 20,
        paddingVertical: 20,
        margin: 20,
        borderRadius: 10,

    },
    pickerText: {
        color: 'white',
    },
    buttonContainer: {
        backgroundColor: '#2980b6',
        paddingVertical: 15,
        paddingHorizontal: 100,
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
})