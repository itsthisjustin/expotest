import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors } from '../../theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  noNetworkStyle:{
    borderColor:Colors.darkGray
  },
  noNetworkTextStyle:{
    color: Colors.darkGray
  }
});
  
export default styles;
