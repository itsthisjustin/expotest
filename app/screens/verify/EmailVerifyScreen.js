import React from 'react';
import { Image } from 'react-native';
import { View, Text } from 'native-base';
import { Icons, Images, Colors } from '../../theme';
import { validate, api } from '../../utils';
import ConfirmationCodeInput from './ConfirmationCodeInput';
import { CustomHeader, NetworkButton } from '../../components';
import { connect } from 'react-redux';
import { verifyOTP } from './../../redux/actions';
import PropTypes from 'prop-types';
import styles from './EmailVerifyScreenStyle';
import { StackActions, NavigationActions } from 'react-navigation';

class EmailVerifyScreen extends React.Component {
  constructor(props) {
    super(props);
    this.email = this.props.navigation.getParam('email', ''); 
    this.state = {
      code: ''
    };
  }

   onStartYACing = async() => {
     if (this.isValidated) {
       try {
         const res =  await this.props.verifyOTP(this.email,this.state.code);        
         if(res.status){                    
           api.setHeader('authorization', res.data.token);
           const { navigation } = this.props;

           if (res.data.skipUsername){
             navigation.navigate('FriendListScreen');
           } else{
             const resetAction = StackActions.reset({
               index: 0,
               key: null,
               actions: [NavigationActions.navigate({ routeName: 'AddProfilePicScreen',params: { 'email': this.email } })]
             });
             navigation.dispatch(resetAction);
           }
         }
       } catch(e){
         alert({ e });
       }
     }
   } 

   get isValidated() {
     let errors = [];
     errors.push(validate({ fieldName:'code', value:this.state.code.trim() }));
     let finality = errors.filter(Boolean);
     if (finality.length > 0) {
       alert(finality[0]);
       return false;
     }
     return true;
   }

   onFulfill(code) {
     this.setState({ code: code });
   }

   renderHeaderContent() {
     return (
       <View>
         <Text style={styles.titleText}>Verify Your Email</Text>
         <Text style={styles.descText}>
          We just sent an email to  
           <Text style={styles.emailText}> {this.email}</Text>. 
          Enter your 6 digit verification code below to continue.
         </Text>
       </View>  
     );
   }

   renderOTPContent() {
     return (
       <View style={styles.centerContainer}>
         <ConfirmationCodeInput
           ignoreCase
           autoFocus
           size={50}
           codeLength={6}
           cellBorderWidth={1.5}
           keyboardType='numeric'
           inputPosition='center'
           className={'border-b'}
           activeColor={Colors.primary}
           containerStyle={styles.otpCode}
           codeInputStyle={styles.optText}
           inactiveColor={Colors.primaryTransparent}
           onCodeAdd={(code) => this.onFulfill(code)}
         />
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
           {this.renderHeaderContent()}
           {this.renderOTPContent()}
           <NetworkButton title={'Start YACing'} loading={this.props.loading} onPress={this.onStartYACing}/>
         </View>
       </View>
     );
   }
}


EmailVerifyScreen.propTypes = {
  verifyOTP: PropTypes.func,
  loading: PropTypes.bool,
  user: PropTypes.object
};

const mapStateToProps = ({ signInReducer }) => ({
  error: signInReducer.error,
  user: signInReducer.user,
  loading: signInReducer.loading 
});
  
const mapDispatchToProps ={
  verifyOTP
};
// export default SignUpScreen;
export default connect(mapStateToProps, mapDispatchToProps)(EmailVerifyScreen);
