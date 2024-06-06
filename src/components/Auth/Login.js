import { Link } from 'react-router-dom';

import LoginForm from './LoginForm';

export default function Login() {
  return (
    <div>
      <div className="mt-12 w-11/12 m-auto sm:w-96">
        <h1 className="font-bold text-2xl text-center">Login</h1>
      </div>

      <div className="mt-12 w-11/12 m-auto sm:w-96">
        <LoginForm />
      </div>

      <div className="w-11/12 m-auto text-center text-sm sm:w-96">
        <p className="inline-block">Don't have an account?</p>{' '}
        <Link className="text-violet-700 font-semibold" to="/signup">
          SignUp
        </Link>
      </div>
    </div>
  );
}
