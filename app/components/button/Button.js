import React from 'react';
import PropTypes from 'prop-types';
import { Text,  Button,Spinner } from 'native-base';
import styles from './ButtonStyle';
import { connect } from 'react-redux';
import { Colors } from '../../theme';

const NetworkButton = props => {
  const { title,onPress,loading,isConnected,customStyle = null } = props;
  let stylesToApply = [styles.buttons];
  let buttonTextStyle = [styles.buttonText];
  if (!isConnected) {
    stylesToApply.push(styles.noNetworkStyle);
    buttonTextStyle.push(styles.noNetworkTextStyle);
  }
  stylesToApply.push(customStyle);
  return (
    <Button full disabled={loading || !isConnected} style={stylesToApply} onPress={onPress}>
      {loading ? <Spinner color={Colors.white}></Spinner> : <Text style={buttonTextStyle}>{title}</Text>}
    </Button>
  );
};

NetworkButton.propTypes = {
  isConnected: PropTypes.bool,
  title: PropTypes.string,
  onPress: PropTypes.func,
  loading:PropTypes.bool,
  customStyle: PropTypes.any
};

const mapStateToProps = ({ network }) => ({
  isConnected: network.isConnected
});
    
// export default SignUpScreen;
export default connect(mapStateToProps)(NetworkButton);
