import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Image, View, Animated, TouchableOpacity, TextInput, SafeAreaView, FlatList } from 'react-native';
import Slider from 'react-native-slider';
import { Colors, Icons } from '../../theme';
import styles from './styles/FloatingActionItemStyle';

class FloatingActionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchList: props.searchList,
      searchText: '',
      hideResults: false,
      opacity: 0.5,
      isPlay: true
    };
    this.animation = new Animated.Value(0);
  }

  componentDidUpdate(prevProps) {
    const { active, animated, selectedItemId, containerView } = this.props;
    if (prevProps.active !== active && animated) {
      Animated.spring(this.animation, { toValue: active ? 1 : 0 }).start();
    }
    if (prevProps.selectedItemId !== selectedItemId && containerView === 'player') {
      this.setState({ isPlay: true });
    }
  }

  openPress = () => {
    const { onOpenPress, item } = this.props;
    onOpenPress && onOpenPress(item); 
  }

  closePress = () => {
    const { onClosePress } = this.props;
    onClosePress && onClosePress();
  }

  playOrPausePress = () => {
    const { isPlay } = this.state;
    const { onPlayOrPausePress } = this.props;
    
    onPlayOrPausePress && onPlayOrPausePress(!isPlay);
    this.setState({ isPlay: !isPlay });    
  }

  inputTextChange = (searchText) => {
    this.setState({
      searchText: searchText,
      opacity: searchText === '' ? 0.5 : 1
    });
  }

  findMedicines(searchText) {
    if (searchText === '') {
      return [];
    }

    const { searchList } = this.state;
    return searchList.filter(bean => bean.realName.toLowerCase().includes(searchText.toLowerCase()));
  }

  handleItemClick = item => {
    //const { handleItemClick } = this.props;
    this.setState({ searchText: item, hideResults: true });
    //handleItemClick && handleItemClick(item);
  };

  renderItem = ({ item }) => {
    const { shadow } = this.props;
    
    return (
      <TouchableOpacity 
        style={[styles.button, shadow, styles.searchItemView]}
        onPress={() => this.handleItemClick(item)}
      >        
        { item.image !== '' ? 
          (
            <Image 
              source={{ uri: item.image }} 
              defaultSource={Icons.icAlert} 
              style={styles.iconLogo}/> 
          ) :
          (
            <Text style={styles.textStyle}>{this.nameString(item.realName)}</Text>
          )
        }                           
      </TouchableOpacity>
    );
  }

  renderSearchList() {
    const { searchText } = this.state;
    const searchList = this.findMedicines(searchText);

    return (
      <FlatList
        data={searchList}
        numColumns={4}
        keyExtractor={bean => bean}
        renderItem={this.renderItem}
      />
    );
  }

  renderContainerView() {
    const { item, containerView, progress, duration } = this.props;
    const { searchText, opacity, isPlay } = this.state;

    if(containerView === 'search') {
      return (
        <View style={styles.inputTextView}>
          <TextInput
            style={[styles.inputText, { opacity: opacity }]}
            placeholder="Search User"
            placeholderTextColor={Colors.white}
            selectionColor={Colors.white}
            value={searchText}
            onChangeText={this.inputTextChange}
          />
        </View>  
      );
    } else if(containerView === 'player') {
      return (
        <View style={[styles.inputTextView, styles.recorderContainer]}>
          <TouchableOpacity onPress={this.playOrPausePress}>
            <Image source={ isPlay ? Icons.icPause : Icons.icPlay } style={styles.icon}/>
          </TouchableOpacity>
          <Slider
            style={styles.sliderPlayerContainer}
            value={progress}
            minimumValue={0}
            maximumValue={100}
            trackStyle={styles.track}
            thumbStyle={styles.thumb}
            minimumTrackTintColor={Colors.newPurple}
            thumbTouchSize={styles.thumbTouch}
          />
          <Text style={styles.timerText}>{duration}</Text>
        </View>  
      );
    } else {
      return (
        <View style={[styles.inputTextView, styles.recorderContainer]}>
          { this.toDisplayImageView(item, containerView) ? 
            (
              <Image 
                source={this.imageSource(item, containerView)} 
                defaultSource={Icons.icAlert} 
                style={styles.icon}/> 
            ) :
            (
              <Text style={styles.recorderTextStyle}>{this.nameString(item.realName)}</Text>
            )
          }
          <Slider
            style={styles.sliderRecorderContainer}
            value={progress}
            minimumValue={0}
            maximumValue={100}
            trackStyle={styles.track}
            thumbStyle={styles.thumb}
            minimumTrackTintColor={Colors.newPurple}
            thumbTouchSize={styles.thumbTouch}
          />
          <Text style={styles.timerText}>{duration}</Text>
        </View>  
      );
    }
  }

  imageSource(item, containerView) {
    switch(containerView) { 
    case 'search':
      return Icons.icSearch;
      
    case 'recorder':
      return { uri: item.image };
 
    case 'player':
      return Icons.icReply;
 
    default:  
      return Icons.icAlert;   
    }
  }

  imageStyle(containerView) {
    switch(containerView) { 
    case 'search':
      return styles.icon;
        
    case 'recorder':
      return styles.iconLogo;
   
    case 'player':
      return styles.icon;
   
    default:  
      return styles.iconLogo;   
    }
  }

  toDisplayImageView(item, containerView) {
    switch(containerView) { 
    case 'search':
      return true;
          
    case 'recorder':
      return item.image !== '';

    case 'player':
      return true;
     
    default:  
      return true; 
    }
  }

  nameString(realName){
    if (realName){
      let array = realName.split(' ');      
      if (array.length >= 2){
        return `${array[0].charAt(0)}${array[1].charAt(0)}`.toUpperCase();
      }else {
        return `${array[0].charAt(0)}`.toUpperCase();
      }
    }
    return '';
  }

  isSelectedItem(item, selectedItemId) {
    return item.id === selectedItemId;
  }

  renderSearchView() {
    const { shadow } = this.props;
    const { searchList, hideResults } = this.state;
    const showResults = searchList.length > 0;

    return (
      <View style={[styles.searchItemContainer]}>
        <View style={styles.itemContainer}>
          <TouchableOpacity style={[styles.button, shadow]} onPress={this.closePress}>
            <Image source={Icons.icExit} style={styles.icon}/>
          </TouchableOpacity>
          {this.renderContainerView()}
        </View>
        {!hideResults && showResults && 
        <SafeAreaView style={styles.searchList}>
          {showResults && this.renderSearchList()}
        </SafeAreaView> 
        }
      </View>
    );
  }

  renderProfileView() {
    const { item, selectedItemId, containerView, shadow } = this.props;
    
    return (
      <TouchableOpacity style={[styles.button, shadow]} onPress={this.openPress}>
        { (this.isSelectedItem(item, selectedItemId) && containerView === 'recorder') ?
          (
            <Image source={Icons.icSendAudio} style={styles.icon}/>
          )
          :
          ( 
            this.toDisplayImageView(item, containerView) ? 
              (
                <Image 
                  source={this.imageSource(item, containerView)} 
                  defaultSource={Icons.icUserPlaceHolder} 
                  style={this.imageStyle(containerView)}/> 
              ) :
              (
                <Text style={styles.textStyle}>{this.nameString(item.realName)}</Text>
              )
          ) 
        }     
      </TouchableOpacity>
    );
  }

  renderButton() {
    const { item, position, selectedItemId } = this.props;

    return (
      <View style={[styles.itemContainer, styles[`${position}ItemContainer`]]}>
        { this.isSelectedItem(item, selectedItemId) && this.renderSearchView() }  
        { this.renderProfileView() }
      </View>    
    );   
  }

  render() {
    const { distanceToEdge, render, item, animated, container } = this.props;

    let animatedActionContainerStyle;
    if (animated) {
      animatedActionContainerStyle = {
        marginBottom: this.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [5, 10]
        })
      };
    } else {
      animatedActionContainerStyle = { marginBottom: 10 };
    }

    return (
      <View style={[styles.container, container]}>
        <Animated.View
          style={[
            styles.actionContainer,
            animatedActionContainerStyle,
            {
              paddingLeft: distanceToEdge,
              paddingRight: distanceToEdge    
            }
          ]}
        >
          {render ? render({ key: item.name }) : this.renderButton() }
        </Animated.View>
      </View>
    );
  }
}

FloatingActionItem.propTypes = {
  searchList: PropTypes.array,
  isPlay: PropTypes.bool,
  item: PropTypes.any,  
  position: PropTypes.oneOf(['left', 'right', 'center']),
  active: PropTypes.bool,
  distanceToEdge: PropTypes.number,
  render: PropTypes.func,
  animated: PropTypes.bool,
  container: PropTypes.object,
  containerView: PropTypes.oneOf(['search', 'recorder', 'player']),
  selectedItemId: PropTypes.number,  
  onOpenPress: PropTypes.func,
  onClosePress: PropTypes.func,
  onPlayOrPausePress: PropTypes.func,
  progress: PropTypes.number,
  duration: PropTypes.string,
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

FloatingActionItem.defaultProps = {
  searchList: [],
  animated: false,
  selectedItemId: -2,
  containerView: 'recorder',
  distanceToEdge: 30,
  progress: 0,
  duration: '0:10/0:30',
  shadow: {}
};

export default FloatingActionItem;
