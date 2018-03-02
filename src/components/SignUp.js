import React, { Component } from 'react';
import { View, Alert, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as signupService from '../services/signup';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            // isLong: false,
        };
    }

    handleName(name) {
        this.setState({ name });
    }

    handleEmail(email) {
        this.setState({ email });

    }

    handlePassword(password) {
        let isLong = password.length > 5;
        this.setState({ password, isLong });
    }

    handleSubmit(e) {
        const TextInputName = this.state.name;
        const TextInputEmail = this.state.email;
        const TextInputPassword = this.state.password;

        if (TextInputName == '' || TextInputEmail == '' || TextInputPassword == '') {
            Alert.alert("Please Enter All the Values.");
        }
        else {
            signupService.insert(this.state)
                .then(() => {
                    Alert.alert('Registered!!!!');
                    this.props.navigation.navigate('Home');
                }).catch((err) => {
                    console.log(err);
                    alert("Not Registered!!!!");
                })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                    autoCapitalize="none"
                    onChangeText={(text) => this.handleName(text)}
                    autoCorrect={false}
                    keyboardType='default'
                    returnKeyType="next"
                    placeholder='Full Name'
                    placeholderTextColor='rgba(225,225,225,0.7)' />

                <TextInput style={styles.input}
                    autoCapitalize="none"
                    onChangeText={(text) => this.handleEmail(text)}
                    autoCorrect={false}
                    keyboardType='email-address'
                    returnKeyType="next"
                    placeholder='Email Address'
                    placeholderTextColor='rgba(225,225,225,0.7)' />

                <TextInput style={styles.input}
                    returnKeyType="go"
                    onChangeText={(text) => this.handlePassword(text)}
                    placeholder='Password'
                    placeholderTextColor='rgba(225,225,225,0.7)'
                    secureTextEntry />

                <TouchableOpacity style={styles.buttonContainer}
                    onPress={(e) => this.handleSubmit(e)}
                >
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity >
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'green',
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
