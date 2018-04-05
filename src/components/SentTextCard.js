import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default class SentTextCard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text} >{this.props.fetchMessages.message}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        color: 'black',
        fontSize: 14,
    },
    container: {
        borderRadius: 15,
        borderBottomColor: 'darkgrey',
        borderBottomWidth: 2,
        borderRadius: 8,
        borderRightColor: 'darkgrey',
        backgroundColor: 'grey',
        marginLeft: 150,
        marginRight: 3,
        minHeight: 25,
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 7,
        marginTop: 3,
        marginBottom: 3
    }
});

