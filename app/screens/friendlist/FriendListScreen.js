import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUpSocket } from '../../utils';
import { Icons, Images, scale } from '../../theme';
import { getCurrentProgress, onStartPlay, onStopPlay, onPausePlay, startRecording, stopRecording } from '../../utils/AudioPlayerRecorder';
import { DeviceEventEmitter, Image, SectionList, View } from 'react-native';
import { readMessage, getMessageList, receivedNewMessage } from '../../redux/actions';
import { CustomHeader, FloatingActionItem, MessageCell, SectionHeaderCell } from '../../components';
import styles from './styles/FriendListScreenStyle';

class FriendListScreen extends React.Component {
  constructor(props) {
    super(props); 
    this.playerTimer; // Timer to update progress and current playback time data
    this.recorderTimer; // Timer to update progress and current recording of audio
    this.socketMsgCount = 0;   // Number of new messages received from socket
    this.state = {
      progress:0, // Current progress of 
      isPlaying:false, // To display player UI when the audio is playing.
      isReplyMode: false, // To display reply UI when user taps on reply button.
      currentTime:0, // Indicate current progress of audio player.
      currentMessageID:-1, // Indicates current playing message ID.
      isLoading:false, // Loading progress UI toggle for identify to update server details.
      currentPlayingItem:null,// Indicates current playing message object.
      recordingDuration: 0, // Duration of audio recording of file
      isSearchVisible: false, // Used for toggle search option visibility.
      friendList: []
    };
  }

  componentDidMount() {
    // Lesion recent list from socket.
    this.props.getMessageList(0);
    this.userList = DeviceEventEmitter.addListener('userList', (data) => this.setState({ friendList: data.users }));
    //Lesion new message form socket.
    this.messageEvent = DeviceEventEmitter.addListener('newMessage', (data) => {
      let id = data.user.id;
      let temp = this.state.friendList;
      this.props.receivedNewMessage(data.isMobile);
      // Find the given used is already in list. if available then get index in list.
      const index = temp.findIndex(user => user.id === id);      
      // If index is -1 then user not exits is list otherwise it's exits.
      if (index === -1) {
        temp.push(data.user);
      } else {
        temp[index] = data.user;
      }
      this.setState({ friendList: temp });
    });

    // Init socket connection and emit event
    setTimeout(() => {
      setUpSocket(this.props.user.token, this.props.user.secret);
    }, 500);
  }

  componentWillUnmount() {
    // Remove message Listener event along with timer.
    this.messageEvent.remove();
    clearInterval(this.playerTimer);
  }

  // Call api for update read flag on server/backend.
  callReadMessageAPI = (id,userID) => {
    this.props.readMessage({ id: id, whosMessageIsRead: userID });      
  }

  //Get duration string 
  getCurentTime() {
    const { currentTime,currentPlayingItem,isReplyMode,recordingDuration } = this.state;
    let angle = parseInt(isReplyMode ? recordingDuration : currentTime);
    const min = Math.floor(angle/60);
    const sec = angle%60;
    let totalTimeMin = Math.floor((isReplyMode ? 30 : currentPlayingItem.duration)/60);
    const totalTimeSec = (isReplyMode ? 30 : currentPlayingItem.duration)%60;
    let str = `${(min < 10) ? '0' + min.toString() : min.toString()}:${(sec < 10) ? '0' + sec.toString() : sec.toString()}`+ '/'+`${(totalTimeMin < 10) ? '0' + totalTimeMin.toString() : totalTimeMin.toString()}:${(totalTimeSec < 10) ? '0' + totalTimeSec.toString() : totalTimeSec.toString()}`;
    return str;
  }
  // Start to play audio file
  playbackStarted = () => {
    const { currentPlayingItem } = this.state;
    this.setState({ isLoading:false,isPlaying:true });
    this.callReadMessageAPI(currentPlayingItem.id,currentPlayingItem.from);

    // Player timer used for change audio progress/seek-bar value.
    this.playerTimer = setInterval(() => {
      const { currentPlayingItem,currentMessageID } = this.state;
      // Get current progress, current time.
      if (currentPlayingItem !== null) {
        let progress = getCurrentProgress();
        currentPlayingItem.id===currentMessageID && this.setState({ progress : progress.currentProgress * 100,currentTime:progress.currentTime });
      } else {
        clearInterval(this.playerTimer);
      }
    }, 500);
  }

