import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, TouchableOpacity, PixelRatio, ScrollView } from 'react-native';
import { setUserImage,setUserImageGov, sendGovIdVerification } from '../../store/actions/profile.actions';
import { getUserData } from '../../store/actions/auth.actions';
import { showBtnSpinner, hideBtnSpinner } from '../../store/actions/layout.actions';
import Header from '../../containers/layout/header.container';
import { styles } from '../../utils/styles.util';
import {
  width,
  icons,
  colors,
  shadows,
  height
} from '../../theme/consts.theme';
import Button from '../../containers/layout/button.container';
import ImagePicker from 'react-native-image-picker';

class AddGovInfoScreen extends Component {
    state = {
      image: {
        uri: '',
      },
    }
    showImagePicker = () => {
      this.props.showBtnSpinner();
      ImagePicker.showImagePicker({
        // maxWidth: width['100'] * PixelRatio.get() / 4,
        // maxHeight: height['100'] * PixelRatio.get() / 4,
        // quality: 0.5,
      }, (res) => {
        if (res.didCancel) {
          console.log('User cancelled image picker');
          this.props.hideBtnSpinner();
        } else if (res.error) {
          console.log('ImagePicker Error: ', response.error);
          this.props.hideBtnSpinner();
        } else {
          const newFormData = new FormData();
          newFormData.append('file', {
            type: 'image/jpg',
            name: res.fileName || 'my photo.JPG',
            ...res,
          });
          newFormData.append('fullSize',true);
          this.props.setUserImage(newFormData, { ...res }, (id) => {
            this.setState({
              image: {
                type: 'image/jpg',
                name: 'my photo.JPG',
                ...id.photo,
              },
              avatarId: id.id,
            }, () => {
              this.props.hideBtnSpinner();
            });
          });
        }
      });
    }

    submitGovId = () => {
      this.props.setUserImageGov();
      const data = {
        attachment_id: this.state.avatarId,
        type: 'government_id',
      };
      this.state.avatarId
        ? this.props.sendGovIdVerification(data, () => {
          this.props.getUserData();
          this.props.navigation.goBack();
        })
        : alert('Oops...', 'Photo is not valid try another please!');
    }

    render() {
      const { loading } = this.props;
      return (
          <View style={[styles.containerCenterHorizontal]}>
              <Header
                  backButton
                  goBack={() => this.props.navigation.goBack()}
                  title="Receive badge"
                />
              <ScrollView style={{ marginBottom: 120 }} showsVerticalScrollIndicator={false}>
                  <Text style={localStyles.title}>Gov ID</Text>
                  <Text style={localStyles.mainText}>То earn Badge please add your Gov ID</Text>
                  <TouchableOpacity
                      disabled={loading && loading.spinnerVisible}
                      style={[localStyles.addImageButton, shadows.default]}
                      onPress={this.showImagePicker}
                    >
                      <Text>Add image</Text>
                      <Image
                          source={icons.skrepka}
                          style={localStyles.addImage}
                        />
                    </TouchableOpacity>
                  <Image
                      style={localStyles.addedImage}
                      source={this.state.image.uri ? { uri: this.state.image.uri } : icons.white}
                    />
                  <Button
                      label="SUBMIT"
                      action={this.submitGovId}
                      active
                    />
                </ScrollView>
            </View>
      );
    }
}

const localStyles = {
  title: {
    fontSize: 25,
    marginVertical: 40,
    width: width['80'],
    textAlign: 'center',
  },
  mainText: {
    width: width['100'] * 0.8,
    textAlign: 'center',
  },
  addImageButton: {
    width: width['80'],
    height: 50,
    marginVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  addImage: {
    height: 30,
    width: 30,
    resizeMode: 'stretch',
  },
  addedImage: {
    height: width['100'] * 0.4,
    width: width['100'] * 0.4,
    resizeMode: 'contain',
    marginBottom: 30,
    marginHorizontal: width['100'] * 0.2,
  },
};


const mapStateToProps = ({ layout }) => ({
  loading: layout,
});

export default connect(
  mapStateToProps, {
    setUserImage,
    sendGovIdVerification,
    getUserData,
    showBtnSpinner,
    hideBtnSpinner,
    setUserImageGov
},
)(AddGovInfoScreen);
