import React, { Component } from 'react';
import { KeyboardAvoidingView, TextInput, Image, View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import * as userService from '../../services/user';

export default class LoginMessage extends Component {
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
                this.props.navigation.navigate('ViewArtistMessenger', { userid: this.props.navigation.state.params.userid });
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
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <View style={styles.loginContainer}>
                        <Image resizeMode="contain" style={styles.logo} source={require('../../../Images/gigfindersplash.png')} />
                    </View>
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

                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={(e) => this.login(e)}
                        >
                            <Text style={styles.buttonText}>LOGIN</Text>
                        </TouchableOpacity >
                    </View >
                    <View style={styles.loginContainer}>
                        <TouchableOpacity style={styles.forgot}
                            onPress={() => Alert.alert('Will Add in Next Patch...')}>
                            <Text style={{ fontSize: 17, color: 'white' }}>
                                Forgot Password?
                        </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingRight: 'auto'
    },
    logo: {
        position: 'relative',
        width: 350,
        height: 350
    },
    forgot: {
        height: 30,
        width: 'auto',
        borderBottomWidth: 0,
        paddingTop: 3,
        alignItems: 'center',
        marginTop: 60
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