import React from 'react';
import PropTypes from 'prop-types';
import { Icons, Colors, Images } from '../../../theme';
import { Input, View } from 'native-base'; 
import { validate, checkPermissionForImagePicker } from '../../../utils';
import ImagePicker from 'react-native-image-picker';
import { Platform, Alert, Text, Image, TouchableOpacity } from 'react-native';
import { updateProfile } from '../../../redux/actions/profileAction';
import { CustomHeader, NetworkButton } from '../../../components';
import { connect } from 'react-redux';
import styles from './EditProfileScreenStyle';

class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarData:null,
      fileName:null,
      name: props.user.realName || '',
      userName: props.user.username || '',
      email: props.user.email || '',
      team: props.user.teamName || '',
      avatarSource: null
    };
  }

  setStateStatus(label, value) {
    switch (label) {
    case 'Name':
      this.setState({ name: value });
      break;
    case 'Username':
      this.setState({ userName: value });
      break;
    case 'Email':
      this.setState({ email: value });
      break;
    case 'Team':
      this.setState({ team: value });
      break;    
    }
  }

  onSaveChange= async() => {
    if (this.isValidated) {
      try {        
        let params = { username:this.state.userName,realName:this.state.name };
        if (this.state.avatarSource){
          params['file']=this.state.avatarData;
          params['key']=this.state.fileName;
        }
        const res =  await this.props.updateProfile(params);
        if(res.status){
          this.handleExit();
        }
      } catch(e) {        
        alert({ e });
      }
    }
  } 

  get isValidated() {
    let errors = [];
    const { name, userName, email, team } = this.state;

    errors.push(validate({ fieldName:'name', value: name.trim() }));
    errors.push(validate({ fieldName:'userName', value: userName.trim() }));
    errors.push(validate({ fieldName:'email', value: email.trim() }));
    errors.push(validate({ fieldName:'team', value: team.trim() }));
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

  handleAddImage = async() => {
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
        //Log something here
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

  // Toggle method to handle setting screen close.
  handleExit = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  renderImageView() {
    return(
      <TouchableOpacity style={styles.imageButtonStyle}
        onPress={this.handleAddImage}>
        <View  style={[styles.imageRadius,styles.profileContainer]}>
          {this.toDisplayImageView  &&
          <Image
            source={this.imageUri}
            style={styles.imageRadius}
          />
          }
          { !this.imageUri && <View style={styles.uploadIconContainer}>
            <Image
              source={Icons.icUpload}
              style={styles.whiteIcon}
            />
          </View>
          }
        </View>
      
      </TouchableOpacity>
    );
  }

  renderItem(label, value, disabled = false) {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemTextContainer}>
          <Text style={ styles.itemText}>{label}</Text>
          <Input
            disabled={disabled} 
            placeholder={label}
            style={styles.nameTextStyle}
            value={value}
            numberOfLines={1}
            underlineColorAndroid={Colors.transparent}
            onChangeText={(text) => this.setStateStatus(label, text)} />
        </View>
        <View style={styles.listSeparator}/>
      </View> 
    );
  }

  renderButton() {
    return (
      <NetworkButton title={'Save Changes'} loading={this.props.loading} customStyle={styles.saveButton} onPress={this.onSaveChange}/> 
    );
  }

  renderContain() {
    const { name, userName, email, team } = this.state;

    return (
      <View style={styles.screenCard}>
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>Edit Profile</Text>
          <TouchableOpacity onPress={this.handleExit}>
            <Image source={Icons.icExit} style={styles.exitIcon} />
          </TouchableOpacity>
        </View>

        {this.renderImageView()}
        {this.renderItem('Name', name)}
        {this.renderItem('Username', userName)}
        {this.renderItem('Email', email,true)}
        {this.renderItem('Team', team,true)}
        {this.renderButton()}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.screenBackground}>
        <Image source={Images.dotsPattern} style={styles.backgroundImage} />
        <CustomHeader
          leftButtonIcon={Icons.icSettings}
          titleIcon={Icons.icYacWithText}
          rightButtonIcon={Icons.icSearch}
        />
        {this.renderContain()}
      </View>
    );
  }
}

EditProfileScreen.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
