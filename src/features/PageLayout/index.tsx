import { FC, ReactNode } from 'react';

import PageHeader from './PageHeader';

interface PageLayoutProps {
  children?: ReactNode;
}

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return (
    <div>
      <header className='w-full'>
        <PageHeader />
      </header>

      <div className='h-[calc(100vh-64px)] overflow-auto'>{children}</div>
    </div>
  );
};

export default PageLayout;
