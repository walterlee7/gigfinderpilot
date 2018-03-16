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
            // console.log(user);
            // console.log('this.state.user: ' + user);
            // Alert.alert('userid', String(user));
            if (user < 1) {
                return;
            }


            const userInfo = await profileService.one(user);
            // console.log('userInfo: ' + userInfo);
            // console.dir(userInfo);

            const userGenres = await profileService.getGenres(user);

            // console.log('UserGenres: ' + userGenres);
            // console.log(typeof userGenres);
            // console.dir(userGenres);
            let userG = Object.values(userGenres);
            // console.log('userG: ' + userG);
            const userInstruments = await profileService.getInstruments(user);
            // console.log('UserInstruments: ' + userInstruments);
            // console.dir(userInstruments);
            let userI = Object.values(userInstruments);
            // console.log('userI: ' + userI);
            this.setState({ user, userInfo, userGenres, userG, userInstruments, userI });
        } catch (e) {
            console.log(e);
        }
    }



    // getUserId() {
    //     userService.checkUser()
    //         .then((user) => {
    //             console.log(user);
    //             this.setState({ user });
    //             console.log('this.state.user: ' + user);
    //             profileService.one(user)
    //                 .then((userInfo) => {
    //                     this.setState({ userInfo });
    //                     console.log('userInfo: ' + userInfo);
    //                     console.dir(userInfo);
    //                     profileService.getGenres(user)
    //                         .then((userGenres) => {
    //                             this.setState({ userGenres });
    //                             console.log('UserGenres: ' + userGenres);
    //                             console.log(typeof userGenres);
    //                             console.dir(userGenres);
    //                             let uG = Object.values(userGenres);
    //                             this.setState({ userG: uG });
    //                             console.log('userG: ' + uG);
    //                             profileService.getInstruments(user)
    //                                 .then((userInstruments) => {
    //                                     this.setState({ userInstruments });
    //                                     console.log('UserInstruments: ' + userInstruments);
    //                                     console.dir(userInstruments);
    //                                     let uI = Object.values(userInstruments);
    //                                     this.setState({ userI: uI });
    //                                     console.log('userI: ' + uI);
    //                                 }).catch(err => {
    //                                     console.log('UserInstruments error');
    //                                     console.log(err);
    //                                 });
    //                         }).catch(err => {
    //                             console.log('UserGenres error');
    //                             console.log(err);
    //                         });
    //                 }).catch(err => {
    //                     console.log('getUserInfo error');
    //                     console.log(err);
    //                 });
    //         }).catch(err => {
    //             console.log('getUserId error');
    //             console.log(err);
    //         });
    // }

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
            <ScrollView>
                <TouchableOpacity style={styles.buttContainer}
                    onPress={(e) => this.handleSubmit(e)}
                >
                    <Text style={styles.buttonText}>LOGOUT</Text>
                </TouchableOpacity >

                <View style={styles.infoContainer}>
                    <TouchableHighlight style={styles.container}>
                        <ImageBackground style={styles.image}
                            source={{ uri: this.state.userInfo.uri }}>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Text style={styles.paragraph}>
                                    <Text style={{ fontSize: 20 }}>
                                        {this.state.userInfo.name}
                                    </Text>
                                    {"\n"}
                                    <Text style={{ fontSize: 12 }}>
                                        {this.state.userInfo.location}
                                    </Text>
                                </Text>
                            </View>
                        </ImageBackground>
                    </TouchableHighlight>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.header}>About Me</Text>
                    <Text>Name: {this.state.userInfo.name} </Text>
                    <Text>Location: {this.state.userInfo.location} </Text>
                    <Text style={styles.body}>{this.state.userInfo.aboutme}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text>Genres</Text>
                    {this.state.userG.map((genre, index) => {
                        return (
                            <View key={index}>
                                <Text>
                                    {genre}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                <View style={styles.infoContainer}>
                    <Text>Instruments</Text>
                    {this.state.userI.map((instrument, index) => {
                        return (
                            <View key={index}>
                                <Text>
                                    {instrument}
                                </Text>
                            </View>
                        );
                    })}
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
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        position: 'relative',
        borderRadius: 10,
        marginBottom: 10,
        flex: 1,
        alignItems: 'stretch'
    },
    input: {
        height: 40,
        width: 270,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff',
        position: 'relative',
        borderRadius: 10
    },
    btncontainer: {
        flexDirection: 'column',
    },
    buttonText: {
        flexDirection: 'column',
        // width: '50%',

        flex: 2,
        color: 'black',
        fontSize: 18,
        alignSelf: 'center',
        paddingTop: 9,
        position: 'relative',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#21ffff",
        borderRadius: 40,
        height: 40,
        width: 270,
        margin: 5
    },
    image: {
        flexDirection: 'row',
        alignContent: 'flex-end',
        height: 300,
        width: '100%'
    },
    paragraph: {
        alignSelf: 'flex-end',
        margin: 5
    },
    paragraph2: {
        color: 'blue'
    },
    buttContainer: {
        backgroundColor: '#2980b6',
        padding: 10,
        margin: 10,
        height: 70,
        borderRadius: 20,
    },
    infoContainer: {
        paddingLeft: 5,
        paddingRight: 5,
        borderColor: 'black',
        borderStyle: 'dashed',
        borderWidth: 5,
        margin: 5,
        flex: 1,
    }
});