import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

export default class loginSideMenu extends Component {
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
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Search')}>
                                Search
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

loginSideMenu.propTypes = {
    navigation: PropTypes.object
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1
    },
    navItemStyle: {
        padding: 10
    },
    navSectionStyle: {
        backgroundColor: '#333333'
    },
    sectionHeadingStyle: {
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    footerContainer: {
        padding: 20,
        backgroundColor: '#333333'
    }
})

