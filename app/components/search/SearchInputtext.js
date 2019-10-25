import React from 'react';
import PropTypes from 'prop-types';
import { Icons, Colors } from '../../theme';
import { Image, TextInput, View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from './SearchInputtextStyle';

class SearchInputtext extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ['a', 'ab', 'bb', 'abc'], //props.data  
      searchText: '',
      hideResults: props.hideResults,
      opacity: 0.5
    };

    this.onRefListView = this.onRefListView.bind(this);
    this.onRefTextInput = this.onRefTextInput.bind(this);
    this.onEndEditing = this.onEndEditing.bind(this);
  }

  componentDidUpdate(prevProps) {
    // only update if the data has changed
    if (prevProps.data !== null && prevProps.data.length > 0 && prevProps.data !== this.props.data) {
      this.setState({ data: prevProps.data, hideResults: prevProps.hideResults });
    }
  }
  
  onRefListView(resultList) {
    this.resultList = resultList;
  }

  onRefTextInput(textInput) {
    this.textInput = textInput;
  }

  onEndEditing(e) {
    const { onEndEditing } = this.props;
    onEndEditing && onEndEditing(e);
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

    const { data } = this.state;
    const regex = new RegExp(`${searchText}`, 'i');
    return data.filter(bean => bean.search(regex) >= 0);
  }

  renderSearchView() {
    const { rightButtonPress } = this.props;
    const { searchText, opacity } = this.state;
    return (
      <View style={styles.searchContainer}>
        <View 
          style={styles.inputTextGradient}>
          <View style={styles.inputTextView}>
            <TextInput
              ref={this.onRefTextInput}
              style={[styles.inputText, { opacity: opacity }]}
              placeholder="Enter your search"
              placeholderTextColor={Colors.white}
              selectionColor={Colors.white}
              value={searchText}
              onEndEditing={this.onEndEditing}
              onChangeText={this.inputTextChange}
            />
          </View>
        </View>    
        <TouchableOpacity onPress={() => { rightButtonPress && rightButtonPress(); }}>
          <View 
            style={styles.searchGradient}>
            <View style={styles.searchView}>
              <Image source={Icons.icSearch} style={styles.search}/>
            </View>
          </View> 
        </TouchableOpacity>
      </View>    
    );   
  }

  handleItemClick = item => {
    const { handleItemClick } = this.props;
    this.setState({ searchText: item, hideResults: true });
    handleItemClick && handleItemClick(item);
  };

  renderItem(item) {
    return (
      <TouchableOpacity onPress={() => this.handleItemClick(item)}>
        <View 
          style={styles.itemGradient}>
          <View style={styles.itemView}>
            <Image source={Icons.icSearch} style={styles.item}/>
          </View>
        </View>  
      </TouchableOpacity>  
    );
  }

  renderSearchList() {
    const { searchText } = this.state;
    const data = this.findMedicines(searchText);

    return (
      <FlatList
        horizontal
        ref={this.onRefListView}
        data={data}
        keyExtractor={bean => bean}
        renderItem={this.renderItem}
      />
    );
  }

  render() {
    const { data, hideResults } = this.state;
    const { onShowResults } = this.props; 
    const showResults = data.length > 0;

    onShowResults && onShowResults(showResults);
    return (
      <View style={styles.screenBackground}>
        {this.renderSearchView()}  
        {!hideResults && 
          <SafeAreaView style={styles.list}>
            <View style={styles.list}>
              {showResults && this.renderSearchList()}
            </View> 
          </SafeAreaView> 
        }
      </View>
    );
  }
}

SearchInputtext.propTypes = {
  data: PropTypes.array,
  hideResults: PropTypes.bool,
  onShowResults: PropTypes.func,
  handleItemClick: PropTypes.func,
  onEndEditing: PropTypes.func,
  rightButtonPress: PropTypes.func
};

SearchInputtext.defaultProps = {
  data: [],
  defaultValue: ''
};

export default SearchInputtext;
