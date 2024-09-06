import { ROUTES } from 'constants/routes';
import { Link } from 'react-router-dom';
import { ReactComponent as SidebarMenuIcon } from 'assets/SVG/SidebarMenuIcon.svg';
import { ReactComponent as CloseIcon } from 'assets/SVG/CloseIcon.svg';
import { useState, useRef, useEffect } from 'react';
import falcoImg from 'assets/FalcoImg.png';
import { createPortal } from 'react-dom';
import OutsideClick from '../../hooks/outsideClick';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

const SidebarMenu = () => {
  const [isSidePanelVisible, setSidePanelVisible] = useState(false);
  const ref = useRef(null);
  const outsideClick = OutsideClick(ref);
  const location = useLocation();

  useEffect(() => {
    if (outsideClick) {
      setSidePanelVisible(false);
    }
  }, [outsideClick]);

  const toggleSidePanel = () => {
    setSidePanelVisible(!isSidePanelVisible);
  };
  return (
    <div className='flex flex-row items-center gap-8'>
      <div className='cursor-pointer' onClick={toggleSidePanel}>
        <SidebarMenuIcon />
      </div>
      {isSidePanelVisible &&
        createPortal(
          <>
            <div
              className='fixed top-0 left-0 w-full h-full bg-[#F5F5F7] opacity-30'
              style={{
                zIndex: 1000,
              }}
              onClick={toggleSidePanel}
            />
            <div
              className='fixed top-0 left-0 w-1/4 h-screen bg-[#f5f5f7]'
              style={{
                zIndex: 1001,
              }}
              ref={ref}
            >
              <div className='flex flex-row justify-start gap-8 items-center w-full px-4 pt-6'>
                <div className='cursor-pointer' onClick={toggleSidePanel}>
                  <CloseIcon />
                </div>
                <Link to={ROUTES.dashboard} onClick={toggleSidePanel}>
                  <img src={falcoImg} alt='FalcoLogo' className='h-8' />
                </Link>
              </div>
              <div className='flex flex-col h-full p-4 justify-start items-start'>
                <div className='pt-32 flex w-full flex-col'>
                  <Link to={ROUTES.dashboard}>
                    <div
                      className={classNames(
                        'cursor-pointer p-4 rounded w-full',
                        location.pathname === ROUTES.dashboard
                          ? 'bg-[#0c6c90] text-white hover:bg-[#e4e3e6] hover:text-black'
                          : 'hover:bg-[#e0e0e2]'
                      )}
                    >
                      Kontaktlinsenmodifikationstool
                    </div>
                  </Link>
                  <Link to={ROUTES.orders}>
                    <div
                      className={classNames(
                        'cursor-pointer p-4 rounded w-full',
                        location.pathname === ROUTES.orders
                          ? 'bg-[#0c6c90] text-white hover:bg-[#e4e3e6] hover:text-black'
                          : 'hover:bg-[#e0e0e2]'
                      )}
                    >
                      Bestellung
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
      <Link to={ROUTES.dashboard}>
        <img src={falcoImg} alt='FalcoLogo' className='h-8' />
      </Link>
    </div>
  );
};

export default SidebarMenu;
