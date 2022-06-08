import {ItemType} from '../pages/Item';
import {Movie} from '../server/movies';
import {Show} from '../server/shows';

export type NativeStackScreenList = {
  item: {
    infos: Movie | Show;
    type: ItemType;
  };
  home: undefined;
  shows: undefined;
  movies: undefined;
  login: undefined;
};
