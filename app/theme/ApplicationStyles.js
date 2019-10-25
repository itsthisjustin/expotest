import { Colors, Fonts, verticalScale, scale, moderateScale } from './';
import { Platform, NativeModules } from 'react-native';
const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 0 : StatusBarManager.HEIGHT;

const ApplicationStyles = {
  screen: {
    screen: {
      flex: 1
    },
    screenCard: {
      flex: 1,
      marginTop: verticalScale(20),
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      backgroundColor: Colors.white
    },
    screenBackground: {
      flex: 1,
      backgroundColor: Colors.primary
    },
    headerTransparent: {
      marginTop: verticalScale(STATUSBAR_HEIGHT),
      backgroundColor: Colors.transparent
    },
    backgroundImage: {
      resizeMode: 'cover',
      height: '30%',
      width: '100%',
      position: 'absolute'
    },
    titleTextStyle:{
      color: Colors.primary,
      fontFamily: Fonts.bold,
      fontSize: moderateScale(22),
      letterSpacing: 0,
      alignSelf: 'center'
    },
    buttons: {
      height: verticalScale(63),
      borderRadius: 5,
      marginHorizontal: scale(20),
      backgroundColor: Colors.primary,
      marginBottom: verticalScale(Platform.OS === 'ios' ? 50 : 25)
    },
    buttonText: {
      color: Colors.white,
      fontFamily: Fonts.bold,
      fontSize: moderateScale(18),
      letterSpacing: 0,
      alignSelf: 'center'
    },
    whiteIcon: {
      width: scale(24),
      height: scale(24),
      tintColor: Colors.white
    },
    listSeparator: {
      height: 1,
      width: '100%',
      opacity: 0.2,
      backgroundColor: Colors.primary
    }
  }
};

export default ApplicationStyles;
