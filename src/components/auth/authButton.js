import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { isLoggedIn, me } from '../../services/user';

//have make constructor to pass in username
const AuthButton = withRouter(
    ({ history }) => {
        if (isLoggedIn()) {
            return
            <TouchableOpacity>
                <Text>Logout: Logged in as...</Text>
            </TouchableOpacity>
            // <Link className="btn btn-info" to="/logout">Logout: Logged in as...</Link>;
        } else {
            return console.log('should go to login'); //this should nav to Login
            // <Link className="btn btn-info" to="/login">Login</Link>;
        }
    }
);

export default AuthButton;