import { useEffect, useMemo, useState } from 'react';

import Dot from './Dot';
import { UseFormSetValue } from 'react-hook-form';
import { CIRCUMFERENCE, RADIUS, SMALL_DIAMETER } from 'constants/parameters';
import DynamicLinesSVG from 'assets/DynamicLines/DynamicLinesSVG';
import { TReferenceLens } from 'types/reference-lens';

type CalibrationCircleProps = {
  selectedColor: string;
  ds: number;
  gradValue: number | null;
  setIsGradValueFromInput: (value: boolean) => void;
  selectedButton: TReferenceLens['engraving_type'];
  setValue: UseFormSetValue<any>;
  onChange?: (value: number) => void;
  isGradValueFromInput: boolean;
};

const CalibrationCircle: React.FC<CalibrationCircleProps> = ({
  selectedColor,
  ds,
  gradValue,
  setIsGradValueFromInput,
  selectedButton,
  isGradValueFromInput,
  setValue,
}) => {
  const NUM_CIRCLES = useMemo(
    () => Math.floor(CIRCUMFERENCE / SMALL_DIAMETER),
    []
  );
  const ANGLE_STEP = 360 / NUM_CIRCLES;

  const [selectedCircles, setSelectedCircles] = useState<number[]>([
    gradValue ? Math.round((360 - gradValue) / ANGLE_STEP) % NUM_CIRCLES : 0,
  ]);

  useEffect(() => {
    if (isGradValueFromInput && gradValue) {
      const index = Math.round((360 - gradValue) / ANGLE_STEP) % NUM_CIRCLES;
      if (selectedButton === 'colon_engraving') {
        setSelectedCircles([index, (index + 1) % NUM_CIRCLES]);
      } else {
        setSelectedCircles([index]);
      }
    }
  }, [
    gradValue,
    ANGLE_STEP,
    NUM_CIRCLES,
    selectedButton,
    isGradValueFromInput,
  ]);

  useEffect(() => {
    if (selectedButton === 'with_color_point') {
      setSelectedCircles((prevState) => [prevState?.[0]]); // remove double dots
    } else if (selectedButton === 'colon_engraving') {
      setSelectedCircles((prevState) => [prevState?.[0], prevState?.[0] + 1]); // add double dots
    } else if (selectedButton === 'with_out_color_point') {
      setSelectedCircles((prevState) => [prevState?.[0]]); // remove double dots
    }
  }, [selectedButton, NUM_CIRCLES]);

  const isDoppelpunktgravurSelected = selectedButton === 'colon_engraving';

  const roundedAngle = useMemo(() => Math.round(ds / 15) * 15, [ds]);

  const circles = Array.from({ length: NUM_CIRCLES }, (_, i) => {
    const angle = Math.abs(ANGLE_STEP * i);
    const angleToDisplay = 360 - angle === 360 ? 0 : 360 - angle;

    return (
      <div
        key={i}
        className='absolute'
        style={{
          transform: `rotate(${angle}deg) translate(${RADIUS}px) rotate(-${angle}deg) scale(0.7)`,
          margin: '10px',
        }}
      >
        <Dot
          onClick={() => {
            const newAngle = angleToDisplay;
            setIsGradValueFromInput(false);
            setValue('custom_parameters.engraving_angle_deg', newAngle);
            if (isDoppelpunktgravurSelected) {
              setSelectedCircles([i, (i + 1) % NUM_CIRCLES]);
            } else {
              setSelectedCircles([i]);
            }
          }}
          color={
            !selectedColor ? 'primaryBlue' : (selectedColor as 'primaryBlue')
          }
          selected={
            gradValue !== undefined ? selectedCircles.includes(i) : false
          }
        />
      </div>
    );
  });

  return (
    <div className='bg-[#F5F5F7] w-36 h-36 border-2 border-[#BFC8CB] rounded-full relative flex items-center justify-center'>
      <div className='w-20 h-20 bg-[#BFC8CB] rounded-full'></div>
      <DynamicLinesSVG roundedAngle={roundedAngle} />
      {circles}
    </div>
  );
};

export default CalibrationCircle;
