import {Box, Button, Container} from '@mui/material';
import PropTypes from 'prop-types';
import {useContext} from 'react';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import {useNavigate} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import useForm from '../hooks/FormHooks';
import {useAuthentication} from '../hooks/apiHooks';
import {loginForm} from '../utils/errorMessages';
import {loginValidators} from '../utils/validators';

const LoginForm = (props) => {
  const {setUser} = useContext(MediaContext);
  const {postLogin} = useAuthentication();
  const navigate = useNavigate();

  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      const loginResult = await postLogin(inputs);
      localStorage.setItem('userToken', loginResult.token);
      setUser(loginResult.user);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  const {inputs, handleSubmit, handleInputChange} = useForm(
    doLogin,
    initValues
  );

  return (
    <Container maxWidth="xs">
      <ValidatorForm onSubmit={handleSubmit} noValidate>
        <TextValidator
          fullWidth
          margin="dense"
          name="username"
          label="Username"
          onChange={handleInputChange}
          value={inputs.username}
          validators={loginValidators.username}
          errorMessages={loginForm.username}
        />
        <TextValidator
          fullWidth
          margin="dense"
          name="password"
          type="password"
          label="Password"
          onChange={handleInputChange}
          value={inputs.password}
          validators={loginValidators.password}
          errorMessages={loginForm.password}
        />
        <Button fullWidth sx={{mt: 1}} variant="contained" type="submit">
          Login
        </Button>
      </ValidatorForm>
    </Container>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