  // Paused audio player when player already start.
  playbackPaused = () => {
    clearInterval(this.playerTimer);
  }

  // Stop player with clear player interval and display replay UI.
  playbackStopped = () => {
    // Clear player time interval.
    clearInterval(this.playerTimer);
    // Update play and replay state.
    this.setState({ isPlaying : false, currentMessageID:-1, currentPlayingItem:null, progress:0, currentTime:0 });
    // Set 5 seconds timeout then all read flag api and update server details.
  }

  //  Initiate player and update state values to render player UI
  startPlay = (item) => {
    clearInterval(this.playerTimer);
    this.setState({ 
      currentMessageID:item.id, 
      currentPlayingItem:item, 
      isLoading:true, 
      isPlaying:false, 
      isReplyMode: false,
      progress:0, 
      currentTime:0
    });
    // this.playbackStarted(item.id); // Trigger Callback function to start audio play.
    onStartPlay(item.fileName, this.playbackStarted, this.playbackStopped,true); // Start audio player.
  }

  //Reset recorder and its data
  resetRecorderData = (isCancel = false) => {
    clearInterval(this.recorderTimer);
    isCancel && stopRecording();
    this.setState({ isReplyMode:false,isPlaying:false,progress:0,currentTime:0,recordingDuration:0 });
  } 

  // Send audio message
  sendAudioMessage = () => {
    // const { currentPlayingItem,recordingDuration } = this.state;
    // clearInterval(this.recorderTimer);
    // stopRecording((err, stopped, file) => {
    //   // console.log('Recording finished now send the file',err,stopped,file);
    //   let fileName = file.split('/');
    //   fileName = fileName[fileName.length - 1];
    //   let data = { fileName,file,id: currentPlayingItem.from,recordingDuration };
    //   this.resetRecorderData();
    // });
  }

  //Start recording of audio
  startRecording = () => {
    clearInterval(this.playerTimer);
    onStopPlay();
    this.setState({ progress:0,isReplyMode:true,currentTime:0,recordingDuration:0 });
    startRecording(() => {
      this.recorderTimer = setInterval(() => {
        const { recordingDuration } = this.state;        
        if (recordingDuration === 30) {
          this.sendAudioMessage();
        }else {
          this.setState({ recordingDuration:recordingDuration+1,progress:(recordingDuration+1)*3.34 });
        }
      }, 1000);
    });
  }

  // Toggle between play and pause
  handlePausePlay = (isPlaying) => {
    if (!isPlaying) {
      onPausePlay(this.playbackPaused);      
    } else {
      onStartPlay(this.state.currentPlayingItem.fileName,this.playbackStarted,this.playbackStopped); // Start audio player.
    }
  }

  // Stop Player
  handleStopPlay = () => {
    clearInterval(this.playerTimer);
    if (this.state.isPlaying) {
      onStopPlay();
    }
  }

  // Change player to recorder
  handleReplyAction = () => {
    // const { isReplyMode } = this.state;
    // isReplyMode ? this.sendAudioMessage() : this.startRecording();
  }

  // Hide player/Recorder
  handleDismissAction = () => {
    clearInterval(this.playerTimer);
    if (this.state.isPlaying) {
      onStopPlay();
      this.resetRecorderData(true);
    }
  }

  // Load next set of messages if there are any.
  loadMoreMessage = async() => {
    const { pageNo,isMoreMessageAvaialble,messageLoading } = this.props;
    if (!messageLoading) {
      if (isMoreMessageAvaialble) {
        try {
          const res =  await this.props.getMessageList(pageNo+1,this.socketMsgCount);
          if(res.status){
            this.socketMsgCount = 0;
          }
        } catch(e){
          alert({ e });
        }
      }
    }
  }
  // Toggle method to handle setting screen open or close.
  toggleSettingStatus = () => {
    const { navigation } = this.props;
    navigation.navigate('SettingScreen');
  }

