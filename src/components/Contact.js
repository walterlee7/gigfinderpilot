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

            <KeyboardAvoidingView behavior='padding' style={styles.container}>

                <View style={styles.loginContainer}>
                    <Image resizeMode="contain" style={styles.logo} source={require('../../Images/gigfindersplash.png')}
                    />
                </View>
                <View style={{ marginBottom: 65 }}>
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
                        <TextInput style={styles.inputMsg}
                            returnKeyType="go"
                            onChangeText={(text) => this.handleMessage(text)}
                            placeholder='Your Message'
                            placeholderTextColor='rgba(225,225,225,0.7)'
                            multiline={true}
                        />
                    </View>

                    <View>
                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={(e) => this.handleSubmit(e)}
                        >
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity >
                    </View>
                </View>

            </KeyboardAvoidingView>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333333',
    },
    logo: {
        position: 'absolute',
        width: 375,
        height: 375
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
        backgroundColor: '#15a3a3',
        borderColor: '#21ffff',
        borderWidth: 1,
        borderRadius: 40,
        height: 30,
        width: 120,
        margin: 5,
        alignSelf: 'center',
        borderBottomWidth: 0,
        borderRightWidth: 0
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        alignSelf: 'center',
        paddingTop: 3,
        textAlign: 'center',
    },
    input: {
        height: 40,
        width: 300,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    inputMsg: {
        height: 100,
        width: 300,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
});