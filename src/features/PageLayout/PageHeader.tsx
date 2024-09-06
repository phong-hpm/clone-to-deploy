import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';

import { ROUTES } from 'constants/routes';
import useLoadLensesData from 'hooks/useLoadLensesData';

import { ReactComponent as ProfileIcon } from 'assets/SVG/Profile.svg';
import { ReactComponent as CartIcon } from 'assets/SVG/Cart.svg';
import { CircularProgress } from '@mui/material';
import classNames from 'classnames';
import SidebarMenu from './SidebarMenu';

const PageHeader = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const { loading: loadingLensList, lensesMeta } = useLoadLensesData();

  const handleLogout = async () => {
    try {
      await auth.signoutSilent();
      localStorage.removeItem('token');
      navigate(ROUTES.login);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-row w-full pl-4 pr-4'>
      <div className='h-[81px] w-full flex justify-between items-center border-b'>
        <SidebarMenu />
        <ul
          id='menu'
          className='hidden fixed top-0 right-0 px-10 py-16 z-50
                md:relative md:flex md:p-0 md:bg-transparent md:flex-row md:space-x-6'
        >
          <li
            className='flex flex-row justify-center gap-2 cursor-pointer pr-10'
            onClick={handleLogout}
          >
            <ProfileIcon className='cursor-pointer' />
            <p className='text-sm flex flex-row justify-center items-center text-[#3e484c]'>
              Ausloggen
            </p>
          </li>
          <li className='pr-8'>
            <Link className='relative' to={ROUTES.cart}>
              <CartIcon className='cursor-pointer' />
              {(lensesMeta?.total ?? 0) > 0 && (
                <div
                  className={classNames(
                    'absolute -top-2 -right-2 flex justify-center items-center bg-red-500 text-white rounded-full min-w-4 h-4 text-[10px] p-1',
                    loadingLensList ? 'bg-orange-300' : 'bg-red-500'
                  )}
                >
                  {loadingLensList ? (
                    <CircularProgress size={10} color='error' />
                  ) : (
                    <span>
                      {lensesMeta?.total && lensesMeta.total < 100
                        ? lensesMeta.total
                        : '99+'}
                    </span>
                  )}
                </div>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PageHeader;
