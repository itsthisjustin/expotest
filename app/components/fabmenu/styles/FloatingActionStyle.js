import { StyleSheet, Platform } from 'react-native';
import { Colors, width, verticalScale } from '../../../theme';

const ACTION_BUTTON_SIZE = 56;

const styles = StyleSheet.create({
  actions: {
    height: '70%',
    position: 'absolute',
    bottom: 85,
    left: 0,
    right: 0
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    elevation: 0
  },
  buttonContainer: {
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',
    width: ACTION_BUTTON_SIZE,
    height: ACTION_BUTTON_SIZE,
    borderRadius: ACTION_BUTTON_SIZE/2,
    alignItems: 'center',
    justifyContent: 'center',
    //elevation: 5,
    position: 'absolute'
  },
  button: {
    width: ACTION_BUTTON_SIZE,
    height: ACTION_BUTTON_SIZE,
    borderRadius: ACTION_BUTTON_SIZE/2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: Colors.purpleBorder
  },
  // eslint-disable-next-line react-native/no-unused-styles
  rightButton: {},
  // eslint-disable-next-line react-native/no-unused-styles
  leftButton: {},
  // eslint-disable-next-line react-native/no-unused-styles
  centerButton: {
    left: width / 2 - 28
  },
  buttonTextContainer: {
    borderRadius: ACTION_BUTTON_SIZE/2,
    width: ACTION_BUTTON_SIZE,
    height: ACTION_BUTTON_SIZE,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fabIcon: { 
    width: ACTION_BUTTON_SIZE/2, 
    height: ACTION_BUTTON_SIZE/2
  },
  searchContainer: {
    position:'absolute', 
    top:0, 
    left:0, 
    right:0
  },
  listContainer: {
    flex: 1,
    paddingVertical: verticalScale(40)
  },
  listFirstItem: {
    paddingTop: verticalScale(20)
  },
  listLastItem: {
    paddingBottom: verticalScale(20)
  },
  shadowContainer: {
    position: 'absolute'
  }
});

export default styles;
