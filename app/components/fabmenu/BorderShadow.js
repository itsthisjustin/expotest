/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Colors } from '../../theme';
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import styles from './styles/BorderShadowStyle';

const BorderShadow = props => {
  const { side, width, color, border, opacity, inset, style } = props;

  const linear = key => {
    return [
      <Stop
        offset="0"
        stopColor={color}
        stopOpacity={opacity}
        key={key + 'Linear0'}
      />,
      <Stop
        offset="1"
        stopColor={color}
        stopOpacity="0"
        key={key + 'Linear1'}
      />
    ];
  };

  const lineWidth = border;

  return (
    <View style={[styles.container, style, { width: width }]}>
      {(() => {
        switch (side) {
        case 'top':
          return (
            <Svg
              height={lineWidth}
              key={side}
              width={width + lineWidth}
              style={[styles.svgContainer, { bottom: inset ? -lineWidth : 0 }]}
            >
              <Defs>
                <LinearGradient
                  id="bottom"
                  x1="0%"
                  x2="0%"
                  y1="0%"
                  y2="100%"
                >
                  {linear('BorderBottom')}
                </LinearGradient>
                <LinearGradient
                  id="bottom-inset"
                  x1="0%"
                  x2="0%"
                  y1="100%"
                  y2="0%"
                >
                  {linear('BorderBottomInset')}
                </LinearGradient>
              </Defs>
              <Rect
                x={0}
                y={0}
                width={width}
                height={lineWidth}
                fill={`url(#bottom${inset ? '-inset' : ''})`}
              />
            </Svg>
          );
        case 'bottom':
          return (
            <Svg
              height={lineWidth}
              key={side}
              width={width + lineWidth}
              style={[styles.svgContainer, { top: inset ? 0 : -lineWidth }]}
            >
              <Defs>
                <LinearGradient id="top" x1="0%" x2="0%" y1="100%" y2="0%">
                  {linear('BorderTop')}
                </LinearGradient>
                <LinearGradient
                  id="top-inset"
                  x1="0%"
                  x2="0%"
                  y1="0%"
                  y2="100%"
                >
                  {linear('BorderTopInset')}
                </LinearGradient>
              </Defs>
              <Rect
                x={0}
                y={0}
                width={width}
                height={lineWidth}
                fill={`url(#top${inset ? '-inset' : ''})`}
              />
            </Svg>
          );
        default:
          throw new Error(
            'Wrong Type of Side! We just support \'top\' and \'bottom\''
          );
        }
      })()}
    </View>
  );
};

BorderShadow.propTypes = {
  side: PropTypes.string,
  width: PropTypes.number,
  color: PropTypes.string,
  border: PropTypes.number,
  opacity: PropTypes.number,
  inset: PropTypes.bool,
  style: PropTypes.any
};

BorderShadow.defaultProps = {
  side: 'bottom',
  width: 0,
  color: Colors.black,
  border: 0,
  opacity: 1,
  inset: false,
  style: {}
};

export default BorderShadow;
