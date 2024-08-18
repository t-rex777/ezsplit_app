import {useMemo} from 'react';
import * as Keychain from 'react-native-keychain';
import {Client} from '../api/client';

export function useModel<T extends Client>(
  model: new (headers?: Record<string, any>) => T,
) {
  const Model = useMemo(async () => {
    const key = await Keychain.getGenericPassword();

    const headers =
      key !== false
        ? {authorization: 'Bearer ' + JSON.parse(key.password).__token}
        : undefined;

    return new model(headers);
  }, [model]);

  return Model;
}
