import { Control, Controller } from 'react-hook-form';

import InputText, { InputTextProps } from 'components/Inputs/InputText';
import FieldErrorMessage from 'features/FieldErrorMessage';

type InputTextFieldProps = InputTextProps & {
  name: string;
  control: Control;
};

const InputTextField: React.FC<InputTextFieldProps> = ({ control, name, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
        <div className='w-full flex flex-col gap-1'>
          <InputText
            {...props}
            error={!!error?.message}
            name={name}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
          />
          <FieldErrorMessage message={error?.message} />
        </div>
      )}
    />
  );
};

export default InputTextField;
