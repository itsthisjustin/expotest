import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, moderateScale, scale } from '../../theme';
import { Fonts } from '../../assets';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  containerStyle:{
    width:'100%',
    height:scale(122),
    justifyContent: 'space-between',
    backgroundColor: Colors.white
  },
  mainContainer: {
    height:scale(67),
    flexDirection:'row',
    alignItems: 'center',
    marginHorizontal:scale(20)
  },
  transparentBg:{
    backgroundColor: Colors.transparent
  },
  avatarStyle:{
    width: scale(60),
    height: scale(60),
    borderWidth: scale(2),
    borderRadius: scale(30),
    backgroundColor:Colors.defaultViewPagerDot,
    borderColor:Colors.primary
  },
  durationViewStyle:{
    width: scale(33),
    height: scale(13),
    borderRadius: scale(7),
    alignSelf:'center',
    justifyContent:'center',
    marginTop:scale(-7),
    backgroundColor: Colors.primary
  },
  playViewStyle:{
    width: scale(50),
    height: scale(50),
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: scale(25),
    backgroundColor: Colors.transparent
  },
  playViewNewStyle:{
    marginLeft:scale(54)
  },
  playViewBgStyle:{
    backgroundColor: Colors.purpleWith40opacity
  },
  iconNormalBg:{
    tintColor: Colors.newPurple
  },
  durationTextStyle:{
    fontFamily: Fonts.bold,
    fontSize: moderateScale(8),
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.white
  },
  nameViewStyle:{
    marginHorizontal:scale(15)
  },
  nameTextStyle:{
    fontFamily: Fonts.bold,
    fontSize: moderateScale(14),
    textAlign:'left',
    letterSpacing: 0,
    color: Colors.primary
  },
  agoTextStyle:{
    opacity: 0.6,
    fontFamily: Fonts.regular,
    fontSize: moderateScale(12),
    letterSpacing: 0,
    color: Colors.primary
  },
  nowPlayingViewStyle:{
    flexDirection:'row',
    alignItems:'center'  
  },
  nowPlayingStyle:{
    marginLeft:scale(18),
    marginRight:scale(10),
    fontFamily: Fonts.medium,
    fontSize: moderateScale(14),
    letterSpacing: 0,
    textAlign:'right',
    color: Colors.purpleBorder
  },
  newViewStyle:{
    backgroundColor: Colors.newPurple,
    marginTop:scale(0)
  }
});
export default styles;
