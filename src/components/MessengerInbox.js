import React, { Component } from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import * as messageService from '../services/message';
import TextCard from './TextCard';

export default class MessengerInbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchMessages: [],
            showMessages: false
        }
    }

    componentDidMount() {
        this.fetchMessages()
    }

    fetchMessages() {
        messageService.getRecent()
            .then((inbox) => {
                this.setState({
                    fetchMessages: inbox,
                    showMessages: true,
                });
            }).catch((err) => {
                console.log(err);
            });
    }

    handlePress(event) {
        this.props.navigation.navigate('Messenger');
    }

    renderTextCards() {
        if (this.state.showMessages) {
            return (
                <View>
                    {this.state.fetchMessages.map((inbox, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={(event) => { this.handlePress(event) }}>
                                <TextCard
                                    id={index}
                                    artist={inbox.receiverid}
                                    textPreview={inbox.message} />
                            </TouchableOpacity>
                        );
                    })}
                </View>
            );
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {this.renderTextCards()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
