## To build the app into an prod APK, run

- npx react-native build-android --mode=release
- you will find the apk inside `android/app/build/outputs/apk/release`
- don't change localhost port, else re-configure emulator, for help @[article](https://cgorale111.medium.com/connect-react-native-app-with-localhost-backend-server-c02b4cec7933)
- to get your current system ip address `ipconfig getifaddr en0`

## How to fix api address and port issue?

- sometimes we provide the correct api address but react native does not run properly
- to fix this, we have to bridge the ports
- run `adb devices` then `adb -s emulator-5554 reverse tcp:8080 tcp:8080`
