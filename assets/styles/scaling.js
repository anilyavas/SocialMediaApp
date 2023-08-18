import {Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const {width, height} = Dimensions.get('window');

const isSmall = width <= 375 && !DeviceInfo.hasNotch();

const guideLineBaseWidth = () => {
  if (isSmall) {
    return 330;
  }
  return 350;
};

const guideLineBaseHeight = () => {
  if (isSmall) {
    return 550;
  } else if (width > 410) {
    return 620;
  } else {
    return 680;
  }
};

const guideLineBaseFonts = () => {
  if (width > 410) {
    return 430;
  }
  return 400;
};

const horizontalScale = size => (width / guideLineBaseWidth()) * size;

const verticalScale = size => (height / guideLineBaseHeight()) * size;

const scaleFontSize = size => Math.round((size * width) / guideLineBaseFonts());

export {horizontalScale, verticalScale, scaleFontSize};
