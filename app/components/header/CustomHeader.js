import React from 'react';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';
import { Header, Text, View } from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import { SearchInputtext } from '../../components';

import styles from './CustomHeaderStyle';

const CustomHeader = props => {
  const { 
    customHeaderStyle, 
    onLayout, 
    transparent = true, 
    isBottomLineVisible= false, 
    isSearchVisible=false, 
    rightButtonPress 
  } = props;
  return (
    <Header noLeft 
      style={[
        styles.headerTransparent, 
        styles.container, 
        !isBottomLineVisible && styles.headerWithOutLineStyle, 
        customHeaderStyle 
      ]} 
      {...transparent && transparent} 
      translucent 
      androidStatusBarColor={Colors.transparent}
      iosBarStyle='light-content'
      onLayout={onLayout}
    >
      { !isSearchVisible && (
        <View style={styles.headerView}>
          <RenderLeftSide {...props}/>
          <RenderCenterSide {...props}/>
          <RenderRightSide {...props}/>
        </View>
      ) }
      { isSearchVisible && <SearchInputtext rightButtonPress={rightButtonPress}/> }      
    </Header>
  );
};

const RenderLeftSide = props => {
  const { leftButtonIcon, leftButtonText, customLeftStyle, leftButtonPress } = props;
  if (leftButtonIcon || leftButtonText) {
    return(
      <TouchableOpacity style={[styles.leftButtonStyle, customLeftStyle]} onPress={leftButtonPress}>
        {leftButtonIcon && <Image source={leftButtonIcon} style={styles.iconStyle}/>}
        {leftButtonText && <Text style={styles.rightButtonText} numberOfLines={1}>{leftButtonText}</Text>}
      </TouchableOpacity>
    );
  }
};

const RenderCenterSide = props => {
  const { titleText, titleIcon } = props;

  if (titleText || titleIcon) {
    return(
      <View style={styles.bodyStyle}>
        {titleIcon && <Image source={titleIcon} style={styles.logo}/>}
        {titleText && <Text style={styles.titleText} numberOfLines={1}>{titleText}</Text>}
      </View>
    );
  }
};

const RenderRightSide = props => {
  const { customRightView, customRightStyle, rightButtonText, rightButtonIcon, rightButtonPress } = props;

  if (customRightView) {
    return(
      <View style={[styles.rightButtonStyle, customRightStyle]}>{customRightView}</View>
    );
  } else {
    if (rightButtonText || rightButtonIcon) {
      return(
        <TouchableOpacity style={[styles.rightButtonStyle, customRightStyle]} onPress={rightButtonPress}>
          {rightButtonIcon && <Image source={rightButtonIcon} style={styles.iconStyle}/>}
          {rightButtonText && <Text style={styles.rightButtonText} numberOfLines={1}>{rightButtonText}</Text>}
        </TouchableOpacity>
      );
    }
  }
};

CustomHeader.propTypes = {
  leftButtonIcon: PropTypes.number,
  leftButtonText: PropTypes.string,
  customLeftStyle: PropTypes.object,
  leftButtonPress: PropTypes.func,

  titleText: PropTypes.string,
  titleIcon: PropTypes.number,

  customRightView: PropTypes.any,
  customRightStyle: PropTypes.object,
  rightButtonText: PropTypes.string,
  rightButtonIcon: PropTypes.number,
  rightButtonPress: PropTypes.func,
  rightButtonStyle: PropTypes.object,

  onLayout: PropTypes.func,
  transparent: PropTypes.bool,
  customHeaderStyle: PropTypes.any,
  isBottomLineVisible: PropTypes.bool,

  isSearchVisible: PropTypes.bool
};

export default CustomHeader;
