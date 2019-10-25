import { Platform, Alert } from 'react-native';
import { checkPermissionForAudioRecord } from '../utils/androidPermissions';
import { Player, Recorder } from '@react-native-community/audio-toolkit';

//Audio Recorder
let recorder;

async function grantAndroidPermission() {
  checkPermissionForAudioRecord();
}

async function startRecording(callback) {
  if(Platform.OS === 'android') {
    const temp = await checkPermissionForAudioRecord();
    if(temp) {
      startRecord(callback);     
    } else {
      Alert.alert(
        'Permission Alert',
        'Record Audio Permission was denied!!',
        [            
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel'
          },
          { text: 'OK', onPress: grantAndroidPermission }
        ],
        { cancelable: false },
      );
    }
  } else {
    startRecord(callback);     
  } 
}

function startRecord(callback) {
  if(recorder === undefined || recorder === null) {
    const timestamp = Date.now();
    recorder = new Recorder(`audio_${timestamp}.mp4`, {
      bitrate: 256000,
      channels: 2,
      sampleRate: 44100,
      format : 'mp4',
      encoder : 'mp4',
      quality: 'max'
    }); 
    recorder.toggleRecord(callback);
  }
}

function stopRecording(callback) {
  if(recorder) {
    recorder.toggleRecord((err, stopped) => {
      callback && callback(err, stopped, recorder.fsPath);
      if(stopped) {
        recorder.destroy();
        recorder = null;
      }
    });
  }
} 


//Audio Player
let player;

function getCurrentProgress() {
  if (player) {
    let currentProgress = Math.max(0, player.currentTime) / player.duration;
    let currentTime = Math.max(0,parseInt(player.currentTime/1000));
    if (isNaN(currentProgress)) {
      currentProgress = 0;

    }
    return { currentProgress,currentTime:currentTime };
  }
  
}

async function onStartPlay(fileURL, playCallback, endedCallback,forceNewPlayer = false) {
  
  if(player){
    if (!forceNewPlayer) {
      if(player.state === 5 ){
        player.play(playCallback);
        return;
      }
    }
    player.stop();
    startNewPlayer(fileURL,playCallback,endedCallback);
  }else {
    startNewPlayer(fileURL,playCallback,endedCallback);
  }
}

async function onPausePlay(pausedCallback) {
  player.pause(pausedCallback);  
}

async function onStopPlay() {
  if (player){
    player.stop(() => {
      player.destroy();
    });
  }
}

function startNewPlayer(url, playCallback, endedCallback) {
  player =  new Player(url).play((err) => {
    if (err) {
      alert('Could not play this audio');
    } else {
      playCallback();
    }
  });
  player.on('ended', () => {
    endedCallback();
  });
}
  

export {
  startRecording,
  stopRecording,
  getCurrentProgress,
  onStartPlay,
  onPausePlay,
  onStopPlay  
};
