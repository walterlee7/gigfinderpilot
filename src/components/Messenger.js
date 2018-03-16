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
            showFetchedMessages: false,
            userid: 0,
            firstMessage: '',
            user: 0
        };
    }

    componentDidMount() {
        if (this.state.value == '') {
            this.setState({ showButton: false });
        }
        this.fetchMessages();

    }

    async getUserId() {
        try {
            const user = await userService.checkUser();
            console.log(user);
            console.log('this.state.user: ' + user);

            this.setState({ user });

        } catch (e) {
            console.log(e);
        }
    }

    fetchMessages() {
        this.getUserId();
        messageService.getUserConversation(this.state.user, this.props.navigation.state.params.userid)
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
        console.log(this.state.firstMessage);
        let timeStampStr = moment.utc(this.state.firstMessage._created).valueOf();
        let timeStamp = moment(timeStampStr).format("lll");

        return (
            <View style={styles.timeStamp}>
                <Text style={styles.time}>{timeStamp}</Text>
            </View>
        )
    }


    renderFetchedMessages() {
        console.log('first message', this.state.firstMessage);
        if (this.state.showFetchedMessages) {
            return (
                <View>
                    {this.formatTimeStamp()}
                    <View>
                        {
                            this.state.fetchMessages.map((message, index) => {
                                return <FetchTextCard key={index} message={message}
                                    userid={this.state.userid} />;
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