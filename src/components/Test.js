import React, { Component } from 'react';
import { Platform, StyleSheet, View, Alert } from 'react-native';
import { Container, Header, Content, ListItem, CheckBox, Text, Body } from 'native-base';

import * as searchService from '../services/search';

export default class Test extends Component {
    constructor(props) {
        super(props);

        this.state = {
            genres: [],
            chkbox1: false,

        };
    }

    componentDidMount() {
        this.getGenres();
    }

    getGenres() {
        searchService.allGenres()
            .then((genres) => {
                genres.sort(function (a, b) {
                    var textA = a.genre.toUpperCase();
                    var textB = b.genre.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
                this.setState({ genres });
            }).catch((err) => {
                console.log(err);
            });
    }

    handleSubmit(e) {

        if (this.state.chkbox1 === false) {
            this.setState({ chkbox1: true });
        } else {
            this.setState({ chkbox1: false });
        }

    }

    render() {
        return (
            <Container>
                {/* <Header>
                    <Text>Choose up to 5 Locations</Text>
                </Header> */}
                <Content>
                    {this.state.genres.map((item, index) => {
                        return (
                            <ListItem value={index} key={index} >
                                <CheckBox
                                    onPress={(e) => this.handleSubmit(e)}
                                    checked={this.state.chkbox1}
                                />
                                <Text>{item.genre}</Text>
                            </ListItem>
                        );
                    })}
                </Content>
            </Container>
        );
    }
}