import { useState } from 'react';
import { Status } from '@custom-types/index';

export const useFetchComponent = <Data, Error>() => {
  const [status, setStatus] = useState<Status>(Status.INITIAL);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const fetchData = async (callService: Function) => {
    try {
      setStatus(Status.LOADING);
      setData(null);
      setError(null);
      const { data } = await callService();
      setStatus(Status.SUCCESS);
      setData(data);
      setError(null);
    } catch (error: any) {
      setStatus(Status.ERROR);
      setData(null);
      setError(error.response.data);
    }
  };
  const useStates = () => {
    return { status, data, error };
  };
  const useActions = () => {
    return { fetchData };
  };

  return { useStates, useActions };
};
