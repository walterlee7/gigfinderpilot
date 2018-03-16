import React, { Component } from 'react';
import { ScrollView, Image, StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { Button, Container } from 'native-base';


export default class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Name: '',
        };
    }

    contactUs() {
        return this.props.navigation.navigate('Contact');
    }

    render() {
        return (
            <ScrollView style={{ backgroundColor: '#333333' }}>
                {/* <Image>
                source={require('../images/Arvi.jpg')}>
                </Image> */}
                <View style={{ backgroundColor: '#333333' }}>
                    <View style={styles.container}>

                        <Text style={styles.header}>About GigFinder</Text>

                        <Text style={styles.paragraph}>
                            GigFinder is a mobile application for connecting bands and individual artists. Its primary function is to help users search for an artist that matches their ideal requirements for a bandmate. Use GigFinder to find a quick replacement for a bandmate who is unable to perform! Users can connect with one another via an instant messenger, manage their profile, search out various artists by Location, Instrument, and Genre.
                    </Text>
                        <Text style={styles.header}>GigFinder Devs</Text>
                        <Text style={styles.paragraph}>Dylan Commean</Text>
                        <Text style={styles.paragraph}>Walter Lee</Text>
                        <Text style={styles.paragraph}>Victor Anaya</Text>
                        <Text style={styles.paragraph}>Chelsee Arnold</Text>

                        <View style={styles.btncontainer}>
                            <TouchableOpacity style={styles.buttonContainer}
                                onPress={() => this.contactUs()}>
                                <Text style={styles.buttonText}>Contact Us</Text>
                            </TouchableOpacity >
                        </View>
                    </View>
                </View>

            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        position: 'relative',
        borderRadius: 10,
        marginBottom: 5,
        backgroundColor: '#333333'
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 15,
        marginTop: 10,
    },
    paragraph: {
        color: 'white',
        fontSize: 16,
        padding: 10,
    },
    btncontainer: {
        flexDirection: 'column',
    },
    input: {
        height: 40,
        width: 250,
        backgroundColor: '#46484c',
        marginBottom: 5,
        padding: 5,
        fontSize: 15,
        color: 'cyan',
        position: 'relative',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 2,
        borderBottomWidth: 0,
        borderRightWidth: 0,
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        alignSelf: 'center',
        paddingTop: 3,
        textAlign: 'center',
    },
    buttonContainer: {
        backgroundColor: '#15a3a3',
        borderColor: '#21ffff',
        borderWidth: 1,
        borderRadius: 40,
        height: 30,
        width: 120,
        margin: 5,
        alignSelf: 'center',
        borderBottomWidth: 0,
        borderRightWidth: 0
    },
})
