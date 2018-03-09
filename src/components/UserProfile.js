import React, { Component } from 'react';
import { Image, ScrollView, View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, ImageBackground } from 'react-native';
// import AuthButton from './auth/authButton';


export default class UserProfile extends Component {
    constructor(props) {
        super(props);
    }

    editProfile() {
        console.log('edit profile');
        return this.props.navigation.navigate('EditProfile');
    }

    inbox() {
        console.log('edit profile');
        return this.props.navigation.navigate('Inbox');
    }

    render() {
        return (
            <View>
                {/* <AuthButton /> */}
                <ScrollView>
                    <View>
                        <TouchableHighlight style={styles.container}>
                            <ImageBackground style={styles.image}
                                source={require('/Users/walterlee/Documents/Test/GigPilot/gigfinderpilot/Images/gigfindersplash.png')}>
                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <Text style={styles.paragraph}>
                                        <Text style={{ fontSize: 20 }}>
                                            Victor Arvidsson
                                        </Text>
                                        {"\n"}
                                        <Text style={{ fontSize: 12 }}>
                                            Nashville, TN
                                        </Text>
                                    </Text>
                                </View>
                            </ImageBackground>
                        </TouchableHighlight>

                    </View>

                    <View>
                        <Text style={styles.header}>About Me</Text>
                        <Text>Name </Text>
                        <Text>Location </Text>
                        <Text style={styles.body}> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
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


            </View>

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
    }
});