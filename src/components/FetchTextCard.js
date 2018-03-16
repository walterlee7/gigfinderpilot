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
        color: 'white',
        paddingRight: 5,
        paddingLeft: 5
    },
    containerLeft: {
        borderRadius: 15,
        backgroundColor: 'rgb(30,144,255)',
        marginRight: 'auto',
        marginLeft: 3,
        minHeight: 25,
        padding: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    containerRight: {
        borderRadius: 15,
        backgroundColor: 'rgb(169,169,169)',
        marginLeft: 'auto',
        marginRight: 3,
        minHeight: 25,
        alignItems: 'center',
        padding: 3,
        marginTop: 3,
        marginBottom: 3,

    }
});
