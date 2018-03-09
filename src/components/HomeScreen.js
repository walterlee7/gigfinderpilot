import React, { Component } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, TextInput, Image, View, Text, StyleSheet } from 'react-native';
import Video from "react-native-video";

import VideoGround from '../../Videos/CIRCULAR_INTERFACE_HUD.mp4';

// import LoginForm from './LoginForm';
import * as userService from '../services/user';


export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            email: '',
            password: '',
            feedbackMessage: '',
            checkingLogin: true
        };
    }

    componentDidMount() {
        userService.checkLogin()
            .then((loggedIn) => {
                if (loggedIn) {
                    this.setState({ redirectToReferrer: true, checkingLogin: false });
                } else {
                    this.setState({ checkingLogin: false });
                }
            });
    }

    skip() {
        console.log('skip here');
        return this.props.navigation.navigate('Search');
    }

    signup() {
        console.log('sign up here');
        return this.props.navigation.navigate('SignUp');
    }

    login(e) {
        userService.login(this.state.email, this.state.password)
            .then(() => {
                console.log('logged in');
                this.props.navigation.navigate('UserProfile');
            }).catch((err) => {
                console.log(err);
                console.log('login error');
            });
    }

    handleEmailChange(value) {
        this.setState({ email: value });
    }

    handlePasswordChange(value) {
        this.setState({ password: value });
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                {/* <Video
                    repeat
                    source={VideoGround}
                    resizeMode="cover"
                    style={StyleSheet.absoluteFill}
                /> */}
                <View style={styles.loginContainer}>
                    <Image resizeMode="contain" style={styles.logo} source={require('../../Images/gigfindersplash.png')} />
                </View>
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => this.skip()}
                >
                    <Text style={styles.buttonText}>SKIP TO SEARCH</Text>
                </TouchableOpacity >

                {/* <LoginForm /> */}

                <View style={styles.logContainer}>
                    <TextInput style={styles.input}
                        autoCapitalize="none"
                        onChangeText={(text) => this.handleEmailChange(text)}
                        autoCorrect={false}
                        keyboardType='email-address'
                        returnKeyType="next"
                        placeholder='Email Address'
                        placeholderTextColor='rgba(225,225,225,0.7)' />

                    <TextInput style={styles.input}
                        returnKeyType="go"
                        onChangeText={(text) => this.handlePasswordChange(text)}
                        placeholder='Password'
                        placeholderTextColor='rgba(225,225,225,0.7)'
                        secureTextEntry />
                </View >
                <TouchableOpacity style={styles.buttonLogContainer}
                    onPress={(e) => this.login(e)}
                >
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity >

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
        // alignItems: 'center',
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
    },
    logContainer: {
        padding: 20,
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: 300,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonLogContainer: {
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
});