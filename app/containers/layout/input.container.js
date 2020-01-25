import React, { Component } from 'react';
import {
  View, StyleSheet, Text, TextInput,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { colors, flex, width } from '../../theme/consts.theme';
import { inputs } from '../../utils/inputs.util';
import validate from '../../utils/validation.util';
import { unmask } from '../../utils/unmusking.util';

class Input extends Component {
    state = {
      valid: false,
      value: this.props.defaultValue,
    }

    handleValidation = () => {
      let valid;

      this.props.callbackBlur && this.props.callbackBlur();

      return this.props.required && (
        valid = !(validate(this.state.value, this.props.type) === false || this.state.value === ''),
        this.setState({ valid }),
        valid);
    }

    handleChange = (value) => {
      console.log(value)
      const { callbackChange,type } = this.props;
      this.setState({ value });
      // console.log(type)
      callbackChange && callbackChange(type,value);
    }

    render() {
      const {
        inputWhite,
        style,
        type,
        inputStyle,
        checkout,
        searchFunc,
        defaultValue,
        editable,
        profile,
        minLength,
        multiline,
        notWide,
        required,
        keyType,
        submitAction,
      } = this.props;
      const inputType = inputs[type].placeholder;
      if (inputs[type].default) {
        return (
          <View style={{ marginTop: 5 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text>{inputType.toUpperCase()}</Text>
              {required && <Text style={{ color: colors.pink }}> *</Text>}
            </View>
            <View style={[styles.inputWrapper,
              checkout && styles.checkoutStyleWrapper,
              profile && styles.profileStyleWrapper,
              style && style, multiline && styles.multiline,
            ]}
            >
              <TextInput
                multiline={multiline || false}
                maxLength={255}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholderTextColor={inputWhite
                    ? colors.white
                    : colors.grey}
                keyboardType={inputs[type].keyBoardType}
                editable={editable}
                returnKeyType={type === 'search' && 'search' || keyType}
                onSubmitEditing={type === 'search' && searchFunc() || this.props.submitAction ? this.props.submitAction : null}
                defaultValue={defaultValue}
                // ref={this.props && null}
                value={this.state.value}
                // placeholder={this.props.value ? unmask(this.props.value) : '9999'}
                minLength={minLength}
                style={[styles.input,
                    checkout && styles.checkoutStyle,
                    profile && styles.profileInput,
                    inputStyle && inputStyle,
                    !this.state.valid && styles.inputRequired,
                    inputWhite && styles.inputWhite,
                    notWide && { width: width['80'] }]}
                autoCapitalize={
                    type === 'email' || type === 'password'
                        || type === 'old_password' || type === 'new_password'
                        || type === 'confirm'
                      ? 'none'
                      : 'sentences'}
                secureTextEntry={type === 'password' || type === 'old_password' || type === 'new_password'
                    || type === 'confirm' && true}
                onBlur={this.handleValidation}
                onChangeText={this.handleChange}
              />

            </View>
          </View>
        );
      }
      return (
        <View style={{ marginTop: 5 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text>{inputType.toUpperCase()}</Text>
            {required && <Text style={{ color: colors.pink }}> *</Text>}
          </View>
          <View style={[styles.inputWrapper,
            checkout && styles.checkoutStyleWrapper,
            profile && styles.profileStyleWrapper,
            style && style, multiline && styles.multiline,
          ]}
          >
            <TextInputMask
              multiline={multiline || false}
              maxLength={inputs[type].maxLength}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholderTextColor={inputWhite
                ? colors.white
                : colors.grey}
              keyboardType={inputs[type].keyBoardType}
              editable={editable}
              returnKeyType={type === 'search' ? 'search' : null}
              onSubmitEditing={() => (type === 'search' ? searchFunc() : null)}
              defaultValue={defaultValue}
                            // ref={this.props && null}
              value={this.state.value}
                            // value={this.state.value ? this.state.value : defaultValue}
                            // placeholder={this.props.value ? unmask(this.props.value) : '9999'}
              minLength={minLength}
              style={[styles.input,
                checkout && styles.checkoutStyle,
                profile && styles.profileInput,
                inputStyle && inputStyle,
                !this.state.valid && styles.inputRequired,
                inputWhite && styles.inputWhite,
                notWide && { width: width['80'] }]}
              autoCapitalize={
                                type === 'email' || type === 'password'
                                    || type === 'old_password' || type === 'new_password'
                                    || type === 'confirm'
                                  ? 'none'
                                  : 'sentences'}
              secureTextEntry={type === 'password' || type === 'old_password' || type === 'new_password'
                                || type === 'confirm' && true}
              onBlur={this.handleValidation}
              onChangeText={this.handleChange}
                            // onChangeText={value11 => console.log(value11)}
              type={inputs[type].type}
              options={{
                mask: inputs[type].mask,
              }}
            />
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: colors.inputsGrey,
    marginVertical: 6,
    height: 40,
    ...flex.centered,
  },
  input: {
    width: width['100'] * 0.9,
    color: colors.black,
    fontSize: 15,
    padding: 5,
  },
  inputRequired: {
    borderColor: colors.red,
  },
  inputWhite: {
    color: colors.white,
    borderColor: colors.white,
  },
  checkoutStyle: {
    borderBottomWidth: 0,
    paddingVertical: 12,
    width: width['100'] - 30,
  },
  checkoutStyleWrapper: {
    margin: 0,
    padding: 0,
  },
  profileInput: {
    borderBottomWidth: 0,
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
  profileStyleWrapper: {
    marginVertical: 0,
    paddingVertical: 10,
    width: width['60'],
  },
  multiline: {
    height: null,
  },
});

export default Input;
