import { StyleSheet } from 'react-native';
import { Colors, scale, verticalScale, moderateScale, Fonts } from '../../../theme';

const ACTION_BUTTON_SIZE = 56;

const styles = StyleSheet.create({
  container: {
    elevation: 0,
    flex: 1,
    flexDirection: 'column'
  },
  actionContainer: {
    elevation: 0,
    flex: 1,
    flexDirection: 'row'
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  rightItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  leftItemContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end'
  },
  button: {
    width: scale(ACTION_BUTTON_SIZE),
    height: scale(ACTION_BUTTON_SIZE),
    borderRadius: scale(ACTION_BUTTON_SIZE)/2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: Colors.purpleBorder
  },
  iconLogo: {
    resizeMode: 'contain',
    width: scale(ACTION_BUTTON_SIZE),
    height: scale(ACTION_BUTTON_SIZE),
    borderRadius: scale(ACTION_BUTTON_SIZE/2)
  },
  icon: {
    resizeMode: 'contain',
    width: scale(ACTION_BUTTON_SIZE/2),
    height: scale(ACTION_BUTTON_SIZE/2),
    borderRadius: scale(ACTION_BUTTON_SIZE/4)
  },
  inputTextView: {
    flex: 1,
    height: scale(ACTION_BUTTON_SIZE),
    borderRadius: scale(ACTION_BUTTON_SIZE-19),
    backgroundColor: Colors.primary,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: Colors.purpleBorder,
    marginHorizontal: scale(10)
  },
  inputText: {
    flex: 1,
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: moderateScale(16),
    opacity: 0.50,
    marginHorizontal: scale(10)
  },
  recorderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(10)
  },
  timerText: {
    fontFamily: Fonts.bold,
    fontSize: moderateScale(10),
    letterSpacing: 0,
    textAlign: 'right',
    color: Colors.white
  },
  sliderRecorderContainer: {
    flex: 1,
    marginHorizontal: scale(10)
  },
  sliderPlayerContainer: {
    flex: 1,
    marginRight: scale(10)
  },  
  track: {
    height: 2,
    backgroundColor: Colors.white
  },
  thumb: {
    width: 9,
    height: 9,
    backgroundColor: Colors.newPurple,
    borderRadius: 9 / 2,
    shadowColor: Colors.newPurple,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 1
  },
  thumbTouch: {
    width: 20, 
    height: 20
  },
  textStyle:{
    width: scale(ACTION_BUTTON_SIZE),
    height: scale(ACTION_BUTTON_SIZE),
    borderRadius: scale(ACTION_BUTTON_SIZE/2),
    backgroundColor: Colors.primary,
    fontFamily: Fonts.medium,
    fontSize: moderateScale(20),
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.white,
    lineHeight: scale(ACTION_BUTTON_SIZE)
  },
  recorderTextStyle:{
    width: scale(ACTION_BUTTON_SIZE/2),
    height: scale(ACTION_BUTTON_SIZE/2),
    borderRadius: scale(ACTION_BUTTON_SIZE/4),
    fontFamily: Fonts.medium,
    fontSize: moderateScale(10),
    letterSpacing: 0,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.white,
    lineHeight: scale(ACTION_BUTTON_SIZE/2-2),
    backgroundColor: Colors.primary,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.purpleBorder
  },
  searchList: {
    marginTop: verticalScale(5)
  },
  searchItemContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  searchItemView: {
    marginRight: scale(10),
    marginBottom: scale(10)
  }
});

export default styles;
