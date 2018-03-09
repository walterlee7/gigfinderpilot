import React, { Component } from 'react';
import { Image, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import ArtistCard from './artistCard';

export default class ViewArtist extends Component {
    constructor(props) {
        super(props);
    }

    msgArtist() {
        console.log('Message');
        // return this.props.navigation.navigate('MessageArtist');
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    {/* <View>
                        <ArtistCard />
                    </View> */}

                    <View>
                        <Text>Name </Text>
                        <Text>Location </Text>
                        <Text style={styles.header}>About Me:</Text>
                        <Text style={{ color: 'white' }}> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>

                        <Text>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={() => this.msgArtist()}>
                            <Text style={styles.buttonText}>Message Artist</Text>
                        </TouchableOpacity >

                    </View>

                </ScrollView>

            </View>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#605b4f'
    },
    header: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    input: {
        height: 40,
        width: 270,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff',
        position: 'relative',
        borderRadius: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'center',
        paddingTop: 5,
    },
    buttonContainer: {
        backgroundColor: '#15a3a3',
        borderColor: '#21ffff',
        borderWidth: 1,
        borderRadius: 40,
        height: 30,
        width: 160,
        marginTop: 10,
        alignSelf: 'center',
        borderBottomWidth: 0,
        borderRightWidth: 0,

    }
});