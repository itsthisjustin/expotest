import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './SectionHeaderCellStyle';

const SectionHeaderCell = ({
  date
}) => (
  <View style={styles.containerStyle}>
    <View style={[styles.screen,styles.textContainer]}>
      <Text style={styles.textStyle}>{date}</Text>
    </View>
    <View style={[styles.listSeparator]}></View>
  </View>
);
SectionHeaderCell.propTypes = {
  date: PropTypes.string
};
export default SectionHeaderCell;
