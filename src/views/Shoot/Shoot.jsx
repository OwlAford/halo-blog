import React from "react";
import { computed } from "mobx";
import { observer, inject } from "mobx-react";
import Spin from "^/Spin";
import PicBox from "^/PicBox";
import "./scss/index.scss";

@inject(stores => {
  const {
    shoot: { shootList },
    home: { isAtBottom }
  } = stores;

  return {
    isAtBottom,
    shootList,
    getShootList: cb => stores.shoot.getShootList(cb)
  };
})
@observer
class Shoot extends React.Component {
  groupIndex = 1;
  group = Math.ceil(document.documentElement.clientHeight / 600);

  constructor(props) {
    super(props);
    this.goDetailPage = this.goDetailPage.bind(this);
  }

  @computed get displayList() {
    this.props.isAtBottom && this.groupIndex++;
    return this.props.shootList.slice(0, this.group * this.groupIndex);
  }

  goDetailPage(path, title) {
    const id = path.split("/").reverse()[0];
    window.open(`shoot.html?${id}&${encodeURI(title)}`);
  }

  componentWillMount() {
    if (this.props.shootList.length === 0) {
      NProgress.start();
      this.props.getShootList(NProgress.done);
    }
  }

  render() {
    return (
      <div className="home-shoot">
        {this.displayList.length === 0 && <Spin />}
        <div className="shoot-list">
          {this.displayList.map((item, i) => (
            <PicBox
              key={i}
              title={item.title}
              lnk={item.src}
              clickEvent={e => {
                this.goDetailPage(item.src, item.title);
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Shoot;
