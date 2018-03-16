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
            <ImageBackground source={{ uri: 'https://static.tumblr.com/e31f3012fa7c249095a8dddbfc58f0c4/rgmmpty/K3Tmpmf2h/tumblr_static_brick_wall_night_texture_by_kaf94-d373s49.jpg' }} style={styles.container}>
            <ScrollView>
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
                    <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'white'}}>About Me</Text>
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
        padding: 10,
        position: 'relative',
        borderRadius: 10,
        marginBottom: 10,
        flex: 1,
        alignItems: 'stretch'
    },
    btncontainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    buttonText: {
        flexDirection: 'column',
        // width: '50%',
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
        backgroundColor: '#15a3a3',
        borderColor: '#21ffff',
        borderWidth: 1,
        borderRadius: 40,
        height: 30,
        width: 210,
        alignSelf: 'center',
        borderBottomWidth: 0,
        marginTop: 10
    },
    infoContainer: {
        padding: 7,
        marginTop: 3,
        flex: 1,
        backgroundColor: '#fafafa',
        borderRadius: 5
    },
});