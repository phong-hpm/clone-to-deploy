import { FC } from 'react';

import { TextField, TextFieldProps } from '@mui/material';

export type InputTextProps = TextFieldProps & {};

const InputText: FC<InputTextProps> = ({ ...props }) => {
  return (
    <div>
      <TextField
        {...props}
        variant='outlined'
        sx={{
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: 'gray',
              borderWidth: '1px',
            },
            '&.Mui-focused': {
              color: '#3F484B',
            },
          },
          '& .MuiFormLabel-root.Mui-focused': {
            color: '#3F484B',
          },
          ...props.sx,
        }}
      />
    </div>
  );
};

export default InputText;
