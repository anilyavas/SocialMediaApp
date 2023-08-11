import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import style from './style';
import UserProfileImage from '../UserProfileImage/UserProfileImage';

const UserStory = props => {
  return (
    <View style={style.storyContainer}>
      <UserProfileImage />
      <Text style={style.name}>{props.firstName}</Text>
    </View>
  );
};
UserStory.propTypes = {
  firstName: PropTypes.string.isRequired,
};

export default UserStory;
