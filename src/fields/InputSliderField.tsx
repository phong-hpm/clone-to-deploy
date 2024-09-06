import { Control, Controller } from 'react-hook-form';

import InputSlider, { InputSliderProps } from 'components/InputSlider';
import FieldErrorMessage from 'features/FieldErrorMessage';

type InputSliderFieldProps = InputSliderProps & {
  name: string;
  control: Control;
  values: any;
};

const InputSliderField: React.FC<InputSliderFieldProps> = ({
  control,
  name,
  values,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name || ''}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className='w-full flex flex-col gap-1'>
          <InputSlider
            value={value}
            onChange={onChange}
            {...props}
            error={!!error?.message}
          />
          <FieldErrorMessage message={error?.message} />
        </div>
      )}
    />
  );
};

export default InputSliderField;
