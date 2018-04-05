import React, { Component } from 'react';
import { KeyboardAvoidingView, Image, TextInput, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Video from "react-native-video";
import VideoGround from '../../Videos/CIRCULAR_INTERFACE_HUD.mp4';

export default class Version extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>
                <Video
                    repeat
                    source={VideoGround}
                    resizeMode="cover"
                    style={StyleSheet.absoluteFill}
                />
                <View style={{ padding: 5, alignItems: 'center', backgroundColor: 'black', opacity: 0.7 }}>
                    <Text style={styles.text}>
                        GigFinder 2018
                    </Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white'}}>
                        Version 1.0
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center'
    },

    text: {
        fontWeight: 'bold',
        fontSize: 27,
        color: 'white'
    }
});