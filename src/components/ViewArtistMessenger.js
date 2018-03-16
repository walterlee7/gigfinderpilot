import React, { Component } from 'react';
import {
    Text,
    TextInput,
    Button,
    ScrollView,
    View,
    StyleSheet,
    KeyboardAvoidingView
} from 'react-native';
import moment from 'moment';
import AutoScroll from 'react-native-auto-scroll';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import * as messageService from '../services/message';
import FetchTextCard from './FetchTextCard';
import * as userService from '../services/user';

export default class Messenger extends Component {
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
        // this.getUserId();
        this.fetchMessages();

    }

    // getUserId() {
    //     userService.checkUser()
    //         .then((user) => {
    //             console.log(user);
    //             this.setState({ user });
    //             console.log('this.state.user: ' + this.state.user);
    //         }).catch(err => {
    //             console.log('getUserId error');
    //             console.log(err);
    //         });
    // }

    fetchMessages() {
        // this.getUserId();
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
        // messageService.getUserConversation(this.state.user, this.props.navigation.state.params.userid)
        //     .then((message) => {
        //         console.log(message);
        //         this.setState({
        //             fetchMessages: message,
        //             showFetchedMessages: true,
        //             firstMessage: message[0]
        //         });
        //     }).catch((err) => {
        //         console.log(err);
        //     });
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

    // formatTimeStamp() {
    //     if (this.state.firstMesssage == undefined)
    //         console.log(this.state.firstMessage);
    //     let timeStampStr = moment.utc(this.state.firstMessage._created).valueOf();
    //     let timeStamp = moment(timeStampStr).format("lll");
    //     return (
    //         <View style={styles.timeStamp}>
    //             <Text style={styles.time}>{timeStamp}</Text>
    //         </View>
    //     )
    // }


    renderFetchedMessages() {
        // console.log('first message', this.state.firstMessage);
        if (this.state.showFetchedMessages) {
            return (
                <View>
                    {/* {this.formatTimeStamp()} */}
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
                    />
                    <View>
                        {this.renderButton()}
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    time: {
        color: 'black'
    },
    timeStamp: {
        alignItems: 'center'
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