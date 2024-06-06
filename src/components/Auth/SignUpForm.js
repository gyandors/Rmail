import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Spinner from '../UI/Spinner';

export default function SignUpForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const navigate = useNavigate();

  const [spinner, setSpinner] = useState(false);

  function handleFormSubmit(event) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (!emailRef || !password || !confirmPassword) {
      toast.error('Please enter the required details');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Password did not match');
      return;
    }

    async function userSignUp() {
      setSpinner(true);
      try {
        const response = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBwgAJkZjV9L9mIKI7CySOf8mrvtrZ3rOQ',
          {
            method: 'POST',
            body: JSON.stringify({
              email: email,
              password: password,
              returnSecureToken: true,
            }),
          }
        );
        if (response.ok) {
          toast.success('Your account is created successfully. Login here');
          navigate('/login');
        } else {
          const data = await response.json();
          throw new Error(data.error.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
      setSpinner(false);
    }

    userSignUp();
  }
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
          className="ring-1 ring-inset ring-gray-300 w-full py-1 px-2 rounded-md shadow-sm focus:outline-violet-700 autofill:bg-yellow-200"
          type="email"
          id="email"
          ref={emailRef}
        />
      </div>
      <div className="mb-6">
        <label
          className="block font-semibold text-sm text-gray-800 mb-1"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="ring-1 ring-inset ring-gray-300 w-full py-1 px-2 rounded-md shadow-sm focus:outline-violet-700"
          type="password"
          id="password"
          ref={passwordRef}
        />
      </div>
      <div className="mb-6">
        <label
          className="block font-semibold text-sm text-gray-800 mb-1"
          htmlFor="confirm-password"
        >
          Confirm Password
        </label>
        <input
          className="ring-1 ring-inset ring-gray-300 w-full py-1 px-2 rounded-md shadow-sm focus:outline-violet-700"
          type="password"
          id="confirm-password"
          ref={confirmPasswordRef}
        />
      </div>
      <div className="mb-6">
        <button
          className="rounded-md py-2 w-full text-sm text-center font-semibold text-white bg-violet-600 hover:bg-violet-700 active:bg-violet-800 focus:outline-violet-700 focus:outline-offset-2"
          type="submit"
        >
          {spinner ? <Spinner /> : 'SignUp'}
        </button>
      </div>
    </form>
  );
}
