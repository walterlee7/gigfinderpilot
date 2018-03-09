import React, { Component } from 'react';
import { View, Alert, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as signupService from '../services/signup';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            location: '',
            password: '',
            confirmPassword: '',

        };
    }

    handleName(name) {
        this.setState({ name });
    }

    handleEmail(email) {
        this.setState({ email });

    }

    handleLocation(location) {
        this.setState({ location });
    }

    handlePassword(password) {
        this.setState({ password });
    }

    handleConfirmPassword(confirmPassword) {
        this.setState({ confirmPassword });
    }

    handleSubmit(e) {
        const TextInputName = this.state.name;
        const TextInputEmail = this.state.email;
        const TextInputLocation = this.state.location;
        const TextInputPassword = this.state.password;
        const TextInputConfirmPassword = this.state.confirmPassword;

        if (TextInputName == '' || TextInputEmail == '' || TextInputLocation == '' || TextInputPassword == '' || TextInputConfirmPassword == '') {
            Alert.alert("Please Enter All the Values.");
        } else if (TextInputConfirmPassword !== TextInputPassword) {
            Alert.alert("Confirm Password does not match");
        } else {
            delete this.state.confirmPassword;
            console.log(this.state);
            // signupService.insert(this.state)
            //     .then(() => {
            //         Alert.alert('Registered!!!!');
            //         this.props.navigation.navigate('Home');
            //     }).catch((err) => {
            //         console.log(err);
            //         alert("Not Registered!!!!");
            //     })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>Registration Page 1 of 3</Text>
                </View>


                <View style={styles.form}>

                    <TextInput style={styles.input}
                        autoCapitalize="none"
                        onChangeText={(text) => this.handleName(text)}
                        autoCorrect={false}
                        maxLength={30}
                        keyboardType='default'
                        returnKeyType="next"
                        placeholder='Full Name'
                        placeholderTextColor='rgba(225,225,225,0.7)' />

                    <TextInput style={styles.input}
                        autoCapitalize="none"
                        onChangeText={(text) => this.handleEmail(text)}
                        autoCorrect={false}
                        maxLength={30}
                        keyboardType='email-address'
                        returnKeyType="next"
                        placeholder='Email Address'
                        placeholderTextColor='rgba(225,225,225,0.7)' />

                    <TextInput style={styles.input}
                        autoCapitalize="none"
                        onChangeText={(text) => this.handleLocation(text)}
                        autoCorrect={false}
                        maxLength={30}
                        keyboardType='default'
                        returnKeyType="next"
                        placeholder='Location'
                        placeholderTextColor='rgba(225,225,225,0.7)' />

                    <TextInput style={styles.input}
                        returnKeyType="next"
                        onChangeText={(text) => this.handlePassword(text)}
                        placeholder='Password'
                        maxLength={30}
                        placeholderTextColor='rgba(225,225,225,0.7)'
                        secureTextEntry />

                    <TextInput style={styles.input}
                        returnKeyType="go"
                        onChangeText={(text) => this.handleConfirmPassword(text)}
                        placeholder='Confirm Password'
                        maxLength={30}
                        placeholderTextColor='rgba(225,225,225,0.7)'
                        secureTextEntry />

                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={(e) => this.handleSubmit(e)}
                    >
                        <Text style={styles.buttonText}>SIGN UP/NEXT PAGE</Text>
                    </TouchableOpacity >
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'lightblue',
        flex: 1
    },
    form: {
        backgroundColor: 'green',
        margin: 10,
        marginTop: 100,
        marginBottom: 100,
        borderWidth: 1,
        borderColor: 'black'
    },
    input: {
        height: 40,
        width: 300,
        backgroundColor: 'rgba(225,225,225,0.2)',
        margin: 7,
        marginTop: 10,
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
