/* eslint-disable no-restricted-syntax */
import io from 'socket.io-client';
import { DeviceEventEmitter } from 'react-native';
let socket; 
//DEV  -> http://yacapi-env.mrhmefj5vg.us-east-1.elasticbeanstalk.com/api/v1
//LIVE -> http://3.216.8.204:8080/api/v1
export const setUpSocket = (token,userSecret) => {
  socket = io('http://3.216.8.204:8080', {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity
  });
  socket.on('connect', () => {
    socket.emit('createRoom', {
      token: token,
      method: 'joinRoom'
    });
    socket.on(userSecret, onReceivedMessage);
    socket.emit('globalListeners', {
      token: token,
      method: 'getFriendList'
    });
  }); 
};

function onReceivedMessage(content) {  
  if (content.users){
    DeviceEventEmitter.emit('userList', content );
  }
  if (content.isMobile){
    DeviceEventEmitter.emit('newMessage', content );
  }
}
