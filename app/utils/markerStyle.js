import React from 'react';
import { View } from 'react-native';
import { colors } from '../theme/consts.theme';

const CustomMarker = () => (
  <View style={{
    width: 10,
    height: 10,
    backgroundColor: colors.pink,
    borderRadius: 5,
  }}
  />
);


export default CustomMarker;
