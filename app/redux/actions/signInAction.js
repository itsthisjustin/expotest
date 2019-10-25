import { SIGINTYPE,VERIFYOTP } from './../types';
import { urls,api } from '../../utils/api';
import { apiFailure } from './profileAction';


export const signIn = (email) => async (dispatch) => {
  try {
    dispatch(signInStarted());
    const resp = await api.post(urls.signin,{ email:email });
    dispatch(signInSuccess(resp.data));
    return Promise.resolve(resp.data);
  } catch (e) {
    dispatch(apiFailure(e.message));
    return Promise.reject(e);
  }
};

export const signOut = () => async(dispatch) => {
  try {
    dispatch(signInLogOut());
    api.setHeader('authorization', null);
    return Promise.resolve(true);
  } catch (e) {
    dispatch(apiFailure(e.message));
    return Promise.reject(e);
  }
};

export const verifyOTP = (email,otp) => async (dispatch) => {
  try {
    dispatch(verifyStarted());
    const resp = await api.post(urls.verifyCode,{ email:email,loginCode:otp });
    dispatch(verifySuccess(resp.data));
    return Promise.resolve(resp.data);
  } catch (e) {
    dispatch(apiFailure(e.message));
    return Promise.reject(e);
  }
};

const signInLogOut = () => ({
  type:SIGINTYPE.SIGNUP_LOGOUT
});

const signInSuccess = (data) => ({
  type:SIGINTYPE.SIGNUP_SUCCESS,
  payload:{
    data: { ...data,isVerified:false }
  }
});

const signInStarted = () => ({
  type: SIGINTYPE.SIGNUP_STARTED
});

const verifySuccess = (data) => ({
  type:VERIFYOTP.VERIFYOTP_SUCCESS,
  payload:{
    data: { ...data,isVerified:true }
  }
});

const verifyStarted = () => ({
  type: VERIFYOTP.VERIFYOTP_STARTED
});
