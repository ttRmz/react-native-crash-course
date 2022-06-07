import React, {useState} from 'react';
import {useGet} from 'restful-react';
import {Genre, useGetMoviesGenres} from './genres';

interface CommonMovieResponse {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  page: number;
}

interface MovieResponse extends CommonMovieResponse {
  genre_ids: number[];
  original_title: string;
}

export interface Movie extends CommonMovieResponse {
  genres: Genre[];
}

type getMovieResponse =
  | {
      results: MovieResponse[];
    }
  | undefined;

function formatMovies(movies: MovieResponse[], genres: Genre[]): Movie[] {
  return movies.map(movie => {
    const movieGenres = movie.genre_ids
      .map(id => genres.find(genre => genre.id === id))
      .filter(genre => genre !== undefined) as Genre[];

    return {
      ...movie,
      name: movie.original_title,
      genres: movieGenres,
    };
  });
}

export const useGetMovies = () => {
  const {genres, loading: loadingGenres} = useGetMoviesGenres();
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);

  const {
    data,
    loading: loadingMovies,
    refetch,
    ...rest
  } = useGet<getMovieResponse>('/discover/movie', {
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
        setMovies(prevMovies => [
          ...prevMovies,
          ...formatMovies(response.results, genres),
        ]);
        setPage(page + 1);
      }
    });
  };

  const loading = !data && (loadingGenres || loadingMovies);

  React.useEffect(() => {
    if (data && !loadingGenres && movies.length === 0) {
      setMovies(formatMovies(data.results, genres));
    }
  }, [loading, data, genres, loadingGenres, movies]);

  return {movies, loading, fetchMore, ...rest};
};
