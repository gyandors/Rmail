import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import SignUpPage from './pages/SignUpPage';

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<h1>Welcome</h1>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<h1>Login Page</h1>} />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer theme="colored" />
    </>
  );
}
