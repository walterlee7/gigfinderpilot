import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import SearchCard from './SearchCard';

export default class SearchResult extends Component {

    render() {
        console.log('Search Result');
        console.log(this.props.navigation);
        // console.log(this.props.navigation.state.params.results[0]);
        return (
            <ScrollView style={styles.container}>
                {this.props.navigation.state.params.results.map((artist, index) => {
                    return <SearchCard key={index} artist={artist} />
                })}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    }
});