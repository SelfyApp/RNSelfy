import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { colors, fontSizes } from './../../styles'

Header.propTypes = {
  name: PropTypes.string.isRequired,
}

export default function Header (props) {
  return (
    <View style={styles.container}>
        <Text style={styles.nameText}>{props.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 0,
    margin: 0,
    borderBottomWidth: 1,
    backgroundColor: '#fbedd7',
    borderColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
 
  nameText: {
    paddingLeft: 10,
    fontWeight: "700",
    fontSize: fontSizes.secondary,
    color: colors.primary,
  },
 
})
