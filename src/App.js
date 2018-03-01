import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Login from './components/auth/Login';

export default class App extends Component {
    render() {
        return (
            // <View style={styles.container}>

            // </View>

            <Login />
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
// });
