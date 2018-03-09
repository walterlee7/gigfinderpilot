import React, { Component, Fragment } from 'react';
import * as userService from '../../services/user';
import IndeterminateProgress from '../utilities/indeterminateProgress';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedOut: false
        };
    }

    componentDidMount() {
        userService.logout();
        this.setState({ loggedOut: true });
    }

    render() {
        if (this.state.loggedOut) {
            return console.log('logged in'); //need to nav to homescreen
            // <Redirect to="/" />;
        } else {
            return <IndeterminateProgress message="Logging Out..." />
        }
    }
}

export default Logout;