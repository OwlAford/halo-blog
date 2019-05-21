import { observable, action } from 'mobx';
import axios from 'axios';
import shuffle from 'lodash/shuffle';

export default class ListModel {
  @observable favList = [];

  @action
  getFavList(cb, err) {
    axios
      .get('/media/data/wallpaper-favorite.json')
      .then(({ data }) => {
        this.favList = shuffle(data.src || []);
        cb && cb(data);
      })
      .catch(er => {
        err && err(er);
      });
  }
}
