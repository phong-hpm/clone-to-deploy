import {
  FormControlLabel,
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
} from '@mui/material';

interface CheckButtonProps extends MuiCheckboxProps {
  label: string;
  checked: boolean;
}

const CheckButton: React.FC<CheckButtonProps> = ({
  label,
  checked,
  ...props
}) => {
  return (
    <FormControlLabel
      label={label}
      control={<MuiCheckbox color='secondary' checked={checked} {...props} />}
    />
  );
};

export default CheckButton;
