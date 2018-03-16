import React, { Component } from 'react';
import { KeyboardAvoidingView, Image, TextInput, View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import { sendContactEmail } from '../services/contact';

export default class About extends Component {
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
            <ImageBackground source={{ uri: 'https://static.tumblr.com/e31f3012fa7c249095a8dddbfc58f0c4/rgmmpty/K3Tmpmf2h/tumblr_static_brick_wall_night_texture_by_kaf94-d373s49.jpg' }} style={styles.container}>
                <View>
                    <TextInput style={styles.input}
                        autoCapitalize="none"
                        onChangeText={(text) => this.handleName(text)}
                        autoCorrect={false}
                        keyboardType='default'
                        returnKeyType="next"
                        placeholder='Name'
                        placeholderTextColor='darkgrey' />
                </View>
                <View>
                    <TextInput style={styles.input}
                        autoCapitalize="none"
                        onChangeText={(text) => this.handleEmail(text)}
                        autoCorrect={false}
                        keyboardType='email-address'
                        returnKeyType="next"
                        placeholder='Email Address'
                        placeholderTextColor='darkgrey' />
                </View>
                <View>
                    <TextInput style={styles.input}
                        returnKeyType="go"
                        onChangeText={(text) => this.handleMessage(text)}
                        placeholder='Message'
                        placeholderTextColor='darkgrey' />
                </View>
                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={(e) => this.handleSubmit(e)}>
                        <Text style={{ fontSize: 17, alignSelf: 'center', paddingTop: 3, color: 'white' }}>Contact Us</Text>
                    </TouchableOpacity >
                </View>
            </ImageBackground>
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
        backgroundColor: '#15a3a3',
        borderColor: '#21ffff',
        borderWidth: 1,
        borderRadius: 40,
        height: 30,
        width: 250,
        alignSelf: 'center',
        borderBottomWidth: 0
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