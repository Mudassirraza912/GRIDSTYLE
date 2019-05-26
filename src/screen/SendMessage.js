import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Picker,
  Alert
} from "react-native";
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  MenuProvider
} from "react-native-popup-menu";
import { DocumentPicker, ImagePicker, Permissions } from "expo";
import * as mime from "react-native-mime-types";

import styles from "../styles";
import ShiftScrollView from "../component/ShiftScrollView";
import IconTouchable from "../component/IconTouchable";

import { connect } from "react-redux";
import { addMessage } from "../model/controller/messageController";
import { MESSAGE_TYPES } from "../model/constants";

import Lang from "../localization/lang";

class NewMessage extends Component {
  static navigationOptions = {
    header: null
  };

  initialState = {
    event: "",
    unit: this.props.units[0].name,
    unitId: null,
    location: this.props.locations[0].name,
    locationId: this.props.locations[0].id,
    files: [],
    imageCount: 1
  };

  componentWillMount = () => this.setState(this.initialState);

  message = {
    locationId: 0,
    responsibleId: 0,
    unitId: 0,
    eventId: 0,
    subject: "",
    comment: "",
    attachments: []
  };

  attachFile = async () => {
    const stringConstants = Lang[this.props.language];

    DocumentPicker.getDocumentAsync({}).then(fileInfo => {
      if (fileInfo.type === "cancel") return;
      else if (fileInfo.size < 10 * 8 * 1024) {
        this.message.attachments.push({
          name: fileInfo.name,
         filepath: fileInfo.uri
        });
        this.forceUpdate();
      } else Alert.alert("", stringConstants.fileHasToBeLessThan10Mb);
    });
  };

  takePhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const { status2 } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    
    //if (status === 'granted' && status2 === 'granted') {
    const image = await ImagePicker.launchCameraAsync({ allowEditing: false });
    if (!image.cancelled) {
      const name = `Image-${this.state.imageCount}.jpg`;
      this.message.attachments.push({
        name: name,
        filepath: image.uri
      });
      this.forceUpdate();
    }
    //}
  };

  handleSend = () => {
    const stringConstants = Lang[this.props.language];

    if (this.message.comment === "")
      Alert.alert("", stringConstants.messageCommentCannotBeEmpty);
    else if (this.message.subject === "")
      Alert.alert("", stringConstants.messageSubjectCannotBeEmpty);
    else {
      this.message.eventId++;
      this.message.unitId = this.state.unitId;
      this.message.locationId = this.state.locationId;
      this.message.responsibleId = this.props.userId;
      this.props.addMessage(this.props.token, this.message);

      this.message.eventId = 0;
      this.message.locationId = 0;
      this.message.responsibleId = 0;
      this.message.unitId = 0;
      this.message.subject = "";
      this.message.comment = "";
      this.message.attachments = [];
      this.comment.clear();
      this.subject.clear();
      this.setState(this.initialState);
      this.forceUpdate();
      Alert.alert("", stringConstants.messageAdded);
    }
  };

  render() {
    const { newMessage } = Lang[this.props.language];
    const stringConstants = Lang[this.props.language];
    return (
      <View backgroundColor="#236CF6">
        <SafeAreaView backgroundColor="#236CF6" />
        <StatusBar barStyle="light-content" />

        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <IconTouchable onPress={() => this.props.navigation.goBack()} left>
              <Image
                source={require("../../assets/png/back.png")}
                style={{ width: 13, height: 21 }}
              />
            </IconTouchable>
            <View style={styles.headerTitleView}>
              <Text style={styles.headerTextLeft}>{newMessage}</Text>
            </View>
          </View>

          <ScrollView style={styles.centerContainer}>
            <ShiftScrollView>
              <MenuProvider>
                <Text style={[styles.keyText, styles.regularTMargin]}>
                  {stringConstants.type}
                </Text>
                <View style={styles.valueContainer}>
                  <Picker
                    style={styles.pickerContainer}
                    selectedValue={this.state.event}
                    onValueChange={(itemValue, itemIndex) => {
                      this.message.eventId = itemIndex - 1;
                      this.setState({ event: itemValue });
                    }}
                  >
                    {MESSAGE_TYPES.map((item, ind) => (
                      <Picker.Item
                        style={styles.valueText}
                        key={ind}
                        label={item}
                        value={item}
                      />
                    ))}
                  </Picker>
                </View>

                {/* <Text style={styles.keyText}>Site</Text>
                                <View style={styles.valueContainer}>
                                    <Picker
                                        style={styles.pickerContainer}
                                        selectedValue={this.state.location}
                                        onValueChange={itemValue => this.setState({ location: itemValue, locationId: this.props.locations.find(location => location.name === itemValue).id })}>
                                        {this.props.locations.map((item, ind) => (<Picker.Item style={styles.valueText} key={ind} label={item.name} value={item.name} />))}
                                    </Picker>
                                </View> */}

                <Text style={styles.keyText}>{stringConstants.unit}</Text>
                <View style={styles.valueContainer}>
                  <Picker
                    style={styles.pickerContainer}
                    enabled={!this.state.fixedUnit}
                    selectedValue={this.state.unit}
                    onValueChange={itemValue =>
                      this.setState({
                        unit: itemValue,
                        unitId: !itemValue
                          ? null
                          : this.props.units.find(
                              unit => unit.name === itemValue
                            ).id
                      })
                    }
                  >
                    <Picker.Item
                      style={styles.valueText}
                      key={null}
                      label={stringConstants.leaveEmpty}
                      value={null}
                    />
                    {this.props.units
                      .filter(
                        item => item.locationId === this.props.defaultSubstation
                      )
                      .map((item, ind) => (
                        <Picker.Item
                          style={styles.valueText}
                          key={ind}
                          label={item.name}
                          value={item.name}
                        />
                      ))}
                  </Picker>
                </View>

                <Text style={styles.keyText}>{stringConstants.subject}</Text>
                <View style={styles.valueContainer}>
                  <TextInput
                    ref={input => {
                      this.subject = input;
                    }}
                    onChangeText={text => (this.message.subject = text)}
                    style={styles.valueText}
                    defaultValue={this.message.subject}
                  />
                </View>

                <Text style={styles.keyText}>{stringConstants.comments}</Text>
                <View style={styles.valueContainer}>
                  <TextInput
                    onChangeText={text => (this.message.comment = text)}
                    style={[
                      styles.valueText,
                      { height: 90, textAlignVertical: "top" }
                    ]}
                    blurOnSubmit={true}
                    multiline
                    defaultValue={this.message.comment}
                    ref={input => {
                      this.comment = input;
                    }}
                  />
                </View>

                <Menu>
                  <MenuTrigger style={{ flexDirection: "row", marginTop: 15 }}>
                    <Image
                      source={require("../../assets/png/circle_plus.png")}
                      style={{ width: 24, height: 24 }}
                    />
                    <Text style={styles.linkText}>{stringConstants.attachFile}</Text>
                  </MenuTrigger>
                  <MenuOptions style={{ padding: 5 }}>
                    <MenuOption onSelect={this.attachFile}>
                      <Text style={styles.valueText}>{stringConstants.chooseFromDevice}</Text>
                    </MenuOption>
                    <MenuOption onSelect={this.takePhoto}>
                      <Text style={styles.valueText}>{stringConstants.takePhoto}</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>

                {this.message.attachments.map((file, ind) => (
                  <View key={ind} style={styles.itemContainer}>
                    <Text style={styles.valueText}>{file.name}</Text>
                  </View>
                ))}
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.handleSend}
                >
                  <Text style={styles.buttonText}>{stringConstants.send}</Text>
                </TouchableOpacity>

                <View style={{ marginBottom: 40 }} />
              </MenuProvider>
            </ShiftScrollView>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

mapStateToProps = state => ({
  units: state.units,
  locations: state.childLocations,
  token: state.token,
  userId: state.userId,
  defaultSubstation: state.defaultSubstation,
  language: state.language
});

export default connect(
  mapStateToProps,
  { addMessage }
)(NewMessage);
