import React, { Component } from 'react';
import { KeyboardAvoidingView, Image, TextInput, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default class Version extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>
                        GigFinder 2018
                </Text>
                </View>
                <View>
                    <Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});