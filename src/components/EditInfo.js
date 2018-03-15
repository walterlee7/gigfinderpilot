import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as userService from '../services/user';

export default class EditInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            email: '',
            password: '',
            feedbackMessage: '',
            checkingLogin: true,

        };
    }

    componentDidMount() {
        console.log(this.props.navigation.state.params.userid);

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

    render() {
        return (
            <View style={styles.container}>
                <Text>Edit Info</Text>
                <TextInput style={styles.input}
                    autoCapitalize="none"
                    onChangeText={(text) => this.handleInfoChange(text)}
                    autoCorrect={false}
                    keyboardType='email-address'
                    returnKeyType="next"
                    placeholder='Email Address'
                    placeholderTextColor='rgba(225,225,225,0.7)' />

                <TouchableOpacity style={styles.buttonContainer}
                    onPress={(e) => this.login(e)}
                >
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity >
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 40,
        width: 300,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer: {
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
});
