import {useGet} from 'restful-react';

export type Genre = {
  id: number;
  name: string;
};

type GenresResponse =
  | {
      genres: Genre[];
    }
  | undefined;

export const useGetShowsGenres = () => {
  const {data, ...rest} = useGet<GenresResponse>('/genre/tv/list');

  return {genres: data ? data.genres : [], ...rest};
};

export const useGetMoviesGenres = () => {
  const {data, ...rest} = useGet<GenresResponse>('/genre/movie/list');

  return {genres: data ? data.genres : [], ...rest};
};
