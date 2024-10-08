import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import Avatar from '../../components/Avatar';
import {theme} from '../../theme';

interface IGroupCardProps {
  title: string;
  money: number;
  image?: string;
}

const RightContent = ({money, title}: IGroupCardProps) => (
  <View>
    <Text variant="titleLarge">{title}</Text>
    <Text variant="bodyMedium" style={style.card}>
      {money > 0
        ? `${title} owes you $${money}`
        : `${title} is owed $${Math.abs(money)}`}
    </Text>
  </View>
);

const GroupCard = ({
  money = 0,
  title = '',
  image,
}: IGroupCardProps): JSX.Element => {
  return (
    <Card style={style.container}>
      <Card.Title
        title="Card Title"
        subtitle="Card Subtitle"
        left={() => <Avatar image={image} />}
        right={() => <RightContent title={title} money={money} />}
      />
    </Card>
  );
};

const style = StyleSheet.create({
  card: {
    paddingRight: 16,
  },
  container: {
    marginBottom: theme.my.default,
    marginTop: theme.my.default,
    marginLeft: theme.mx.default,
    marginRight: theme.mx.default,
  },
});

export {GroupCard};
