import { useState, useCallback } from 'react';

import { api } from 'services/api';

interface HTTTPMethodData {
  url: string;
  payload?: object;
  config?: object;
}

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<object>(undefined);
  const [error, setError] = useState<object>(undefined);

  const get = useCallback(async ({ url, config }: HTTTPMethodData) => {
    try {
      setError(undefined);
      setLoading(true);

      const response = await api.get(url, config);
      setData(response?.data);

      return Promise.resolve(response?.data);
    } catch (err) {
      setError(err?.response?.data || true);
    } finally {
      setLoading(false);
    }
  }, []);

  const post = useCallback(
    async ({ url, payload, config }: HTTTPMethodData) => {
      try {
        setError(undefined);
        setLoading(true);

        const response = await api.post(url, payload, config);
        setData(response?.data);

        return Promise.resolve(response?.data);
      } catch (err) {
        setError(err?.response?.data || true);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const patch = useCallback(
    async ({ url, payload, config }: HTTTPMethodData) => {
      try {
        setError(undefined);
        setLoading(true);

        const response = await api.patch(url, payload, config);
        setData(response?.data);

        return Promise.resolve(response?.data);
      } catch (err) {
        setError(err?.response?.data || true);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const put = useCallback(async ({ url, payload, config }: HTTTPMethodData) => {
    try {
      setError(undefined);
      setLoading(true);

      const response = await api.put(url, payload, config);
      setData(response?.data);

      return Promise.resolve(response?.data);
    } catch (err) {
      setError(err?.response?.data || true);
    } finally {
      setLoading(false);
    }
  }, []);

  const _delete = useCallback(async ({ url, config }: HTTTPMethodData) => {
    try {
      setError(undefined);
      setLoading(true);

      const response = await api.delete(url, config);
      setData(response?.data);

      return Promise.resolve(response?.data);
    } catch (err) {
      setError(err?.response?.data || true);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    error,
    loading,
    get,
    post,
    put,
    patch,
    delete: _delete,
  };
};
