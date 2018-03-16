import React, { Component } from 'react';
import { Image, ScrollView, View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, ImageBackground, Alert } from 'react-native';

import * as profileService from '../services/profile';
import * as userService from '../services/user';

export default class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedOut: false,
            user: 0,
            userInfo: [],
            userGenres: [],
            userInstruments: [],
            userG: [],
            userI: [],
        };
    }

    componentDidMount() {
        this.getUserId();
    }

    async getUserId() {
        try {
            const user = await userService.checkUser();
            console.log(user);
            console.log('this.state.user: ' + user);
            // Alert.alert('userid', String(user));
            if (user < 1) {
                console.log('user not found');
                return;
            }

            const userInfo = await profileService.one(user);
            console.log('userInfo');
            console.log(JSON.stringify(userInfo, null, 2));
            // console.dir(userInfo);


            this.setState({ user, userInfo });

            const userGenres = await profileService.getGenres(user);

            console.log('UserGenres: ' + userGenres);
            console.log(typeof userGenres);
            // console.dir(userGenres);
            let userG = Object.values(userGenres);
            console.log('userG: ' + userG);
            const userInstruments = await profileService.getInstruments(user);
            console.log('UserInstruments: ' + userInstruments);
            // console.dir(userInstruments);
            let userI = Object.values(userInstruments);
            console.log('userI: ' + userI);
            this.setState({ userGenres, userG, userInstruments, userI });
        } catch (e) {
            console.log(e);
        }
    }

    editProfile() {
        console.log('edit profile');
        return this.props.navigation.navigate('EditProfile');
    }

    inbox() {
        console.log('user inbox');
        return this.props.navigation.navigate('MessengerInbox');
    }

    handleSubmit(e) {
        userService.logout();
        return this.props.navigation.navigate('HomeScreen');
    }

    render() {
        // console.log('userGenres: ' + this.state.userGenres);
        // console.dir(this.state.userGenres);
        // console.log('userInstruments: ' + this.state.userInstruments);
        // console.dir(this.state.userInstruments);
        return (
            <ImageBackground source={{ uri: 'https://static.tumblr.com/e31f3012fa7c249095a8dddbfc58f0c4/rgmmpty/K3Tmpmf2h/tumblr_static_brick_wall_night_texture_by_kaf94-d373s49.jpg' }} style={styles.container}>
                <ScrollView>
                    <View>
                        <TouchableHighlight style={styles.container}>
                            <ImageBackground style={styles.image}
                                source={{ uri: this.state.userInfo.uri }}>
                                <View style={{ flexDirection: 'row', flex: 1, padding: 15 }}>
                                    <Text style={styles.paragraph}>
                                        <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>
                                            {this.state.userInfo.name}
                                        </Text>
                                        {"\n"}
                                        <Text style={{ fontSize: 17, color: 'white', fontWeight: 'bold' }}>
                                            {this.state.userInfo.location}
                                        </Text>
                                    </Text>
                                </View>
                            </ImageBackground>
                        </TouchableHighlight>
                    </View>
                    <View style={{ flex: 1 }}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.text}>About Me</Text>

                        <Text style={styles.text2}>Location: {this.state.userInfo.location} </Text>

                        <Text style={styles.text2}>{this.state.userInfo.aboutme}</Text>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.text}>Genres</Text>
                        {this.state.userG.map((genre, index) => {
                            return (
                                <View key={index}>
                                    <Text style={styles.text2} >
                                        {genre}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.text}>Instruments</Text>
                        {this.state.userI.map((instrument, index) => {
                            return (
                                <View key={index}>
                                    <Text style={styles.text2}>
                                        {instrument}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                    </View>

                    <View style={styles.btncontainer}>
                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={() => this.editProfile()}>
                            <Text style={styles.buttonText}>Edit Profile</Text>
                        </TouchableOpacity >
                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={() => this.inbox()}>
                            <Text style={styles.buttonText}>Inbox</Text>
                        </TouchableOpacity >
                    </View>
                    <TouchableOpacity style={styles.buttContainer}
                        onPress={(e) => this.handleSubmit(e)}
                    >
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity >
                </ScrollView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: null,
        width: null
    },
    btncontainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    buttonText: {
        flexDirection: 'column',
        flex: 2,
        color: 'white',
        fontSize: 17,
        alignSelf: 'center',
        paddingTop: 4,
        position: 'relative',
    },
    buttonContainer: {
        backgroundColor: '#15a3a3',
        borderColor: '#21ffff',
        borderWidth: 1,
        borderRadius: 40,
        height: 30,
        width: 100,
        margin: 5,
        borderBottomWidth: 0
    },
    image: {
        flexDirection: 'row',
        height: 300,
        width: '100%',
        borderRadius: 10
    },
    paragraph: {
        alignSelf: 'flex-end',
        margin: 5
    },
    paragraph2: {
        color: 'blue'
    },
    buttContainer: {
        backgroundColor: '#15a3a3',
        borderColor: '#21ffff',
        borderWidth: 1,
        borderRadius: 40,
        height: 30,
        width: 210,
        alignSelf: 'center',
        borderBottomWidth: 0,
        marginTop: 10,
        marginBottom: 40
    },
    infoContainer: {
        padding: 20,
        marginTop: 20,
        backgroundColor: '#111111',
        opacity: 0.9
    },
    
    text: {
        fontSize: 22,
        color: 'lightgrey',
        fontWeight: 'bold',
    },
    
    text2: {
        fontSize: 15,
        color: 'white'
    }
});

