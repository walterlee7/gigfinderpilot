import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

export default class SearchCard extends Component {

    handleSubmit(e) {
        console.log('good: ' + this.props.artist.name);
        // this.props.navigation.navigate('ViewArtist');
    }

    componentDidMount() {
        this.props.navigation.goBack();
    }

    render() {
        console.log(this.props.navigation);
        return (

            <TouchableOpacity onPress={(e) => this.handleSubmit(e)}>
                <Card>
                    <Text>Name: {this.props.artist.name}</Text>
                    <Text>Location: {this.props.artist.artist_location}</Text>
                    <Text>Instrument: {this.props.artist.artist_instrument}</Text>
                </Card>
            </TouchableOpacity>
        );
    }
}