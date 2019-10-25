import { StyleSheet } from 'react-native';
import { Colors, verticalScale } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: verticalScale(20)
  },
  codeInput: {
    backgroundColor: Colors.transparent,
    textAlign: 'center',
    padding: 0
  }
});

export default styles;
