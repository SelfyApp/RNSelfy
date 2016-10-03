import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, Platform, ActivityIndicator, ListView, TouchableOpacity} from 'react-native'
import { ReactModoroNavbar, Hamburger, Gear } from './../../components'
import { colors } from './../../styles'

Leaderboard.propTypes = {
  leaders: PropTypes.array.isRequired,
  listenerSet: PropTypes.bool.isRequired,
  openDrawer: PropTypes.func,
  dataSource: PropTypes.object.isRequired,
  renderRow: PropTypes.func.isRequired,
  renderSectionHeader: PropTypes.func.isRequired,
  handleToSettings: PropTypes.func.isRequired,
}

export default function Leaderboard (props) {
  
 
  return (
    <View style={styles.container}>
      <ReactModoroNavbar
        leftButton={Platform.OS === 'android' ? <Hamburger onPress={props.openDrawer} /> : null}
        rightButton={<Gear onPress={props.handleToSettings} />} 
        title='Friends'/>
      {props.listenerSet === false
        ? <ActivityIndicator size='small' style={styles.activityIndicator} color={colors.secondary}/>
        : <ListView renderRow={props.renderRow} renderSectionHeader={props.renderSectionHeader} dataSource={props.dataSource}  />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faab2f',
  },
  activityIndicator: {
    marginTop: 30,
  },
})
