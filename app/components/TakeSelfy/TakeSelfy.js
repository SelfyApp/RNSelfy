import React, { PropTypes, Component } from 'react'
import { View, StyleSheet, Text, Image, Dimensions, Platform } from 'react-native'
import { LoginButton } from 'react-native-fbsdk'
import { connect } from 'react-redux'
import { colors, fontSizes } from './../../styles'
import { ReactModoroNavbar, Gear, Hamburger } from './../../components'
const { height } = Dimensions.get('window')
const Button = require('apsl-react-native-button')
const ImagePicker = require('react-native-image-picker')
 
class TakeSelfy extends Component {
  static propTypes = {
    openDrawer: PropTypes.func,
    handleToSettings: PropTypes.func.isRequired,
  }
  constructor (props) {
    super(props)
    this.state = {
      avatarSource: null
    }
  }
 
  takeSnapshot = () => {
    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     */
    const options = {
      title: 'Let\'s take a Selfy',
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        var source;

        

        // Reference to the platform specific asset location
        if (Platform.OS === 'android') {
          source = {uri: response.uri, isStatic: true};
        } else {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        }

        this.setState({
          avatarSource: source
        });
      }
    });
  };
  render () {
    return (
        <View style={styles.container}>
          <ReactModoroNavbar
            title='Swipe'
            leftButton={Platform.OS === 'android' ? <Hamburger onPress={this.props.openDrawer} /> : null}
            rightButton={<Gear onPress={this.props.handleToSettings}/>} />

            { this.state.avatarSource &&
               <Image style={styles.avatar} source={this.state.avatarSource} />
            }
            <Button style={styles.takeSnapshot} onPress={this.takeSnapshot.bind(this)}>
               Take Snapshot
            </Button>
            { this.state.avatarSource &&
              <Text style={{margin: 8, textAlign: 'center'}}>{this.state.avatarSource.uri}</Text>
            }

        </View>
      )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f44444'
  },
  slogan: {
    color: colors.blue,
    fontSize: 40,
    margin: 20,
    textAlign: 'center',
  },
  image: {
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
  takeSnapshot: {
    backgroundColor: '#ffd8d8',
    borderColor: '#ffd8d8',
  },
  uploadSelfieImage: {
    flex: 1,
  },
  avatar: {
    borderRadius: 150,
    width: 300,
    height: 300
  }
})
export default connect()(TakeSelfy)
