import React from 'react';
import { Text } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import HomeScreen from './HomeScreen';
import SignUp from './SignUp';
import Login from './auth/Login';
import Search from './Search';
import About from './About';
import Gigs from './Gigs';
import Events from './Events';
import Contact from './Contact';
import Version from './Version';

import SearchResult from './SearchResult';
import UserProfile from './UserProfile';
import EditProfile from './EditProfile';
import ViewArtist from './ViewArtist';
import LoginForm from './LoginForm';
import ViewArtistMessenger from './ViewArtistMessenger';
import LoginMessage from './auth/LoginMessage';
import MessengerInbox from './MessengerInbox';
import Messenger from './Messenger';

import EditInfo from './EditInfo';
import EditGenre from './EditGenre';
import EditInstrument from './EditInstrument';
import EditPhoto from './EditPhoto';

// import SideMenu from './SideMenu';
// import loginSideMenu from './loginSideMenu';

import Camera from './Camera';


const generateDrawerHamburger = (currentNav) => {
    const onPress = () => currentNav.navigation.navigate('DrawerOpen');

    return (
        <Icon
            onPress={onPress}
            name="bars"
            size={30}
            type='font-awesome'
            color='#007aff'
        />
    );
};

const getStackNavOption = (current) => ({
    headerStyle: {
        backgroundColor: '#f2f2f2',
        display: 'flex',
        paddingRight: 10
    },
    headerTitle: <Text style={{ marginTop: 10, fontSize: 17, color: '#888888', alignSelf: 'center', paddingLeft: 10 }}>GigFinder</Text>,
    headerRight: generateDrawerHamburger(current),
});

// const getStackNavOptionIOS = (current) => ({
//     headerStyle: {
//         backgroundColor: '#f2f2f2',
//         display: 'flex',
//     },

//     headerTitle: <Text style={{ marginTop: 10, fontSize: 17, color: '#888888', alignSelf: 'center', paddingLeft: 10 }}>iOS Camera Roll</Text>,
//     headerRight: generateDrawerHamburger(current),
// });

const getStackNavOptionMessenger = (current) => ({
    headerStyle: {
        backgroundColor: '#888888',
        display: 'flex',
        paddingRight: 10
    },
    headerTitle: 'Your Inbox',
    headerRight: generateDrawerHamburger(current),
})

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
    },
    EditProfile: {
        screen: EditProfile,
        navigationOptions: getStackNavOption
    },
    EditInfo: {
        screen: EditInfo,
        navigationOptions: getStackNavOption
    },
    EditGenre: {
        screen: EditGenre,
        navigationOptions: getStackNavOption
    },
    EditInstrument: {
        screen: EditInstrument,
        navigationOptions: getStackNavOption
    },
    EditPhoto: {
        screen: EditPhoto,
        navigationOptions: getStackNavOption
    },
});
const LoginStack = StackNavigator({
    Login: {
        screen: Login,
        navigationOptions: getStackNavOption
    },
    UserProfile: {
        screen: UserProfile,
        navigationOptions: getStackNavOption
    },
    MessengerInbox: {
        screen: MessengerInbox,
        navigationOptions: getStackNavOptionMessenger
    },
    Messenger: {
        screen: Messenger,
        navigationOptions: getStackNavOption
    }
});
const SignUpStack = StackNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: { header: null }
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: getStackNavOption
    },
});
const SearchStack = StackNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: { header: null }
    },
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
    },
    ViewArtistMessenger: {
        screen: ViewArtistMessenger,
        navigationOptions: getStackNavOption
    },
    LoginMessage: {
        screen: LoginMessage,
        navigationOptions: getStackNavOption
    },
});
const CameraStack = StackNavigator({
    Camera: {
        screen: Camera,
        navigationOptions: getStackNavOption
    }
});
const UserProfileStack = StackNavigator({
    UserProfile: {
        screen: UserProfile,
        navigationOptions: getStackNavOption
    },
});
const AboutStack = StackNavigator({
    About: {
        screen: About,
        navigationOptions: getStackNavOption
    },
});
const GigsStack = StackNavigator({
    Gigs: {
        screen: Gigs,
        navigationOptions: getStackNavOption
    },
});
const EventsStack = StackNavigator({
    Events: {
        screen: Events,
        navigationOptions: getStackNavOption
    },
});
const VersionStack = StackNavigator({
    Version: {
        screen: Version,
        navigationOptions: getStackNavOption
    },
});
const ContactStack = StackNavigator({
    Contact: {
        screen: Contact,
        navigationOptions: getStackNavOption
    },
});

export default DrawerNavigator({
    Home: {
        screen: HomeStack,
        // contentComponent: loginSideMenu,
    },
    Login: {
        screen: LoginStack,
        // contentComponent: loginSideMenu,
    },
    SignUp: {
        screen: SignUpStack,
        // contentComponent: SideMenu,
    },
    Search: {
        screen: SearchStack,
        // contentComponent: SideMenu,
    },
    Camera: {
        screen: CameraStack,
        // contentComponent: SideMenu,
    },
    UserProfile: {
        screen: UserProfileStack,
        // contentComponent: loginSideMenu,
    },
    About: {
        screen: AboutStack,
        // contentComponent: SideMenu,
    },
    Gigs: {
        screen: GigsStack,
        // contentComponent: SideMenu,
    },
    Events: {
        screen: EventsStack,
        // contentComponent: SideMenu,
    },
    Contact: {
        screen: ContactStack
    },
    Version: {
        screen: VersionStack
    },

}, {
        // contentComponent: SideMenu,
        drawerWidth: 220,
        drawerPosition: 'right',
        drawerBackgroundColor: '#ffb99b',

    });

