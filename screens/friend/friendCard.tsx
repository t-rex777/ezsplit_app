import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import Avatar from '../../components/Avatar';
import {theme} from '../../theme';

export interface IGroupExpense {
  id: string;
  name: string;
  money: number;
}

interface IFriendCardProps {
  title: string;
  image?: string;
  groups: IGroupExpense[];
}

const RightContent = ({name, group}: {name: string; group: IGroupExpense}) => (
  <View>
    <Text variant="bodyMedium" style={style.card}>
      {group.money > 0
        ? `${name} owes you $${group.money}`
        : `${name} is owed $${Math.abs(group.money)}`}{' '}
      for {group.name}
    </Text>
  </View>
);

const FriendCard = ({
  groups = [],
  title = '',
  image,
}: IFriendCardProps): JSX.Element => {
  return (
    <Card style={style.container}>
      <Card.Content style={style.cardContent}>
        <View style={style.cardContentHeader}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}>
            <Avatar image={image} />
            <Text variant="titleMedium">Morris</Text>
          </View>

          <View>
            <Text variant="bodySmall">You owe</Text>
            <Text>338478</Text>
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 10,
            width: '100%',
          }}>
          {groups.map(group => (
            <RightContent name={title} group={group} key={group.id} />
          ))}
        </View>
      </Card.Content>
    </Card>
  );
};

const style = StyleSheet.create({
  card: {
    paddingRight: 16,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  cardContentHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  container: {
    marginBottom: theme.my.default,
    marginTop: theme.my.default,
    marginLeft: theme.mx.default,
    marginRight: theme.mx.default,
  },
});

export {FriendCard};
