import React, { PropTypes, Component } from 'react'
import { View, Text } from 'react-native'
import { Onboarding }  from './../../components'
import { connect } from 'react-redux'
import { userOnboarded } from './../../redux/modules/users'

class OnboardingContainer extends Component {
  handleOnboardFinished = () => {
      this.props.dispatch(userOnboarded())
  }
  render () {
    return (
      <Onboarding onOnboardFinished={this.handleOnboardFinished} />
    )
  }
}

export default connect()(OnboardingContainer)
