import { SIGINTYPE ,VERIFYOTP,UPDATEPROFILE,ONBOARDINGSTATUS,API_FAILURE } from './../types';

const initialState = {
  loading: false,
  user: null,
  error: null
};

const signInReducer = (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
  case ONBOARDINGSTATUS.SUCCESS:
    return{
      ...state,
      loading:false,
      user:{ ...state.user,
        onBoardingMobile:1
      }
    };
  case ONBOARDINGSTATUS.STARTED:
    return {
      ...state,
      loading:true
    };
  case UPDATEPROFILE.UPDATEPROFILE_STARTED:
    return {
      ...state,
      loading:true
    };
  case UPDATEPROFILE.UPDATEPROFILE_SUCCESS:
    return {
      ...state,
      loading:false,
      error:null,
      user:{ ...state.user,
        isVerified:true,
        skipUsername:true,
        realName:payload.data.data.realName,
        username:payload.data.data.username,
        image:payload.data.data.mobileImagePath
      }
    };
  case API_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  case SIGINTYPE.SIGNUP_STARTED:
    return {
      ...state,
      loading:true
    };
  case SIGINTYPE.SIGNUP_LOGOUT:
    return {
      ...initialState
    };
  case SIGINTYPE.SIGNUP_SUCCESS:    
    return {
      ...initialState,
      user:payload.data
    };
  
  case VERIFYOTP.VERIFYOTP_STARTED:
    return {
      ...state,
      loading:true
    };
  case VERIFYOTP.VERIFYOTP_SUCCESS:
    return {
      ...state,
      loading:false,
      error:null,
      user:{ ...payload.data.data,isVerified:true }
    };
  default:
    return state;
  }
};
export default signInReducer;
