import { ReactNode } from 'react';
import classNames from 'classnames';

import { TReferenceLens } from 'types/reference-lens';
import { MATERIAL_OPTIONS } from 'constants/parameters';

interface ReferenceLensCardProps {
  small?: boolean;
  referenceLensData?: TReferenceLens;
  lensIcon?: ReactNode;
}

const ReferenceLensCard: React.FC<ReferenceLensCardProps> = ({
  small,
  referenceLensData,
  lensIcon,
}) => {
  if (!referenceLensData) return null;

  const cardSizeClass = small ? 'w-[190px]' : 'w-[290px]';
  const cardContainer = small
    ? 'w-full h-[200px]'
    : 'w-[490px] gap-4 p-2.5 h-[230px]';
  const cardContnet = small ? 'w-[160px]' : 'w-[190px]';

  const materialOption = MATERIAL_OPTIONS.find(
    (option) => option.value === referenceLensData.material
  );

  return (
    <div
      className={classNames(
        'flex flex-row',
        cardContainer,
        !small && 'border border-transparent hover:border-[#6f797b]',
        'text-sm rounded-2xl'
      )}
    >
      <div
        className={classNames(
          'flex flex-col gap-3 bg-[#F5F5F7]',
          cardSizeClass,
          'rounded-md justify-center items-center p-1'
        )}
      >
        <p className='text-xl'>{referenceLensData.reference_name}</p>
        <div>{lensIcon}</div>
        <div className='flex gap-1'>
          <span className='text-[#6F797B]'>Lot</span>
          <span>{referenceLensData.lot_number}</span>
        </div>
        <div className='flex gap-1'>
          <span className='text-[#6F797B]'>Material </span>
          <span>{materialOption ? materialOption.label : '-'}</span>
        </div>
      </div>
      <div
        className={classNames(
          'flex flex-row',
          cardContnet,
          'pb-3 gap-3 items-end justify-evenly'
        )}
      >
        <div className='flex flex-col justify-center items-end text-xs text-[#6F797B] gap-[12px]'>
          <p>Zentralradius (mm)</p>
          <p>DPT</p>
          <p>x</p>
          <p>ioz</p>
          <p>Skleralradius (mm)</p>
          <p>∅ skl (mm)</p>
          <p>∅ Total (mm)</p>
        </div>
        <div className='flex flex-col justify-center items-start gap-[8px] text-sm'>
          <p>{referenceLensData.center_radius ?? '-'}</p>
          <p>{referenceLensData.dpt ?? '-'}</p>
          <p>{referenceLensData.x ?? '-'}</p>
          <p>{referenceLensData.ioz ?? '-'}</p>
          <p>{referenceLensData.skleral ?? '-'}</p>
          <p>{referenceLensData.skl_diameter ?? '-'}</p>
          <p>{referenceLensData.total_diameter ?? '-'}</p>
        </div>
      </div>
    </div>
  );
};

export default ReferenceLensCard;
