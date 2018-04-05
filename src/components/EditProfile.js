import React, { Component } from 'react';
import { Image, ScrollView, View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, ImageBackground, Alert } from 'react-native';

import * as profileService from '../services/profile';
import * as userService from '../services/user';

export default class EditProfile extends Component {
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

    // async getUserId() {
    //     let user;
    //     let userInfo;
    //     let userGenres;
    //     let uG;
    //     let userInstruments;
    //     let uI;

    //     try {
    //         user = await userService.checkUser();
    //     } catch (e) {
    //         console.log(e);
    //         return;
    //     }

    //     console.log(user);

    //     try {
    //         [userInfo, userGenres, userInstruments] = await Promise.all([
    //             profileService.one(user),
    //             profileService.getGenres(user),
    //             profileService.getInstruments(user),
    //         ]);
    //     } catch (e) {
    //         console.log(e);
    //         return;
    //     }

    //     uG = Object.values(userGenres);
    //     this.setState({ userG: uG });
    //     uI = Object.values(userInstruments);
    //     this.setState({ userI: uI });

    //     this.setState({ user, userG: uG, userI: uI, userInfo, userGenres, userInstruments });

    //     // try {
    //     //     userInfo = await profileService.one(this.state.user);
    //     // } catch (e) {
    //     //     console.log(e);
    //     //     return;
    //     // }

    //     // console.log('userInfo: ' + userInfo);
    //     // console.dir(this.state.userInfo);

    //     // try {
    //     //     userGenres = await profileService.getGenres(this.state.user);
    //     // } catch (e) {
    //     //     console.log(e);
    //     //     return;
    //     // }

    //     // this.setState({ userGenres });
    //     // console.log('UserGenres: ' + userGenres);
    //     // console.log(typeof this.state.userGenres);
    //     // console.dir(this.state.userGenres);
    //     // uG = Object.values(this.state.userGenres);
    //     // this.setState({ userG: uG });
    //     // console.log('userG: ' + this.state.userG);

    //     // try {
    //     //     userInstruments = await profileService.getInstruments(this.state.user);
    //     // } catch (e) {
    //     //     console.log(e);
    //     //     return;
    //     // }

    //     // this.setState({ userInstruments });
    //     // console.log('UserInstruments: ' + userInstruments);
    //     // console.dir(this.state.userInstruments);
    //     // uI = Object.values(this.state.userInstruments);
    //     // this.setState({ userI: uI });
    //     // console.log('userI: ' + this.state.userI);

    // }

    getUserId() {
        userService.checkUser()
            .then((user) => {
                console.log(user);
                this.setState({ user });
                console.log('this.state.user: ' + this.state.user);
                profileService.one(this.state.user)
                    .then((userInfo) => {
                        this.setState({ userInfo });
                        console.log('userInfo: ' + userInfo);
                        console.dir(this.state.userInfo);
                        profileService.getGenres(this.state.user)
                            .then((userGenres) => {
                                this.setState({ userGenres });
                                console.log('UserGenres: ' + userGenres);
                                console.log(typeof this.state.userGenres);
                                console.dir(this.state.userGenres);
                                let uG = Object.values(this.state.userGenres);
                                this.setState({ userG: uG });
                                console.log('userG: ' + this.state.userG);
                                profileService.getInstruments(this.state.user)
                                    .then((userInstruments) => {
                                        this.setState({ userInstruments });
                                        console.log('UserInstruments: ' + userInstruments);
                                        console.dir(this.state.userInstruments);
                                        let uI = Object.values(this.state.userInstruments);
                                        this.setState({ userI: uI });
                                        console.log('userI: ' + this.state.userI);
                                    }).catch(err => {
                                        console.log('UserInstruments error');
                                        console.log(err);
                                    });
                            }).catch(err => {
                                console.log('UserGenres error');
                                console.log(err);
                            });
                    }).catch(err => {
                        console.log('getUserInfo error');
                        console.log(err);
                    });
            }).catch(err => {
                console.log('getUserId error');
                console.log(err);
            });
    }

