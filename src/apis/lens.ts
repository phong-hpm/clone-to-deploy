import { TReferenceLens } from 'types/reference-lens';
import { TApiMeta, TApiResponse } from 'types/api';
import { TLens } from 'types/lens';
import axiosInstance from 'helpers/axios';

export const getLensesApi = async (options?: { page?: number; perPage?: number }) => {
  const { page, perPage } = options || {};

  const params = {
    page: page || 1,
    per_page: perPage || 10,
  };

  const { data } = await axiosInstance.get<{
    data: {
      meta: TApiMeta;
      data: { lens: TLens; reference_lens: TReferenceLens }[];
    };
  }>('/lenses', { params });

  return data.data;
};

export const getLensByIdApi = async (id: string | number) => {
  const { data } = await axiosInstance.get<TApiResponse<{ lens: TLens; referenceLens: TReferenceLens }>>(
    `/lenses/${id}`
  );
  return data;
};

export const createLensApi = async (data?: any) => {
  await axiosInstance.post('/lenses', data);
};

export const updateLensApi = async (id: string | number, data?: any) => {
  await axiosInstance.put(`/lenses/${id}`, data);
};

export const deleteLensApi = async (id: number) => {
  await axiosInstance.delete(`/lenses/${id}`);
};
