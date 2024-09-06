import { FC } from 'react';

import ErrorIcon from '@mui/icons-material/Error';

interface FieldErrorMessageProps {
  message?: string;
}

const FieldErrorMessage: FC<FieldErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className='flex items-center gap-1 text-red-500 text-xs font-semibold'>
      <span>
        <ErrorIcon fontSize='small' />
      </span>
      <span>{message}</span>
    </div>
  );
};

export default FieldErrorMessage;
