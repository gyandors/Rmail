import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from '../../slices/authSlice';
import { toggleSpinner } from '../../slices/uiSlice';

import Spinner from '../UI/Spinner';

export default function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const spinner = useSelector((state) => state.uiState.spinner);
  const dispatch = useDispatch();

  function handleFormSubmit(event) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!emailRef || !password) {
      toast.error('Please enter the required details');
      return;
    }

    async function userLogin() {
      dispatch(toggleSpinner(true));
      try {
        const response = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBwgAJkZjV9L9mIKI7CySOf8mrvtrZ3rOQ',
          {
            method: 'POST',
            body: JSON.stringify({
              email: email,
              password: password,
              returnSecureToken: true,
            }),
          }
        );
        const data = await response.json();

        if (response.ok) {
          dispatch(onLogin(data));
        } else {
          throw new Error(data.error.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
      dispatch(toggleSpinner(false));
    }

    userLogin();
  }

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-6">
        <label
          className="block font-semibold text-sm text-gray-800 mb-1"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="ring-1 ring-inset ring-gray-300 w-full py-1 px-2 rounded-md shadow-sm focus:outline-blue-700 autofill:bg-yellow-200"
          type="email"
          id="email"
          ref={emailRef}
        />
      </div>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <label
            className="block font-semibold text-sm text-gray-800 mb-1 flex-grow"
            htmlFor="password"
          >
            Password
          </label>
          <Link
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            to="/forgot-password"
          >
            Forgot password?
          </Link>
        </div>
        <input
          className="ring-1 ring-inset ring-gray-300 w-full py-1 px-2 rounded-md shadow-sm focus:outline-blue-700"
          type="password"
          id="password"
          ref={passwordRef}
        />
      </div>
      <div className="mb-6">
        <button
          className="rounded-md py-2 w-full text-sm text-center font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-blue-700 focus:outline-offset-2"
          type="submit"
        >
          {spinner ? <Spinner /> : 'Login'}
        </button>
      </div>
    </form>
  );
}
