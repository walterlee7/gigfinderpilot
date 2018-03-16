import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

export default class SideMenu extends Component {

    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        {/* <Text style={styles.sectionHeadingStyle}>
                            Section 1
                        </Text> */}
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('HomeScreen')}>
                                HomeScreen
                            </Text>
                        </View>
                    </View>
                    <View>
                        {/* <Text style={styles.sectionHeadingStyle}>
                            Section 2
                        </Text> */}
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Login')}>
                                Login
                            </Text>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('SignUp')}>
                                Sign Up
                            </Text>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Search')}>
                                Search
                            </Text>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Camera')}>
                                Camera
                            </Text>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('UserProfile')}>
                                UserProfile
                            </Text>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('MessengerInbox')}>
                                Inbox
                            </Text>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('About')}>
                                About
                            </Text>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Gigs')}>
                                Gigs
                            </Text>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Events')}>
                                Events
                            </Text>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Contact Us')}>
                                Contact Us
                            </Text>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Version')}>
                                Version
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.footerContainer}>
                    <Text>This is my fixed footer</Text>
                </View>
            </View>
        );
    }
}

SideMenu.propTypes = {
    navigation: PropTypes.object
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1
    },
    navItemStyle: {
        padding: 10,
        color: 'white'
    },
    navSectionStyle: {
        backgroundColor: 'lightgrey',
    },
    sectionHeadingStyle: {
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    footerContainer: {
        padding: 20,
        backgroundColor: 'lightgrey'
    }
})

