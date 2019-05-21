import HomeModel from '&/HomeModel';
import ShootModel from '&/ShootModel';
import DesignModel from '&/DesignModel';
import ListModel from '&/ListModel';
import WallModel from '&/WallModel';
import ChatModel from '&/ChatModel';

const stores = {
  home: HomeModel.fromJS(false),
  article: new ListModel('article'),
  shoot: new ShootModel(),
  design: new DesignModel(),
  wall: new WallModel(),
  chat: new ChatModel(),
};

export default stores;
