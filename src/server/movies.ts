import {useGetMore} from '../hooks/useGetMore';
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

  const {
    data,
    fetchMore,
    loading: loadingMovies,
    ...rest
  } = useGetMore<MovieResponse, Movie>('/discover/movie', response =>
    formatMovies(response, genres),
  );

  const loading = !data && (loadingGenres || loadingMovies);

  return {movies: data, loading, fetchMore, ...rest};
};
