import React from "react";
import { computed } from "mobx";
import { observer, inject } from "mobx-react";
import { num2even } from "~/libs/tools";
import Spin from "^/Spin";
import PicBox from "^/PicBox";
import "./scss/index.scss";

@inject(stores => {
  const {
    design: { designList },
    home: { isAtBottom }
  } = stores;

  return {
    isAtBottom,
    designList,
    getDesignList: cb => stores.design.getDesignList(cb)
  };
})
@observer
class Design extends React.Component {
  groupIndex = 1;
  group = num2even(Math.ceil(document.documentElement.clientHeight / 320));

  constructor(props) {
    super(props);
    this.goDetailPage = this.goDetailPage.bind(this);
  }

  @computed get displayList() {
    this.props.isAtBottom && this.groupIndex++;
    return this.props.designList.slice(0, this.group * this.groupIndex);
  }

  goDetailPage(path, title, time) {
    window.open(`design.html?${path}&${encodeURI(title)}&${time}`);
  }

  componentWillMount() {
    if (this.props.designList.length === 0) {
      NProgress.start();
      this.props.getDesignList(NProgress.done);
    }
    // reaction(
    //   () => this.props.isAtBottom,
    //   bottom => console.log('触发了些啥', bottom)
    // )
  }

  render() {
    return (
      <div className="home-design">
        {this.displayList.length === 0 && <Spin />}
        <div className="design-list">
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

export default Design;
