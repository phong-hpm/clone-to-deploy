import axiosInstance from 'helpers/axios';

export const buyNowApi = async (lensId: string | number) => {
  const { data } = await axiosInstance.post<{ data?: string[] }>('/cart/buy-now', { lens_id: lensId });
  return data.data;
};
