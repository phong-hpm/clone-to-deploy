import classNames from 'classnames';
import { ReactNode } from 'react';

type InfoColumnProps = {
  className?: string;
  label: ReactNode;
  value?: ReactNode;
};

const Description: React.FC<InfoColumnProps> = ({ value, label, className }) => {
  return (
    <div className={classNames('flex flex-col', className)}>
      <span className='text-sm'>{value}</span>
      <p className='text-xs text-[#6F797B]'>{label}</p>
    </div>
  );
};

export default Description;
