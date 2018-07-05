import React from 'react'
import classNames from 'classnames'
import BubblyButton from './BubblyButton'
import Logo from '#/img/logo.png'
import toast from './toast'
import axios from 'axios'

export default class LoginView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userName: '',
      pswd: '',
      loginState: 'in',
      userWarn: false,
      pswdWarn: false,
      tip: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (ev) {
    this.setState({
      userWarn: false,
      pswdWarn: false,
      [ev.target.name]: ev.target.value.trim()
    })
  }

  handleSwitch () {
    this.setState({
      loginState: this.state.loginState === 'in' ? 'out' : 'in'
    })
  }

  componentWillMount () {
    const cur = new Date()
    const curHour = cur.getHours()
    const curMinutes = cur.getMinutes()
    if (curHour > 8 || curHour === 8 && curMinutes >= 30) {
      this.setState({
        loginState: 'out'
      })
    }
    const userName = window.localStorage.getItem('userName')
    const passWord = window.localStorage.getItem('passWord')
    if (userName) {
      this.setState({
        userName: userName
      })
    }

    if (passWord) {
      this.setState({
        pswd: passWord
      })
    }
  }

  handleSubmit () {
    if (!this.state.userName.trim()) {
      this.setState({
        userWarn: true
      })
      toast('请正确输入用户名和密码！', 'bottom')
    } else if (!this.state.pswd.trim()) {
      this.setState({
        pswdWarn: true
      })
      toast('请正确输入用户名和密码！', 'bottom')
    } else {
      const { userName, pswd, loginState } = this.state

      const params = {
        userName: userName,
        passWord: pswd,
        signStatu: loginState === 'in' ? 0 : 2
      }
      axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        url: 'https://flameapp.cn/lazyMan/morning/good',
        data: JSON.stringify(params)
      }).then(res => {
        const data = JSON.parse(res.data.result)
        if (data.successed) {
          const { signStatu, signOperName, signInTimeAllStr, signOutTimeAllStr } = data.returnObject
          const time = Number(signStatu) === 0 ? signInTimeAllStr : signOutTimeAllStr
          const status = Number(signStatu) === 0 ? '签到成功' : '签退成功'
          this.setState({
            tips: `${time} ${status}`
          })
          toast(`${status}!`)
          localStorage.setItem('userName', params.userName)
          localStorage.setItem('passWord', params.passWord)
        } else {
          toast(`${this.state.loginState === 'in' ? '签到' : '签退'}失败！`)
        }
      }).catch(err => {
        toast(`${this.state.loginState === 'in' ? '签到' : '签退'}失败，请重试！`)
      })
    }
  }

  render () {
    const { userName, pswd, tips } = this.state
    return (
      <div className='page-login'>
        <div className='logo'>
          <img alt='logo' src={Logo} />
        </div>
        <div className='form'>
          <div className='ipt'>
            <input
              placeholder='请输入用户名'
              name='userName'
              value={userName}
              onChange={this.handleChange}
              className={classNames({
                'warn': this.state.userWarn
              })}
            />
          </div>
          <div className='ipt'>
            <input
              placeholder='请输入密码'
              type='password'
              name='pswd'
              value={pswd}
              onChange={this.handleChange}
              className={classNames({
                'warn': this.state.pswdWarn
              })}
            />
          </div>
          <div
            className={classNames({
              'switch': true,
              'out': this.state.loginState === 'out'
            })}
          >
            <div className='radio' onClick={e => { this.handleSwitch() }} />
          </div>
          <BubblyButton type={this.state.loginState === 'out' ? 'green' : 'blue'} clickEvent={e => this.handleSubmit()}>
            {
              this.state.loginState === 'out' ? '点击签退' : '点击签到'
            }
          </BubblyButton>
        </div>
        <div className='log'>{tips}</div>
      </div>
    )
  }
}
