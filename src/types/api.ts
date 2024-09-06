export type TApiResponse<TData> = {
  message?: string | null;
  data?: TData;
};

export type TApiMeta = {
  current_page?: number | null;
  from?: number | null;
  to?: number | null;
  per_page?: number | null;
  last_page?: number | null;
  total?: number | null;
  prev_page_url?: string | null;
  last_page_url?: string | null;
  next_page_url?: string | null;
  first_page_url?: string | null;
};
