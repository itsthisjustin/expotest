import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, moderateScale, verticalScale, scale } from '../../theme';
import { Fonts } from '../../assets';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    marginHorizontal: scale(9)
  },
  headerView: {
    flex: 1, 
    flexDirection: 'row',
    marginHorizontal: scale(11)
  },
  headerWithOutLineStyle:{
    borderBottomWidth:0,
    elevation:0 
  },
  bodyStyle: {
    flex: 1,
    flexGrow: 4,
    flexShrink: 0,
    alignItems: 'center',
    alignSelf:'center',
    paddingHorizontal: scale(5)
  },
  leftButtonStyle: {
    flex: 1.5,
    flexShrink: 5,
    flexDirection:'row' ,
    alignItems: 'center',
    paddingRight: scale(5)
  },
  logo: {
    resizeMode: 'contain',
    height: verticalScale(32),
    width: scale(67)
  },
  rightButtonStyle: {
    flex: 1.5,
    flexShrink: 5,
    flexDirection:'row' ,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  titleText: {
    color: Colors.white,
    fontFamily: Fonts.rbMedium,
    fontSize: moderateScale(18),
    letterSpacing: 0
  },
  rightButtonText: {
    color: Colors.white,
    fontFamily: Fonts.rbRegular,
    fontSize: moderateScale(18),
    letterSpacing: 0,
    alignSelf: 'center'
  }
});

export default styles;
