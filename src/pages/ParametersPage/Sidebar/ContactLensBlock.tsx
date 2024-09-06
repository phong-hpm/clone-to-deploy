import { FC } from 'react';
import classNames from 'classnames';
import { UseFormReturn } from 'react-hook-form';

import { TFormData } from '..';

interface ContactLensProps {
  selected?: boolean;
  label: string;
  onClick: () => void;
}

const ContactLens: React.FC<ContactLensProps> = ({
  selected,
  label,
  onClick,
}) => {
  return (
    <div
      className={classNames(
        'flex flex-row justify-center items-center w-full h-12 rounded-md',
        selected
          ? 'border-2 border-[#2FA5BC]'
          : 'border border-gray-400 hover:bg-[#F5F5F7]',
        'gap-2 cursor-pointer'
      )}
      onClick={onClick}
    >
      <div
        className={classNames(
          'w-8 h-8 rounded-full flex items-center justify-center',
          !selected ? 'bg-gray-400' : 'bg-[#2FA5BC]'
        )}
      >
        <div
          className={classNames(
            'w-[26px] h-[26px] rounded-full flex items-center justify-center',
            !selected ? 'bg-gray-300' : 'bg-[#00486A]'
          )}
        >
          <div
            className={classNames(
              'w-4 h-4 rounded-full flex items-center justify-center',
              !selected ? 'bg-gray-200' : 'bg-[#2FA5BC]'
            )}
          ></div>
        </div>
      </div>

      <p className='text-sm'>{label}</p>
    </div>
  );
};

interface ContactLensBlockProps {
  form: UseFormReturn<TFormData>;
}

const ContactLensBlock: FC<ContactLensBlockProps> = ({ form }) => {
  const { watch, setValue } = form;

  const contactLens = watch('custom_parameters.contact_lens');

  return (
    <>
      <p className='text-[#4b5559]'>Kontaktlinse</p>
      <div className='border-solid border-b-2 pb-4'>
        <div className='flex flex-row gap-4'>
          <ContactLens
            label='Links'
            selected={contactLens === 'left'}
            onClick={() => setValue('custom_parameters.contact_lens', 'left')}
          />
          <ContactLens
            label='Rechts'
            selected={contactLens === 'right'}
            onClick={() => setValue('custom_parameters.contact_lens', 'right')}
          />
        </div>
      </div>
    </>
  );
};

export default ContactLensBlock;
