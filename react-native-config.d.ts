declare module 'react-native-config' {
  export interface NativeConfig {
    EZSPLIT_API_URL: string;
    IS_DEV: boolean;
  }

  export const Config: NativeConfig;
  export default Config;
}
