import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Zoom, ToastContainer } from 'react-toastify';

import NotFoundPage from './pages/NotFoundPage';

import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

import HomePage from './pages/HomePage';
import ComposePage from './pages/ComposePage';

export default function App() {
  const isLoggedIn = useSelector((state) => state.authState.isLoggedIn);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
          errorElement={<NotFoundPage />}
        />

        <Route
          path="/signup"
          element={!isLoggedIn ? <SignUpPage /> : <Navigate to="/" />}
        />

        <Route
          path="/login"
          element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" />}
        />

        <Route
          path="/forgot-password"
          element={!isLoggedIn ? <ForgotPasswordPage /> : <Navigate to="/" />}
        />

        <Route
          path="/home"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/" />}
        >
          <Route path="compose" element={<ComposePage />} />
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />

      <ToastContainer
        theme="colored"
        transition={Zoom}
        position="top-center"
        draggable="mouse"
      />
    </>
  );
}
