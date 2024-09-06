import { FC, ReactNode, useId } from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type TDropdownOption = {
  label: ReactNode;
  value: string;
};

export interface DropdownProps {
  error?: boolean;
  label?: string;
  value?: string;
  items: TDropdownOption[];
  onChangeOption?: (value: string) => void;
}

const Dropdown: FC<DropdownProps> = ({ error, value, label, items, onChangeOption }) => {
  const id = useId();

  const handleChange = (event: SelectChangeEvent) => {
    onChangeOption?.(event.target.value);
  };

  return (
    <FormControl>
      <InputLabel id={id}>{label}</InputLabel>

      <Select error={error} labelId={id} value={value} label='Material' onChange={handleChange}>
        {items.map((item) => {
          return (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
