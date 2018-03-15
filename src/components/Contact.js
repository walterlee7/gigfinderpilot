import React, { Component } from 'react';
import { KeyboardAvoidingView, Image, TextInput, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { sendContactEmail } from '../services/contact';

export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: ''
        };
    }

    handleName(name) {
        this.setState({ name });
    }

    handleEmail(email) {
        this.setState({ email });
    }

    handleMessage(message) {
        this.setState({ message });
    }

    handleSubmit(e) {

        sendContactEmail(this.state.name, this.state.email, this.state.message)
            .then(() => {
                this.props.navigation.navigate('About');
            }).catch((err) => {
                console.log(err);
            })
    }
    render() {
        return (
            <View style={styles.container}>

                <View>
                    <TextInput style={styles.input}
                        autoCapitalize="none"
                        onChangeText={(text) => this.handleName(text)}
                        autoCorrect={false}
                        keyboardType='default'
                        returnKeyType="next"
                        placeholder='Name'
                        placeholderTextColor='rgba(225,225,225,0.7)' />
                </View>
                <View>
                    <TextInput style={styles.input}
                        autoCapitalize="none"
                        onChangeText={(text) => this.handleEmail(text)}
                        autoCorrect={false}
                        keyboardType='email-address'
                        returnKeyType="next"
                        placeholder='Email Address'
                        placeholderTextColor='rgba(225,225,225,0.7)' />
                </View>
                <View>
                    <TextInput style={styles.input}
                        returnKeyType="go"
                        onChangeText={(text) => this.handleMessage(text)}
                        placeholder='Your Message'
                        placeholderTextColor='rgba(225,225,225,0.7)' />
                </View>
                <View>
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={(e) => this.handleSubmit(e)}
                    >
                        <Text style={styles.buttonText}>CONTACT GIGFINDER</Text>
                    </TouchableOpacity >
                </View>
            </View>
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
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 20,
    },
    input: {
        height: 40,
        width: 300,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
});