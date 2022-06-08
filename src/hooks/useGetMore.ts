import React, {useState} from 'react';
import {useGet} from 'restful-react';

type Response<R> =
  | {
      results: R[];
    }
  | undefined;

export function useGetMore<ResponseData, FormattedData>(
  path: string,
  formatter: (data: ResponseData[]) => FormattedData[],
) {
  const [page, setPage] = useState(1);
  const [state, setState] = useState<FormattedData[]>([]);

  const {
    data,
    loading: loadingData,
    refetch,
    ...rest
  } = useGet<Response<ResponseData>>(path, {
    queryParams: {
      sort_by: 'popularity.desc',
    },
  });

  const fetchMore = () => {
    refetch({
      queryParams: {
        page: page + 1,
      },
    }).then(response => {
      if (response) {
        setState(prevData => [...prevData, ...formatter(response.results)]);
        setPage(page + 1);
      }
    });
  };

  const loading = !data && loadingData;

  React.useEffect(() => {
    if (data && state.length === 0) {
      setState(formatter(data.results));
    }
  }, [loading, data, state, formatter]);

  return {data: state, loading, fetchMore, ...rest};
}
