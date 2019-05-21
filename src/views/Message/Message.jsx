import React from 'react';
import Gitalk from 'gitalk';

import 'gitalk/dist/gitalk.css';
import './scss/index.scss';

class Message extends React.Component {
  componentDidMount() {
    const gitalk = new Gitalk({
      clientID: '21bf9e68953515f48683',
      clientSecret: 'a4d57d9e5a40787a2d88ca328032d194ae5fcd82',
      repo: 'halo-blog',
      owner: 'OwlAford',
      admin: ['OwlAford'],
      id: location.pathname,
      distractionFreeMode: false,
    });

    gitalk.render('gitalk-container');
  }

  render() {
    return (
      <div className="home-message">
        <div id="gitalk-container" />
      </div>
    );
  }
}

export default Message;
