import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
import { LoginButton } from 'react-native-fbsdk'
import { colors, fontSizes } from './../../styles'
const { height,width } = Dimensions.get('window')

Onboarding.propTypes = {
  onLoginFinished: PropTypes.func.isRequired,
}

export default function Onboarding (props) {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={require('../../images/logo.png')} />
      </View>
      <View style={styles.loginContainer}>
        <LoginButton
          readPermissions={['email','public_profile']}
          style={{
            height: 30,
            width: 180,
            marginBottom: 15,
          }}
          onLoginFinished={props.onLoginFinished}/>
        <Text style={styles.assuranceText}>
          This is the onboarding
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 40,
  },
  slogan: {
    color: colors.blue,
    fontSize: 40,
    margin: 20,
    textAlign: 'center',
  },
  image: {
    width: width,
    resizeMode: 'contain',
    height: height * .4 > 300 ? 300 : height * .4
  },
  loginContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
  },
  assuranceText: {
    color: colors.secondary,
    fontSize: fontSizes.secondary,
    textAlign: 'center',
  },
})
