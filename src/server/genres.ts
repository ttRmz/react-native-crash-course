import {useGet} from 'restful-react';

export type ShowGenre = {
  id: number;
  name: string;
};

type getGenresResponse =
  | {
      genres: ShowGenre[];
    }
  | undefined;

export const useGetShowsGenres = () => {
  const {data, ...rest} = useGet<getGenresResponse>('/genre/tv/list');

  return {genres: data ? data.genres : [], ...rest};
};
