import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';

import SelectMultiple from 'react-native-select-multiple';

import * as searchService from '../services/search';
import * as testService from '../services/test';

export default class EditGenre extends Component {

    static navigationOptions = {
        title: 'Genres'
    }

    constructor(props) {
        super(props);

        this.state = {
            genres: [
                { label: '', value: '' },
            ],
            selectedGenres: [],
            chosenGenres: [],

        };
    }

    componentDidMount() {
        this.getGenres();
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
        let cG = {};
        let id = this.props.navigation.state.params.userid;

        if (sG.length === 0) {
            Alert.alert('Choose a Genre');
        } else if (sG.length < 21) {

            for (let i = 0; i < sG.length; i++) {
                let genre = 'genre' + i;
                cG[genre] = sG[i].label;
            }

            testService.updateGenres(id, cG)
                .then(() => {
                    Alert.alert('Genres Updated!!!!');
                    this.props.navigation.navigate('EditProfile');
                }).catch((err) => {
                    console.log(err);
                    alert("No Genres Updated!!!!");
                })

        } else {
            Alert.alert('Something went wrong...')
        }

    }

    render() {
        // console.log(this.state.genres);
        return (

            <View style={styles.container}>

                <View>
                    <Text style={styles.text}>Please choose your applicable genres</Text>
                </View>

                <SelectMultiple
                    items={this.state.genres}
                    selectedItems={this.state.selectedGenres}
                    onSelectionsChange={this.onSelectionsChange} />

                <TouchableOpacity style={styles.buttonContainer}
                    onPress={(e) => this.handleSubmit(e)}
                >
                    <Text style={styles.buttonText}>SUBMIT GENRES</Text>
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