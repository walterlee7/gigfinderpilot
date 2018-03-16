import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as userService from '../services/user';

export default class LoginForm extends Component {
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

    login(e) {
        userService.login(this.state.email, this.state.password)
            .then(() => {
                console.log('logged in');
                console.log('req.user: ' + req.user);
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
            <View>
            <View style={styles.container}>
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
            </View>
            <View>
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={(e) => this.login(e)}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity >
            </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        position: 'relative',
        borderRadius: 10,
  
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
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        alignSelf: 'center',
        paddingTop: 3,
    },
    buttonContainer: {
        backgroundColor: '#15a3a3',
        borderColor: '#21ffff',
        borderWidth: 1,
        borderRadius: 40,
        height: 30,
        width: 250,
        alignSelf: 'center',
        borderBottomWidth: 0
    },

});
