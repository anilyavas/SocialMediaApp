import React from 'react';
import style from './style';
import {View, Image} from 'react-native';

const UserProfileImage = () => {
  return (
    <View style={style.userImageContainer}>
      <Image source={require('../../assets/images/default_profile.png')} />
    </View>
  );
};

export default UserProfileImage;
