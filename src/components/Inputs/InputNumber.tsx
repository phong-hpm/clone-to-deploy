import classNames from 'classnames';
import isNil from 'lodash/isNil';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';

const checkNumberWithPoint = (value: string | number) => {
  // negative number
  if (typeof value === 'string' && (value === '' || value === '-')) {
    return true;
  }

  return !isNaN(Number(value));
};

const increaseNumber = (
  value?: number | string | null,
  options?: { step?: number; max?: number }
) => {
  let result = 0;
  if (value !== null && value !== undefined && checkNumberWithPoint(value)) {
    result = Number(value);
  }

  const increasedValue = result + (options?.step || 1);
  const roundedValue = Number(increasedValue.toFixed(2));

  return options?.max !== undefined && roundedValue > options.max
    ? options.max
    : roundedValue;
};

const decreaseNumber = (
  value?: number | string | null,
  options?: { step?: number; min?: number }
) => {
  let result = 0;
  if (value !== null && value !== undefined && checkNumberWithPoint(value)) {
    result = Number(value);
  }

  const decreasedValue = result - (options?.step || 1);
  const roundedValue = Number(decreasedValue.toFixed(2));
  return options?.min !== undefined && roundedValue < options.min
    ? options.min
    : roundedValue;
};

export type InputNumberProps = TextFieldProps & {
  label?: string;
  value?: string | number | null;
  hideIcons?: boolean;
  step?: number;
  min?: number;
  max?: number;
  onChangeNumber?: (
    value: string | null,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const InputNumber: React.FC<InputNumberProps> = ({
  className,
  hideIcons,
  label,
  value,
  min,
  max,
  step,
  onChangeNumber,
  ...props
}) => {
  const theme = useTheme();

  return (
    <TextField
      {...props}
      label={label}
      variant='standard'
      value={isNil(value) ? '' : value}
      className={classNames('bg-white', className)}
      onChange={(e) => {
        if (e.target.value === '') {
          onChangeNumber?.(null, e);
        } else if (checkNumberWithPoint(e.target.value)) {
          const newValue = Number(e.target.value);
          if (min !== undefined && newValue < min) {
            onChangeNumber?.(String(min), e);
          } else if (max !== undefined && newValue > max) {
            onChangeNumber?.(String(max), e);
          } else {
            onChangeNumber?.(e.target.value, e);
          }
        }
      }}
      InputProps={{
        endAdornment: !hideIcons && (
          <InputAdornment position='end'>
            <ExpandLessIcon
              className='cursor-pointer'
              sx={{ color: '#3F484B' }}
              onClick={(e) =>
                onChangeNumber?.(
                  String(increaseNumber(value, { step, max })),
                  e as any
                )
              }
            />
            <ExpandMoreIcon
              className='cursor-pointer'
              sx={{ color: '#3F484B' }}
              onClick={(e) =>
                onChangeNumber?.(
                  String(decreaseNumber(value, { step, min })),
                  e as any
                )
              }
            />
          </InputAdornment>
        ),
      }}
      sx={{
        paddingTop: '4px',
        '& .MuiInputBase-root': {
          padding: '0 8px',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: theme.palette.primary.dark,
        },
        '& label.Mui-focused': {
          color: 'rgba(0, 0, 0, 0.54)',
        },
        '& .MuiInputLabel-root': {
          top: 4,
          left: 8,
          fontSize: '12px',
          color: '#212121',
        },
      }}
    />
  );
};

export default InputNumber;
