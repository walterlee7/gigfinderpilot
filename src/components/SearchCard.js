import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';

export default class SearchCard extends Component {

    render() {
        console.log(this.props.artist);
        return (
            <Card>
                <Text>Name: {this.props.artist.name}</Text>
                <Text>Location: {this.props.artist.artist_location}</Text>
                <Text>Instrument: {this.props.artist.artist_instrument}</Text>
            </Card>
        );
    }
}