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
    marginTop: verticalScale(15)
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
  centerContainer: {
    top:'20%',
    left:'5%',
    height:'60%',
    width:'89.3%',
    position:'absolute',
    justifyContent: 'center'
  },
  inputTextContainer: {
    flexDirection: 'row'
  },
  inputText: {
    flex: 1,
    height: verticalScale(50),
    color: Colors.primary,
    fontFamily: Fonts.regular,
    fontSize: moderateScale(16)
  },
  rightImage: {
    height: scale(24),
    width: scale(24),
    alignSelf: 'center'
  },
  emailText: {
    color: Colors.primary,
    fontFamily: Fonts.medium,
    fontSize: moderateScale(18),
    letterSpacing: 0,
    alignSelf: 'center',
    textAlign: 'center'
  },
  listSeparator: {
    height: 1,
    width: '100%',
    backgroundColor:  Colors.primary,
    opacity: 0.30
  }
});

export default styles;
