import React, { PropTypes } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import DrawerHeader from './DrawerHeader'
import DrawerTab from './DrawerTab'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconFontAwsome from 'react-native-vector-icons/FontAwesome'
import IconEntypo from 'react-native-vector-icons/Entypo'
import { colors, fontSizes } from './../../styles'

Drawer.propTypes = {
  activeFooterTab: PropTypes.string.isRequired,
  onTabSelect: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
}

export default function Drawer (props) {
  return (
    <View style={styles.container}>
      <DrawerHeader />
      <DrawerTab
        title='Swipe'
        selected={props.activeFooterTab === 'home'}
        onPress={() => {
          props.onTabSelect('home')
          props.close()
        }}
        icon={<IconEntypo name={'documents'} size={35} color={colors.blue} />}
        />
      <DrawerTab
        title='Take Selfy'
        selected={props.activeFooterTab === 'leaderboard'}
        onPress={() => {
          props.onTabSelect('leaderboard')
          props.close()
        }}
        icon={<IconIonicons name={'ios-camera'} size={35} color={colors.blue} />}
        />
      <DrawerTab
        title='Me'
        selected={props.activeFooterTab === 'leaderboard'}
        onPress={() => {
          props.onTabSelect('leaderboard')
          props.close()
        }}
        icon={<IconIonicons name={'ios-person'} size={35} color={colors.blue} />}
          />
      <DrawerTab
        title='Profile'
        selected={props.activeFooterTab === 'leaderboard'}
        onPress={() => {
          props.onTabSelect('leaderboard')
          props.close()
        }}
        icon={<IconFontAwsome name={'fire'} size={35} color={colors.blue} />}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
