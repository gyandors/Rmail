import { Link } from 'react-router-dom';

import SignUpForm from './SignUpForm';

export default function SignUp() {
  return (
    <div>
      <div className="mt-12 w-11/12 m-auto sm:w-96">
        <h1 className="font-bold text-2xl text-center">SignUp</h1>
      </div>
      <div className="mt-12 w-11/12 m-auto sm:w-96">
        <SignUpForm />
      </div>
      <div className="w-11/12 m-auto text-center text-sm sm:w-96">
        <p className="inline-block">Already have an account?</p>{' '}
        <Link className="text-violet-700 font-semibold" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
}
