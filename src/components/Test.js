import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';

import SelectMultiple from 'react-native-select-multiple';

import * as searchService from '../services/search';
import * as testService from '../services/test';

export default class Test extends Component {
    constructor(props) {
        super(props);

        this.state = {
            genres: [
                { label: '', value: '' },
            ],
            selectedGenres: [],
            chosenGenres: []
        };
    }

    componentDidMount() {
        this.getGenres();
        // console.log(this.state.chosenGenres);
    }

    getGenres() {
        searchService.allGenres()
            .then((results) => {
                results.sort(function (a, b) {
                    var textA = a.label.toUpperCase();
                    var textB = b.label.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
                this.setState({ genres: results });
            }).catch((err) => {
                console.log(err);
            });
    }

    onSelectionsChange = (selectedGenres) => {
        this.setState({ selectedGenres });
    }

    handleSubmit(e) {

        let sG = this.state.selectedGenres;
        let cG = this.state.chosenGenres;

        if (sG.length === 0) {
            Alert.alert('Choose a Genre');
        } else if (sG.length < 4) {

            for (i = 0; i < sG.length; i++) {
                console.log(sG[i]);
                this.state.chosenGenres.push(sG[i].label);
            }

            let a = Object.keys(cG);
            let b = Object.values(cG);
            console.log('key: ' + a);
            console.log('values: ' + b);
            console.log('cG number: ' + cG.length);
            let x = [];
            for (var i = 0; i < cG.length; i++) {
                console.log(cG[i].genre[i]);
                console.log(cG[i].key[i]);

                cG[i].genre[i] = cG[i].key[i];
                delete cG[i].key[i];
                x.push
            }

            console.log('key after: ' + a);
            console.log('values after: ' + b);

            this.state.chosenGenres = [];
            // testService.insert(this.state.chosenGenres)
            //     .then(() => {
            //         Alert.alert('Genres!!!!');
            //         this.props.navigation.navigate('Test');
            //     }).catch((err) => {
            //         console.log(err);
            //         alert("No Genres!!!!");
            //     })

        } else {
            Alert.alert('Please only choose up to 3 genres')
        }

    }

    render() {
        // console.log(this.state.genres);
        return (

            <View style={styles.container}>

                <View>
                    <Text>Registration Page 2 of 3</Text>
                </View>

                <SelectMultiple
                    items={this.state.genres}
                    selectedItems={this.state.selectedGenres}
                    onSelectionsChange={this.onSelectionsChange} />

                <TouchableOpacity style={styles.buttonContainer}
                    onPress={(e) => this.handleSubmit(e)}
                >
                    <Text style={styles.buttonText}>SUBMIT GENRES/NEXT PAGE</Text>
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