import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { View, TextInput, ViewPropTypes } from 'react-native';
import styles from './ConfirmationCodeInputStyle';

// if ViewPropTypes is not defined fall back to View.propType (to support RN < 0.44)
const viewPropTypes = ViewPropTypes || View.propTypes;

class ConfirmationCodeInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      codeArr: new Array(this.props.codeLength).fill(''),
      currentIndex: 0
    };

    this.codeInputRefs = [];
  }

  componentDidMount() {
    const { compareWithCode, codeLength, inputPosition, defaultCode } = this.props;
    if (compareWithCode && compareWithCode.length !== codeLength) {
      console.warn(
        'Invalid props: compareWith length is not equal to codeLength'
      );
    }

    if (
      _.indexOf(['center', 'left', 'right', 'full-width'], inputPosition) === -1
    ) {
      console.warn(
        'Invalid input position. Must be in: center, left, right, full'
      );
    }

    if (defaultCode && defaultCode.length !== codeLength) {
      console.warn('Invalid props: defaultCode length is not equal to codeLength');
    }
    else {
      this.setState({
        codeArr: _.split(defaultCode, '')
      });
    }
  }

  clear() {
    this.setState({
      codeArr: new Array(this.props.codeLength).fill(''),
      currentIndex: 0
    });
    this.setFocus(0);
  }

  setFocus(index) {
    this.codeInputRefs[index].focus();
  }

  blur(index) {
    this.codeInputRefs[index].blur();
  }

  onFocus(index) {
    const { onChangeCode } = this.props;

    let newCodeArr = _.clone(this.state.codeArr);
    const currentEmptyIndex = _.findIndex(newCodeArr, c => !c);
    if (currentEmptyIndex !== -1 && currentEmptyIndex < index) {
      return this.setFocus(currentEmptyIndex);
    }
    
    /* eslint-disable */
    for (const i in newCodeArr) {
      if (i >= index) {
        newCodeArr[i] = '';
      }
    }

    if (onChangeCode) {
      onChangeCode(newCodeArr.join(''));
    }

    this.setState({
      codeArr: newCodeArr,
      currentIndex: index
    });
  }

  isMatchingCode(code, compareWithCode, ignoreCase = false) {
    if (ignoreCase) {
      return code.toLowerCase() === compareWithCode.toLowerCase();
    }
    return code === compareWithCode;
  }

  getContainerStyle(size, position) {
    switch (position) {
    case 'left':
      return {
        justifyContent: 'flex-start',
        height: size
      };
    case 'center':
      return {
        justifyContent: 'center',
        height: size
      };
    case 'right':
      return {
        justifyContent: 'flex-end',
        height: size
      };
    default:
      return {
        justifyContent: 'space-between',
        height: size
      };
    }
  }

  getInputSpaceStyle(space) {
    const { inputPosition } = this.props;
    switch (inputPosition) {
    case 'left':
      return {
        marginRight: space
      };
    case 'center':
      return {
        marginRight: space / 2,
        marginLeft: space / 2
      };
    case 'right':
      return {
        marginLeft: space
      };
    default:
      return {
        marginRight: 0,
        marginLeft: 0
      };
    }
  }

  getClassStyle(className, active) {
    const { cellBorderWidth, activeColor, inactiveColor, space } = this.props;
    let classStyle = {
      ...this.getInputSpaceStyle(space),
      color: activeColor
    };

    switch (className) {
    case 'clear':
      return _.merge(classStyle, { borderWidth: 0 });
    case 'border-box':
      return _.merge(classStyle, {
        borderWidth: cellBorderWidth,
        borderColor: active ? activeColor : inactiveColor
      });
    case 'border-circle':
      return _.merge(classStyle, {
        borderWidth: cellBorderWidth,
        borderRadius: 50,
        borderColor: active ? activeColor : inactiveColor
      });
    case 'border-b':
      return _.merge(classStyle, {
        borderBottomWidth: cellBorderWidth,
        borderColor: active ? activeColor : inactiveColor
      });
    case 'border-b-t':
      return _.merge(classStyle, {
        borderTopWidth: cellBorderWidth,
        borderBottomWidth: cellBorderWidth,
        borderColor: active ? activeColor : inactiveColor
      });
    case 'border-l-r':
      return _.merge(classStyle, {
        borderLeftWidth: cellBorderWidth,
        borderRightWidth: cellBorderWidth,
        borderColor: active ? activeColor : inactiveColor
      });
    default:
      return className;
    }
  }

  onKeyPress(e) {
    if (e.nativeEvent.key === 'Backspace') {
      const { currentIndex } = this.state;
      const nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
      this.setFocus(nextIndex);
    }
  }

  onInputCode(character, index) {
    const { codeLength, onFulfill, compareWithCode, ignoreCase, onChangeCode, onCodeAdd } = this.props;
    let newCodeArr = _.clone(this.state.codeArr);
    newCodeArr[index] = character;

    if (index === codeLength - 1) {
      const code = newCodeArr.join('');

      if (compareWithCode) {
        const isMatching = this.isMatchingCode(
          code,
          compareWithCode,
          ignoreCase
        );
        if (onFulfill) {
          onFulfill(isMatching, code);
        }
        !isMatching && this.clear();
      } else {
        if (onFulfill) {
          onFulfill(code);
        }
      }
      this.blur(this.state.currentIndex);

      if (onChangeCode) {
        onChangeCode(code);
      }
    } else {
      this.setFocus(this.state.currentIndex + 1);
    }

    if(onCodeAdd) {
      onCodeAdd(newCodeArr.join(''));
    }
    
    this.setState(prevState => {
      return {
        codeArr: newCodeArr,
        currentIndex: prevState.currentIndex + 1
      };
    });
  }

  render() {
    const {
      codeLength,
      codeInputStyle,
      containerStyle,
      inputPosition,
      autoFocus,
      className,
      size,
      activeColor
    } = this.props;

    const initialCodeInputStyle = {
      width: size,
      height: size
    };

    let codeInputs = [];
    for (let i = 0; i < codeLength; i++) {
      const id = i;
      codeInputs.push(
        <TextInput
          key={id}
          ref={ref => (this.codeInputRefs[id] = ref)}
          style={[
            styles.codeInput,
            initialCodeInputStyle,
            this.getClassStyle(className, this.state.currentIndex === id),
            codeInputStyle
          ]}
          underlineColorAndroid="transparent"
          selectionColor={activeColor}
          keyboardType={'name-phone-pad'}
          returnKeyType={'done'}
          {...this.props}
          autoFocus={autoFocus && id === 0}
          value={
            this.state.codeArr[id] ? this.state.codeArr[id].toString() : ''
          }
          maxLength={1}
          onFocus={() => this.onFocus(id)}
          onChangeText={text => this.onInputCode(text, id)}
          onKeyPress={e => this.onKeyPress(e)}
        />
      );
    }

    return (
      <View
        style={[
          styles.container,
          this.getContainerStyle(size, inputPosition),
          containerStyle
        ]}
      >
        {codeInputs}
      </View>
    );
  }
}

ConfirmationCodeInput.propTypes = {
  codeLength: PropTypes.number,
  compareWithCode: PropTypes.string,
  inputPosition: PropTypes.string,
  size: PropTypes.number,
  space: PropTypes.number,
  className: PropTypes.string,
  cellBorderWidth: PropTypes.number,
  activeColor: PropTypes.string,
  inactiveColor: PropTypes.string,
  ignoreCase: PropTypes.bool,
  autoFocus: PropTypes.bool,
  codeInputStyle: TextInput.propTypes.style,
  containerStyle: viewPropTypes.style,
  onFulfill: PropTypes.func,
  onCodeAdd: PropTypes.func,
  onChangeCode: PropTypes.func,
  defaultCode: PropTypes.string
};

ConfirmationCodeInput.defaultProps = {
  codeLength: 5,
  inputPosition: 'center',
  autoFocus: true,
  size: 40,
  className: 'border-box',
  cellBorderWidth: 1,
  activeColor: 'rgba(255, 255, 255, 1)',
  inactiveColor: 'rgba(255, 255, 255, 0.2)',
  space: 8,
  compareWithCode: '',
  ignoreCase: false,
  defaultCode: ''
};

export default ConfirmationCodeInput;


