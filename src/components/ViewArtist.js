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

            const userGenres = await profileService.getGenres(this.props.navigation.state.params.array.id);

            let userG = Object.values(userGenres);

            const userInstruments = await profileService.getInstruments(this.props.navigation.state.params.array.id);

            let userI = Object.values(userInstruments);

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
                    this.props.navigation.navigate('LoginMessage', { userid: this.props.navigation.state.params.array.id });
                } else {
                    return this.props.navigation.navigate('ViewArtistMessenger', { userid: this.props.navigation.state.params.array.id });
                }

            });
    }

    render() {
        console.log('VIEW ARTIST: ' + this.props.navigation.state.params.array.name);
        return (
            <ImageBackground source={{ uri: 'https://static.tumblr.com/e31f3012fa7c249095a8dddbfc58f0c4/rgmmpty/K3Tmpmf2h/tumblr_static_brick_wall_night_texture_by_kaf94-d373s49.jpg' }} style={styles.container}>
                <View>
                    <ScrollView>
                        <TouchableHighlight>
                            <ImageBackground style={styles.image}
                                source={{ uri: this.props.navigation.state.params.array.uri }}>
                                <View style={{ flexDirection: 'row', flex: 1, padding: 10 }}>
                                    <Text style={styles.paragraph}>
                                        <Text style={styles.text}>
                                            {this.props.navigation.state.params.array.name}
                                        </Text>
                                        {"\n"}
                                        <Text style={styles.text2}>
                                            {this.props.navigation.state.params.array.location}
                                        </Text>
                                    </Text>
                                </View>
                            </ImageBackground>
                        </TouchableHighlight>
                        <View>
                            <View style={styles.container2}>
                                <Text style={styles.text}>About Me:</Text>
                                <Text style={styles.text2}> {this.props.navigation.state.params.array.aboutme}</Text>
                            </View>
                            <View style={styles.container2}>
                                <Text style={styles.text}>Genres</Text>
                                {this.state.userG.map((genre, index) => {
                                    return (
                                        <View key={index}>
                                            <Text style={styles.text2}>
                                                {genre}
                                            </Text>
                                        </View>
                                    );
                                })}
                            </View>

                            <View style={styles.container2}>
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
                        <View>
                            <TouchableOpacity style={styles.buttonContainer}
                                onPress={(e) => this.msgArtist(e)}>
                                <Text style={styles.buttonText}>Message Artist</Text>
                            </TouchableOpacity >

                        </View>

                    </ScrollView>

                </View>
            </ImageBackground>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#605b4f',
        flex: 1,
        height: null,
        width: null,
    },
    container2: {
        padding: 15,
        backgroundColor: '#111111',
        marginTop: 10
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
        marginBottom: 30,
        alignSelf: 'center',
        borderBottomWidth: 0,
        borderRightWidth: 0,
    },
    image: {
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
    text: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
    },
    text2: {
        fontSize: 15,
        color: 'white'
    }
});