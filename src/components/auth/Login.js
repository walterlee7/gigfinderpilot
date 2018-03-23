import React, { Component } from 'react';
import { KeyboardAvoidingView, Image, View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import LoginForm from '../LoginForm';


export default class Login extends Component {

    render() {
        return (
            <ImageBackground source={{ uri: 'https://static.tumblr.com/e31f3012fa7c249095a8dddbfc58f0c4/rgmmpty/K3Tmpmf2h/tumblr_static_brick_wall_night_texture_by_kaf94-d373s49.jpg' }} style={styles.container}>
                <KeyboardAvoidingView behavior='padding'>
                    <View style={styles.loginContainer}>
                        <Image resizeMode="contain" style={styles.logo} source={require('../../../Images/gigfindersplash.png')} />
                    </View>
                    <View style={{ marginTop: 20, alignSelf: 'center' }}>
                        <LoginForm />
                    </View>
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
    }
});