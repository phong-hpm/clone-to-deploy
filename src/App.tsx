import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
import { AuthProvider, useAuth } from 'react-oidc-context';
import { useEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';

import NotFound from 'pages/NotFound';
import Dashboard from 'pages/Dashboard';
import ParametersPage from 'pages/ParametersPage';
import LoginPage from 'pages/Login/LoginPage';
import Orders from 'pages/Orders';
import Cart from 'pages/Cart';

import ProtectedRoute from 'features/ProtectedRoute';
import PageLayout from 'features/PageLayout';
import { ResponseInterceptor } from 'features/ResponseInterceptor';

import muiTheme from './muiTheme';
import { ROUTES } from './constants/routes';

const PUBLIC_URL = process.env.PUBLIC_URL;

export const userManager = new UserManager({
  authority: process.env.REACT_APP_AUTHORITY || '',
  client_id: process.env.REACT_APP_CLIENT_ID || '',
  redirect_uri: window.location.origin,
  post_logout_redirect_uri: `${window.location.origin}${window.location.pathname}`,
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),
  monitorSession: true // this allows cross tab login/logout detection
});

export const onSigninCallback = () => {
  window.history.replaceState({}, document.title, window.location.pathname);
};

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <BrowserRouter basename={PUBLIC_URL}>
        <AuthProvider userManager={userManager} onSigninCallback={onSigninCallback}>
          <ResponseInterceptor>
            <AppContent />
          </ResponseInterceptor>
        </AuthProvider>
      </BrowserRouter>

      <ToastContainer className='mt-8' hideProgressBar />
    </ThemeProvider>
  );
}

const protectedRoutes = [
  { path: ROUTES.dashboard, element: <Dashboard /> },
  { path: `${ROUTES.parameters}/:id/:mode`, element: <ParametersPage /> },
  { path: `${ROUTES.parameters}/:id`, element: <ParametersPage /> },
  { path: ROUTES.orders, element: <Orders /> },
  { path: ROUTES.cart, element: <Cart /> },
];

function AppContent() {
  const auth = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (auth.isLoading) {
      return;
    }

    if (auth.isAuthenticated) {
      localStorage.setItem('token', auth.user?.access_token || '');
    } else {
      localStorage.removeItem('token');
      navigate(ROUTES.login);
    }
  }, [auth, navigate]);

  return (
    <div className='h-screen overflow-auto'>
      <Routes>
        <Route path={`${ROUTES.login}`} element={<LoginPage />} index />
        {protectedRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              auth.isLoading ? (
                <div className='flex flex-row justify-center items-center pt-40'>
                  <CircularProgress size={100} />
                </div>
              ) : (
                <PageLayout>
                  <ProtectedRoute>{route.element}</ProtectedRoute>
                </PageLayout>
              )
            }
          />
        ))}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
