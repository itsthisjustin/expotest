# YAC-Project

[![license](https://img.shields.io/badge/LICENSE-MIT%20License-green?style=for-the-badge&colorB=FE2E2E)](https://opensource.org/licenses/mit-license.html)
&nbsp;&nbsp;&nbsp;
[![language](https://img.shields.io/badge/dynamic/json?style=for-the-badge&colorB=FE2E2E&label=Framework&query=jest.preset&url=https%3A%2F%2Fraw.githubusercontent.com%2FSoFriendly%2Fyac-mobile%2FReleaseBranch%2Fpackage.json%3Ftoken%3DACCU4SJ6TGYZYKMWFCRNEQS5MYKTG)](https://facebook.github.io/react-native/)

![App Name](https://img.shields.io/badge/dynamic/json?style=for-the-badge&colorB=0174DF&label=App%20name&query=name&url=https%3A%2F%2Fraw.githubusercontent.com%2FSoFriendly%2Fyac-mobile%2FReleaseBranch%2Fpackage.json%3Ftoken%3DACCU4SJ6TGYZYKMWFCRNEQS5MYKTG)
&nbsp;&nbsp;&nbsp;
![App Version](https://img.shields.io/badge/dynamic/json?style=for-the-badge&colorB=0174DF&&label=App%20Version&prefix=v&query=version&url=https%3A%2F%2Fraw.githubusercontent.com%2FSoFriendly%2Fyac-mobile%2FReleaseBranch%2Fpackage.json%3Ftoken%3DACCU4SJ6TGYZYKMWFCRNEQS5MYKTG)
&nbsp;&nbsp;&nbsp;
![platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS-brightgreen.svg?style=for-the-badge&colorB=0174DF)
&nbsp;&nbsp;&nbsp;
![bundle package](https://img.shields.io/badge/Bundle%20%7C%20Package-com.yac-green?style=for-the-badge&colorB=0174DF)

[![npm](https://img.shields.io/badge/npm-v6.9.0-green?style=for-the-badge&colorB=DF01D7&logo=npm)](https://www.npmjs.com/)
&nbsp;&nbsp;&nbsp;
[![React](https://img.shields.io/badge/dynamic/json?style=for-the-badge&colorB=DF01D7&label=React&prefix=v&query=dependencies.react&logo=react&url=https%3A%2F%2Fraw.githubusercontent.com%2FSoFriendly%2Fyac-mobile%2FReleaseBranch%2Fpackage.json%3Ftoken%3DACCU4SJ6TGYZYKMWFCRNEQS5MYKTG)](https://reactjs.org/)
&nbsp;&nbsp;&nbsp;
[![React Native](https://img.shields.io/badge/React%20Native-v0.60.4-green?style=for-the-badge&colorB=DF01D7&logo=react)](https://facebook.github.io/react-native/)

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=for-the-badge&colorB=398339)](http://standardjs.com/)
&nbsp;&nbsp;&nbsp;
[![codebeat badge](https://codebeat.co/badges/c316e07d-f9ab-4c65-a79a-2134f51b625c)](https://codebeat.co/a/developer-0209bfcf-9e1a-4b86-a052-d18287f88f7c/projects/github-com-sofriendly-yac-mobile-releasebranch)

## Brief description of the project.
- YAC is a cross-platform chat app for communication over **voice messages**.

- Key Features:
  - Signup and login with YAC.
  - Find teammates/friends.
  - Create secure chat channels with them.
  - Do one-to-one chat or group chat using both voice messages.
  - Organize your groups.
  - Participate in YAC communities.

## Prerequisites

**iOS** : XCode(10.2)

**Android** : Android Studio(v3.4) with gradle(v5.4.1)

**Editor** : Visual Studio Code

## Main technologies used
1. [React Native](https://github.com/facebook/react-native)
: A cross-platform framework for building native ios & android apps with React.
2. [Redux](http://redux.js.org/)
: A predictable state container for JavaScript apps to manage and utilise application data from one central store.
3. [Redux Persist](https://www.npmjs.com/package/redux-persist)
: It takes your Redux state object and saves it to persisted storage. It retrieves this persisted state and saves it back to redux upon app launch.
4. [Redux Thunk](https://www.npmjs.com/package/redux-thunk)
: A basic middleware for basic Redux side effects logic, including complex synchronous logic that needs access to the store, and simple async logic like AJAX requests.
5. [Socket.io Client](https://www.npmjs.com/package/socket.io-client)
: A JavaScript library for realtime chat applications. It enables realtime, bi-directional communication between clients and servers.
6. [svg](https://github.com/react-native-community/react-native-svg)
: It provides SVG support to React Native on iOS and Android, and a compatibility layer for the web. Supports most SVG elements and properties (Rect, Circle, Line, Polyline, Polygon etc).

## Project Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install the Application with `npm i`

**Step 4:** cd to ios directory. And install pods with `pod install`

**Step 5:** Run Jetify for Third Party library convert in AndroidX `npx jetify`(This needs to be done only for first time after checking out the repo.)

## How to run the project

1. cd to the project directory
2. Run and build for either OS
    * Run iOSm app
        ```bash 
        npm run ios
        ```
    * Run Android app
      * Start Genymotion or Native emulator
      ```bash 
      npm run android
      ```
    * Note: This npm scripts will lint your code first. If there are no lint errors, then it will run the ios or android app. Otherwise it will show the lint errors in the terminal.

## Coding Style

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

This project adheres to JavaScript Standard for codinng style. To maintain coding standards, utilising features of ES6 and follow best development practices of react-native, this project also uses ES6, some rules of eslint-airbnb, eslint-plugin-react and eslint-plugin-react-native.

1. **To Lint**
  
   Use the npm script `lint`. To run it
  ```bash 
    npm run lint
  ```
2. **Auto Lint on Commit**
   
   This is implemented using [husky](https://github.com/typicode/husky). So husky will prevent code-cmmits having lint errors. There is no additional setup needed.

3. **Bypass Lint**

   If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

3. **Understanding Linting Errors**

   The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

## Extra steps for android
- None

## Extra steps for ios
- None

## List of all dependencies in the project with their usage
  1. [**@react-native-community/audio-toolkit**](https://github.com/react-native-community/react-native-audio-toolkit) to play and record audio files.
  1. [**react-native-circle-list**](https://github.com/mjinkens1/react-native-circle-list) to display friend list on the bottom of Home Screen.
  1. [**react-native-circular-action-menu**](https://github.com/geremih/react-native-circular-action-menu) to display arc menu in recent list item. 
  1. [**Microsoft Appcenter**](https://docs.microsoft.com/en-us/appcenter/sdk/getting-started/react-native) for app tracking and CI/CD for Ios and Android build releases.
  1. [**react-native-cached-images**](https://www.npmjs.com/package/react-native-cached-images) to cache remote images so they can be loaded faster.
  1. [**react-native-image-picker**](https://github.com/react-native-community/react-native-image-picker) to select images from the device or click a picture using camera. Library also have native android and iOS.
  1. [**react-native-linear-gradient**](https://github.com/react-native-community/react-native-linear-gradient) to show linear gradient in app.

## Following accounts are used for the mentioned platform

**Codebeat** : developer@simform.com

**Microsoft AppCenter** : umang.l@simformsolutions.com

## Troubleshoot Notes
- There are no known issues for run or build process right now.

## Notes
-  This project has implemented CI/CD process for ios and android build releases. Microsoft Appcenter is used for it, and the branch from which the builds are being generated is **ReleaseBranch**.