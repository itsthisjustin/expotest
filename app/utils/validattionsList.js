const validation = {
  normalText: {
    presence: { message: '^should not be blank', allowEmpty: false }
  },
  email: {
    presence: { 
      allowEmpty: false 
    },
    email: {
      message: '^Please enter a valid email address',
      PATTERN:/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,6})$/g
    }
  },
  code: {
    presence: { 
      allowEmpty: false, 
      message:'^Verification code should not be blank' 
    },
    length: {
      minimum: 6,
      message: '^Invalid Verification Code'
    }
  },
  userName: {
    presence: { 
      allowEmpty: false, 
      message:'^Username should not be blank' 
    },
    length: {
      minimum: 3,
      message: '^Username should be grater then 3 character'
    }
  },
  name: {
    presence: { 
      allowEmpty: false, 
      message:'^Name should not be blank' 
    },
    length: {
      minimum: 3,
      message: '^Name should be grater then 3 character'
    }
  },
  team: {
    presence: { 
      allowEmpty: false, 
      message:'^Teamname should not be blank' 
    },
    length: {
      minimum: 3,
      message: '^Teamname should be grater then 3 character'
    }
  }
};

export default validation;

