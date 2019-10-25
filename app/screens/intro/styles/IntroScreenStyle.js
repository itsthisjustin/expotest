import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Colors,
  verticalScale
} from '../../../theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  viewPager: {
    flex: 1
  },
  pagerDotIndicator: {
    bottom: verticalScale(25)
  },
  defaultDots: {
    backgroundColor: Colors.purpleWith40opacity
  },
  selectedDots: {
    backgroundColor: Colors.gradientEnd
  }
});

export default styles;
