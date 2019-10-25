import { urls,api } from '../../utils/api';
import { apiFailure } from './profileAction';
import { GETMESSAGELIST,GETNEWMESSAGE, READMESSAGE } from '../types';

export const sendMessage = (data) => async () => {
  try {
    var audio = {
      uri: data.file,
      type: 'audio/mp4',
      name: data.fileName
    };
    var body = new FormData();
    body.append('file', audio);
    body.append('type', 'AUDIO');
    body.append('to', data.id);
    body.append('duration', data.recordingDuration);
    const resp = await api.post(urls.sendMessage,body);    
    return Promise.resolve(resp.data);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const receivedNewMessage = (msg) => async(dispatch) => {
  dispatch(getNewMessageSuccess(msg));
};

export const readMessage = (data) => async(dispatch) => {
  try {
    dispatch(readMessageStarted());
    const resp = await api.post(urls.readMessage,data);    
    dispatch(readMessageSuccess(resp.data,data.id));
    return Promise.resolve(resp.data);
  } catch (e) {
    dispatch(apiFailure(e.message));
    return Promise.reject(e);
  }
};

export const getMessageList = (page,socket_limit = 0) => async (dispatch) => {
  try {
    dispatch(getMessageStarted());
    const resp = await api.get(urls.messageList,{ 'page_number':page,'limit':20,'socket_limit':socket_limit });
    dispatch(getMessageSuccess(resp.data,page));
    return Promise.resolve(resp.data,page);
  } catch (e) {
    dispatch(apiFailure(e.message));
    return Promise.reject(e);
  }
};

const getMessageSuccess = (data,page) => ({
  type:GETMESSAGELIST.SUCCESS,
  payload:{
    data: { ...data },
    page: page
  }
});

const getNewMessageSuccess = (msg) => ({
  type:GETNEWMESSAGE.SUCCESS,
  payload:{
    data: msg
  }
});

const getMessageStarted = () => ({
  type: GETMESSAGELIST.STARTED
});

const readMessageSuccess = (msg,id) => ({
  type:READMESSAGE.SUCCESS,
  payload:{
    data: msg,
    id:id
  }
});

const readMessageStarted = () => ({
  type: READMESSAGE.STARTED
});
