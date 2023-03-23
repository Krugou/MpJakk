import {useState} from 'react';

const useForm = (callback, initState) => {
  const [inputs, setInputs] = useState(initState);
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };
  /*
  explanation:
  event.persist() is used to remove the synthetic event from the pool and allow references to the event to be retained by user code.
  https://reactjs.org/docs/events.html#event-pooling

*/

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => {
      return {
        ...inputs,
        [event.target.name]: event.target.value,
      };
    });
  };
  return {
    inputs,
    handleSubmit,
    handleInputChange,
  };
};

export default useForm;