  //  Render extra space at the end of message list
  renderFooter = () => <View style={styles.footerViewStyle}/>

  //  Render message cell
  renderMessageCell = ({ item, index, section }) => <MessageCell
    item={item}
    index={index}
    currentPlayingID={this.state.currentMessageID}
    isPlaying={this.state.isPlaying}
    section={section}
    isLoading={this.state.isLoading}
    onStartPlayback={this.startPlay}
  />

  //  Render header cell
  renderSectionCell = ({ section: { title } }) => <SectionHeaderCell date={title}/>

  // render player view at the bottom of screen
  renderPlayerView = () => {
    const{ currentPlayingItem, currentMessageID, progress, isPlaying, isReplyMode } = this.state;
    return (
      <View style={styles.searchContainer}>  
        <FloatingActionItem
          animated
          active
          distanceToEdge={scale(29)}
          item={currentPlayingItem}
          position={'right'}
          containerView={isReplyMode ? 'recorder' :'player'}
          progress={progress}
          duration={this.getCurentTime()}
          selectedItemId={currentMessageID}
          isPlay = {isPlaying}
          onOpenPress={this.handleReplyAction}
          onClosePress={this.handleDismissAction}
          onPlayOrPausePress={this.handlePausePlay}
        />
      </View>
    );
  }
  
  renderMessageList = () => {
    const { groupedList } = this.props;

    return (
      <View style={styles.screenCard}>
        <Image style={styles.backgroundImage} source={Images.dotsPatternBg}/>
        <SectionList
          renderItem={this.renderMessageCell}
          getItemLayout={(data, index) => (
            { length: scale(122), offset: scale(122) * index, index }
          )}
          style={styles.sectionList}
          renderSectionHeader={this.renderSectionCell}
          sections={groupedList}
          keyExtractor={(item, index) => item + index}
          onEndReachedThreshold={0.5}
          onEndReached={this.loadMoreMessage}
        />
      </View>
    );
  }
  
  render() {
    const {  isSearchVisible, isPlaying } = this.state;

    return (
      <View style={styles.screen}>
        <View style={styles.screenBackground}>
          <Image source={Images.dotsPattern} style={styles.backgroundImage} />
          <CustomHeader
            isSearchVisible={isSearchVisible}
            leftButtonIcon={Icons.icSettings}
            titleIcon={Icons.icYacWithText}
            rightButtonIcon={Icons.icSearch}
            leftButtonPress={this.toggleSettingStatus}
            rightButtonPress={() => this.setState({ isSearchVisible: !isSearchVisible })}
          />
          {this.renderMessageList()}
          {isPlaying && this.renderPlayerView()}
          {/* { isPlaying ? 
            this.renderPlayerView()
            : 
            <FloatingAction list={friendList} position='right' />
          } */}
        </View>
      </View>
    );
  }
}

FriendListScreen.propTypes = {
  getMessageList: PropTypes.func,
  loading: PropTypes.bool,
  user: PropTypes.objectm,
  readMessage: PropTypes.func,
  pageNo:PropTypes.number,
  groupedList:PropTypes.array,
  isMoreMessageAvaialble:PropTypes.bool,
  messageLoading:PropTypes.bool,
  receivedNewMessage:PropTypes.func
};

const mapStateToProps = ({ signInReducer,messageReducer }) => ({
  error: signInReducer.error,
  user: signInReducer.user,
  loading: signInReducer.loading,
  messageLoading:messageReducer.loading,
  pageNo:messageReducer.pageNumber,
  groupedList:messageReducer.groupedList,
  isMoreMessageAvaialble:messageReducer.hasMore,
  messageError:messageReducer.error
});
  
const mapDispatchToProps ={
  readMessage,
  getMessageList,
  receivedNewMessage

};

// export default SignUpScreen;
export default connect(mapStateToProps, mapDispatchToProps)(FriendListScreen);

