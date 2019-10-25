import { UPDATEPROFILE,ONBOARDINGSTATUS,API_FAILURE } from './../types';
import { urls,api } from '../../utils/api';


export const updateProfile = (data) => async (dispatch) => {
  try {
    dispatch(updateStarted());
    const resp = await api.put(urls.updateProfile,data);    
    dispatch(updateSuccess(resp.data));
    return Promise.resolve(resp.data);
  } catch (e) {
    dispatch(apiFailure(e.message));
    return Promise.reject(e);
  }
};

export const onboardingStatus = () => async (dispatch) => {
  try {
    dispatch(onboardingStarted());
    const resp = await api.post(urls.updateProfile,{ isDesktop:0 });    
    dispatch(onboardingSuccess(resp.data));
    return Promise.resolve(resp.data);
  } catch (e) {
    dispatch(apiFailure(e.message));
    return Promise.reject(e);
  }
};



const onboardingSuccess = (data) => ({
  type:ONBOARDINGSTATUS.SUCCESS,
  payload:{
    data: { ...data }
  }
});

const onboardingStarted = () => ({
  type: ONBOARDINGSTATUS.STARTED
});

export const apiFailure = error => ({
  type: API_FAILURE,
  payload: {
    error:error
  }
});

const updateSuccess = (data,username) => ({
  type:UPDATEPROFILE.UPDATEPROFILE_SUCCESS,
  payload:{
    data: { ...data,username:username }
  }
});

const updateStarted = () => ({
  type: UPDATEPROFILE.UPDATEPROFILE_STARTED
});
