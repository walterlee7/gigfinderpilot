import React, { Component } from 'react';
import { KeyboardAvoidingView, Image, View, Text, StyleSheet } from 'react-native';
import LoginForm from '../LoginForm';


export default class Login extends Component {

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <View style={styles.loginContainer}>
                    <Image resizeMode="contain" style={styles.logo} source={require('../../../Images/gigfindersplash.png')} />
                </View>
                <LoginForm />
            </KeyboardAvoidingView>
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
    loginContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 400,
        height: 400
    },
});