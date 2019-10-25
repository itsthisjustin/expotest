import { create } from 'apisauce';
//DEV  -> http://yacapi-env.mrhmefj5vg.us-east-1.elasticbeanstalk.com/api/v1
//LIVE -> http://3.216.8.204:8080/api/v1 
export const api = create({
  baseURL: 'http://3.216.8.204:8080/api/v1/'
});

export const urls = {
  signin:'users/signin',
  verifyCode:'users/login',
  updateProfile:'users/update',
  onboardingStatus:'users/onBoarding',
  readMessage: 'message/read',
  sendMessage: 'message/save',
  messageList: 'message/list'
}
;

