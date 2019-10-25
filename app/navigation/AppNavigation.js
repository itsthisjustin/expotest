import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import LaunchScreen from '../screens/LaunchScreen';
import IntroScreen from '../screens/intro/IntroScreen';
import SignUpScreen from '../screens/signup/SignUpScreen';
import EmailVerifyScreen from '../screens/verify/EmailVerifyScreen';
import AddProfilePicScreen from '../screens/profile/AddProfilePicScreen';

import FriendListScreen from '../screens/friendlist/FriendListScreen';
import SettingScreen from '../screens/setting/SettingScreen';
import EditProfileScreen from '../screens/profile/edit/EditProfileScreen';

const AuthStack = createStackNavigator(
  {
    SignUpScreen: { screen: SignUpScreen },
    EmailVerifyScreen: { screen: EmailVerifyScreen },
    AddProfilePicScreen:{ screen: AddProfilePicScreen }
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'SignUpScreen',
    navigationOptions: {
    //   headerStyle: styles.header
    }
  }
);

const MainStack = createStackNavigator(
  {
    FriendListScreen: { screen: FriendListScreen },
    SettingScreen: { screen: SettingScreen },
    EditProfileScreen: { screen: EditProfileScreen }
  },
  {
    headerMode: 'none',
    initialRouteName: 'FriendListScreen',
    navigationOptions: {
    }
  }
);

const LaunchNav = createStackNavigator(
  {
    LaunchScreen: { screen: LaunchScreen },
    IntroScreen: { screen: IntroScreen }
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LaunchScreen',
    navigationOptions: {
    }
  }
);

// Manifest of possible screens
const PrimaryNav = createSwitchNavigator(
  {
    AuthStack,
    LaunchNav,
    MainStack
  },
  {
    headerMode: 'none',
    initialRouteName: 'LaunchNav',
    navigationOptions: {
    //   headerStyle: styles.header
    }
  }
);

export default createAppContainer(PrimaryNav);
