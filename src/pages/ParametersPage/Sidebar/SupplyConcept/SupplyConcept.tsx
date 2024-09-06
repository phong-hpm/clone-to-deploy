import Radio from 'components/Radio';
import { UseFormReturn } from 'react-hook-form';

import { ReactComponent as InfoIcon } from 'assets/SVG/Info.svg';

import RadioGroupField from 'fields/RadioGroupField';

import { TFormData } from '../..';
import { useEffect, useRef, useState } from 'react';
import SupplyInfo from './SupplyInfo';

type SupplyConceptProps = {
  form: UseFormReturn<TFormData>;
};

const SupplyConcept: React.FC<SupplyConceptProps> = ({ form }) => {
  const { control } = form;

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

  return (
    <>
      <p className='text-[#4b5559]'>Versorgungskonzept</p>

      <div className='flex flex-row justify-between border-solid border-b-2 pb-2'>
        <div className='flex flex-col justify-end items-start'>
          <RadioGroupField name='supply_concept' control={control}>
            <Radio label='Standard' value='standard' />
            <Radio label='Falco Pro' value='falco_pro' />
            <Radio label='Falco Fix' value='falco_fix' />
          </RadioGroupField>
        </div>
        <div className='w-[180px] bg-[#F5F5F7] rounded-md flex flex-col justify-between items-end text-sm p-4 relative'>
          <div
            onClick={() => setShowInfo((prev) => !prev)}
            ref={iconRef}
            className='cursor-pointer'
          >
            <InfoIcon />
          </div>
          {showInfo && (
            <div
              className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'
              style={{ zIndex: 1004 }}
            >
              <div ref={infoRef} className='cursor-default bg-white rounded-md'>
                <SupplyInfo onClick={() => setShowInfo(false)} />
              </div>
            </div>
          )}
          <div className='flex-row justify-start items-end pr-2 pl-4'>
            <p>Mehr information über</p>
            <p className='font-bold'>Versorgungskonzept</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplyConcept;
