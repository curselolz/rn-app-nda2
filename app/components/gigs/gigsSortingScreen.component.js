import React, { Component } from 'react';
import {
  View, ScrollView, NativeModules, TouchableOpacity, KeyboardAvoidingView, Text, Image,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { sortingBySet, getGigs, addFiltering } from '../../store/actions/gigs.actions';
import { Button } from '../../containers/layout';
import Header from '../../containers/layout/header.container';
import { styles } from '../../utils/styles.util';
import {
  colors, shadows, flex, width, icons,
} from '../../theme/consts.theme';
import DropDown from '../../containers/layout/dropDown.container';
import DropDownContent from '../../containers/layout/dropDownContent.container';


const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental
    && UIManager.setLayoutAnimationEnabledExperimental(true);

class GigSortingScreen extends Component {
  constructor(props) {
    super(props);
    this.inputRefs = {
      firstTextInput: null,
      favSport0: null,
      favSport1: null,
      lastTextInput: null,
    };
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      mileRadius: null,
      zipCode: '',
      filteringRadius: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { filteringRadius } = nextProps;

    if (prevState.filteringRadius !== filteringRadius) {
      let zip = '';
      let radius = 0;
      if (filteringRadius && filteringRadius.includes('zip')) {
        const startRadius = filteringRadius.search('radius');
        const startZip = filteringRadius.search('radius');
        zip = startZip !== -1 ? filteringRadius.slice(3, startRadius) : '';
        radius = startRadius !== -1
          ? filteringRadius.slice(startRadius + 6, filteringRadius.length) : 20;
      }

      return {
        mileRadius: radius,
        zipCode: zip,
        filteringRadius,
      };
    }

    return null;
  }

    goBack = () => {
      this.props.navigation.goBack();
    }

    goBackApply = () => {
      const { getGigs, navigation } = this.props;
      getGigs();
      navigation.goBack();
    }

    onChangeMileRadius = (mileRadius) => {
      const { zipCode } = this.state;
      this.setState({ mileRadius });
      if (mileRadius) {
        this.props.sortingBySet(`zip${zipCode}radius${mileRadius}`);
        this.props.addFiltering(`zip${zipCode}radius${mileRadius}`);
      }
    }

    onChangeZipCode = (zipCode) => {
      const { mileRadius } = this.state;
      this.setState({ zipCode });
      if (zipCode) {
        this.props.sortingBySet(`zip${zipCode}radius${mileRadius}`);
        this.props.addFiltering(`zip${zipCode}radius${mileRadius}`);
      }
    }


    render() {
      const buttons = [
        { label: 'MOST RECENT', value: 'created_at' },
        { label: 'GIG VALUE', value: 'total_price' },
        { label: 'START DATE', value: 'start_time' },
        { label: 'PRIMARY CATEGORY', value: 'filter' },
        { label: 'ZIP CODE', value: 'zipRadius' },
      ];
      const myIcon = <Image source={icons.arrowDown} style={localStyles.arrow} />;
      const { selected, filter, sortingBySet } = this.props;

      const sports = [
        {
          label: '1',
          value: 1,
        },
        {
          label: '5',
          value: 5,
        },
        {
          label: '10',
          value: 10,
        },
        {
          label: '20',
          value: 20,
        },
      ];
      const placeholder = {
        label: 'Within miles of:',
        value: null,
        color: '#9EA0A4',
      };
      return (
        <View style={[
          styles.containerCenterHorizontal,
          styles.fillAll, { backgroundColor: colors.white }]}
        >
          <Header
            backButton
            goBack={this.goBack}
            title="Sort By:"
          />
          <KeyboardAvoidingView
            keyboardVerticalOffset={10}
            behavior="padding"
          >
            <ScrollView
              style={localStyles.buttonsWrapper}
              contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', marginBottom: 60 }}
            >
              {buttons.map((item, index) => {
                switch (item.label) {
                  case 'PRIMARY CATEGORY':
                    return (
                      <View
                        key={index.toString()}
                        style={{ marginVertical: 5 }}
                      >
                        <DropDown
                          action={() => sortingBySet(item.value)}
                          active={selected === item.value}
                          types={
                                        [{ label: 'office', value: 'office' },
                                          { label: 'service', value: 'service' },
                                          { label: 'labor', value: 'labor' },
                                          { label: 'peer2peer', value: 'peer2peer' }]}
                          title={filter ? filter.toUpperCase() : 'GIG TYPE'}
                        />
                      </View>
                    );
                  case 'ZIP CODE':
                    return (
                      <View
                        key={index.toString()}
                        style={{ marginVertical: 5 }}
                      >
                        <DropDownContent
                          action={() => sortingBySet(item.value)}
                          active={selected && selected.includes('zip')}
                          title="ZIP CODE"
                        >
                          <View style={localStyles.containerZipCode}>
                            <View style={localStyles.pickerWrapper}>
                              <RNPickerSelect
                                placeholder={placeholder}
                                items={sports}
                                style={pickerSelectStyles}
                                onValueChange={value => this.onChangeMileRadius(value)}
                                Icon={() => (this.state.mileRadius === 0 || this.state.mileRadius === null ? myIcon : '')}
                              />
                            </View>
                            <TextInputMask
                              style={localStyles.textInputMask}
                              placeholder="Enter zip code"
                              onChangeText={text => this.onChangeZipCode(text)}
                              value={this.state.zipCode}
                              onSubmitEditing={() => this.onChangeZipCode(this.state.zipCode)}
                              placeholderStyle={{ justifyContent: 'center', fontSize: 14, fontWeight: 'bold' }}
                              type="only-numbers"
                              minLength={5}
                              maxLength={5}
                            />
                          </View>
                        </DropDownContent>
                      </View>
                    );
                  default:
                    return (
                      <View
                        key={index.toString()}
                        style={{ marginVertical: 5 }}
                      >
                        <Button
                          label={item.label}
                          active={selected === item.value}
                          action={() => { sortingBySet(item.value); }}
                        />
                      </View>
                    );
                }
              })}

              <TouchableOpacity
                style={[localStyles.applyButton, shadows.default]}
                onPress={this.goBackApply}
              >
                <Text>APPLY</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      );
    }
}

const localStyles = {
  buttonsWrapper: {
    marginVertical: 80,
  },
  sliderWrapper: {
    alignItems: 'center',
    paddingTop: 30,
    width: width['80'],

  },
  valuesWrapper: {
    width: width['80'],
    ...flex.horizontal,
    ...flex.remote,
    marginVertical: 0,
  },
  applyButton: {
    width: width['80'],
    height: 40,
    backgroundColor: '#fff',
    ...flex.centered,
    marginVertical: 20,
    borderColor: colors.grey,
    borderWidth: 1,
  },
  containerZipCode: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  textInputMask: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.pink,
    backgroundColor: colors.greyWhite,
    paddingLeft: 15,
    paddingRight: 1,
    marginLeft: 5,
  },
  pickerRadius: {
    // flex: 1,
  },
  pickerWrapper: {
    position: 'relative',
    flex: 1,
    height: 40,
    // paddingLeft: 15,
    // paddingRight: 1,
    // marginLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.pink,
    backgroundColor: colors.greyWhite,
  },
  pickerRadiustext: {
    alignSelf: 'center',
  },
  arrow: {
    marginRight: 5,
    marginTop: 15,
    height: 10,
    width: 10,
    resizeMode: 'contain',
  },
};

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    position: 'relative',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'eggplant',
    borderRadius: 8,
    position: 'relative',
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
};


const mapStateToProps = ({ gigs }) => ({
  selected: gigs.sortingBy,
  filter: gigs.filter,
  filteringRadius: gigs.filteringRadius,
});

export default connect(mapStateToProps, { sortingBySet, getGigs, addFiltering })(GigSortingScreen);
