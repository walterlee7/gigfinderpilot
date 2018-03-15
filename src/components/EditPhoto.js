import React, { Component } from 'react';
import { Text, View, ImagePickerIOS, Image, TouchableOpacity, StyleSheet, Alert, } from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';

import * as photoService from '../services/photo';

export default class EditPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],

        };

        this.getSelectedImages = this.handleSelectedImages.bind(this)
    }

    componentDidMount() {
        // this.pickImage();
    }

    handleSelectedImages(images) {
        console.log(images);
        this.setState({ images });
    }

    // pickImage() {
    //     // openSelectDialog(config, successCallback, errorCallback);
    //     ImagePickerIOS.openSelectDialog({}, imageUri => {
    //         this.setState({ image: imageUri });
    //     }, error => console.error(error));
    // }

    handleSubmit(e) {

        let id = this.props.navigation.state.params.userid;

        console.log('this.state.images: ' + this.state.images)
        console.dir(this.state.images);

        let images = this.state.images;
        let photo = {}
        // photo = images[0].uri

        if (images.length === 0) {
            Alert.alert('Choose a Photo');
        } else if (images.length < 2) {

            for (let i = 0; i < images.length; i++) {
                let uri = 'uri';
                photo[uri] = images[i].uri;
            }

            console.log('photo: ' + photo);
            console.dir(photo);

            console.log('id: ' + id);
            console.log(id);

            // photoService.updatePhoto(id, photo)
            //     .then(() => {
            //         Alert.alert('Photo Updated!!!!');
            //         this.props.navigation.navigate('EditProfile');
            //     }).catch((err) => {
            //         alert("No Photo Updated!!!!");
            //         console.log(err);
            //     })

            photoService.updateFormPhoto(id, {
                image: {
                    uri: images[0].uri,
                    type: 'image/jpeg',
                    name: images[0].filename,
                }
            })
                .then(() => {
                    Alert.alert('Photo Updated!!!!');
                    this.props.navigation.navigate('EditProfile');
                }).catch((err) => {
                    alert("No Photo Updated!!!!");
                    console.log(err);
                })

        } else {
            Alert.alert('Something went wrong...')
        }


    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <CameraRollPicker
                    callback={this.getSelectedImages}
                    maximum={1}
                />
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={(e) => this.handleSubmit(e)}
                >
                    <Text style={styles.buttonText}>UPLOAD PHOTO</Text>
                </TouchableOpacity >

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
    },
    buttonContainer: {
        backgroundColor: '#2980b6',
        paddingVertical: 15,
        paddingHorizontal: 100,
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    text: {
        textAlign: 'center',
        fontWeight: '700'
    }
})