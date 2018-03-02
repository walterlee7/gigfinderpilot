import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import SignUp from './components/SignUp';
import Login from './components/auth/Login';

const Nav = StackNavigator({
    Home: { screen: HomeScreen, navigationOptions: { header: null } },
    Login: { screen: Login },
    SignUp: { screen: SignUp },
}, {
        initialRouteName: 'Home'
    });

export default class App extends Component {
    render() {
        return (
            <Nav />
        );
    }
}

