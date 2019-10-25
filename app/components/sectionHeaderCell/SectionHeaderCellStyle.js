import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, moderateScale, scale } from '../../theme';
import { Fonts } from '../../assets';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  containerStyle:{
    height:scale(32),
    width:'100%',
    backgroundColor:Colors.white
  },
  textContainer:{
    alignItems:'center'  ,
    justifyContent: 'center'
  },
  textStyle:{
    fontFamily: Fonts.bold,
    fontSize: moderateScale(12),
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.primary30opacity
  }
});
export default styles;
