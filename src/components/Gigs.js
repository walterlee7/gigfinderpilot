import React, { Component } from 'react';
import { KeyboardAvoidingView, Image, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import LoginForm from './LoginForm';


//change it

export default class Gigs extends Component {

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <View style={styles.loginContainer}>
                    <Image resizeMode="contain" style={styles.logo} source={require('../../Images/gigfindersplash.png')} />
                </View>
                <LoginForm />
                <View style={styles.loginContainer}>
                    <TouchableOpacity style={styles.forgot}
                        onPress={() => Alert.alert('Will Add in Next Patch...')}>
                        <Text>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>
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
    forgot: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 20,
    }
});