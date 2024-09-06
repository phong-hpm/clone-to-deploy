import { FC, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { OVERREFRACTION_INPUTS } from 'constants/parameters';

import InputNumberField from 'fields/InputNumberField';

import { TFormData } from '..';
import Radio from 'components/Radio';
import RadioGroupField from 'fields/RadioGroupField';

interface OverrefractionBlockProps {
  form: UseFormReturn<TFormData>;
}

const OverrefractionBlock: FC<OverrefractionBlockProps> = ({ form }) => {
  const { watch, control, setValue } = form;

  const contactLens = watch('custom_parameters.contact_lens');
  const dpt = watch('custom_parameters.dpt');
  const singleMultiStrengthen = watch(
    'custom_parameters.single_multi_strengthen'
  );
  const centerZone = watch('custom_parameters.center_zone');
  const intermediateZone = watch('custom_parameters.intermediate_zone');

  // Set default values
  useEffect(() => {
    if (centerZone === undefined || centerZone === null) {
      setValue('custom_parameters.center_zone', 2.5);
    }
    if (intermediateZone === undefined || intermediateZone === null) {
      setValue('custom_parameters.intermediate_zone', 3.5);
    }
  }, [centerZone, intermediateZone, setValue]);

  const isMulti = [
    'multi',
    'multi_b2',
    'multi_d3',
    'distant_center',
    'is_distant_center',
  ].includes(singleMultiStrengthen || '');
  const isMultiD3 = ['multi_d3'].includes(singleMultiStrengthen || '');

  return (
    <>
      <div className='flex flex-row justify-between items-center'>
        <p className='pr-2 text-[#4b5559]'>
          Überrefraktion ({contactLens === 'left' ? 'Links' : 'Rechts'})
        </p>
        <div className='flex flex-row justify-center items-center'>
          <p className='text-xs text-[#3F484B]'>
            <span>dpt</span>
          </p>

          <span className='text-lg pl-4 text-black'>{dpt}</span>
        </div>
      </div>

      <div className='border-solid border-b-2 pb-4 flex flex-col gap-4'>
        <div className='grid grid-cols-3 gap-4'>
          {OVERREFRACTION_INPUTS.map((inputItem) => {
            return (
              <InputNumberField
                key={inputItem.field}
                label={inputItem.label}
                step={inputItem.step}
                name={`custom_parameters.${inputItem.field}`}
                control={control}
              />
            );
          })}
        </div>

        <div className='flex flex-col'>
          <RadioGroupField
            name='custom_parameters.single_multi_strengthen'
            control={control}
          >
            <Radio label='Einstärken' value='single' />
            <Radio label='Multifokal' value='multi' checked={isMulti} />

            {isMulti && (
              <div className='flex flex-col px-4'>
                <Radio label='B (2-Stärken)' value='multi_b2' />
                <Radio label='D (3-Stärken)' value='multi_d3' />

                {isMultiD3 && (
                  <div className='flex flex-col px-4'>
                    <RadioGroupField
                      name='custom_parameters.is_distant_center'
                      control={control}
                    >
                      <Radio label='Ferne Mitte' value={true} />
                      <Radio label='Nah Mitte' value={false} />
                    </RadioGroupField>

                    <div className='px-3 flex flex-row justify-center items-center gap-4 w-full'>
                      <InputNumberField
                        label='Zentralzone (mm)'
                        name='custom_parameters.center_zone'
                        control={control}
                        InputLabelProps={{ shrink: true }}
                        min={2.0}
                        max={4.5}
                      />
                      <InputNumberField
                        label='Zwischenzone (mm)'
                        name='custom_parameters.intermediate_zone'
                        control={control}
                        min={2.0}
                        max={4.5}
                        InputLabelProps={{ shrink: true }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </RadioGroupField>
        </div>
      </div>
    </>
  );
};

export default OverrefractionBlock;
