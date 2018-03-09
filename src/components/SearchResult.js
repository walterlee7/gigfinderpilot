import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-elements';
import SearchCard from './SearchCard';

export default class SearchResult extends Component {
    constructor(props) {
        super(props);

        this.state = {

            artists: [],

        };

    }

    handleSubmit(index) {
        console.log(this.props.navigation.state.params.results);
        // let arr = this.props.navigation.state.params.results;
        // this.setState({ artists: arr });
        // let x = Object.keys[e];
        // let y = Object.values[e];
        // console.log('event x: ' + x);
        // console.log('event y: ' + y);

        this.props.navigation.navigate('ViewArtist', { array: this.props.navigation.state.params.results[index] });
    }


    render() {

        return (
            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.searchText}>Number of Search Results: {this.props.navigation.state.params.results.length}</Text>
                </View>
                <View>
                    {this.props.navigation.state.params.results.map((artist, index) => {
                        return (
                            <TouchableOpacity onPress={() => this.handleSubmit(index)} key={index}
                            >
                                <Card>
                                    <Text>Name: {artist.name} </Text>
                                    <Text>Location: {artist.artist_location}</Text>
                                    <Text>Instrument: {artist.artist_instrument}</Text>
                                </Card>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    searchText: {
        textAlign: 'center',
        borderRadius: 50,
        backgroundColor: 'lightgrey',
        fontWeight: 'bold'
    }
});