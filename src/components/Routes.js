import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';

import SideMenu from './SideMenu';
import HomeScreen from './HomeScreen';
import SignUp from './SignUp';
import Login from './auth/Login';
import LoginForm from './LoginForm';
import Search from './Search';
import SearchResult from './SearchResult';
import Camera from './Camera';
import iCamera from './iCamera';
import Test from './Test';
import Test2 from './Test2';
import UserProfile from './UserProfile';
import ViewArtist from './ViewArtist';

const generateDrawerHamburger = (currentNav) => {
    const onPress = () => currentNav.navigation.navigate('DrawerOpen');

    return (

        <Icon
            onPress={onPress}
            name="bars"
            size={26}
            type='font-awesome'
            color='black'
            style={{ alignSelf: 'end' }}
        />

    );
};

const getStackNavOption = (current) => ({
    headerStyle: {
        backgroundColor: 'lightgrey',
        display: 'flex',
        paddingRight: 10

    },
    headerTitle: <Text>Test</Text>,
    headerRight: generateDrawerHamburger(current),
});

const HomeStack = StackNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: { header: null }
    },
    LoginForm: {
        screen: LoginForm,
        navigationOptions: getStackNavOption
    },
    UserProfile: {
        screen: UserProfile,
        navigationOptions: getStackNavOption
    }
});
const LoginStack = StackNavigator({
    Login: {
        screen: Login,
        navigationOptions: getStackNavOption
    },
    UserProfile: {
        screen: UserProfile,
        navigationOptions: getStackNavOption
    }
});
const SignUpStack = StackNavigator({
    SignUp: {
        screen: SignUp,
        navigationOptions: getStackNavOption
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: getStackNavOption
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: getStackNavOption
    },

});
const SearchStack = StackNavigator({
    Search: {
        screen: Search,
        navigationOptions: getStackNavOption
    },
    SearchResult: {
        screen: SearchResult,
        navigationOptions: getStackNavOption
    },
    ViewArtist: {
        screen: ViewArtist,
        navigationOptions: getStackNavOption
    }
});
const CameraStack = StackNavigator({
    SearchResult: {
        screen: Camera,
        navigationOptions: getStackNavOption
    }
});
const iCameraStack = StackNavigator({
    iCamera: {
        screen: iCamera,
        navigationOptions: getStackNavOption
    },
});
const TestStack = StackNavigator({
    Test: {
        screen: Test,
        navigationOptions: getStackNavOption
    },
});
const TestStack2 = StackNavigator({
    Test2: {
        screen: Test2,
        navigationOptions: getStackNavOption
    },
});
const UserProfileStack = StackNavigator({
    UserProfile: {
        screen: UserProfile,
        navigationOptions: getStackNavOption
    },
});

export default DrawerNavigator({
    Home: {
        screen: HomeStack,
    },
    Login: {
        screen: LoginStack
    },
    SignUp: {
        screen: SignUpStack
    },
    Search: {
        screen: SearchStack
    },
    Camera: {
        screen: CameraStack
    },
    iCamera: {
        screen: iCameraStack
    },
    Test: {
        screen: TestStack
    },
    Test2: {
        screen: TestStack2
    },
    UserProfile: {
        screen: UserProfileStack
    }
}, {
        contentComponent: SideMenu,
        drawerWidth: 300,
        drawerPosition: 'right'
    });