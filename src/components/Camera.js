import React, { Component } from 'react';
import {
    Text,
    View,
    ImagePickerIOS,
    Image,
} from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';


export default class Camera extends Component {
    constructor() {
        super();
        this.state = { image: null };
    }

    // componentDidMount() {
    //     this.pickImage();
    // }

    getSelectedImages(images) {
        console.log(images);
        console.log(this.state);
    }

    // pickImage() {
    //     // openSelectDialog(config, successCallback, errorCallback);
    //     ImagePickerIOS.openSelectDialog({}, imageUri => {
    //         this.setState({ image: imageUri });
    //     }, error => console.error(error));
    // }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <CameraRollPicker
                    callback={this.getSelectedImages}
                    maximum={1}
                />
            </View>
        );
    }
}