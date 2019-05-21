import React from 'react';
import { withRouter } from 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import Footer from './Footer';
import Profile from '../Profile';
import Note from '../Note';
import Shoot from '../Shoot';
import Design from '../Design';
import Wall from '../Wall';
import Tools from '../Tools';
import Chat from '../Chat';
import Message from '../Message';

@withRouter
@inject(stores => {
  const {
    home: { scrollable },
  } = stores;
  return {
    scrollable,
  };
})
@observer
class ChildNode extends React.Component {
  componentWillUnmount() {
    window.removeEventListener('scroll', this.initScreen);
  }

  render() {
    return (
      <div
        className={classNames('content-wrap', {
          scrollable: this.props.scrollable,
        })}
        style={{
          minHeight: `${this.props.clientH}px`,
        }}
      >
        <div className="content-main" key="content-main">
          <Switch>
            <Route path="/home/profile" component={Profile} />
            <Route path="/home/note" component={Note} />
            <Route path="/home/shoot" component={Shoot} />
            <Route path="/home/design" component={Design} />
            <Route path="/home/wall" component={Wall} />
            <Route path="/home/tools" component={Tools} />
            <Route path="/home/chat" component={Chat} />
            <Route path="/home/message" component={Message} />
            <Route component={() => <Redirect to="/home/profile" />} />
          </Switch>
        </div>
        <Footer key="footer" />
      </div>
    );
  }
}

export default ChildNode;
