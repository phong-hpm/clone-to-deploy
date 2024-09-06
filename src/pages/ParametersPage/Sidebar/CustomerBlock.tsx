import { UseFormReturn } from 'react-hook-form';

import { TFormData } from '..';
import InputTextField from 'fields/InputTextField';
import { useRef, useEffect } from 'react';

type CustomerBlockProps = {
  form: UseFormReturn<TFormData>;
};

const CustomerBlock: React.FC<CustomerBlockProps> = ({ form }) => {
  const {
    control,
    formState: { errors },
  } = form;
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errors.customer_reference || errors.remark) {
      blockRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [errors]);

  return (
    <>
      <p className='text-[#4b5559]'>Kundenreferenz</p>

      <div
        className='border-solid border-b-2 pb-4 flex flex-col gap-4'
        ref={blockRef}
      >
        <InputTextField
          fullWidth
          label='Name oder Kundennummer'
          name='customer_reference'
          control={control}
        />

        <InputTextField
          fullWidth
          minRows={3}
          multiline
          label='Bemerkung'
          name='remark'
          control={control}
        />
      </div>
    </>
  );
};

export default CustomerBlock;
