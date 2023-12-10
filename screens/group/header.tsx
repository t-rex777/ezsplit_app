import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Menu, Text} from 'react-native-paper';
interface IHeaderProps {}

const FILTERS = [
  'All groups',
  'Outstanding balances',
  'Groups you owe',
  'Groups that owes you',
] as const;

type TGroupFilter = (typeof FILTERS)[number];

const Header = ({}: IHeaderProps): JSX.Element => {
  const [visible, setVisible] = React.useState(false);
  const [filter, setFilter] = React.useState<TGroupFilter>('All groups');

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View style={style.topPanel}>
      <Text>Overall, you owe $0.00</Text>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton icon="filter-variant" size={20} onPress={openMenu} />
        }>
        <Menu.Item
          titleStyle={style.menuText}
          onPress={() => {
            setFilter(FILTERS[0]);
          }}
          title={FILTERS[0]}
          leadingIcon={
            filter === FILTERS[0] ? 'radiobox-marked' : 'radiobox-blank'
          }
        />
        <Menu.Item
          titleStyle={style.menuText}
          onPress={() => {
            setFilter(FILTERS[1]);
          }}
          title={FILTERS[1]}
          leadingIcon={
            filter === FILTERS[1] ? 'radiobox-marked' : 'radiobox-blank'
          }
        />
        <Menu.Item
          titleStyle={style.menuText}
          onPress={() => {
            setFilter(FILTERS[2]);
          }}
          title={FILTERS[2]}
          leadingIcon={
            filter === FILTERS[2] ? 'radiobox-marked' : 'radiobox-blank'
          }
        />
        <Menu.Item
          titleStyle={style.menuText}
          onPress={() => {
            setFilter(FILTERS[3]);
          }}
          title={FILTERS[3]}
          leadingIcon={
            filter === FILTERS[3] ? 'radiobox-marked' : 'radiobox-blank'
          }
        />
      </Menu>
    </View>
  );
};

const style = StyleSheet.create({
  topPanel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingTop: 12,
    paddingRight: 4,
    paddingBottom: 12,
  },
  menuText: {
    fontSize: 14,
  },
});

export {Header};
