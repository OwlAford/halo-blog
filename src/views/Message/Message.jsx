import React from 'react'
import Gitalk from 'gitalk'

import 'gitalk/dist/gitalk.css'
import './scss/index.scss'

class Message extends React.Component {

  componentDidMount () {
    const gitalk = new Gitalk({
      clientID: 'aa46fa2b79c6bbb14ed7',
      clientSecret: 'a40357cebfe131ab380a7bdd2a94da5a18383275',
      repo: 'halo-blog',
      owner: 'OwlAford',
      admin: ['OwlAford'],
      id: location.pathname,
      distractionFreeMode: false
    })

    gitalk.render('gitalk-container')
  }

  render () {
    return (
      <div className='home-message'>
        <div id='gitalk-container' />
      </div>
    )
  }
}

export default Message
