import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';

import SelectMultiple from 'react-native-select-multiple';

import * as searchService from '../services/search';
import * as test2Service from '../services/test2';

export default class Test extends Component {
    constructor(props) {
        super(props);

        this.state = {
            instruments: [
                { label: '', value: '' },
            ],
            selectedInstruments: [],
            chosenInstruments: []
        };
    }

    componentDidMount() {
        this.getInstruments();
        console.log(this.state.instruments);
    }

    getInstruments() {
        searchService.getAllInstruments()
            .then((results) => {
                results.sort(function (a, b) {
                    var textA = a.label.toUpperCase();
                    var textB = b.label.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
                this.setState({ instruments: results });
            }).catch((err) => {
                console.log(err);
            });
    }

    onSelectionsChange = (selectedInstruments) => {
        this.setState({ selectedInstruments });
    }

    handleSubmit(e) {

        let sI = this.state.selectedInstruments;
        let cI = this.state.chosenInstruments;

        if (sI.length == 0) {
            Alert.alert('Choose a Instrument');
        } else if (sI.length < 4) {

            for (i = 0; i < sI.length; i++) {
                console.log(sI[i].label);
                this.state.chosenInstruments.push(sI[i].label);
            }

            test2Service.insert(this.state.chosenInstruments)
                .then(() => {
                    Alert.alert('Instruments!!!!');
                    this.props.navigation.navigate('Test2');
                }).catch((err) => {
                    console.log(err);
                    alert("No Instruments!!!");
                })

        } else {
            Alert.alert('Please only choose up to 3 instruments')
        }

    }

    render() {
        // console.log(this.state.genres);
        return (

            <View style={styles.container}>

                <View>
                    <Text>Please choose up to 3 of your favorite instruments</Text>
                </View>

                <SelectMultiple
                    items={this.state.instruments}
                    selectedItems={this.state.selectedInstruments}
                    onSelectionsChange={this.onSelectionsChange} />

                <TouchableOpacity style={styles.buttonContainer}
                    onPress={(e) => this.handleSubmit(e)}
                >
                    <Text style={styles.buttonText}>SUBMIT INSTRUMENTS</Text>
                </TouchableOpacity >

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
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