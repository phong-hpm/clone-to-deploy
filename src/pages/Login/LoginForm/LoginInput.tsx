import './LoginInput.css';

interface LoginInputProps {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | undefined;
}
const LoginInput: React.FC<LoginInputProps> = ({
  id,
  type,
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <div className='input-wrapper flex flex-col w-96 relative'>
      <label
        htmlFor={id}
        className={`login-input-label ${value ? 'lifted' : ''}`}
      >
        {placeholder}
      </label>
      <input
        id={id}
        type={type}
        className='login-input'
        value={value}
        onChange={onChange}
      />
      <div
        className={`text-red-500 text-xs self-end h-1 ${
          error ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {error || ' '}
      </div>
    </div>
  );
};

export default LoginInput;
