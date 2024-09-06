import { useCallback, useEffect, useRef } from 'react';

import { useLensStore } from 'stores/lens';
import { getLensesApi } from 'apis/lens';

const useLoadLensesData = (options?: { skip?: boolean }) => {
  const { loading, setLoading, called, setCalled, lensList, setLensList, lensesMeta, setLensesMeta } = useLensStore();

  const keepRef = useRef({ loading, called });
  keepRef.current.loading = loading;
  keepRef.current.called = called;

  const handleFetch = useCallback(
    async (params?: { page?: number; perPage?: number }, options?: { silent?: boolean }) => {
      if (!options?.silent) {
        setLoading(true);
      }
      try {
        const res = await getLensesApi(params);

        setLensList(res?.data || []);
        setLensesMeta(res?.meta);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setCalled(true);
      }
    },
    [setLensList, setLensesMeta, setLoading, setCalled]
  );

  useEffect(() => {
    if (!options?.skip && !keepRef.current.loading && !keepRef.current.called) {
      handleFetch();
    }
  }, [options?.skip, handleFetch]);

  return { loading, called, lensList, onFetch: handleFetch, lensesMeta };
};

export default useLoadLensesData;
