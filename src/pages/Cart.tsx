import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import useLoadLensesData from 'hooks/useLoadLensesData';

import { TLens } from 'types/lens';
import { TReferenceLens } from 'types/reference-lens';
import { ROUTES } from 'constants/routes';
import { deleteLensApi } from 'apis/lens';
import { buyNowApi } from 'apis/cart';

import useLoadCategoriesData from 'hooks/useLoadCategoriesData';

import { useTheme } from '@mui/material/styles';

import CartCard from 'features/CartCard';
import Button from 'components/Button';

import { CircularProgress, Pagination } from '@mui/material';
import classNames from 'classnames';

const Cart = () => {
  const nagivate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const theme = useTheme();

  const {
    loading: loadingLenses,
    lensList,
    lensesMeta,
    onFetch: fetchLensList,
  } = useLoadLensesData({ skip: true });
  const { loading: loadingCategories, categoryList } = useLoadCategoriesData();

  const [localLoadingLense, setLocalLoadingLenses] = useState(false);

  const currentPage = useMemo(
    () => Number(searchParams.get('page')) || 1,
    [searchParams]
  );

  const customerLensMap = useMemo(() => {
    const map: Record<
      string,
      { lens: TLens; reference_lens: TReferenceLens }[]
    > = {};

    lensList.forEach(({ lens, reference_lens }) => {
      if (!lens.customer_reference) return;
      if (!map[lens.customer_reference]) map[lens.customer_reference] = [];
      map[lens.customer_reference].push({ lens, reference_lens });
    });

    return map;
  }, [lensList]);

  const handlePagination = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', String(page));
    setSearchParams(newSearchParams);
  };

  const handleDelete = async (lens: TLens) => {
    try {
      await deleteLensApi(lens.id);
      await fetchLensList({ page: currentPage }, { silent: true });
      toast('Successfully deleted');
    } catch {}
  };

  const handleBuy = async (lens: TLens) => {
    try {
      await buyNowApi(lens.id);
      toast('Successfully bought');
    } catch {}
  };

  useEffect(() => {
    setLocalLoadingLenses(true);
    fetchLensList({ page: currentPage }, { silent: true }).then(() => {
      setLocalLoadingLenses(false);
    });
  }, [fetchLensList, currentPage]);

  const loading = localLoadingLense || loadingCategories || loadingLenses;

  return (
    <div className='relative flex flex-col max-w-[1580px] mx-auto'>
      <div className='px-8 pt-20'>
        <div className='flex flex-row justify-between items-center text-4xl mb-8 font-semibold'>
          Warenkorb
        </div>
        <p className='pb-2'>Kontakt Linsen ({lensesMeta?.total || 0})</p>
      </div>

      <div className='w-full max-w-full overflow-x-auto'>
        {lensList.length !== 0 ? (
          <div className='flex flex-col gap-9 min-w-fit'>
            {Object.entries(customerLensMap).map(([customerName, list]) => {
              return (
                <div
                  key={customerName}
                  className='shrink-0 min-w-full w-fit flex flex-row justify-between items-center gap-8 border-b border-t px-8 '
                >
                  <div className='grow flex flex-col'>
                    <span
                      className='text-2xl truncate text-[#6F797B] font-semibold'
                      title={customerName} // Full name will be displayed in the tooltip
                    >
                      {customerName.length > 8
                        ? `${customerName.substring(0, 8)}...`
                        : customerName}
                    </span>
                    <p className='text-xs truncate text-[#525252]'>
                      Kundenreferenz
                    </p>
                    {/* ({list.length}) */}{' '}
                    {/* This line was ment to be above next to Kundenreferenz */}
                  </div>
                  <div className='shrink-0 flex flex-col items-center justify-center gap-8 py-4'>
                    {list.map(({ lens, reference_lens }, index) => (
                      <CartCard
                        key={lens.id}
                        lensData={lens}
                        referenceLensData={reference_lens}
                        categoryList={categoryList}
                        onClickEdit={() =>
                          nagivate(`${ROUTES.parameters}/${lens.id}/edit`)
                        }
                        onDelete={handleDelete}
                        onBuy={handleBuy}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className='text-2xl text-[#6F797B] font-semibold flex flex-row justify-center items-center py-16'>
            Keine Kontaktlinsen zum Warenkorb hinzugefügt
          </div>
        )}
      </div>

      {loading && (
        <div className='absolute z-10 top-0 left-0 w-full flex flex-row justify-center items-center py-20 bg-white bg-opacity-70 h-full'>
          <CircularProgress color='info' size={50} />
        </div>
      )}

      {!!lensesMeta && (
        <div
          className={classNames(
            'flex justify-center my-4',
            lensesMeta.last_page === 1 && 'hidden'
          )}
        >
          <Pagination
            disabled={loading}
            count={lensesMeta.last_page || 0}
            page={currentPage}
            sx={{
              color: theme.palette.secondary.dark,
              '& .MuiPaginationItem-root': {
                borderRadius: 1.5,
              },
              '& .MuiPaginationItem-root:hover': {
                borderRadius: 1.5,
              },
            }}
            onChange={(e, page) => handlePagination(page)}
          />
        </div>
      )}

      <div className='shrink-0 w-full flex justify-end px-8 py-4 gap-2 border-t bg-white'>
        <Button variant='outlined' onClick={() => nagivate(ROUTES.dashboard)}>
          Zurück zu den Referenzkontaktlinsen
        </Button>
        <div className={classNames(lensList.length === 0 ? 'hidden' : '')}>
          <Button variant='contained'>Jetzt Kaufen</Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
