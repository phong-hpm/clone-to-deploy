import Radio from 'components/Radio';
import { UseFormReturn } from 'react-hook-form';

import { ReactComponent as InfoIcon } from 'assets/SVG/Info.svg';

import RadioGroupField from 'fields/RadioGroupField';

import { TFormData } from '..';

type SupplyConceptProps = {
  form: UseFormReturn<TFormData>;
};

const SupplyConcept: React.FC<SupplyConceptProps> = ({ form }) => {
  const { control } = form;

  return (
    <>
      <p>Versorgungskonzept</p>

      <div className='flex flex-row justify-between border-solid border-b-2 pb-2'>
        <div className='flex flex-col justify-end items-start'>
          <RadioGroupField name='supply_concept' control={control}>
            <Radio label='Standard' value='standard' />
            <Radio label='Falco Pro' value='falco_pro' />
            <Radio label='Falco Fix' value='falco_fix' />
          </RadioGroupField>
        </div>
        <div className='w-[180px] bg-[#F5F5F7] rounded-md flex flex-col justify-between items-end text-sm p-4'>
          <InfoIcon />
          <div className='flex-row justify-start items-end pr-2 pl-4'>
            <p>Mehr information über</p>
            <p className='font-black'>Versorgungskonzept</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplyConcept;
