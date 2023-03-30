import {Button, Grid, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = (props) => {
  const [formToggle, setFormToggle] = useState(true);
  const toggle = () => {
    setFormToggle(!formToggle);
  };
  return (
    <Grid container direction={'column'} alignItems={'center'}>
      <Grid item xs={6}>
        <Typography variant="h4" component="h1">
          {formToggle ? 'Login' : 'Register'}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        {formToggle ? <LoginForm /> : <RegisterForm />}
      </Grid>
      <Grid item xs={6}>
        <p>{formToggle ? 'First time here?' : 'or'}</p>
      </Grid>
      <Grid item xs={6}>
        <Button onClick={toggle}>{formToggle ? 'Register' : 'Login'}</Button>
      </Grid>
    </Grid>
  );
};

Login.propTypes = {};

export default Login;
