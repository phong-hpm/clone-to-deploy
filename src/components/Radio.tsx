import {
  FormControlLabel,
  Radio as MuiRadio,
  RadioProps as MuiRadioProps,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

export interface RadioProps extends MuiRadioProps {
  label: string;
  value: boolean | string;
}

const Radio: React.FC<RadioProps> = ({
  label,
  sx,
  checked,
  value,
  ...props
}) => {
  const theme = useTheme();
  return (
    <FormControlLabel
      label={label}
      checked={checked}
      value={value}
      control={
        <MuiRadio
          {...props}
          sx={{
            '&.Mui-checked': {
              color: theme.palette.primary.dark,
            },
            ...sx,
          }}
        />
      }
    />
  );
};

export default Radio;
