import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Fonts, moderateScale, verticalScale, scale } from '../../../theme';

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
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  images: {
    alignSelf: 'center'
  }
});
  
export default styles;
