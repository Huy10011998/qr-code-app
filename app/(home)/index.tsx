import {
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useNavigation } from "expo-router";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function LoginScreen() {
  const navigation = useNavigation("/(home)");

  const handlePress = () => {
    (navigation as any).navigate("(tabs)");
  };

  return (
    <ParallaxScrollView
      containerBackground={
        <Image
          source={require("@/assets/images/bg-login.jpg")}
          style={styles.bgLogin}
        />
      }
    >
      <ThemedView style={[styles.contaiContent, { flex: 0.3 }]}>
        <Image
          source={require("@/assets/images/logo-cholimex.jpg")}
          style={styles.logoCholimex}
        />
      </ThemedView>
      <ThemedView style={[styles.contaiContent, { flex: 0.7 }]}>
        <TextInput
          style={styles.inputContai}
          // onChangeText={(text) => console.log(text)}
          placeholder={"Tài khoản"}
          placeholderTextColor="#fff"
        />
        <TextInput
          style={[styles.inputContai, { marginTop: 20 }]}
          secureTextEntry={true}
          // onChangeText={(text) => console.log(text)}
          placeholder={"Mật khẩu"}
          placeholderTextColor="#fff"
        />
        <TouchableOpacity style={styles.btnContai} onPress={handlePress}>
          <Text style={styles.textContai}>Đăng nhập</Text>
        </TouchableOpacity>
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
  contaiContent: {
    marginTop: 32,
    alignSelf: "flex-start",
    borderRadius: 8,
    backgroundColor: "transparent",
    width: "100%",
  },
  logoCholimex: {
    width: 128,
    height: 112,
    resizeMode: "contain",
  },
  inputContai: {
    fontSize: 18,
    height: 60,
    borderBottomWidth: 1.0,
    borderColor: "#fff",
    color: "#fff",
    fontWeight: "500",
  },
  btnContai: {
    borderRadius: 8,
    marginTop: 50,
    width: "100%",
    height: 60,
    padding: 20,
    backgroundColor: "#fff",
  },
  textContai: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    color: "#FF3333",
  },
});
