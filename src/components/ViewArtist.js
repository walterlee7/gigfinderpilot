import React, { Component } from 'react';
import { Image, ScrollView, View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, ImageBackground } from 'react-native';
import * as userService from '../services/user';
import * as profileService from '../services/profile';

export default class ViewArtist extends Component {
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
        this.getUserInfo();
    }

    async getUserInfo() {
        try {
            // const user = await userService.checkUser();
            // // console.log(user);
            // // console.log('this.state.user: ' + user);
            // // Alert.alert('userid', String(user));
            // if (user < 1) {
            //     return;
            // }

            // const userInfo = await profileService.one(this.props.navigation.state.params.array.id);
            // console.log('userInfo: ' + userInfo);
            // console.dir(userInfo);

            const userGenres = await profileService.getGenres(this.props.navigation.state.params.array.id);

            // console.log('UserGenres: ' + userGenres);
            // console.log(typeof userGenres);
            // console.dir(userGenres);
            let userG = Object.values(userGenres);
            // console.log('userG: ' + userG);
            const userInstruments = await profileService.getInstruments(this.props.navigation.state.params.array.id);
            // console.log('UserInstruments: ' + userInstruments);
            // console.dir(userInstruments);
            let userI = Object.values(userInstruments);
            // console.log('userI: ' + userI);
            this.setState({ userGenres, userG, userInstruments, userI });
        } catch (e) {
            console.log(e);
        }
    }

    msgArtist(e) {
        console.log('Message');

        userService.checkLogin()
            .then((loggedIn) => {
                // alert(loggedIn);
                if (loggedIn === false) {
                    this.props.navigation.navigate('LoginMessage');
                } else {
                    return this.props.navigation.navigate('ViewArtistMessenger', { userid: this.props.navigation.state.params.array.id });
                }

            });
    }

    render() {
        console.log('VIEW ARTIST: ' + this.props.navigation.state.params.array.name);
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    <TouchableHighlight style={styles.container}>
                        <ImageBackground style={styles.image}
                            source={{ uri: this.props.navigation.state.params.array.uri }}>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Text style={styles.paragraph}>
                                    <Text style={{ fontSize: 20 }}>
                                        {this.props.navigation.state.params.array.name}
                                    </Text>
                                    {"\n"}
                                    <Text style={{ fontSize: 12 }}>
                                        {this.props.navigation.state.params.array.location}
                                    </Text>
                                </Text>
                            </View>
                        </ImageBackground>
                    </TouchableHighlight>
                    <View style={styles.container}>
                        <Text>Name: {this.props.navigation.state.params.array.name} </Text>
                        <Text>Location: {this.props.navigation.state.params.array.location}</Text>
                        <Text style={styles.header}>About Me:</Text>
                        <Text style={{ color: 'white' }}> {this.props.navigation.state.params.array.aboutme}</Text>
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
                    <View>
                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={(e) => this.msgArtist(e)}>
                            <Text style={styles.buttonText}>Message Artist</Text>
                        </TouchableOpacity >

                    </View>

                </ScrollView>

            </View>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#605b4f',
        flex: 1,
        borderStyle: 'dotted',
        borderWidth: 2,
    },
    header: {
        fontSize: 10,
        color: 'white',
        fontWeight: 'bold'
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
    buttonText: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'center',
        paddingTop: 5,
    },
    buttonContainer: {
        backgroundColor: '#15a3a3',
        borderColor: '#21ffff',
        borderWidth: 1,
        borderRadius: 40,
        height: 30,
        width: 160,
        marginTop: 10,
        alignSelf: 'center',
        borderBottomWidth: 0,
        borderRightWidth: 0,

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