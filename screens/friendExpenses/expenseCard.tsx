import dayjs from 'dayjs';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import EZAvatar from '../../components/Avatar';
import {getAvatarFallbackValue} from '../../utils/fallback';
import {capitalizeFirstLetter} from '../../utils/text';

interface IExpenseCardProps {
  date: string;
  categoryImage: string | null;
  categoryName: string;
  totalAmount: string;
  friendAmount: string;
  isFriendLender: boolean;
  expenseName: string;
  friendName: string;
  currency: string;
}

const ExpenseCard = ({
  totalAmount,
  friendAmount,
  categoryImage,
  currency,
  date,
  isFriendLender,
  expenseName,
  friendName,
  categoryName,
}: IExpenseCardProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.leftHalf}>
        <View style={styles.date}>
          <Text variant="labelLarge" style={{textAlign: 'center'}}>
            {dayjs(date).format('MMM')}
          </Text>

          <Text variant="labelLarge" style={{textAlign: 'center'}}>
            {dayjs(date).format('DD')}
          </Text>
        </View>

        <View>
          {/* manage this */}
          {categoryImage !== null && categoryImage.length !== 0 ? (
            <Image src={categoryImage} height={32} width={32} />
          ) : (
            <EZAvatar
              label={getAvatarFallbackValue(categoryName.toUpperCase())}
              size={32}
            />
          )}
        </View>

        <View>
          <View style={styles.main}>
            <Text variant="titleMedium">
              {capitalizeFirstLetter(expenseName)}
            </Text>

            <Text variant="bodySmall">
              {isFriendLender ? `${friendName} paid` : 'You paid'} {currency}{' '}
              {totalAmount}
            </Text>
          </View>
        </View>
      </View>

      <View>
        <Text
          variant="labelMedium"
          style={{textAlign: 'right', color: isFriendLender ? 'red' : 'green'}}>
          {isFriendLender ? 'You borrowed' : 'You lent'}
        </Text>

        <Text
          variant="labelMedium"
          style={{textAlign: 'right', color: isFriendLender ? 'red' : 'green'}}>
          {currency} {Number(totalAmount) - Number(friendAmount)}
        </Text>
      </View>
    </View>
  );
};

export {ExpenseCard};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  leftHalf: {
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
  date: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    width: 32,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
  },
});
