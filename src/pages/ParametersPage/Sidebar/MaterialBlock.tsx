import { FC, useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { useParametersStore } from 'stores/parameters';
import { MATERIAL_OPTIONS, ENGRAVING_TYPE_OPTIONS } from 'constants/parameters';

import Radio from 'components/Radio';
import Checkbox from 'components/Checkbox';

import InputNumberField from 'fields/InputNumberField';
import SelectField from 'fields/SelectField';
import RadioGroupField from 'fields/RadioGroupField';

import CalibrationCircle from './CalibrationCircle';

import { TFormData } from '..';
import ColorInput from 'components/Inputs/ColorInput';
import { TReferenceLens } from 'types/reference-lens';

interface MaterialBlockProps {
  form: UseFormReturn<TFormData>;
}

const MaterialBlock: FC<MaterialBlockProps> = ({ form }) => {
  const { referenceLensData } = useParametersStore();

  const { control, setValue, watch, getValues } = form;

  const ds = watch('custom_parameters.ds');
  const conditionalMaterial = watch('custom_parameters.material');
  const gradValue = watch('custom_parameters.engraving_angle_deg') || null;

  const dotColor = watch('custom_parameters.color');

  const engravingType = watch('custom_parameters.engraving_type');

  const selectedButton = watch('custom_parameters.engraving_type');

  const [selectedColor, setSelectedColor] = useState('');

  const [isGradValueFromInput, setIsGradValueFromInput] = useState(false);

  const handleChecked = (value: TReferenceLens['engraving_type']) => {
    setValue('custom_parameters.engraving_type', value);
  };

  useEffect(() => {
    if (!dotColor) {
      if (
        selectedButton === 'with_out_color_point' ||
        selectedButton === 'colon_engraving'
      ) {
        setSelectedColor('primaryBlue');
      } else if (
        selectedButton === 'with_color_point' &&
        (conditionalMaterial === '1' || conditionalMaterial === '4')
      ) {
        setSelectedColor('primaryBlue');
      } else if (conditionalMaterial !== '1' && conditionalMaterial !== '4') {
        setSelectedColor('primaryBlue');
      }
    } else {
      setSelectedColor(dotColor);
    }

    if (!engravingType) {
      setValue('custom_parameters.engraving_type', null);
      setValue('custom_parameters.engraving_angle_deg', null);
    }

    if (
      conditionalMaterial === '8' ||
      conditionalMaterial === '7' ||
      conditionalMaterial === '6'
    ) {
      setValue('custom_parameters.engraving_angle_deg', null);
      setValue('custom_parameters.engraving_type', null);
    }
  }, [selectedButton, engravingType, setValue, conditionalMaterial, dotColor]);

  if (!referenceLensData) return null;
  return (
    <>
      <p className='text-[#4b5559]'>Material</p>
      <div className='flex flex-col justify-between border-solid border-b-2 pb-4 w-full'>
        <SelectField
          label='Material'
          name='custom_parameters.material'
          items={MATERIAL_OPTIONS}
          control={control}
        />
        {conditionalMaterial &&
          !(
            conditionalMaterial === '6' ||
            conditionalMaterial === '7' ||
            conditionalMaterial === '8'
          ) && (
            <>
              <Checkbox
                label={'Punktgravur'}
                name='custom_parameters.engraving_type'
                checked={!!engravingType}
                onClick={() => {
                  const newValue = engravingType
                    ? null
                    : 'with_out_color_point';
                  setValue('custom_parameters.engraving_type', newValue);
                }}
              />
              {engravingType && (
                <div className='pl-4 flex flex-col'>
                  <RadioGroupField
                    name='custom_parameters.engraving_type'
                    control={control}
                  >
                    {ENGRAVING_TYPE_OPTIONS.map((option) => {
                      if (
                        option.value === 'with_color_point' &&
                        !(
                          conditionalMaterial === '1' ||
                          conditionalMaterial === '4'
                        )
                      ) {
                        return null;
                      }

                      return (
                        <Radio
                          key={option.value}
                          checked={
                            selectedButton === option.value || // this is added because on initial load
                            selectedButton === option.label // the actual value is the label from form and from referenceLensData
                          }
                          onClick={() => handleChecked(option.value)}
                          name={option.label}
                          label={option.label}
                          value={option.value as string}
                        />
                      );
                    })}
                  </RadioGroupField>
                  <div className='flex flex-row justify-center p-4'>
                    <CalibrationCircle
                      selectedColor={selectedColor}
                      ds={ds || 0}
                      isGradValueFromInput={isGradValueFromInput}
                      setIsGradValueFromInput={setIsGradValueFromInput}
                      setValue={setValue}
                      gradValue={gradValue}
                      selectedButton={
                        selectedButton as TReferenceLens['engraving_type']
                      }
                    />
                    <span className='text-xs text-[#6F797B]'>
                      ds
                      <span className='text-sm pl-1 text-black'>{ds}°</span>
                    </span>
                  </div>
                  <div className='flex flex-row justfy-center'>
                    <InputNumberField
                      className='w-32'
                      label='Grad°'
                      name='custom_parameters.engraving_angle_deg'
                      control={control}
                      value={gradValue}
                      onChange={() => {
                        setIsGradValueFromInput(true);
                      }}
                    />
                    {selectedButton === 'with_color_point' &&
                      (conditionalMaterial === '1' ||
                        conditionalMaterial === '4') && (
                        <div className='pr-4 pt-[3px]'>
                          <ColorInput
                            key={'color_input'}
                            label={'Color Input'}
                            value={
                              getValues('custom_parameters.color') as string
                            }
                            onChange={(value: any) => {
                              setValue('custom_parameters.color', value);
                              setSelectedColor(value);
                            }}
                          />
                        </div>
                      )}
                  </div>
                </div>
              )}
            </>
          )}
      </div>
    </>
  );
};

export default MaterialBlock;
