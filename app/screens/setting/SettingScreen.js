import React from 'react';
import { Icons, Images } from '../../theme';
import { CustomHeader } from '../../components';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import styles from './SettingScreenStyle';

class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSignOutCase = () => {   
    const action = NavigationActions.navigate({
      routeName: 'AuthStack',
      action: StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'SignUpScreen',
            params:{
              'isLogout': true 
            }
          })
        ]
      })
    });
    this.props.navigation.dispatch(action);
  }

  // Toggle method to handle setting screen close.
  handleExit = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  // Toggle method to handle setting screen in more option.
  handleMoreOption = () => {
    const { navigation } = this.props;
    navigation.navigate('SettingScreen');
  }

  itemClick = (text) => async() => {
    const { navigation } = this.props;
    switch (text) {
    case 'Edit Profile':      
      navigation.navigate('EditProfileScreen');
      break;
    case 'Help':
      break;
    case 'Take the Tour':
      break;
    case 'Sign Out':
      this.handleSignOutCase();
      break;    
    }
  }

  renderItem(text, isBottomLineVisible) {
    return (
      <TouchableOpacity onPress={this.itemClick(text)}>
        <View style={styles.itemContainer}>
          <View style={styles.itemTextContainer}>
            <Text style={ isBottomLineVisible ? styles.itemNormalText : styles.itemBoldText}>{text}</Text>
            { isBottomLineVisible &&<Image source={Icons.icRightArrow} style={styles.popupHeaderIcon} /> }
          </View>
          { isBottomLineVisible && <View style  ={styles.listSeparator}/> }
        </View>
      </TouchableOpacity>
    );
  }

  renderMenuList() {    
    return (
      <View style={styles.screenCard}>
        <Image source={Images.dotsPatternBg} style={styles.cardBackgroundImage} />
        <Text style={styles.titleText}>Settings</Text>
        {this.renderItem('Edit Profile', true)}
        {this.renderItem('Help', true)}
        {this.renderItem('Take the Tour', true)}
        {this.renderItem('Sign Out', false)}
        <Text style={styles.versionTextStyle}>v1.0(10)</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.screenBackground}>
        <Image source={Images.dotsPattern} style={styles.headerBackgroundImage} />
        <CustomHeader
          leftButtonIcon={Icons.icExit}
          titleIcon={Icons.icYacWithText}
          rightButtonIcon={Icons.icOverflow}
          leftButtonPress={this.handleExit}
          rightButtonPress={this.handleMoreOption}
        />
        {this.renderMenuList()}
      </View>
    );
  }
}

export default SettingScreen;
