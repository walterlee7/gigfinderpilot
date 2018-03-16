import React, { Component } from 'react';
import { ImageBackground, View, Alert, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as signupService from '../services/signup';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            location: '',
            aboutme: '',
            password: '',
            confirmPassword: '',
            //uri: '',

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

    handleAboutMe(aboutme) {
        this.setState({ aboutme });
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
        const TextInputAboutMe = this.state.aboutme;
        const TextInputPassword = this.state.password;
        const TextInputConfirmPassword = this.state.confirmPassword;

        if (TextInputName == '' || TextInputEmail == '' || TextInputLocation == '' || TextInputAboutMe == '' || TextInputPassword == '' || TextInputConfirmPassword == '') {
            Alert.alert("Please Enter All the Values.");
        } else if (TextInputConfirmPassword !== TextInputPassword) {
            Alert.alert("Confirm Password does not match");
        } else {
            delete this.state.confirmPassword;
            console.log(this.state);
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
            <ImageBackground source={{ uri: 'https://static.tumblr.com/e31f3012fa7c249095a8dddbfc58f0c4/rgmmpty/K3Tmpmf2h/tumblr_static_brick_wall_night_texture_by_kaf94-d373s49.jpg' }} style={styles.container}>

                <View style={styles.container}>
                    <View>
                        <Text>Registration</Text>
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
                            placeholderTextColor='darkgrey' />

                        <TextInput style={styles.input}
                            autoCapitalize="none"
                            onChangeText={(text) => this.handleEmail(text)}
                            autoCorrect={false}
                            maxLength={30}
                            keyboardType='email-address'
                            returnKeyType="next"
                            placeholder='Email Address'
                            placeholderTextColor='darkgrey' />

                        <TextInput style={styles.input}
                            autoCapitalize="none"
                            onChangeText={(text) => this.handleLocation(text)}
                            autoCorrect={false}
                            maxLength={30}
                            keyboardType='default'
                            returnKeyType="next"
                            placeholder='Location'
                            placeholderTextColor='darkgrey' />

                        <TextInput style={styles.input}
                            returnKeyType="next"
                            onChangeText={(text) => this.handlePassword(text)}
                            placeholder='Password'
                            maxLength={30}
                            placeholderTextColor='darkgrey'
                            secureTextEntry />

                        <TextInput style={styles.input}
                            returnKeyType="go"
                            onChangeText={(text) => this.handleConfirmPassword(text)}
                            placeholder='Confirm Password'
                            maxLength={30}
                            placeholderTextColor='darkgrey'
                            secureTextEntry />

                        <TextInput style={styles.input}
                            autoCapitalize="none"
                            onChangeText={(text) => this.handleAboutMe(text)}
                            autoCorrect={false}
                            maxLength={250}
                            keyboardType='default'
                            returnKeyType="next"
                            placeholder='AboutMe'
                            multiline= {true}
                            height= {150}
                            placeholderTextColor='darkgrey' />

                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={(e) => this.handleSubmit(e)}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity >
                    </View>
                </View >
            </ImageBackground>
                );
            }
        }
        
const styles = StyleSheet.create({
                container: {
                alignItems: 'center',
                flex: 1,
                height: null,
                width: null,
                justifyContent: 'center'
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
                borderBottomWidth: 0,
                marginTop: 20
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
                marginBottom: 10,
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
        
        
    // const styles = StyleSheet.create({
    //     container: {
    //         padding: 20,
    //         backgroundColor: 'lightblue',
    //         flex: 1
    //     },
    //     form: {
    //         backgroundColor: 'green',
    //         margin: 10,
    //         marginTop: 100,
    //         marginBottom: 100,
    //         borderWidth: 1,
    //         borderColor: 'black'
    //     },
    //     input: {
    //         height: 40,
    //         width: 300,
    //         backgroundColor: 'rgba(225,225,225,0.2)',
    //         margin: 7,
    //         marginTop: 10,
    //         marginBottom: 10,
    //         padding: 10,
    //         color: '#fff'
    //     },
    //     buttonContainer: {
    //         backgroundColor: '#2980b6',
    //         paddingVertical: 15
    //     },
    //     buttonText: {
    //         color: '#fff',
    //         textAlign: 'center',
    //         fontWeight: '700'
    //     }
    // });