import { Control, Controller } from 'react-hook-form';

import { RadioGroup as MuiRadioGroup, RadioGroupProps as MuiRadioGroupProps } from '@mui/material';
import FieldErrorMessage from 'features/FieldErrorMessage';

type RadioGroupFieldProps = MuiRadioGroupProps & {
  name: string;
  control: Control;
};

const RadioGroupField: React.FC<RadioGroupFieldProps> = ({ name, control, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className='w-full flex flex-col gap-1'>
          <MuiRadioGroup {...field} {...props} />
          <FieldErrorMessage message={error?.message} />
        </div>
      )}
    />
  );
};

export default RadioGroupField;
