import useLoadLensesData from 'hooks/useLoadLensesData';
import useLoadCategoriesData from 'hooks/useLoadCategoriesData';

import { CircularProgress } from '@mui/material';

import CartCard from 'features/CartCard';

const Orders = () => {
  const { loading: loadingLenses, lensList } = useLoadLensesData();
  const { loading: loadingCategories, categoryList } = useLoadCategoriesData();

  if (loadingLenses || loadingCategories) {
    return (
      <div className='flex flex-row justify-center items-center pt-40'>
        <CircularProgress size={100} />
      </div>
    );
  }

  return (
    <div className='flex flex-col p-8 max-w-[1580px] mx-auto'>
      <div className='flex flex-row justify-between items-center text-2xl pb-4'>Bestellung</div>
      <p className='pb-2'>Kontakt Linsen (2)</p>{' '}
      <div className='flex flex-row justify-between items-center border-t border-b gap-4'>
        {/* Dynamicali change number */}
        <div className='text-3xl flex flex-col'>
          K01
          <p className='text-sm'>Kundenreferenz (1)</p>
        </div>
        <div className='grow flex flex-col items-center justify-center gap-10 py-4'>
          {lensList.map(({ lens, reference_lens }) => (
            <CartCard key={lens.id} lensData={lens} referenceLensData={reference_lens} categoryList={categoryList} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
