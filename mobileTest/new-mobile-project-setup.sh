# Snap install android studio
# AVD Manager on android studio create mobile emulator

# Select the appropriate java version
source change-jave-version.sh

# Create the mobile folder for the project
npx react-native init ProjectName
cd ProjectName
# start the Metro bundler for fast reloading
yarn react-native start
# on another terminal initiate the android emulator
yarn react-native run-android # or yarn react-native run-android --simulator device_name