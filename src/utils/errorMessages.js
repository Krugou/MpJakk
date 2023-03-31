const registerForm = {
  username: [
    'this field is required',
    'username must be at least 3 characters',
    'username is already taken',
  ],
  password: [
    'this field is required',
    'password must be at least 5 characters',
  ],
  confirm: ['this field is required', 'password must be at least 5 characters'],
  email: ['this field is required', 'email is not valid'],
  full_name: ['not a valid name'],
};

const loginForm = {
  username: ['this field is required'],
  password: ['this field is required'],
};

export {loginForm, registerForm};
