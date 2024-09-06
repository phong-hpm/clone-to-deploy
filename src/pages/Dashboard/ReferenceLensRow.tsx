import { ReactNode, useMemo } from 'react';

import { TReferenceLens } from 'types/reference-lens';

import Description from 'features/Description';
import { MATERIAL_OPTIONS } from 'constants/parameters';

interface ReferenceLensRowProps {
  referenceLensData?: TReferenceLens;
  lensIcon?: ReactNode;
}

const ReferenceLensRow: React.FC<ReferenceLensRowProps> = ({
  referenceLensData,
  lensIcon,
}) => {
  const material = useMemo(() => {
    const materialOption = MATERIAL_OPTIONS.find(
      (option) => option.value === referenceLensData?.material
    );
    return materialOption ? materialOption.label : '-';
  }, [referenceLensData]);
  if (!referenceLensData) return null;

  return (
    <div className='grid grid-cols-7 gap-4 w-full border border-transparent hover:border-[#6f797b] rounded-lg p-2 hover:bg-[#F5F5F7] place-items-start items-center'>
      <Description
        label='Lot'
        value={
          referenceLensData.lot_number === null || undefined
            ? '-'
            : referenceLensData.lot_number
        }
      />
      <span>{lensIcon}</span>
      <Description label='Typ' value={referenceLensData.reference_name} />
      <Description
        label='Zentralradius (mm)'
        value={
          referenceLensData.center_radius === null || undefined
            ? '-'
            : referenceLensData.center_radius
        }
      />
      <Description
        label='DPT'
        value={
          referenceLensData.dpt === null || undefined
            ? '-'
            : referenceLensData.dpt
        }
      />
      <Description
        label='Skleralradius(mm)'
        value={
          referenceLensData.skleral === null || undefined
            ? '-'
            : referenceLensData.skleral
        }
      />
      <Description label='Material' value={material} />
    </div>
  );
};

export default ReferenceLensRow;
