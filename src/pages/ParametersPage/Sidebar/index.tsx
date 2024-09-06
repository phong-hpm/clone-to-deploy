import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseFormReturn } from 'react-hook-form';

import { useParametersStore } from 'stores/parameters';

import ReferenceLensCard from 'features/ReferenceLensCard';
import LensIcon from 'features/LensIcon';

import Button from 'components/Button';

import ContactLensBlock from './ContactLensBlock';
import OverrefractionBlock from './OverrefractionBlock';
import MaterialBlock from './MaterialBlock';
import CustomerBlock from './CustomerBlock';
import SupplyConcept from './SupplyConcept/SupplyConcept';

import { TFormData } from '..';

interface SidebarProps {
  saving: boolean;
  form: UseFormReturn<TFormData>;
}

const Sidebar: FC<SidebarProps> = ({ saving, form }) => {
  const { referenceLensData, rootCategory } = useParametersStore();
  const navigate = useNavigate();

  if (!referenceLensData) return null;

  return (
    <div className='max-h-full w-[400px] shrink-0 flex flex-col overflow-y-auto pr-4'>
      <div className='flex flex-col gap-4'>
        <p className='text-[#4b5559]'>Referenz-Kontaktlinsen</p>
        <div className='border-solid border-b-2 pb-4'>
          {referenceLensData && (
            <ReferenceLensCard
              small
              referenceLensData={referenceLensData}
              lensIcon={<LensIcon categoryName={rootCategory?.name} />}
            />
          )}
        </div>

        {/* Kontaktlinse */}
        <ContactLensBlock form={form} />

        {/* Überrefraktion (Rechts) */}
        <OverrefractionBlock form={form} />

        {/* Material */}
        <MaterialBlock form={form} />

        {/* Kundenreferenz */}
        <CustomerBlock form={form} />

        {/* Versorgungskonzept */}
        <SupplyConcept form={form} />
      </div>

      <div
        className='flex flex-row gap-4 bg-white p-4 h-[100px] w-full'
        style={{
          position: 'sticky',
          bottom: 0,
          zIndex: 1000,
          backgroundColor: '#fff',
          width: '100%',
        }}
      >
        <Button
          onClick={() => {
            navigate(-1);
          }}
          variant='outlined'
          className='flex-1'
        >
          Zurück
        </Button>
        <Button
          loading={saving}
          type='submit'
          variant='contained'
          className='flex-1'
          disabled={Object.keys(form.formState.errors).length > 0}
        >
          In den Warenkorb
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
