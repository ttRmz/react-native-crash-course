import {useGet} from 'restful-react';
import {ItemType} from '../pages/Item';

export type Video = {
  key: string;
  name: string;
};

type MovieResponse =
  | {
      results: Video[];
    }
  | undefined;

export const useGetMovieVideos = (id: number, type: ItemType) => {
  const {data, ...rest} = useGet<MovieResponse>(`/${type}/${id}/videos`);

  return {videos: data ? data.results : [], ...rest};
};
