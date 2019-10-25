import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import styles from './styles/OnBoardingStyle';

const OnBoarding = props => {
  const { title, desc, image } = props;
  return (
    <View style={styles.screen}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.descText}>{desc}</Text>
      <View style={styles.imageContainer}>
        <Image style={styles.images} source={image}/>
      </View>
    </View>
  );
};

OnBoarding.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  image: PropTypes.number
};

export default OnBoarding;
