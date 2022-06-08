import {useGetMore} from '../hooks/useGetMore';
import {Genre, useGetShowsGenres} from './genres';

interface CommonShowResponse {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  page: number;
}

interface ShowResponse extends CommonShowResponse {
  genre_ids: number[];
}

export interface Show extends CommonShowResponse {
  genres: Genre[];
}

function formatShows(shows: ShowResponse[], genres: Genre[]): Show[] {
  return shows.map(show => {
    const showGenres = show.genre_ids
      .map(id => genres.find(genre => genre.id === id))
      .filter(genre => genre !== undefined) as Genre[];

    return {
      ...show,
      genres: showGenres,
    };
  });
}

export const useGetShows = () => {
  const {genres, loading: loadingGenres} = useGetShowsGenres();
  const {
    data,
    fetchMore,
    loading: loadingShows,
    ...rest
  } = useGetMore<ShowResponse, Show>('/discover/tv', response =>
    formatShows(response, genres),
  );

  const loading = !data && (loadingGenres || loadingShows);

  return {shows: data, loading, fetchMore, ...rest};
};
