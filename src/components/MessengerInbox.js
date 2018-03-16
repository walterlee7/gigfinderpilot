import React, { Component } from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    StyleSheet,
    ImageBackground,
} from 'react-native';
import * as messageService from '../services/message';
import TextCard from './TextCard';
import * as userService from '../services/user';

export default class MessengerInbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchMessages: [],
            showMessages: false,
            userid: 0,
            receiverid: ''
        }
    }

    componentDidMount() {
        this.fetchMessages();
    }

    // checkUser() {
    //     userService.checkUser()
    //         .then((user) => {
    //             this.setState({ userid: user });
    //         }).catch(err => {
    //             console.log('getUserId error');
    //             console.log(err);
    //         });
    // }

    fetchMessages() {
        // this.checkUser()
        userService.checkUser()
            .then((user) => {
                console.log('user: ' + user);
                console.dir(user);
                messageService.getUserInbox(user)
                    .then((inbox) => {
                        this.setState({
                            fetchMessages: inbox,
                            showMessages: true,
                        });
                    }).catch((err) => {
                        console.log(err);
                    });
                this.setState({ userid: user });
            }).catch(err => {
                console.log('getUserId error');
                console.log(err);
            });
    }

    handlePress(event, index) {
        let receiverid = this.state.fetchMessages[index].receiverid
        this.props.navigation.navigate('Messenger', { receiverid });
    }

    renderTextCards() {
        if (this.state.showMessages) {
            return (
                <View>
                    {this.state.fetchMessages.map((inbox, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={(event) => { this.handlePress(event, index) }}>
                                <TextCard
                                    id={index}
                                    artist={inbox.friend}
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
            <ImageBackground source={{ uri: 'https://static.tumblr.com/e31f3012fa7c249095a8dddbfc58f0c4/rgmmpty/K3Tmpmf2h/tumblr_static_brick_wall_night_texture_by_kaf94-d373s49.jpg' }} style={styles.container}>
                <ScrollView style={styles.container}>
                    {this.renderTextCards()}
                </ScrollView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});