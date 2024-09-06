import { useEffect, useState } from 'react';

import { useCategoryStore } from 'stores/category';
import { getCategoriesApi } from 'apis/category';

const useLoadCategoriesData = () => {
  const { categoryList, setCategoryList } = useCategoryStore();

  const [loading, setLoading] = useState(false);

  const hasCategories = !!categoryList?.length;

  useEffect(() => {
    if (hasCategories) return;

    setLoading(true);
    getCategoriesApi()
      .then((res) => {
        setCategoryList(res?.data || []);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [hasCategories, setCategoryList]);

  return { loading, categoryList };
};

export default useLoadCategoriesData;
