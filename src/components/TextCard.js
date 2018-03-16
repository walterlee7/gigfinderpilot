import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Messenger from './Messenger';

export default class TextCard extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>{this.props.artist}</Text>
                <Text style={styles.subtext}>{this.props.textPreview}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginTop: 20,
        backgroundColor: 'black',
        padding: 10,
        borderBottomColor: 'darkgrey',
        borderBottomWidth: 2,
        borderRadius: 8,
        borderRightColor: 'darkgrey',
        borderRightWidth: 2,
        opacity: 0.85,
    },
    titleText: {
        fontSize: 16,
        padding: 5,
        color: 'white',
        fontWeight: 'bold',
    },
    subtext: {
        fontSize: 14,
        padding: 5,
        marginTop: -10,
        color: 'white',
    },
});