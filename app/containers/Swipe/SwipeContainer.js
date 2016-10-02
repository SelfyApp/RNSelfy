import React, { PropTypes, Component } from 'react'
import { View, Text } from 'react-native'
import { Cards }  from './../../components'
import { connect } from 'react-redux'
import { handleAuthRemotely } from './../../redux/modules/authentication'

class SwipeContainer extends Component {
  
  render () {
    return (
      <Cards style={{flex: 1}} />
    )
  }
}

export default connect()(SwipeContainer)
