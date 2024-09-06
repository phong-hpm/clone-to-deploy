import { Control, Controller } from 'react-hook-form';
import isNil from 'lodash/isNil';

import InputNumber, { InputNumberProps } from 'components/Inputs/InputNumber';
import FieldErrorMessage from 'features/FieldErrorMessage';

type InputNumberFieldProps = InputNumberProps & {
  name: string;
  control: Control;
  onChange?: (value: number | string | null) => void;
  min?: number;
  max?: number;
  trigger?: any;
  uber?: boolean;
};

const InputNumberField: React.FC<InputNumberFieldProps> = ({
  control,
  name,
  onChange,
  min,
  max,
  trigger,
  uber,

  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={uber ? 0 : undefined} // Set the default value to 0 when uber is true
      render={({
        field: { onChange: onFieldChange, onBlur, value, name },
        fieldState: { error },
      }) => (
        <div className='w-full flex flex-col gap-1'>
          <InputNumber
            {...props}
            error={!!error?.message}
            name={name}
            value={value}
            min={min}
            placeholder='-'
            max={max}
            onBlur={async () => {
              onBlur();
              if (trigger) {
                await trigger(name);
              }
            }}
            InputLabelProps={{ shrink: true }} //This Line is added, it can be deleted if the font fits the inputs
            onChangeNumber={(value) => {
              if (isNil(value)) {
                onFieldChange(null);
                onChange && onChange(null);
              } else {
                onFieldChange(value);
                onChange && onChange(value);
              }
            }}
          />
          <FieldErrorMessage message={error?.message} />
        </div>
      )}
    />
  );
};

export default InputNumberField;
