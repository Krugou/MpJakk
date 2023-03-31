const registerValidators = {
  username: ['required', 'minStringLength:3'],
  password: ['required', 'minStringLength:5'],
  confirm: ['required', 'minStringLength:5'],
  email: ['required', 'isEmail'],
  full_name: ['matchRegexp:^[a-zA-ZåäöÅÄÖ ]+$'],
};

const loginValidators = {
  username: ['required'],
  password: ['required'],
};

export {loginValidators, registerValidators};
