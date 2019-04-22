import { observable, action } from "mobx";
import shuffle from "lodash/shuffle";

export default class ShootModel {
  @observable shootList = [];

  @action
  getShootList(cb, err) {
    axios
      .get("/media/data/1x-latest.json")
      .then(({ data }) => {
        this.shootList = shuffle(data.data || []);
        cb && cb(data.data);
      })
      .catch(er => {
        err && err(er);
      });
  }
}
