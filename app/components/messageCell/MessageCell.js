import React, { PureComponent } from 'react';
import {  View, Text,Image,TouchableWithoutFeedback,TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './MessageCellStyle';
import {  Icons, Colors } from '../../theme';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { Spinner } from 'native-base';

export default class MessageCell extends PureComponent {
  constructor(props) {
    super(props);    
    this.state = {
      isPressed:false //Indicate whether play button is pressed down or not
    };
  }
 
  // Get time string from seconds
  formatIntoMSS = (s) => {return(s-(s%=60))/60+(9<s?':':':0')+s;}

  // Get time string that tells time difference from now
  timeSince = (date) => {
    if (typeof date !== 'object') {
      date = new Date(date);
    }
    return moment(date).fromNow();
  };

  // Generate time since string for sent/heard
  get timeAgoString() {
    const { item } = this.props;
    if (item.seenAt){
      return 'Heard ' + this.timeSince(item.seenAt);  
    }
    return 'Sent ' + this.timeSince(item.sendAt); 
  }

  // Play button event
  handlePlayTap = () => {
    const { onStartPlayback,item } = this.props;
    onStartPlayback(item);
  }

  // Play button touch events
  handleOnPressIn = () => this.setState({ isPressed:true })
  handleOnPressOut = () => this.setState({ isPressed:false })

  // get current status of playback
  get isPlaying() {
    const { item,currentPlayingID,isPlaying } = this.props;
    if (item.id === currentPlayingID && isPlaying === true) {
      return true;
    }
    return false;
  }

  // get current status of audio loading
  get isLoading() {
    const { item,currentPlayingID,isLoading } = this.props;
    if (item.id === currentPlayingID && isLoading === true) {
      return true;
    }
    return false;
  }

  // Display UI for play button and new message indication
  renderPlayButtonView = () => {
    const { item } = this.props;
    const { isPressed } = this.state;
    return(
      <View style={styles.nowPlayingViewStyle}>
        {/* { item.isNew && <View style={[styles.durationViewStyle,styles.newViewStyle]}>
          <Text style={styles.durationTextStyle}>New</Text> 
        </View>} */}
        <View style={[styles.playViewStyle,isPressed && styles.playViewBgStyle,item.isNew && styles.playViewNewStyle]}>
          {!this.isLoading ? <TouchableWithoutFeedback style={styles.playViewStyle} onPressIn={this.handleOnPressIn} onPressOut={this.handleOnPressOut} onPress={this.handlePlayTap}>
            <Image style={[styles.whiteIcon,!isPressed && styles.iconNormalBg]} source={item.isNew ? Icons.icPlayFilled : Icons.icPlay}></Image>
          </TouchableWithoutFeedback> : <Spinner color={Colors.purpleBorder}></Spinner> }
        </View>
      </View>
    );
  }

  // Display UI for when audio is playing 
  renderPlayingView = () => {
    return (
      <View style={styles.nowPlayingViewStyle}>
        <TouchableOpacity>
          <Image style={[styles.whiteIcon, styles.iconNormalBg]} source={Icons.icExport}></Image>
        </TouchableOpacity>
        {/* <TouchableOpacity> */}
        <Text style={styles.nowPlayingStyle}>Now Playing</Text>
        {/* </TouchableOpacity> */}
      </View>
    );
  }
 
  render() {
    const { item } = this.props;
    return (
      <View style={styles.containerStyle}>
        <View style={[styles.listSeparator,styles.transparentBg]}></View>
        <View style={styles.mainContainer}>
          <View>
            <FastImage
              fallback
              defaultSource={Icons.icUserPlaceHolder}
              style={styles.avatarStyle}
              source={{
                uri: item.image,
                priority: FastImage.priority.high
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            {!this.isPlaying && <View style={styles.durationViewStyle}>
              <Text style={styles.durationTextStyle}>{this.formatIntoMSS(item.duration)}</Text> 
            </View>}
          </View>
          <View style={styles.nameViewStyle}>
            <Text style={styles.nameTextStyle}>{item.realName}</Text>
            <Text style={styles.agoTextStyle}>{this.timeAgoString}</Text>
          </View>
          <View style={styles.screen}></View>
          { !this.isPlaying ? this.renderPlayButtonView() : this.renderPlayingView()}
        </View>
        <View style={styles.listSeparator}></View>
      </View>
    );
  }
}

MessageCell.propTypes = {
  index: PropTypes.number, //Current index in section list
  currentPlayingID: PropTypes.number,// Indicates current playing message ID.
  onStartPlayback:PropTypes.func,// callback when user clicks on play icon.
  isPlaying: PropTypes.bool, // Boolean value that tell us whether audio is playing or not
  item: PropTypes.object, // Indicates current playing message object.
  isLoading: PropTypes.bool // Indicates currently audio is loading or not.
};
