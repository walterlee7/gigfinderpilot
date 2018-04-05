import React, { Component } from 'react';
import { KeyboardAvoidingView, Image, TextInput, View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
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
            <ImageBackground source={{ uri: 'https://static.tumblr.com/e31f3012fa7c249095a8dddbfc58f0c4/rgmmpty/K3Tmpmf2h/tumblr_static_brick_wall_night_texture_by_kaf94-d373s49.jpg' }} style={styles.container}>
                <View>
                    <Image resizeMode="contain" style={styles.logo} source={require('../../Images/gigfindersplash.png')}
                    />
                </View>
            
                <View >
                    <View>
                        <TextInput style={styles.input}
                            autoCapitalize="none"
                            onChangeText={(text) => this.handleName(text)}
                            autoCorrect={false}
                            keyboardType='default'
                            returnKeyType="next"
                            placeholder='Name'
                            placeholderTextColor='#888888' />
                    </View>
                    <View>
                        <TextInput style={styles.input}
                            autoCapitalize="none"
                            onChangeText={(text) => this.handleEmail(text)}
                            autoCorrect={false}
                            keyboardType='email-address'
                            returnKeyType="next"
                            placeholder='Email Address'
                            placeholderTextColor='#888888' />
                    </View>
                    <View>
                        <TextInput style={styles.input}
                            returnKeyType="go"
                            onChangeText={(text) => this.handleMessage(text)}
                            placeholder='Your Message'
                            placeholderTextColor='#888888'
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
        height: 350,
        marginTop: -50
    },
    buttonContainer: {
        backgroundColor: '#15a3a3',
        borderColor: '#21ffff',
        borderWidth: 1,
        borderRadius: 40,
        height: 30,
        width: 120,
        margin: 5,
        marginTop: 15,
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
        width: 250,
        backgroundColor: '#f2f2f2',
        marginBottom: 5,
        padding: 5,
        fontSize: 15,
        color: 'black',
        borderRadius: 5,
        borderColor: '#555555',
        borderWidth: 3,
        borderBottomWidth: 0,
        borderRightWidth: 0,
    },
});