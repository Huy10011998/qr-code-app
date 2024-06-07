import { Image, StyleSheet, Dimensions, View, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function LoginScreen() {
  return (
    <ParallaxScrollView
      containerBackground={
        <Image
          source={require("@/assets/images/bg-login.jpg")}
          style={styles.bgLogin}
        />
      }
    >
      <ThemedView style={styles.contaiQrcode}>
        <Image
          source={require("@/assets/images/logo-cholimex.jpg")}
          style={styles.logoCholimex}
        />
      </ThemedView>
      <ThemedView>
        <ThemedText type="subtitle">Thái Minh Thanh Quốc Huy</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  bgLogin: {
    width: windowWidth,
    height: windowHeight,
    resizeMode: "cover",
  },
  contaiQrcode: {
    marginTop: 32,
    alignSelf: "flex-start",
    borderRadius: 8,
  },
  logoCholimex: {
    width: 128,
    height: 112,
    resizeMode: "contain",
  },
});
