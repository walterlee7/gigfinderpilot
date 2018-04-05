import React, { Component } from 'react';
import { KeyboardAvoidingView, TouchableOpacity, TextInput, ImageBackground, Image, View, Text, StyleSheet } from 'react-native';

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
                // alert(loggedIn);
            });
    }

    skip() {
        console.log('skip to search');
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
            <ImageBackground source={{ uri: 'https://static.tumblr.com/e31f3012fa7c249095a8dddbfc58f0c4/rgmmpty/K3Tmpmf2h/tumblr_static_brick_wall_night_texture_by_kaf94-d373s49.jpg' }} style={styles.container}>
                <View>
                    <Image resizeMode="contain" style={styles.logo} source={require('../../Images/gigfindersplash.png')} />
                </View>
                <View>
                    <TextInput style={styles.input}
                        autoCapitalize="none"
                        onChangeText={(text) => this.handleEmailChange(text)}
                        autoCorrect={false}
                        keyboardType='email-address'
                        returnKeyType="next"
                        placeholder='Email Address'
                        placeholderTextColor='darkgrey' />

                    <TextInput style={styles.input}
                        returnKeyType="go"
                        onChangeText={(text) => this.handlePasswordChange(text)}
                        placeholder='Password'
                        placeholderTextColor='darkgrey'
                        secureTextEntry />
                </View >
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={(e) => this.login(e)}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity >

                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => this.signup()}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity >
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 25 }}
                    onPress={() => this.skip()}>
                    <Text style={{ marginBottom: 20, paddingTop: 40, color: 'white', fontSize: 18, alignSelf: 'center' }}>SKIP TO SEARCH  </Text>
                    <Text style={{ alignSelf: 'center', paddingTop: 15, fontSize: 29, color: 'white' }} >❯</Text>
                </TouchableOpacity >

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        height: null,
        width: null

    },
    logo: {
        position: 'relative',
        width: 350,
        height: 350
    },
    buttonContainer: {
        backgroundColor: '#15a3a3',
        borderColor: '#21ffff',
        borderWidth: 1,
        borderRadius: 40,
        height: 30,
        width: 120,
        margin: 5,
        alignSelf: 'center',
        borderBottomWidth: 0
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        alignSelf: 'center',
        paddingTop: 3
    },
    input: {
        height: 40,
        width: 250,
        backgroundColor: '#f2f2f2',
        marginBottom: 5,
        padding: 5,
        fontSize: 15,
        color: 'black',
        position: 'relative',
        borderRadius: 5,
        borderColor: '#555555',
        borderWidth: 3,
        borderBottomWidth: 0,
        borderRightWidth: 0,
    }
});