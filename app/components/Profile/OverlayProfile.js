import React, { PropTypes, Component } from 'react'
import { View, Text } from 'react-native' 
import { connect } from 'react-redux' 
import Gallery from 'react-native-gallery';

class OverlayProfile extends Component {
  render () {
    return (
       <Gallery
        style={{flex: 1, backgroundColor: 'black'}}
        images={[
          'https://s-media-cache-ak0.pinimg.com/474x/63/93/3c/63933c3e01fdea429ff86646ab8939d6.jpg',
          'https://s-media-cache-ak0.pinimg.com/236x/a0/87/e4/a087e44a09f527b856f6b3afe4c3f301.jpg',
          'https://s-media-cache-ak0.pinimg.com/474x/4c/8c/e8/4c8ce8d95b28ad8b9128e717816ecf00.jpg',
          'https://s-media-cache-ak0.pinimg.com/236x/d9/c1/ed/d9c1edd6f142a1b867f0f1b6106afb17.jpg'
        ]}
      />
    )
  }
}

export default connect()(OverlayProfile)
