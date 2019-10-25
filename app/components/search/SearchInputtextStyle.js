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
  searchContainer: {
    flexDirection: 'row'
  },
  searchGradient: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(50)/2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.purpleBorder
  },
  searchView: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(46)/2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary
  },
  search: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain'
  },
  inputTextGradient: {
    flex: 1,
    height: verticalScale(50),
    borderRadius: verticalScale(35),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:Colors.purpleBorder,
    marginRight: scale(10)
  },
  inputTextView: {
    width: '99%',
    height: verticalScale(46),
    borderRadius: verticalScale(31),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary
  },
  inputText: {
    width: '90%',
    height: verticalScale(46),
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: moderateScale(16),
    opacity: 0.50
  },
  itemGradient: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(64)/2,
    backgroundColor:Colors.purpleBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(10)
  },
  itemView: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(60)/2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary
  },
  item: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(60)/2,
    resizeMode: 'contain'
  },
  list: {
    height: scale(65),
    marginTop: verticalScale(3)
  }
});

export default styles;
