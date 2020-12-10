import * as Haptics from "expo-haptics";
import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ToastProvider, useToast } from "react-native-reanimated-toast";

const unsplashImgSrc =
  "https://images.unsplash.com/photo-1511406361295-0a1ff814c0ce?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=90";

const { width, height } = Dimensions.get("window");
const monospaceFontFamily = Platform.OS === "ios" ? "Courier" : "monospace";

const ToastExample = () => {
  const { showToast } = useToast();

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: unsplashImgSrc,
          width,
          height,
        }}
        style={styles.image}
      />
      <View>
        <Text style={styles.text}>react-native-reanimated-toast</Text>
        <TouchableOpacity
          style={styles.showToast}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            showToast({
              title: "Announcement",
              message: "It's now possible to see stats  🎉!",
              autoHideDuration: 3000,
            });
          }}
        >
          <Text style={styles.white}>Show Toast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = () => {
  // Try adding StrictMode back when Animated is emoved as it seems to come from there
  return (
    <ToastProvider>
      <ToastExample />
    </ToastProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  white: { color: "#fff" },
  image: { position: "absolute" },
  showToast: {
    margin: 16,
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#337492",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#212329",
  },
  text: {
    color: "#fff",
    marginTop: 16,
    fontFamily: monospaceFontFamily,
  },
});
