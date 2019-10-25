import { StyleSheet } from 'react-native';
import {
  ApplicationStyles, scale, Colors, verticalScale
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
  footerViewStyle:{
    width:'100%',
    height:scale(122),
    backgroundColor: Colors.white
  },
  searchContainer: {
    position:'absolute', 
    bottom:verticalScale(15), 
    left:0, 
    right:0
  },
  sectionList: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  }
});

export default styles;
