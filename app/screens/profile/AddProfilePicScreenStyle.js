import { StyleSheet } from 'react-native';
import { ApplicationStyles, verticalScale, moderateScale, Fonts, scale, Colors } from '../../theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainerStyle:{
    ...ApplicationStyles.screen.screen,
    marginHorizontal:scale(20),
    alignItems: 'center'
  },
  titleText:{
    ...ApplicationStyles.screen.titleTextStyle,
    marginTop:verticalScale(15)
  },
  imageRadius:{
    height: verticalScale(140),
    width: verticalScale(140),
    borderRadius: verticalScale(70),
    backgroundColor: Colors.primary,
    alignSelf: 'center',
    resizeMode:'cover'
  },
  normalText:{
    color: Colors.primary,
    fontFamily: Fonts.regular,
    fontSize: moderateScale(18),
    letterSpacing: 0,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: verticalScale(25)
  },
  profileText:{
    fontSize: moderateScale(26)
  },
  profileContainer:{
    alignItems:'center',
    justifyContent:'center'
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

  imageButtonStyle:{
    width: verticalScale(140),
    marginTop:verticalScale(5)
  },
  textInputStyle: {
    width:'100%',
    height:verticalScale(48),
    marginTop:verticalScale(22),
    borderBottomWidth: 1
  },
  lineColorEmpty:{
    borderBottomColor:Colors.primaryTransparent
  },
  lineColorNormal:{
    borderBottomColor: Colors.primary
  },
  nameTextStyle:{
    fontFamily: Fonts.regular,
    fontSize: moderateScale(16),
    letterSpacing: 0,
    color: Colors.primary
  }
})
;

export default styles;

