import React, { Component } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
import LoginForm from './LoginForm';


export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }

    signup() {
        console.log('sign up here');
        return this.props.navigation.navigate('SignUp');
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <View style={styles.loginContainer}>
                    <Image resizeMode="contain" style={styles.logo} source={require('../../Images/gigfindersplash.png')} />
                </View>
                <LoginForm />
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => this.signup()}
                >
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity >

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
    buttonContainer: {
        backgroundColor: 'green',
        paddingVertical: 15,
        paddingHorizontal: 100,
        marginBottom: 15,

    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
});