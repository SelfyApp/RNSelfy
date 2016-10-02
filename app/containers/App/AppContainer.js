import React, { PropTypes, Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { ReactModoroNavigator } from './../../containers'
import { PreSplash, FlashNotification } from './../../components'
import { auth } from './../../config/constants'
import { onAuthChange, handleAuthRemotely } from './../../redux/modules/authentication'
import { hideFlashNotification } from './../../redux/modules/flashNotification'

console.disableYellowBox = true

class AppContainer extends Component {
  static propTypes = {
    isAuthenticating: PropTypes.bool.isRequired,
    isAuthed: PropTypes.bool.isRequired,
    flashNotificationIsPermanent: PropTypes.bool.isRequired,
    flashNotificationLocation: PropTypes.string.isRequired,
    flashNotificationText: PropTypes.string.isRequired,
    showFlashNotification: PropTypes.bool.isRequired,
  }
  componentDidMount () {
    // Attach a callback when you have a change in the user
    auth.onAuthStateChanged((user) => this.props.dispatch(onAuthChange(user)))
    // on bootstrap try to handle an automatic authentication
    // for the time being is handling the case of being logged in with Facebook
    // and the session is still available (no need to go through the auth process)
    this.props.dispatch(handleAuthRemotely())
  }
  handleHideNotification = () => {
    this.props.dispatch(hideFlashNotification())
  }
  render () {
    return (
      <View style={{flex: 1}}>
        <Text> { this.props.isAuthenticating}  </Text>
        {this.props.isAuthenticating === true
            ? <PreSplash />
            : <ReactModoroNavigator isAuthed={this.props.isAuthed} />}
        {this.props.showFlashNotification === true
          ? <FlashNotification
              permanent={this.props.flashNotificationIsPermanent}
              location={this.props.flashNotificationLocation}
              text={this.props.flashNotificationText}
              onHideNotification={this.handleHideNotification}/>
          : null}
      </View>
    )
  }
}

function mapStateToProps ({authentication, flashNotification}) {
  return {
    isAuthenticating: authentication.isAuthenticating,
    isAuthed: authentication.isAuthed,
    flashNotificationIsPermanent: flashNotification.permanent,
    flashNotificationLocation: flashNotification.location,
    flashNotificationText: flashNotification.text,
    showFlashNotification: flashNotification.showFlashNotification,
  }
}

export default connect(
  mapStateToProps
)(AppContainer)