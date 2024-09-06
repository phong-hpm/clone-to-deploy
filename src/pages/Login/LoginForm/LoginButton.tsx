import { ReactNode } from 'react';

type LoginButtonProps = {
  children?: ReactNode;
  onClick?: () => void;
};

const LoginButton: React.FC<LoginButtonProps> = ({ children, onClick }) => {
  return (
    <button
      type='submit'
      className={`w-96 text-white font-bold py-2 px-4 rounded bg-[#07779E] hover:bg-[#0892B2]`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default LoginButton;
