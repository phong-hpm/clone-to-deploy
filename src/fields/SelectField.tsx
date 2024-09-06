import { Control, Controller } from 'react-hook-form';

import Dropdown, { DropdownProps } from 'components/Dropdown';
import FieldErrorMessage from 'features/FieldErrorMessage';

type SelectFieldProps = DropdownProps & {
  name: string;
  control: Control;
};

const SelectField: React.FC<SelectFieldProps> = ({
  control,
  name,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name || ''}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <div className='w-full flex flex-col gap-1'>
            <Dropdown
              {...props}
              error={!!error?.message}
              value={value}
              onChangeOption={(value) => {
                onChange(value);
              }}
            />
            <FieldErrorMessage message={error?.message} />
          </div>
        );
      }}
    />
  );
};

export default SelectField;
