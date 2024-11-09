import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import { useNavigation } from "expo-router";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAuth } from "../components/AuthProvider";
import { ThemedView } from "../components/ThemedView";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function LoginScreen() {
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userId.trim() !== "" && password.trim() !== "") {
      setIsLoginDisabled(false);
    } else {
      setIsLoginDisabled(true);
    }
  }, [userId, password]);

  const handlePressIconEyeView = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const { setUserData, setToken } = useAuth();

  const handlePressLogin = async () => {
    if (isLoading) {
      return;
    }

    Keyboard.dismiss();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://hrcert.cholimexfood.com.vn/api/auth/login",
        {
          userId,
          password,
        }
      );

      if (response.status === 200) {
        const userData = {
          id: response.data.data.id,
          userId: response.data.data.userId,
          fullName: response.data.data.fullName,
          department: response.data.data.department,
          email: response.data.data.email,
          phoneNumber: response.data.data.phoneNumber,
        };
        setUserData(userData);
        setToken(response.data.token);
        (navigation as any).navigate("(tabs)");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 404) {
          Alert.alert(
            "Đăng nhập thất bại",
            "Tài khoản hoặc mật khẩu không chính xác"
          );
          setPassword("");
        } else {
          Alert.alert(
            "Đăng nhập thất bại",
            "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau."
          );
          setPassword("");
        }
      } else {
        Alert.alert(
          "Đăng nhập thất bại",
          "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau."
        );
        setPassword("");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={50}
        enableAutomaticScroll={true}
        enableResetScrollToCoords={true}
      >
        <View style={styles.bgLogin}>
          <ThemedView style={[styles.contaiContent, { flex: 0.5 }]}>
            <Image
              source={require("../assets/images/logo-cholimex.jpg")}
              style={styles.logoCholimex}
            />
          </ThemedView>
          <ThemedView style={[styles.contaiInput, { flex: 0.5 }]}>
            <TextInput
              style={styles.inputContai}
              placeholder={"Tài khoản"}
              placeholderTextColor="#000"
              value={userId}
              onChangeText={setUserId}
            />
            <ThemedView style={styles.contaiInputPW}>
              <TextInput
                style={styles.inputContaiPW}
                secureTextEntry={!isPasswordVisible}
                placeholder={"Mật khẩu"}
                placeholderTextColor="#000"
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.iconEyeContainer}
                onPress={handlePressIconEyeView}
              >
                <Image
                  source={
                    isPasswordVisible
                      ? require("../assets/images/iconEye-hide.png")
                      : require("../assets/images/iconEye-view.png")
                  }
                  style={styles.iconEye}
                />
              </TouchableOpacity>
            </ThemedView>
            <TouchableOpacity
              style={[styles.btnContai, isLoginDisabled && styles.disabledBtn]}
              onPress={handlePressLogin}
              disabled={isLoginDisabled || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={"#FF3333"} />
              ) : (
                <Text
                  style={[
                    styles.textContai,
                    isLoginDisabled && { color: "#000" },
                  ]}
                >
                  Đăng nhập
                </Text>
              )}
            </TouchableOpacity>
          </ThemedView>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  bgLogin: {
    width: windowWidth,
    height: windowHeight,
    resizeMode: "cover",
    backgroundColor: "white",
    padding: 16,
  },
  contaiContent: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    borderRadius: 8,
    backgroundColor: "transparent",
    width: "100%",
  },
  contaiInput: {
    alignSelf: "flex-start",
    backgroundColor: "transparent",
    width: "100%",
  },
  logoCholimex: {
    resizeMode: "contain",
  },
  inputContai: {
    fontSize: 16,
    height: 60,
    borderBottomWidth: 1.0,
    borderColor: "#000",
    color: "#000",
    fontWeight: 500,
  },
  contaiInputPW: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingTop: 20,
  },
  inputContaiPW: {
    fontSize: 16,
    height: 60,
    borderBottomWidth: 1.0,
    borderColor: "#000",
    color: "#000",
    fontWeight: 500,
    width: "100%",
  },
  iconEyeContainer: {
    position: "absolute",
    right: 10,
  },
  iconEye: {
    width: 25,
    height: 25,
  },
  btnContai: {
    borderRadius: 8,
    marginTop: 50,
    width: "100%",
    height: 60,
    padding: 20,
    backgroundColor: "#FF3333",
    justifyContent: "center",
  },
  textContai: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: 500,
    color: "#fff",
  },
  disabledBtn: {
    opacity: 0.6,
    backgroundColor: "#cccccc",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
