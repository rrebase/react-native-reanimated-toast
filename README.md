<div align="center">
  <h1>Reanimated Toast</h1>
</div>

[![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-000.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/)
[![typescript](https://camo.githubusercontent.com/0f9fcc0ac1b8617ad4989364f60f78b2d6b32985ad6a508f215f14d8f897b8d3/68747470733a2f2f62616467656e2e6e65742f62616467652f547970655363726970742f7374726963742532302546302539462539322541412f626c7565)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## 🌟 Features

- High performance with Reanimated v2
- Autocompletion thanks to TypeScript
- Easily customizable
- Runs with Expo

## Installation

> ⚠️ You need to install [react-native-reanimated v2](https://docs.swmansion.com/react-native-reanimated/docs/next/installation) & [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler) and follow their installation instructions.

`yarn add react-native-reanimated-toast`

Wrap the whole app in ToastProvider.
Usually you'd do this in your entry file, such as `index.js` or `App.js`:

```js
import * as React from 'react';
import { ToastProvider } from "react-native-reanimated-toast";

export default function App() {
  return (
    <ToastProvider>
      {/* Rest of your app code */}
    <ToastProvider>
  );
```

## Example Usage

Use the `useToast` hook in any of your function components'.

```js
const ToastExample = () => {
  const { showToast } = useToast();

  return (
    <Button
      onPress={() => {
        showToast({
          title: "Announcement",
          message: "👋 Hello world from toast!",
        });
      }}
    >
      Show toast
    </Button>
  );
};
```

## License

Licensed under the MIT license.

---

👉 [View Example App](https://github.com/rrebase/react-native-reanimated-toast/tree/master/example)
