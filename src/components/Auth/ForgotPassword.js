import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { toggleSpinner } from '../../slices/uiSlice';

import { toast } from 'react-toastify';
import Spinner from '../UI/Spinner';
import mailIcon from '../../assets/mail-icon.png';

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

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <div className="bg-blue-50  h-screen">
      <div className="rounded-3xl bg-white w-11/12 m-auto px-5 sm:px-10 py-10 sm:w-[50rem] flex flex-col gap-8 sm:flex-row justify-between relative top-10 sm:top-20">
        <div className="">
          <img className="w-10 mb-4" src={mailIcon} alt="mail icon" />
          <h1 className="font-normal text-3xl">Reset your Password</h1>
          <h3 className="mt-4">Enter your email</h3>
        </div>

        <div className="mt-3 sm:w-80">
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
              <button
                className="rounded-md py-2 w-full text-sm text-center font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-blue-700 focus:outline-offset-2"
                type="submit"
              >
                {spinner ? <Spinner /> : 'Get reset link'}
              </button>
            </div>
          </form>

          <div className="text-center text-sm">
            <p className="inline-block">Know your password?</p>{' '}
            <Link
              className="font-semibold text-blue-600 hover:text-blue-700"
              to="/login"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
