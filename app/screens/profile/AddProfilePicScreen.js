import React, { Component } from 'react';
import { Container, View,  Input } from 'native-base';
import {  Platform, Alert, Text, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { validate, checkPermissionForImagePicker } from '../../utils';
import styles from './AddProfilePicScreenStyle';
import { CustomHeader, NetworkButton } from '../../components';
import { Icons, Colors } from '../../theme';
import { updateProfile } from './../../redux/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AddProfilePicScreen extends Component {
  constructor(props) {
    super(props);
    this.email = this.props.navigation.getParam('email', ''); 
        
    this.state = {
      avatarSource: null,
      loading: false,
      isRecordingEnableAndroid: true,
      avatarData:null,
      fileName:null,
      name:props.user.username
    };
  }



  onSaveChange = async() => {
    if (this.isValidated) {
      try {
        let params = { username:this.state.name };
        if (this.state.avatarData){
          params['file'] = this.state.avatarData;
          params['key'] = this.state.fileName;
        } 
        if (this.state.avatarData) params['file'] = this.state.avatarData;
        const res =  await this.props.updateProfile(params);
        if(res.status){
          const { navigation } = this.props;
          navigation.navigate('FriendListScreen');
        }
      } catch(e){
        alert({ e });
      }
      
    }
  } 
  

  get isValidated() {
    let errors = [];
    errors.push(validate({ fieldName:'userName', value:this.state.name.trim() }));
    let finality = errors.filter(Boolean);
    if (finality.length > 0) {
      alert(finality[0]);
      return false;
    }
    return true;
  }

  grantAndroidPermission = async() => {
    await checkPermissionForImagePicker();
  }

  handleAddImage = async() =>  {
    if(Platform.OS === 'android') {
      const temp = await checkPermissionForImagePicker();
      if(temp) {
        this.handleProfilePress();
      } else {
        Alert.alert(
          'Permission Alert',
          'To select or take photo you have to grant all required permissions..!!',
          [            
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel'
            },
            { text: 'OK', onPress: () => {this.grantAndroidPermission();} }
          ],
          { cancelable: false },
        );
      }
    } else {
      this.handleProfilePress();
    }    
  }
    
  handleProfilePress() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
    
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        this.setState({ avatarSource: null });
      } else if (response.error) {
        //
      } else {
        let source = { uri: response.uri };
        let data =  response.data;
        this.setState({
          avatarSource: source,
          avatarData:data,
          fileName:response.fileName
        });
      }
    });
  }

  get imageUri(){
    const { user } = this.props;
    if (this.state.avatarSource){
      return this.state.avatarSource;
    } else if (user.mobileImage !== '' ){
      return { uri:user.mobileImage };
    } else if (user.image !== '' ){
      return { uri:user.image };
    } 
    return  null; 
  }

  get toDisplayImageView() {
    const { user } = this.props;
    if (this.state.avatarSource){
      return true;
    } else if (user.mobileImage !== '' ){
      return true;
    } else if (user.image !== '' ){
      return true;
    } 
    return false;
  }

  renderImageView =  () => {    
    return(
      <TouchableOpacity style={styles.imageButtonStyle}
        onPress={this.handleAddImage}>
        <View  style={[styles.imageRadius,styles.profileContainer]}>
          {this.toDisplayImageView  &&
            <Image
              source={this.imageUri}
              defaultSource = {Image.ProfileImgPlace}
              style={styles.imageRadius}
            />
          }
          <View style={styles.uploadIconContainer}>
            <Image
              source={Icons.icUpload}
              style={styles.whiteIcon}
            />
          </View>
        </View>
        
      </TouchableOpacity>
    );
  }

  renderTextInput = () => {
    return (
      <View style={[styles.textInputStyle,this.state.name === '' ? styles.lineColorEmpty : styles.lineColorNormal]}>
        <Input 
          placeholder='Create a Username'
          placeholderTextColor={Colors.primary30opacity}
          style={styles.nameTextStyle}
          value={this.state.name}
          underlineColorAndroid={Colors.transparent}
          onChangeText={(text) => this.setState({ name:text })} />
      </View>
    );
  }

  render() {
    const { loading } = this.props;
    return (
      <Container style={styles.screenBackground}>
        <CustomHeader
          leftButtonIcon={Icons.icSettings}
          titleIcon={Icons.icYacWithText}
          rightButtonIcon={Icons.icSearch}
        />
        <View style={styles.screenCard}>
          <View style={styles.mainContainerStyle}>
            <Text style={styles.titleText}>Create Your Profile</Text>
            <Text style={styles.normalText}>Profile Photo</Text>
            {this.renderImageView()}
            {this.renderTextInput()}
          </View>
          <NetworkButton title={'Save Changes'} loading={loading} onPress={this.onSaveChange}/>
        </View>
      </Container>
    );
  }
}

AddProfilePicScreen.propTypes = {
  updateProfile: PropTypes.func,
  loading: PropTypes.bool,
  user: PropTypes.object
};

const mapStateToProps = ({ signInReducer }) => ({
  error: signInReducer.error,
  user: signInReducer.user,
  loading: signInReducer.loading 
});
  
const mapDispatchToProps ={
  updateProfile
};
// export default SignUpScreen;
export default connect(mapStateToProps, mapDispatchToProps)(AddProfilePicScreen);
