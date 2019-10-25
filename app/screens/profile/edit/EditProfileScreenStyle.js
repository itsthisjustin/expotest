import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  scale,
  verticalScale,
  moderateScale,
  Fonts
} from '../../../theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  titleText: {
    flex: 1,
    color: Colors.primary,
    fontFamily: Fonts.bold,
    fontSize: moderateScale(22),
    letterSpacing: 0,
    alignSelf: 'center'
  },
  headerContainer: {
    width: '100%',
    height: verticalScale(65),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20)
  },
  exitIcon: {
    width: scale(24),
    height: scale(24),
    tintColor: Colors.primary
  },
  itemContainer: {
    width: '100%'
  },
  itemTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(63),
    paddingHorizontal: scale(20)
  },
  uploadIconContainer:{
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    height: verticalScale(140),
    width: verticalScale(140),
    borderRadius: verticalScale(70),
    backgroundColor:Colors.primary50opacity
  },
  itemText: {
    fontFamily: Fonts.medium,
    fontSize: moderateScale(18),
    letterSpacing: 0,
    color: Colors.primary 
  },
  nameTextStyle:{
    flex: 1,
    opacity: 0.8,
    textAlign: 'right',
    fontFamily: Fonts.regular,
    fontSize: moderateScale(18),
    letterSpacing: 0,
    color: Colors.primary
  },
  imageButtonStyle:{
    width: verticalScale(140),
    alignSelf: 'center'
  },
  imageRadius:{
    height: verticalScale(140),
    width: verticalScale(140),
    backgroundColor: Colors.primary,
    borderRadius: verticalScale(70),
    alignSelf: 'center'
  },
  profileContainer:{
    alignItems:'center',
    justifyContent:'center'
  },
  saveButton: {
    marginTop: verticalScale(90),
    backgroundColor: Colors.primary
  }
});

export default styles;
