import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Messenger from './Messenger';

export default class TextCard extends Component {

    render() {
        return (
            <View>
                <Text style={styles.titleText}>{this.props.artist}</Text>
                <Text style={styles.subtext}>{this.props.textPreview}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleText: {

    },
    subtext: {

    },
});