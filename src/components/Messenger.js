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
import AutoScroll from 'react-native-auto-scroll';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import * as messageService from '../services/message';
import SentTextCard from './SentTextCard';
import FetchTextCard from './FetchTextCard';


export default class Messenger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchMessages: [],
            value: '',
            showButton: true,
            showFetchedMessages: false,
            timeStamp: 'Man, like, I don\'t know sometime?',
            userid: 1,
            whereFrom: 1,
        };
    }

    componentDidMount() {
        if (this.state.value == '') {
            this.setState({ showButton: false });
        }

        this.fetchMessages();
    }

    fetchMessages() {
        messageService.get()
            .then((message) => {
                this.setState({
                    fetchMessages: message,
                    showFetchedMessages: true,
                });
                console.log(this.state.fetchMessages);
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
            "userid": this.state.userid,
            "receiverid": 2,
            "message": this.state.value,
            "wherefrom": this.state.userid
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

    renderFetchedMessages() {
        if (this.state.showFetchedMessages) {
            return (
                <View>
                    {this.state.fetchMessages.map((message, index) => {
                        return <FetchTextCard key={index} message={message}
                            whereFrom={this.state.whereFrom} />;
                    })}
                </View>
            );
        }
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}>
                <AutoScroll>
                    <View style={styles.time}>
                        <Text>{this.state.timeStamp}</Text>
                    </View>
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