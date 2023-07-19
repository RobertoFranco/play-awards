import { Home } from "./components/Home";
import Register from "./components/Register";
import ResetPassword from './components/ResetPassword';
import Login from './components/Login';
import ResetPasswordRequest from './components/ResetPasswordRequest';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/reset-password-request',
    element: <ResetPasswordRequest />
  },
  {
    path: '/reset-password/:token',
    element: <ResetPassword />
  },
  {
    path: '/register',
    element: <ProtectedRoute>
      <Register />
    </ProtectedRoute>
  }
];

export default AppRoutes;
