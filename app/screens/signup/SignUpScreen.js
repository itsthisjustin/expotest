import React from 'react';
import { Image, TextInput } from 'react-native';
import { View, Text } from 'native-base';
import { Colors, Icons, Images } from '../../theme';
import { validate } from '../../utils';
import { CustomHeader, NetworkButton } from '../../components';
import { connect } from 'react-redux';
import { signIn,signOut } from './../../redux/actions';
import PropTypes from 'prop-types';
import styles from './SignUpScreenStyle';

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.topText =  'Use the email your team admin invited you to YAC with.';
    this.yacEmail= 'help@yac.chat';
    this.isErrorOccured = 'Looks like the email you entered did not match our records. Contact your team admin or reach out to us at ';
    this.state = {
      email: '',
      opacity: 0.3
    };
  }

  componentDidMount(){
    let islogout = this.props.navigation.getParam('isLogout', false);
    if(islogout) {this.props.signOut();}
  }

  get isError() {
    if(this.props.user){
      if(this.props.user.status){
        return false;
      }
      return true;
    }
    return false;
  }

   onContinue = async() => {
     if (this.isValidated) {
       try {
         const res =  await this.props.signIn(this.state.email);
         if(res.status){
           const { navigation } = this.props;
           navigation.navigate('EmailVerifyScreen', { 'email': this.state.email });
         }
       } catch(e){
         alert({ e });
       }
     }
   } 

   get isValidated() {
     let errors = [];
     errors.push(validate({ fieldName:'email', value:this.state.email.trim() }));
     let finality = errors.filter(Boolean);
     if (finality.length > 0) {
       alert(finality[0]);
       return false;
     }
     return true;
   }

   renderInputContent() {
     const { email, opacity } = this.state;

     return (
       <View style={styles.centerContainer}>
         <View style={styles.inputTextContainer}>
           <TextInput
             style={[styles.inputText]}
             placeholder="Enter your work email"
             placeholderTextColor={Colors.primary30opacity}
             selectionColor={Colors.primaryTransparent}
             keyboardType={'email-address'}
             value={email}
             onChangeText={email =>
               this.setState({
                 email: email,
                 opacity: email === '' ? 0.3 : 1
               })
             }
           />
           {this.isError && <Image source={Icons.icAlert} style={styles.rightImage} />}
         </View>
         <View style={[styles.listSeparator, { opacity: opacity }]} />
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
         <View style={styles.screenCard}>
           <Text style={styles.titleText}>Sign in</Text>
           <Text style={styles.descText}>{this.isError ? this.isErrorOccured : this.topText}<Text style={styles.emailText}>{this.isError && this.yacEmail}</Text></Text>
           <View style={styles.screen}/>
           {this.renderInputContent()}
           <NetworkButton
             title={'Continue'}
             loading={this.props.loading}
             onPress={this.onContinue}
           />
         </View>
       </View>
     );
   }
}

SignUpScreen.propTypes = {
  signIn: PropTypes.func,
  loading: PropTypes.bool,
  user: PropTypes.object,
  signOut: PropTypes.func
};

const mapStateToProps = ({ signInReducer }) => ({
  error: signInReducer.error,
  user: signInReducer.user,
  loading: signInReducer.loading 
});
  
const mapDispatchToProps ={
  signIn,
  signOut
};
// export default SignUpScreen;
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
