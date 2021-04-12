import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal',
    };
  }
  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: status === 'granted',
      buttonState: 'clicked',
    });
  };
  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal',
    });
  };
  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;
    if (buttonState === 'clicked' && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonState === 'normal') {
      return (
        <View style={styles.container}>
          <Image
            source={require('./assets/scanner.jpg')}
            style={{ width:150, height:150,marginLeft:80}}
          />
          <TouchableOpacity style={styles.button} onPress={this.getCameraPermissions}>
            <Text style={styles.buttonText}>Scan</Text>
          </TouchableOpacity>
          <Text style={styles.buttonText}>
            {hasCameraPermissions === true ? this.state.scannedData : 'Click Here'}
          </Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop:10,
    padding: 8,
     },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily:'fantasy',
  },
  button: {
    borderWidth: 2,
    borderRadius: 5,
    width: '25%',
    padding: 5,
    alignSelf: 'center',
    marginTop: '5%',
  },
});
