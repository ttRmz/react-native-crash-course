import {Movie} from '../server/movies';
import {Show} from '../server/shows';

export type NativeStackScreenList = {
  item: Movie | Show;
  home: undefined;
  shows: undefined;
  movies: undefined;
  login: undefined;
};
