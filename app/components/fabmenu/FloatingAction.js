import React from 'react'; 
import PropTypes from 'prop-types';
import { mockData } from '../../utils';
import BorderShadow from './BorderShadow';
import FloatingActionItem from './FloatingActionItem';
import { Colors, Icons, verticalScale } from '../../theme';
import { getTouchableComponent, getRippleProps } from './utils';
import { Image, Animated, TouchableOpacity, LayoutAnimation, FlatList, View } from 'react-native';
import styles from './styles/FloatingActionStyle';

const ACTION_BUTTON_SIZE = 56;

class FloatingAction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      selectedItemId: -1,
      isTopShadow: false,
      isBottomShadow: true
    };

    this.mainBottomAnimation = new Animated.Value(
      props.distanceToEdge + props.mainVerticalDistance
    );
    this.actionsBottomAnimation = new Animated.Value(
      ACTION_BUTTON_SIZE +
        props.distanceToEdge +
        props.mainVerticalDistance
    );
    this.actionsBottomAnimation1 = new Animated.Value(
      props.distanceToEdge +
      props.mainVerticalDistance
    );
    this.actionsAnimation = new Animated.Value(0);
  }

  componentDidMount() {
    const { openOnMount } = this.props;

    if (openOnMount) {
      this.animateButton();
    }
  }

  reset = () => {
    const { onClose } = this.props;

    Animated.spring(this.actionsAnimation, { toValue: 0 }).start();
    this.updateState(
      {
        active: false
      },
      () => {
        if (onClose) {
          onClose();
        }
      }
    );
  };

  animateButton = () => {
    const {
      onPressMain,
      onOpen
    } = this.props;
    const { active } = this.state;

    if (onPressMain) {
      onPressMain(!active);
    }

    if (!active) {
      Animated.spring(this.actionsAnimation, { toValue: 1 }).start();
      // only execute it for the background to prevent extra calls
      LayoutAnimation.configureNext({
        duration: 180,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity
        }
      });

      this.updateState(
        {
          active: true,
          selectedItemId: -2
        },
        () => {
          if (onOpen) {
            onOpen();
          }
        }
      );
    } else {
      this.reset();
    }
  };

  updateState = (nextState, callback) => {
    const { onStateChange } = this.props;
    const { active } = this.state;

    this.setState(nextState, () => {
      if (callback) {
        callback();
      }
      if (onStateChange) {
        onStateChange({
          isActive: active
        });
      }
    });
  };

  handleItemOpenPress = (item) => {
    const { onPressItem } = this.props;
    const { selectedItemId } = this.state;

    if (selectedItemId === -2 && item.id !== selectedItemId) {
      this.setState({ selectedItemId: item.id });
    } else {
      onPressItem && onPressItem(item);
    }
  }

  handleItemClosePress = () => {
    this.setState({ selectedItemId: -2 });
  }

  itemContainerStyle(index) {
    const { list } = this.props;
    return index === 0 ? styles.listLastItem : (index === list.length-1) ? styles.listFirstItem : {};
  }

  renderItem(item, index) {
    const { position, distanceToEdge, shadow } = this.props;
    const { active, selectedItemId } = this.state;

    return (
      <FloatingActionItem
        animated
        distanceToEdge={distanceToEdge}
        item={item}
        position={position}
        active={active}
        shadow={shadow}
        container={this.itemContainerStyle(index)}
        selectedItemId={selectedItemId}
        onOpenPress={this.handleItemOpenPress}
        onClosePress={this.handleItemClosePress}
      />
    );
  }
  
  handleScroll = (event) => {
    var currentOffset = event.nativeEvent.contentOffset.y;
    var scrollContentOffset = event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height;

    if(currentOffset === 0) {
      this.setState({ isTopShadow: false, isBottomShadow: true });
    } else if(Math.ceil(currentOffset) >= Math.ceil(scrollContentOffset)) {
      this.setState({ isTopShadow: true, isBottomShadow: false });
    } else {
      this.setState({ isTopShadow: true, isBottomShadow: true });
    }
  }

  renderTappableBackground() {
    const { overlayColor } = this.props;
    // TouchableOpacity don't require a child
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.overlay, { backgroundColor: overlayColor }]}
        onPress={this.reset}
      />
    );
  }

  renderActions() {
    const { active, selectedItemId, isTopShadow, isBottomShadow } = this.state;
    const { list, position, distanceToEdge, shadow } = this.props;
    if (!list || list.length === 0) {
      return undefined;
    }

    let animatedActionsStyle;
    animatedActionsStyle = {
      opacity: this.actionsAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      })
    };
    const actionsStyles = [
      styles.actions,
      animatedActionsStyle,
      {
        bottom: this.actionsBottomAnimation1
      }
    ];
    
    return (
      <Animated.View style={actionsStyles} pointerEvents="box-none">
        <View style={styles.listContainer}> 
          <FlatList
            inverted
            data={list}
            extraData={this.state}
            bounces={false}
            renderItem={({ item, index }) => this.renderItem(item, index)}
            keyExtractor={item => item.id}
            onScroll={this.handleScroll}
          />
          { isTopShadow && 
          <BorderShadow 
            width={ACTION_BUTTON_SIZE}
            color={Colors.primary} 
            border={40}
            side={'bottom'}
            style={[styles.shadowContainer, { right: distanceToEdge, bottom: distanceToEdge * 2 }]}
          />
          }
          { isBottomShadow && 
          <BorderShadow 
            width={ACTION_BUTTON_SIZE}
            color={Colors.primary}
            border={40}
            side={'top'}
            style={[styles.shadowContainer, { right: distanceToEdge, top: ACTION_BUTTON_SIZE + distanceToEdge }]}
          />
          }
        </View>

        <View style={[styles.searchContainer]}> 
          <FloatingActionItem
            animated
            distanceToEdge={distanceToEdge}
            item={mockData.searchItem()}
            position={position}
            active={active}
            containerView='search'
            searchList={list}
            shadow={shadow}
            selectedItemId={selectedItemId}
            onOpenPress={this.handleItemOpenPress}
            onClosePress={this.handleItemClosePress}
          />
        </View>        
      </Animated.View>
    );
  }

  renderMainButton() {
    const { position, distanceToEdge, shadow } = this.props;
    const { active } = this.state;

    const Touchable = getTouchableComponent();
    const propStyles = {
      bottom: this.mainBottomAnimation // I need to imporove this to run on native thread and not on JS thread
    };

    if (['left', 'right'].indexOf(position) > -1) {
      propStyles[position] = distanceToEdge;
    }

    return (        
      <Animated.View
        style={[
          styles.buttonContainer,
          styles[`${position}Button`],
          propStyles,
          shadow
        ]}
      > 
        <Touchable
          {...getRippleProps(Colors.defaultViewPagerDot)}
          style={[styles.button, styles.buttonTextContainer]}
          activeOpacity={0.85}
          onPress={this.animateButton}
        >              
          <Image
            style={styles.fabIcon}
            source={ active ? Icons.icExit : Icons.icYac}/> 
        </Touchable>
      </Animated.View>
    );
  }

  render() {
    const { active } = this.state;
    const { showBackground } = this.props;

    return (
      <Animated.View
        pointerEvents="box-none"
        style={[styles.overlay, { backgroundColor: Colors.transparent }]}
      >
        {active && showBackground && this.renderTappableBackground()}
        {active && showBackground && this.renderActions()}
        {this.renderMainButton()}
      </Animated.View>
    );
  }
}

FloatingAction.propTypes = {
  list: PropTypes.array,
  distanceToEdge: PropTypes.number,
  mainVerticalDistance: PropTypes.number,
  overlayColor: PropTypes.string,
  position: PropTypes.oneOf(['right', 'left', 'center']),
  showBackground: PropTypes.bool,
  openOnMount: PropTypes.bool,
  onPressItem: PropTypes.func,
  onPressMain: PropTypes.func,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onStateChange: PropTypes.func,
  shadow: PropTypes.shape({
    shadowOpacity: PropTypes.number,
    shadowOffset: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    }),
    shadowColor: PropTypes.string,
    shadowRadius: PropTypes.number
  })
};

FloatingAction.defaultProps = {
  distanceToEdge: verticalScale(15),
  mainVerticalDistance: 0,
  overlayColor: Colors.primary90opacity,
  position: 'right',
  showBackground: true,
  openOnMount: false,
  shadow: {}
};

export default FloatingAction;
