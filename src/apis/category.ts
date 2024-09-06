import { TApiMeta } from 'types/api';
import { TCategory } from 'types/category';

import axiosInstance from 'helpers/axios';

export const getCategoriesApi = async () => {
  const params = {
    per_page: 9999,
    all: false,
  };

  const { data } = await axiosInstance.get<{ data: TApiMeta & { data: TCategory[] } }>('/categories', { params });

  const { data: entityData, ...apiMeta } = data.data;

  return {
    data: entityData || [],
    meta: apiMeta,
  };
};
