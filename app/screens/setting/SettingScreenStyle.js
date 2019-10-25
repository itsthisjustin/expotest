import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  scale,
  verticalScale,
  moderateScale,
  Fonts
} from '../../theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  titleText: {
    color: Colors.primary,
    fontFamily: Fonts.bold,
    fontSize: moderateScale(22),
    letterSpacing: 0,
    alignSelf: 'flex-start',
    paddingHorizontal: scale(20),
    marginTop: verticalScale(15)
  },
  itemContainer: {
    width: '100%'
  },
  cardBackgroundImage: {
    width: '100%',
    height: '93%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  headerBackgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  itemTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(63),
    paddingHorizontal: scale(20)
  },
  itemNormalText: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: moderateScale(18),
    letterSpacing: 0,
    color: Colors.primary 
  },
  itemBoldText: {
    flex: 1,
    fontFamily: Fonts.bold,
    fontSize: moderateScale(18),
    letterSpacing: 0,
    color: Colors.primary 
  },
  versionTextStyle:{
    fontFamily: Fonts.regular,
    fontSize: moderateScale(18),
    opacity: 0.65,
    letterSpacing: 0,
    color: Colors.primary,
    alignSelf:'center',
    position: 'absolute', 
    bottom:'5%' 
  }
});

export default styles;
