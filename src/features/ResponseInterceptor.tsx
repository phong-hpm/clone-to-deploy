import { FC, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from 'constants/routes';
import axiosInstance from 'helpers/axios';

interface ResponseInterceptorProps {
  children?: ReactNode;
}

export const ResponseInterceptor: FC<ResponseInterceptorProps> = ({ children }) => {
  const navigate = useNavigate();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    axiosInstance.interceptors.response.use(undefined, (error: any) => {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token');
          navigate(ROUTES.login);
          break;
        default:
          return Promise.reject(error);
      }
    });
    setReady(true);
  }, [navigate]);

  if (!ready) return null;

  return <>{children}</>;
};
