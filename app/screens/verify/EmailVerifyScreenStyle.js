import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  verticalScale,
  scale,
  moderateScale
} from '../../theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  titleText: {
    color: Colors.primary,
    fontFamily: Fonts.bold,
    fontSize: moderateScale(22),
    letterSpacing: 0,
    alignSelf: 'center',
    paddingHorizontal: scale(20),
    marginTop: verticalScale(10)
  },
  descText: {
    color: Colors.primary,
    fontFamily: Fonts.regular,
    fontSize: moderateScale(18),
    letterSpacing: 0,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: verticalScale(10),
    paddingHorizontal: scale(20)
  },
  emailText: {
    color: Colors.primary,
    fontFamily: Fonts.medium,
    fontSize: moderateScale(18),
    letterSpacing: 0,
    opacity: 0.7,
    alignSelf: 'center',
    textAlign: 'center'
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: scale(20)
  },
  listSeparator: {
    height: 1,
    width: '100%',
    backgroundColor:  Colors.white,
    opacity: 0.30
  },
  otpCode: {
    marginTop: verticalScale(96)
  },
  optText: {
    color: Colors.primary,
    fontFamily: Fonts.bold,
    fontSize: moderateScale(30),
    letterSpacing: 0
  }
});

export default styles;
