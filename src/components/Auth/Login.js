import { Link } from 'react-router-dom';

import LoginForm from './LoginForm';
import mailIcon from '../../assets/mail-icon.png';

export default function Login() {
  return (
    <div className="bg-blue-50  h-screen">
      <div className="rounded-3xl bg-white w-11/12 m-auto px-5 sm:px-10 py-10 sm:w-[50rem] flex flex-col gap-8 sm:flex-row justify-between relative top-10 sm:top-20">
        <div className="">
          <img className="w-10 mb-4" src={mailIcon} alt="mail icon" />
          <h1 className="font-normal text-3xl">Sign in</h1>
          <h3 className="mt-4">to continue to Rmail</h3>
        </div>

        <div className="mt-3 sm:w-80">
          <LoginForm />

          <div className="text-center text-sm">
            <p className="inline-block">Don't have an account?</p>{' '}
            <Link
              className="font-semibold text-blue-600 hover:text-blue-700"
              to="/signup"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
