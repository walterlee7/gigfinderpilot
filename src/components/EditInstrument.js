import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';

import SelectMultiple from 'react-native-select-multiple';

import * as searchService from '../services/search';
import * as test2Service from '../services/test2';

export default class Test2 extends Component {

    static navigationOptions = {

        title: 'Instruments'
    }

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
        let cI = {};
        let id = this.props.navigation.state.params.userid;

        if (sI.length == 0) {
            Alert.alert('Choose a Instrument');
        } else if (sI.length < 21) {

            for (let i = 0; i < sI.length; i++) {
                let instrument = 'instrument' + i;
                cI[instrument] = sI[i].label;
            }

            test2Service.updateInstruments(id, cI)
                .then(() => {
                    Alert.alert('Instruments Updated!!!!');
                    this.props.navigation.navigate('EditProfile');
                }).catch((err) => {
                    console.log(err);
                    alert("No Instruments Updated!!!");
                })

        } else {
            Alert.alert('Something went wrong')
        }

    }

    render() {
        // console.log(this.state.genres);
        return (

            <View style={styles.container}>

                <View>
                    <Text style={styles.text}>Please the instruments you can play</Text>
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
    },
    text: {
        textAlign: 'center',
        fontWeight: '700'
    }
})