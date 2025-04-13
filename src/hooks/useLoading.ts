import { useEffect, useState } from 'react';

interface UseLoadingResult<T> {
  loading: boolean;
  error: Error | null;
  data: T | null;
  refetchData: () => void;
  setData: (value: any) => void;
}

export const useLoading = <T>(
  callback: () => Promise<T>,
  depps: any[] = []
): UseLoadingResult<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [refetch, setRefetch] = useState(false);

  const refetchData = () => {
    setRefetch((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const result = await callback();
        setData(result);
      } catch (error) {
        setError(error as any);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refetch, ...depps]);

  return { loading, error, data, refetchData, setData };
};
