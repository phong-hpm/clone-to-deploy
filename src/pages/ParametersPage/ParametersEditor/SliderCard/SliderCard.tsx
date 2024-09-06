import { UseFormReturn } from 'react-hook-form';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect, useState } from 'react';

import { TSiderCardConfig } from 'constants/parameters';
import classNames from 'classnames';
import InputSliderField from 'fields/InputSliderField';

import { ReactComponent as SteilenMerdianIcon } from 'assets/SVG/SteilenMerdian.svg';
import { ReactComponent as FlachenMerdianIcon } from 'assets/SVG/FlachenMerdian.svg';

import { TFormData } from '../..';
import SliderCardInfo from './SliderCardInfo';
import { useRef } from 'react';

type SliderCardProps = {
  form: UseFormReturn<TFormData>;
  config: TSiderCardConfig;
};

const SliderCard: React.FC<SliderCardProps> = ({ form, config }) => {
  const [showInfo, setShowInfo] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (
        infoRef.current &&
        !infoRef.current.contains(e.target as Node) &&
        iconRef.current &&
        !iconRef.current.contains(e.target as Node)
      ) {
        setShowInfo(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  if (!config) return null;

  const { header, inputs } = config;

  const { getValues } = form;

  const values = getValues('custom_parameters');

  return (
    <div className='grow flex flex-col bg-white rounded-md p-4 gap-2'>
      {header && (
        <div className='flex flex-row items-center gap-4'>
          <div className='flex flex-row items-center justify-between w-full'>
            <div className='flex flex-row items-center gap-4 p-2'>
              {header.iconType === 'flachen' && <FlachenMerdianIcon />}
              {header.iconType === 'steilen' && <SteilenMerdianIcon />}

              <div className='text-[#3d474b]'>{header.title}</div>
            </div>
            <div
              onClick={() => setShowInfo((prev) => !prev)}
              className={classNames(
                'cursor-pointer',
                showInfo && 'bg-[#e8e8e8] rounded-md',
                'p-2'
              )}
              ref={iconRef}
              style={{ position: 'relative' }}
            >
              <InfoOutlinedIcon style={{ color: '#3c494c' }} />
              {showInfo && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 48,
                    zIndex: 999,
                  }}
                  ref={infoRef}
                  className='cursor-default'
                >
                  <SliderCardInfo />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className='flex flex-col items-center gap-4 px-10 py-4'>
        {inputs.map((inputConfig, index) => (
          <InputSliderField
            key={index}
            name={`custom_parameters.${inputConfig.field}`}
            label={inputConfig.label}
            min={inputConfig.min}
            max={inputConfig.max}
            step={inputConfig.step}
            control={form.control}
            values={values}
          />
        ))}
      </div>
    </div>
  );
};

export default SliderCard;
