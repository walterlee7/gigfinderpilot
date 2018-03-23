import React, { Component } from 'react';
import { Text, TextInput, Button, ScrollView, View, StyleSheet, KeyboardAvoidingView, ImageBackground } from 'react-native';
import moment from 'moment';
import AutoScroll from 'react-native-auto-scroll';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import * as messageService from '../services/message';
import FetchTextCard from './FetchTextCard';
import * as userService from '../services/user';

export default class ViewArtistMessenger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchMessages: [],
            value: '',
            showButton: true,
            user: 0,
            showFetchedMessages: false,
            userid: 0,
            firstMessage: '',
        };
    }

    componentDidMount() {
        if (this.state.value == '') {
            this.setState({ showButton: false });
        }
        this.fetchMessages();
    }

    fetchMessages() {
        userService.checkUser()
            .then((user) => {
                console.log(user);
                messageService.getUserConversation(user, this.props.navigation.state.params.userid)
                    .then((message) => {
                        console.log(message);
                        this.setState({
                            fetchMessages: message,
                            showFetchedMessages: true,
                            firstMessage: message[0]
                        });
                    }).catch((err) => {
                        console.log(err);
                    });
                this.setState({ user });
                // console.log('this.state.user: ' + this.state.user);
            }).catch(err => {
                console.log('getUserId error');
                console.log(err);
            });
    }

    postMessage(message) {
        if (this.state.value !== '') {
            this.state.fetchMessages.push(message);
        }

        messageService.insert(message)
            .then(() => {
            }).catch((err) => {
                console.log(err);
            })
    }

    handleTextChange(text) {
        this.setState({
            value: text,
            showButton: text !== ''
        });
    }

    handlePress(event) {
        this.postMessage({
            "userid": this.state.user,
            "receiverid": this.props.navigation.state.params.userid,
            "message": this.state.value,
        });
        this.setState({
            value: '',
            showButton: false,
        });
        dismissKeyboard();
    }

    renderButton() {
        if (this.state.showButton) {
            return (
                <Button
                    title='Send Message'
                    style={styles.button}
                    onPress={(event) => { this.handlePress(event); }}
                />
            );
        }
    }

    formatTimeStamp() {
        console.log('firstMessage:');
        console.log(this.state.firstMessage);
        // console.log('_created:');
        // console.log(this.state.firstMessage._created);
        if (this.state.firstMessage === undefined) {
            // let time = 100;
            // let timeStampStr = moment.utc(time).valueOf();
            // let timeStamp = moment(timeStampStr).format("lll");
            return (
                <View style={styles.timeStamp}>
                    {/* <Text style={styles.time}>{timeStamp}</Text> */}
                </View>
            )
        } else {
            console.log('_created:');
            console.log(this.state.fetchMessages._created);
            let timeStampStr = moment.utc(this.state.fetchMessages._created).valueOf();
            let timeStamp = moment(timeStampStr).format("lll");
            console.log('timestamp: ');
            console.log(timeStamp);
            return (
                <View style={styles.timeStamp}>
                    <Text style={styles.time}>{timeStamp}</Text>
                </View>
            )
        }
    }

    renderFetchedMessages() {
        // console.log('first message', this.state.firstMessage);
        if (this.state.showFetchedMessages) {
            return (
                <View>
                    {this.formatTimeStamp()}
                    <View>
                        {
                            this.state.fetchMessages.map((message, index) => {
                                return <FetchTextCard key={index} message={message}
                                    userid={this.state.user} />;
                            })
                        }
                    </View>
                </View>
            );
        }
    }

    render() {
        return (
            <ImageBackground source={{ uri: 'https://static.tumblr.com/e31f3012fa7c249095a8dddbfc58f0c4/rgmmpty/K3Tmpmf2h/tumblr_static_brick_wall_night_texture_by_kaf94-d373s49.jpg' }} style={styles.container}>
                <KeyboardAvoidingView
                    behavior='padding'
                    style={styles.container}>
                    <AutoScroll>
                        <View style={styles.textContainer}>
                            {this.renderFetchedMessages()}
                        </View>
                    </AutoScroll>

                    <View style={styles.inputToolbar}>
                        <TextInput
                            onChangeText={(text) => { this.handleTextChange(text); }}
                            value={this.state.value}
                            placeholder='Enter a message'
                            autoCorrect={true}
                            multiline={true}
                            returnKeyType='send'
                            height={50}
                        />
                        <View>
                            {this.renderButton()}
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    time: {
        backgroundColor: 'lightgrey',
    },
    timeStamp: {
        alignItems: 'center',
    },
    button: {

    },
    textContainer: {
        marginBottom: 55
    },
    inputToolbar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
    }
});