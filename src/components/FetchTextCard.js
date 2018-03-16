import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default class FetchTextCard extends Component {
    render() {


        let userid = this.props.message.userid;
        let loggedInUserid = this.props.userid;
        let message = this.props.message.message;

        if (userid !== loggedInUserid) {
            return (
                <View style={styles.containerLeft}>
                    <Text style={styles.text}>{message}</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.containerRight}>
                    <Text style={styles.text}>{message}</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    text: {
        color: 'black',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 16
    },
    containerLeft: {
        borderRadius: 15,
        backgroundColor: 'lightgrey',
        marginRight: 'auto',
        marginLeft: 3,
        minHeight: 25,
        padding: 7,
        marginTop: 3,
        marginBottom: 3,
    },
    containerRight: {
        borderRadius: 15,
        backgroundColor: '#15a3a3',
        marginLeft: 'auto',
        marginRight: 3,
        minHeight: 25,
        alignItems: 'center',
        padding: 7,
        marginTop: 3,
        marginBottom: 3,

    }
});
