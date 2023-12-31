import React from 'react';
import {Avatar} from 'react-native-paper';

interface IEZAvatarProps {
  image?: string;
  label?: string;
  size?: number;
}

const EZAvatar = ({image, label = '', size = 40}: IEZAvatarProps) =>
  image !== undefined ? (
    <Avatar.Image size={size} source={{uri: image}} />
  ) : (
    <Avatar.Text size={size} label={label} />
  );

export default EZAvatar;
