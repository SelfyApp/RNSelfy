import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { UserProfile } from './../../components'
import { incrementAndHandleScore, decrementAndHandleScore } from './../../redux/modules/scores'

function secondsToHMS (secs) {
  const hours = Math.floor(secs / 3600)
  const mins = Math.floor(secs % 3600 / 60)
  const seconds = Math.floor(secs % 3600 % 60)
  return ((hours > 0 ? hours + ":" + (mins < 10 ? "0" : "") : "") + mins + ":" + (seconds < 10 ? "0" : "") + seconds)
}
 

class UserProfileContainer extends Component {
  static propTypes = {
    openDrawer: PropTypes.func,
    navigator: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }
  componentWillReceiveProps (nextProps) {
    
  }
  handleToSettings = () => {
    this.props.navigator.push({
      settings: true
    })
  }
  handleToggleCountdown = () => {
     
  }
  render () {
    return (
      <UserProfile
        style={{flex: 1}} 
        user={this.props.user} 
        handleToSettings={this.handleToSettings}
        openDrawer={this.props.openDrawer} />
    )
  }
}

function mapStateToProps ({settings, scores, authentication, users}) {
  console.log('----');
  console.log(authentication, users);
  console.log('----');
  return {
    user: users[authentication.id]
  }
}

export default connect(mapStateToProps)(UserProfileContainer)
