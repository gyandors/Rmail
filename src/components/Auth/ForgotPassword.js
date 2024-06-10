import { useRef } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { toggleSpinner } from '../../slices/uiSlice';

import { toast } from 'react-toastify';
import Spinner from '../UI/Spinner';

export default function ForgotPassword() {
  const emailRef = useRef();
  const spinner = useSelector((state) => state.uiState.spinner);
  const dispatch = useDispatch();

  async function handleFormSubmit(event) {
    event.preventDefault();
    dispatch(toggleSpinner(true));

    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBwgAJkZjV9L9mIKI7CySOf8mrvtrZ3rOQ',
        {
          method: 'POST',
          body: JSON.stringify({
            requestType: 'PASSWORD_RESET',
            email: emailRef.current.value,
          }),
        }
      );
      if (response.ok) {
        toast.success('Password reset link has been sent to your email');
      } else {
        const data = await response.json();
        throw new Error(data.error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(toggleSpinner(false));
  }

  return (
    <div>
      <div className="mt-12 w-11/12 m-auto sm:w-96">
        <h1 className="font-bold text-2xl text-center">Reset your password</h1>
      </div>
      <div className="mt-12 w-11/12 m-auto sm:w-96">
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
            <button
              className="rounded-md py-2 w-full text-sm text-center font-semibold text-white bg-violet-600 hover:bg-violet-700 active:bg-violet-800 focus:outline-violet-700 focus:outline-offset-2"
              type="submit"
            >
              {spinner ? <Spinner /> : 'Get reset link'}
            </button>
          </div>
        </form>
      </div>
      <div className="w-11/12 m-auto text-center text-sm sm:w-96">
        <p className="inline-block">Know your password?</p>{' '}
        <Link className="text-violet-700 font-semibold" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
}
