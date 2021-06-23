import axios from 'axios';
import { useRef } from 'react';
import './register.scss';
import { useHistory } from 'react-router';

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity(`Passwords don't match`);
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post('/auth/register', user);
        history.push('/login');
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>Lamasocial</h3>
          <span className='loginDesc'>
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className='loginRight'>
          <form className='loginBox' onSubmit={handleClick}>
            <input
              placeholder='Username'
              className='loginInput'
              ref={username}
              required
            />
            <input
              type='email'
              placeholder='Email'
              required
              className='loginInput'
              ref={email}
            />
            <input
              placeholder='Password'
              type='password'
              className='loginInput'
              required
              ref={password}
              minLength='6'
            />
            <input
              placeholder='Password Again'
              type='password'
              className='loginInput'
              required
              ref={passwordAgain}
            />
            <button className='loginButton' type='submit'>
              Sign Up
            </button>
            <button className='loginRegisterButton'>Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
