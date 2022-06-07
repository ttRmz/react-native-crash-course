import React, {useState} from 'react';
import {useGet} from 'restful-react';
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

type getShowResponse =
  | {
      results: ShowResponse[];
    }
  | undefined;

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
  const [page, setPage] = useState(1);
  const [shows, setShows] = useState<Show[]>([]);

  const {
    data,
    loading: loadingShows,
    refetch,
    ...rest
  } = useGet<getShowResponse>('/discover/tv', {
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
        setShows(prevShows => [
          ...prevShows,
          ...formatShows(response.results, genres),
        ]);
        setPage(page + 1);
      }
    });
  };

  const loading = !data && (loadingGenres || loadingShows);

  React.useEffect(() => {
    if (data && !loadingGenres && shows.length === 0) {
      setShows(formatShows(data.results, genres));
    }
  }, [loading, data, genres, loadingGenres, shows]);

  return {shows, loading, fetchMore, ...rest};
};
