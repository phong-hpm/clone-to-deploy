import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { CircularProgress, IconButton, Pagination } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { TCategory, TCategoryName } from 'types/category';
import { TApiMeta } from 'types/api';
import { TReferenceLens } from 'types/reference-lens';
import { getReferenceLensesApi } from 'apis/reference-lens';
import { ROUTES } from 'constants/routes';
import { findCategories } from 'helpers/parameters';
import { useTheme } from '@mui/material/styles';

import useLoadCategoriesData from 'hooks/useLoadCategoriesData';

import LensIcon from 'features/LensIcon';
import ReferenceLensCard from 'features/ReferenceLensCard';
import ReferenceLensRow from './ReferenceLensRow';
import SearchBar from './SearchBar';

import { ReactComponent as LayoutIcon } from 'assets/SVG/Layout.svg';
import { ReactComponent as UpDownArrowsIcon } from 'assets/SVG/UpDownArrows.svg';

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { loading: loadingCategories, categoryList } = useLoadCategoriesData();

  const [loadingLenses, setLoadingLenses] = useState(true);
  const [referenceLensList, setReferenceLensList] = useState<TReferenceLens[]>(
    []
  );
  const [layout, setLayout] = useState<'card' | 'grid'>('card');
  const [referenceLensMetaApi, setReferenceLensMetaApi] = useState<
    TApiMeta | undefined
  >();
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredCategories = categoryList.filter((category) =>
    ['miniT', 'miniV', 'SKV', 'SMT'].includes(category.name)
  );

  const theme = useTheme();

  const getDisplayName = (name: TCategoryName) => {
    switch (name) {
      case 'miniV':
        return 'Mini V';
      case 'miniT':
        return 'Mini T';
      default:
        return name;
    }
  };

  const sortedReferenceLensList = useMemo(() => {
    return [...referenceLensList].sort((a, b) => {
      let val = (a.lot_number || '').localeCompare(b.lot_number || '');
      return sortOrder === 'asc' ? val : val * -1;
    });
  }, [referenceLensList, sortOrder]);

  const handleSearch = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('page');
    if (value) newSearchParams.set('search', value);
    else newSearchParams.delete('search');
    setSearchParams(newSearchParams);
  };

  const handlePagination = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', String(page));
    setSearchParams(newSearchParams);
  };

  const handleLotSorting = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  useEffect(() => {
    const page = Number(searchParams.get('page')) || 1;
    const category = searchParams.get('category') || '';
    const searchValue = searchParams.get('search') || '';

    setLoadingLenses(true);
    getReferenceLensesApi({ page, category, search: searchValue })
      .then((res) => {
        setReferenceLensMetaApi(res?.meta);
        setReferenceLensList(res?.data || []);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingLenses(false));
  }, [searchParams, setReferenceLensList]);

  if (loadingCategories) {
    return (
      <div className='flex flex-row justify-center items-center pt-40'>
        <CircularProgress size={100} />
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-center items-center w-full gap-8 px-8 py-4 max-w-[1580px] mx-auto'>
      <div className='flex w-full felx-row justify-start text-3xl'>
        Kontaktlinsenmodifikationstool
      </div>
      <div className='flex flex-row justify-center gap-12'>
        {filteredCategories.map((category: TCategory, index: number) => {
          const selected = String(category.id) === searchParams.get('category');
          return (
            <div
              key={index}
              className='flex flex-col justify-center items-center'
              onClick={() => {
                const newSearchParams = new URLSearchParams(searchParams);
                newSearchParams.delete('page');
                if (selected) newSearchParams.delete('category');
                else newSearchParams.set('category', String(category.id));
                setSearchParams(newSearchParams);
              }}
            >
              <div
                className={classNames(
                  'flex flex-row justify-center items-center py-2 px-[10px] rounded-xl cursor-pointer',
                  selected
                    ? 'bg-[#e3e3e3] hover:bg-[#d3d3d3]'
                    : 'hover:bg-[#F5F5F7]'
                )}
              >
                <LensIcon categoryName={category.name} />
              </div>
              <p>{getDisplayName(category.name)}</p>
            </div>
          );
        })}
      </div>
      <SearchBar onSearch={handleSearch} searchParams={searchParams} />
      <div className='border-b w-full flex flex-row justify-between items-center mb-4'>
        {layout === 'card' && (
          <div>Referenz-Kontaktlinsen ({referenceLensMetaApi?.total || 0})</div>
        )}
        {layout === 'grid' && (
          <div className='flex flex-row justify-center pl-8 items-center gap-4'>
            Lot
            <div className='hover:bg-[#F5F5F7] p-2 rounded-xl'>
              <UpDownArrowsIcon
                onClick={handleLotSorting}
                className='cursor-pointer'
              />
            </div>
            <div className='pl-4'>
              Referenz-Kontaktlinsen ({referenceLensMetaApi?.total || 0})
            </div>
          </div>
        )}

        <div className='flex flex-row justify-center items-center gap-1 pb-1'>
          <IconButton
            sx={{
              borderRadius: 1.5,
              backgroundColor: layout === 'grid' ? '#e8e8e8' : 'initial',
              '&:hover':
                layout === 'grid' ? { backgroundColor: '#e8e8e8' } : {},
            }}
            onClick={() => setLayout('grid')}
          >
            <MenuIcon sx={{ color: '#3F484B' }} />
          </IconButton>
          <IconButton
            sx={{
              borderRadius: 1.5,
              backgroundColor: layout === 'card' ? '#e8e8e8' : 'initial',
              '&:hover':
                layout === 'card' ? { backgroundColor: '#e8e8e8' } : {},
            }}
            onClick={() => setLayout('card')}
          >
            <LayoutIcon />
          </IconButton>
        </div>
      </div>
      <div className='w-full flex justify-center gap-6 mt-[-24px]'>
        {layout === 'card' && (
          <div className='flex flex-wrap justify-start gap-4 2xl:max-w-[1600px] max-w-[1050px]'>
            {!loadingLenses && referenceLensList.length > 0
              ? referenceLensList.map((item) => {
                  const { rootCategory } = findCategories(
                    categoryList,
                    item.category_id
                  );
                  return (
                    <Link to={`${ROUTES.parameters}/${item.id}`} key={item.id}>
                      <ReferenceLensCard
                        referenceLensData={item}
                        lensIcon={
                          <LensIcon categoryName={rootCategory?.name} />
                        }
                      />
                    </Link>
                  );
                })
              : !loadingLenses && (
                  <div className='w-full flex flex-row justify-center items-center py-20 text-2xl text-[#6F797B] font-semibold '>
                    Keine Kontaktlinsen gefunden
                  </div>
                )}
          </div>
        )}

        {layout === 'grid' && (
          <div className='flex flex-row justify-center w-full flex-wrap gap-6'>
            {!loadingLenses && referenceLensList.length > 0
              ? sortedReferenceLensList.map((item) => {
                  const { rootCategory } = findCategories(
                    categoryList,
                    item.category_id
                  );
                  return (
                    <Link
                      className='w-full'
                      to={`${ROUTES.parameters}/${item.id}`}
                      key={item.id}
                    >
                      <ReferenceLensRow
                        referenceLensData={item}
                        lensIcon={
                          <LensIcon
                            width={40}
                            categoryName={rootCategory?.name}
                          />
                        }
                      />
                    </Link>
                  );
                })
              : !loadingLenses && (
                  <div className='w-full flex flex-row justify-center items-center py-20 text-2xl text-[#6F797B] font-semibold '>
                    Keine Kontaktlinsen gefunden
                  </div>
                )}
          </div>
        )}
      </div>
      {loadingLenses && (
        <div className='w-full flex flex-row justify-center items-center py-20'>
          <CircularProgress size={100} />
        </div>
      )}
      {!loadingLenses && referenceLensList.length !== 0 && (
        <>
          <Pagination
            count={referenceLensMetaApi?.last_page || 0}
            page={referenceLensMetaApi?.current_page || 1}
            sx={{
              color: theme.palette.secondary.dark,
              '& .MuiPaginationItem-root': {
                borderRadius: 1.5,
              },
              '& .MuiPaginationItem-root:hover': {
                borderRadius: 1.5,
              },
            }}
            onChange={(e, page) => {
              setSearchParams({ page: page.toString() });
              handlePagination(page);
            }}
          />
        </>
      )}
    </div>
  );
};
export default Dashboard;
