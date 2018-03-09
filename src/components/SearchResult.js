import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-elements';
import SearchCard from './SearchCard';

export default class SearchResult extends Component {


    handleSubmit(e) {
        this.props.navigation.navigate('ViewArtist');
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
                            <TouchableOpacity onPress={(e) => this.handleSubmit(e)} key={index}>
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