import axiosInstance from 'helpers/axios';

export const calculationR01LensApi = async (categoryKey: 'mini-t' | 'mini-v' | 'skv' | 'smt', body: any) => {
  const { data } = await axiosInstance.post<{ data?: string[] }>(`/lens-calculations/${categoryKey}/r01`, body);
  return data.data;
};