    editPhoto(e) {
        console.log('edit photo');
        console.log(this.state.userInfo);
        return this.props.navigation.navigate('EditPhoto', { userid: this.state.userInfo.id });
    }

    editInfo(e) {
        console.log('edit info');
        console.log(this.state.userInfo);
        return this.props.navigation.navigate('EditInfo', { userInfo: this.state.userInfo });
    }

    editGenres(e) {
        console.log('edit genre');

        return this.props.navigation.navigate('EditGenre', { userid: this.state.userInfo.id });
    }

    editInstruments(e) {
        console.log('edit instrument');

        return this.props.navigation.navigate('EditInstrument', { userid: this.state.userInfo.id });
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
                {/* <TouchableOpacity style={styles.buttContainer}
                    onPress={(e) => this.handleSubmit(e)}
                >
                    <Text style={styles.buttonText}>LOGOUT</Text>
                </TouchableOpacity > */}
                {/* <Image
                    style={{ width: 350, height: 350, margin: 12, }}
                    source={{ uri: this.state.userInfo.uri }}
                /> */}

                <View style={styles.infoContainer}>
                    <TouchableHighlight style={styles.container}>
                        <ImageBackground style={styles.image}
                            source={{ uri: this.state.userInfo.uri }}>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
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
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => this.editPhoto()}
                    >
                        <Text style={styles.buttonText}>Upload Images</Text>
                    </TouchableOpacity >
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.text}>About Me</Text>
                    <Text style={styles.text2}>Name: {this.state.userInfo.name} </Text>
                    <Text style={styles.text2}>Location: {this.state.userInfo.location} </Text>
                    <Text style={styles.text2}>{this.state.userInfo.aboutme}</Text>

                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={(e) => this.editInfo(e)} >
                        <Text style={styles.buttonText}>Edit Info</Text>
                    </TouchableOpacity >
                </View>

                <View style={styles.infoContainer}>
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
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={(e) => this.editGenres(e)}>
                        <Text style={styles.buttonText}>Edit Genres</Text>
                    </TouchableOpacity >
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
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={(e) => this.editInstruments(e)} >
                        <Text style={styles.buttonText}>Edit Instruments</Text>
                    </TouchableOpacity >
                </View>
                <TouchableOpacity style={styles.buttContainer}
                    onPress={(e) => this.handleSubmit(e)}>
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
        width: 150,
        //margin: 5,
        borderBottomWidth: 0,
        alignSelf: 'center',
        // marginBottom: 20,
        marginTop: 20,
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

// const styles = StyleSheet.create({
//     container: {
//         padding: 10,
//         position: 'relative',
//         borderRadius: 10,
//         marginBottom: 10,
//         flex: 1,
//         alignItems: 'stretch'
//     },
//     btncontainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         marginTop: 10
//     },
//     buttonText: {
//         flexDirection: 'column',
//         // width: '50%',
//         flex: 2,
//         color: 'white',
//         fontSize: 17,
//         alignSelf: 'center',
//         paddingTop: 4,
//         position: 'relative',
//     },
//     buttonContainer: {
//         backgroundColor: '#15a3a3',
//         borderColor: '#21ffff',
//         borderWidth: 1,
//         borderRadius: 40,
//         height: 30,
//         margin: 5,
//         borderBottomWidth: 0,
//         padding: 'auto'
//     },
//     image: {
//         flexDirection: 'row',
//         alignContent: 'flex-end',
//         height: 350,
//         width: 325,
//     },
//     paragraph: {
//         alignSelf: 'flex-end',
//         margin: 5
//     },
//     paragraph2: {
//         color: 'blue'
//     },
//     buttContainer: {
//         backgroundColor: '#15a3a3',
//         borderColor: '#21ffff',
//         borderWidth: 1,
//         borderRadius: 40,
//         height: 30,
//         width: 210,
//         alignSelf: 'center',
//         borderBottomWidth: 0,
//         marginTop: 10,
        
//     },
//     infoContainer: {
//         padding: 7,
//         marginTop: 3,
//         flex: 1,
//         backgroundColor: '#fafafa',
//         borderRadius: 5
//     },
// });
