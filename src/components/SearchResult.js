import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Container, Header, Content, Card, Text } from 'native-base';

import SearchCard from './SearchCard';

export default class SearchResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            artists: [],
        };
    }

    handleSubmit(index) {
        this.props.navigation.navigate('ViewArtist', { array: this.props.navigation.state.params.results[index] });
    }


    render() {
        console.log(this.props.navigation.state.params.results);
        return (
            <ImageBackground source={{ uri: 'https://static.tumblr.com/e31f3012fa7c249095a8dddbfc58f0c4/rgmmpty/K3Tmpmf2h/tumblr_static_brick_wall_night_texture_by_kaf94-d373s49.jpg' }} style={styles.container}>

                <ScrollView>


                        <Text style={styles.searchText}>Number of Search Results: {this.props.navigation.state.params.results.length}</Text>
                    <View>
                        {this.props.navigation.state.params.results.map((artist, index) => {
                            return (
                                <TouchableOpacity style={styles.container} onPress={() => this.handleSubmit(index)} key={index}>
                                    <ImageBackground style={styles.image}
                                        source={{ uri: artist.uri }}>
                                        <View style={{ flexDirection: 'row', flex: 1 }}>
                                            <Text style={styles.paragraph}>
                                                <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>
                                                    Name: {artist.name}
                                                </Text>
                                                {"\n"}
                                                <Text style={{ fontSize: 17, color: 'white', fontWeight: 'bold' }}>
                                                    Location: {artist.location}
                                                </Text>
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView >
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchText: {
        textAlign: 'center',
        borderRadius: 50,
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white',
        margin: 18,
    },
    image: {
        height: 300,
        width: '100%'
    },
    paragraph: {
        alignSelf: 'flex-end',
        margin: 2
    },
    paragraph2: {
        color: 'blue'
    }
});