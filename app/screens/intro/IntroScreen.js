import React from 'react';
import { Image } from 'react-native';
import { View, Button, Text } from 'native-base';
import { Icons, Images } from '../../theme';
import OnBoarding from './OnBoarding';
import { CustomHeader } from '../../components';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import styles from './styles/IntroScreenStyle';
import PropTypes from 'prop-types';

class IntroScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
  }

  onNextOrContinue() {
    const { page } = this.state;
    if(page === 2) {
      const { navigation } = this.props;
      navigation.navigate('SignUpScreen');
    } else {
      this.changeStateValue((page+1), true);
    }
  } 

  changeStateValue(page, isChangePage) {
    this.setState({
      page: page
    });
    if(isChangePage) {
      this.viewPager.setPage(page);
    }
  }

  renderDotIndicator() {
    return (
      <PagerDotIndicator
        pageCount={3}
        style={styles.pagerDotIndicator}
        dotStyle={styles.defaultDots}
        selectedDotStyle={styles.selectedDots}
      />
    );
  }
  
  render() {
    return (
      <View style={styles.screenBackground}>
        <Image source={Images.dotsPattern} style={styles.backgroundImage}/>
        <CustomHeader
          leftButtonIcon={Icons.icSettings}
          titleIcon={Icons.icYacWithText}
          rightButtonIcon={Icons.icSearch}
        />
        <View style={styles.screenCard}>
          <IndicatorViewPager
            ref={viewPager => { this.viewPager = viewPager; }}
            style={styles.viewPager}
            indicator={this.renderDotIndicator()}
            onPageSelected={p => this.changeStateValue(p.position, false)}
          >
            <View style={styles.screen}>
              <OnBoarding
                title='All your YACS in one place'
                desc='Listen to sent and received messages and get notified of new YACs.'
                image={Images.onBoarding1}
              />
            </View>
            <View style={styles.screen}>
              <OnBoarding
                title='Look a little closer'
                desc='Tap a teammate’s face to see the full history of YACs with that person.'
                image={Images.onBoarding2}
              />
            </View>
            <View style={styles.screen}>
              <OnBoarding
                title='Message with your voice'
                desc='Expand the YAC icon and just tap once on anyone’s face to record.'
                image={Images.onBoarding3}
              />
            </View>
          </IndicatorViewPager>
          <Button full style={styles.buttons} onPress={() => this.onNextOrContinue()}>
            <Text style={styles.buttonText}>Continue</Text>
          </Button>
        </View>
      </View>
    );
  }
}

IntroScreen.propTypes = {
  signOut:PropTypes.func
};

export default IntroScreen;
