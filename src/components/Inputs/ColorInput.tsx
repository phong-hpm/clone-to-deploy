import React, { useState, useId } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useTheme } from '@mui/material';
const colors = [
  { label: 'Schwarz', value: '#001F26' },
  { label: 'Braun', value: '#CE6F00' },
  { label: 'Hellblau', value: '#00C2FF' },
  { label: 'Grün', value: '#299D00' },
  { label: 'Weiss', value: '#FFFFFF' },
];

type ColorInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};
const ColorInput: React.FC<ColorInputProps> = ({ label, value, onChange }) => {
  const theme = useTheme();

  const [selectedColor, setSelectedColor] = useState(
    colors.find((color) => color.label.toLowerCase() === value)?.value as string
  );

  const handleChange = (event: SelectChangeEvent) => {
    const newColor = event.target.value as string;
    setSelectedColor(newColor);
    onChange(
      colors
        .find((color) => color.value === newColor)
        ?.label.toLowerCase() as string
    );
  };

  const id = useId();

  return (
    <FormControl variant='standard'>
      <InputLabel style={{ fontSize: '0.7rem', top: '-5px' }} id={id}>
        {label}
      </InputLabel>
      <Select
        id={id}
        value={selectedColor || ''}
        onChange={handleChange}
        labelId='color-select-label'
        sx={{
          width: '120px',
          '& .MuiInput-underline:after': {
            borderBottomColor: theme.palette.primary.dark,
          },
          '& .MuiInputLabel-root': {
            fontSize: '0.7rem',
          },
          '& .MuiSelect-select': {
            paddingLeft: theme.spacing(5),
          },
        }}
        renderValue={(selectedColor) => {
          const color = colors.find((color) => color.value === selectedColor);
          return (
            <>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  backgroundColor: selectedColor,
                  position: 'absolute',
                  left: theme.spacing(1),
                  border: '1px solid grey',
                }}
              />
              {color ? color.label : ''}
            </>
          );
        }}
      >
        {colors.map((color) => (
          <MenuItem key={color.value} value={color.value}>
            {color.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ColorInput;
