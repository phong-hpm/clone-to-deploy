import { useMemo, useState } from 'react';

import { TLens } from 'types/lens';
import { TReferenceLens } from 'types/reference-lens';
import { TCategory } from 'types/category';
import { findCategories, getMaterialLabel } from 'helpers/parameters';

import { CircularProgress, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import LensIcon from './LensIcon';
import Description from './Description';

export interface CardCardProps {
  categoryList?: TCategory[];
  lensData?: TLens;
  referenceLensData?: TReferenceLens;
  onClickEdit?: () => void;
  onDelete?: (lensData: TLens) => Promise<void>;
  onBuy?: (lensData: TLens) => Promise<void>;
}

const CartCard: React.FC<CardCardProps> = ({
  categoryList,
  lensData,
  referenceLensData,
  onClickEdit,
  onDelete,
  onBuy,
}) => {
  const [deleting, setDeleting] = useState(false);
  const [buying, setBuying] = useState(false);

  const { rootCategory } = useMemo(() => {
    return findCategories(categoryList || [], referenceLensData?.category_id);
  }, [categoryList, referenceLensData]);

  const starke = useMemo(() => {
    if (referenceLensData?.single_multi_strengthen === 'multi')
      return 'Multifokal';
    if (referenceLensData?.single_multi_strengthen === 'multi_b2')
      return 'B (2-Stärken)';
    if (referenceLensData?.single_multi_strengthen === 'multi_d3')
      return 'D (3-Stärken)';
    if (referenceLensData?.is_distant_center === true) return 'Fern Mitte';
    if (referenceLensData?.is_distant_center === false) return 'Nah Mitte';
    return '-';
  }, [referenceLensData]);

  const handleDelete = async () => {
    if (!onDelete || !lensData) return;

    setDeleting(true);
    await onDelete(lensData);
    setDeleting(false);
  };

  const handleBuy = async () => {
    if (!onBuy || !lensData) return;

    setBuying(true);
    await onBuy(lensData);
    setBuying(false);
  };

  if (!lensData || !referenceLensData || !categoryList?.length) return null;

  return (
    <div className='grow grid gap-4 w-full grid-cols-[repeat(2,60px)_80px_100px_120px_repeat(2,140px)_110px_50px_140px_60px]'>
      <div className='flex items-center'>
        {referenceLensData.contact_lens === 'left' && <span>Links</span>}
        {referenceLensData.contact_lens === 'right' && <span>Rechts</span>}
      </div>
      <div className='flex items-center'>
        <LensIcon width={40} height={40} categoryName={rootCategory?.name} />
      </div>
      <Description value={rootCategory?.name ?? '-'} label='Typ' />
      <Description value={starke} label='Starke' />
      <Description
        value={referenceLensData.skleral ?? '-'}
        label='Skleralradius (mm)'
      />
      <Description
        value={referenceLensData.limbal_flach ?? '-'}
        label='Limbaldesign (Flachen)'
      />
      <Description
        value={referenceLensData.limbal_steil ?? '-'}
        label='Limbaldesign (Steilen)'
      />
      <Description
        value={referenceLensData.center_radius ?? '-'}
        label='Zentralradius (mm)'
      />
      <Description value={referenceLensData.dpt ?? '-'} label='DPT' />
      <Description
        value={getMaterialLabel(referenceLensData.material) || '-'}
        label='Material'
      />

      <div className='flex justify-end items-center gap-1'>
        {!!onClickEdit && (
          <div className='flex justify-end items-center'>
            <IconButton size='small' onClick={onClickEdit}>
              <EditIcon fontSize='small' />
            </IconButton>
          </div>
        )}
        {!!onDelete && (
          <IconButton size='small' onClick={handleDelete}>
            {deleting ? (
              <CircularProgress size={20} />
            ) : (
              <DeleteOutlineIcon fontSize='small' />
            )}
          </IconButton>
        )}
        {!!onBuy && (
          <IconButton size='small' onClick={handleBuy}>
            {buying ? (
              <CircularProgress size={20} />
            ) : (
              <AttachMoneyIcon fontSize='small' />
            )}
          </IconButton>
        )}
      </div>
    </div>
  );
};
export default CartCard;
