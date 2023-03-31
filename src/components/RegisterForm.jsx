import {Box, Button, Grid, TextValidator} from '@mui/material';
import {Container} from '@mui/system';
import PropTypes from 'prop-types';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import {useUser} from '../hooks/ApiHooks';
import useForm from '../hooks/FormHooks';

const RegisterForm = (props) => {
  const {postUser, getCheckUser} = useUser();

  const initValues = {
    username: '',
    password: '',
    email: '',
    full_name: '',
  };

  const doRegister = async () => {
    try {
      const userResult = await postUser(inputs);
      alert(userResult.message);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUsername = async () => {
    const {available} = await getCheckUser(inputs.username);
    available || alert('Username not available');
  };

  const {inputs, handleSubmit, handleInputChange} = useForm(
    doRegister,
    initValues
  );

  return (
    <Container maxWidth="xs">
      <ValidatorForm  onSubmit={handleSubmit} noValidate>
        <TextValidator
          fullWidth
          margin="dense"
          name="username"
          label="Username"
          onChange={handleInputChange}
          value={inputs.username}
        />
        <TextValidator
          fullWidth
          margin="dense"
          name="password"
          type="password"
          label="Password"
          onChange={handleInputChange}
          value={inputs.password}
        />
        <TextValidator
          fullWidth
          margin="dense"
          name="email"
          type="email"
          label="Email"
          onChange={handleInputChange}
          value={inputs.email}
          validators={['required','isEmail']}
          errorMessages={['this field is required', 'email is not valid']}
        />
        <TextValidator
          fullWidth
          margin="dense"
          name="full_name"
          label="Full name"
          onChange={handleInputChange}
          value={inputs.full_name}
        />
        <Button fullWidth sx={{mt: 1}} variant="contained" type="submit">
          Register
        </Button>
      </ValidatorForm>
    </Container>
  );
};


RegisterForm.propTypes = {};

export default RegisterForm;
