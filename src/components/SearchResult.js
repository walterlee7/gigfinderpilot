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

        return (
            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.searchText}>Number of Search Results: {this.props.navigation.state.params.results.length}</Text>
                </View>
                <View>
                    {this.props.navigation.state.params.results.map((artist, index) => {
                        return (
                            <TouchableOpacity style={styles.container} onPress={() => this.handleSubmit(index)} key={index}>
                                <ImageBackground style={styles.image}
                                    source={require('/Users/victoranaya/Desktop/walterpilot/gigfinderpilot/Images/gigfindersplash.png')}>
                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                        <Text style={styles.paragraph}>
                                            <Text style={{ fontSize: 20 }}>
                                                Name: {artist.name}
                                            </Text>
                                            {"\n"}
                                            <Text style={{ fontSize: 12 }}>
                                                Location: {artist.location}
                                            </Text>
                                            {/* {"\n"}
                                            <Text style={{ fontSize: 12 }}>
                                                Instrument: {artist.artist_instrument}
                                            </Text> */}
                                        </Text>
                                    </View>
                                </ImageBackground>
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
        paddingLeft: 2,
        paddingRight: 2,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 2,
        margin: 2,
    },
    searchText: {
        textAlign: 'center',
        borderRadius: 50,
        backgroundColor: 'lightgrey',
        fontWeight: 'bold'
    },
    image: {
        flexDirection: 'row',
        alignContent: 'flex-end',
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