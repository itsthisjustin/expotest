import React, { Component } from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { api } from '../utils/api';
import { StackActions, NavigationActions } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';

class LaunchScreen extends Component {

  constructor(props) {
    super(props);
  } 

  componentDidMount() {
    this.checkUserLogin();
  }

  checkUserLogin = async() => {
    const { user,navigation } = this.props;

    let routeName = 'IntroScreen';
    let stackName = 'LaunchNav';
    let email = '';
    if (user){
      email = user.email;
      if (user.isVerified){
        api.setHeader('authorization', user.token);
        routeName = 'AddProfilePicScreen';
        stackName = 'AuthStack';
        if (user.skipUsername){
          routeName ='FriendListScreen' ;
          stackName = 'MainStack';
        }
      }
    }
    const action = NavigationActions.navigate({
      routeName: stackName,
      action: StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: routeName,
            params:{
              'email':email
            }
          })
        ]
      })
    });
    SplashScreen.hide();
    navigation.dispatch(action);
  }


  render () {
    return (
      <View>  
        <StatusBar barStyle="default" />
        <ActivityIndicator />      
      </View>
    );
  }
}

LaunchScreen.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = ({ signInReducer }) => ({
  user: signInReducer.user
});
  // export default SignUpScreen;
export default connect(mapStateToProps)(LaunchScreen);
  

