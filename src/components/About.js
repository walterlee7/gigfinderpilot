import React, { Component } from 'react';
import { KeyboardAvoidingView, Image, TextInput, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default class About extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    About GigFinder 2018
                </Text>
                <Text>
                    GigFinder is the principal mobile application for connecting bands and individual artists. Its primary function is to help users search for someone that matches their ideal requirements for a bandmate. More functions include: users can find a quick fix for a member who is unable to preform, users can connect with one another via a messenger, use…
                </Text>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});