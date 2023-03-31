const registerValidators = {
  username: ['required', 'minStringLength:3', 'isUsernameAvailable'],
  password: ['required', 'minStringLength:5'],
  confirm: ['required', 'minStringLength:5'],
  email: ['required', 'isEmail'],
  full_name: ['matchRegexp:^(?!.*s{2})[a-zA-ZÅÄÖåäö ]+$'],
};

const loginValidators = {
  username: ['required'],
  password: ['required'],
};

export {loginValidators, registerValidators};
