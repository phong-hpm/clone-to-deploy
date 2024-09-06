import { useId, useMemo } from 'react';
import isNil from 'lodash/isNil';

import { Slider, Typography } from '@mui/material';
import InputNumber from './Inputs/InputNumber';

export interface InputSliderProps {
  error?: boolean;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: string | number | null;
  onChange?: (value: string | null) => void;
}

const InputSlider: React.FC<InputSliderProps> = ({
  error,
  label,
  value,
  max,
  min,
  step = 1,
  onChange,
}) => {
  const id = useId();

  const sliderValue = useMemo(() => {
    if (!isNil(value)) return value;
    if (!isNil(min)) return min;
    return 0;
  }, [value, min]);

  const handleBlur = () => {
    if (isNil(value)) return;

    if (!isNil(min) && Number(value) < min) {
      onChange?.(String(min));
    } else if (!isNil(max) && Number(value) > max) {
      onChange?.(String(max));
    }
  };

  return (
    <div className='w-full'>
      <Typography style={{ color: '#3d474b' }} id={id} gutterBottom>
        {label}
      </Typography>
      <div className='flex items-center gap-3'>
        <p className='shrink-0 w-10 text-[#3e484c]'>
          {min === -5 ? '-----' : min}
        </p>

        <div className='grow flex items-center'>
          <Slider
            value={Number(sliderValue)}
            onChange={(_, value) => onChange?.(String(value))}
            aria-labelledby='small-steppes'
            step={step}
            marks
            min={min}
            max={max}
            valueLabelDisplay='auto'
            sx={{
              '& .MuiSlider-rail': {
                height: 8,
                color: 'gray',
              },
              '& .MuiSlider-track': {
                height: 8,
                color: 'transparent',
              },
              '& .MuiSlider-thumb': {
                height: 30,
                width: 5,
                borderRadius: 1,
                color: '#07779E',
                '&:focus, &.Mui-focusVisible': {
                  boxShadow: 'none',
                },
              },
              '& .MuiSlider-mark': {
                backgroundColor: '#A9A9A9',
                width: 6,
                height: 6,
                borderRadius: 3,
              },
            }}
          />
        </div>

        <p className='shrink-0 w-10 text-[#3e484c]'>
          {max === 5 ? '+++++' : max}
        </p>

        <div className='shrink-0 w-16'>
          <InputNumber
            fullWidth
            hideIcons={true}
            error={error}
            value={value}
            size='small'
            onChangeNumber={(value) =>
              onChange?.(value === '' ? String(min) : value || '')
            }
            onBlur={handleBlur}
            inputProps={{
              step: 'any',
              min,
              max,
              type: 'number',
              'aria-labelledby': id,
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default InputSlider;
