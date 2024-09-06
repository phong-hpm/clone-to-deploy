import { CircularProgress, Button as MuiButton, ButtonProps as MuiButtonProps, useTheme } from '@mui/material';
import classNames from 'classnames';

interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ loading, variant = 'outlined', children, ...props }) => {
  const theme = useTheme();

  const outlinedStyles = {
    color: theme.palette.primary.dark,
    borderColor: theme.palette.grey[500],
  };

  const containedStyles = {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  };

  return (
    <MuiButton
      className={classNames(loading && 'relative !text-transparent')}
      disabled={loading}
      variant={variant}
      type='button'
      sx={{
        textTransform: 'none',
        fontSize: '14px',
        padding: '6px 12px',
        ...(variant === 'outlined' ? outlinedStyles : containedStyles),
      }}
      {...props}
    >
      {loading && (
        <span className='absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <CircularProgress size={16} />
        </span>
      )}
      {children}
    </MuiButton>
  );
};

export default Button;
