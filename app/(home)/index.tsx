import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useNavigation } from "expo-router";
import axios from "axios";
import { useAuth } from "@/components/AuthProvider";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function LoginScreen() {
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);

  useEffect(() => {
    if (password.trim() !== "") {
      setIsLoginDisabled(false);
    } else {
      setIsLoginDisabled(true);
    }
  }, [password]);

  const handlePressIconEyeView = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const { setInfoUser, setToken } = useAuth();

  const handlePressLogin = async () => {
    if (isLoginDisabled) {
      return;
    }
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
        setInfoUser(userData);
        setToken(response.data.token); // Đặt token bằng cách sử dụng hàm setter từ context
        (navigation as any).navigate("(tabs)");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 404) {
          Alert.alert(
            "Đăng nhập thất bại",
            "Tài khoản hoặc mật khẩu không chính xác"
          );
        } else {
          Alert.alert(
            "Đăng nhập thất bại",
            "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau."
          );
        }
      } else {
        Alert.alert(
          "Đăng nhập thất bại",
          "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau."
        );
      }
    }
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
      <ThemedView style={[styles.contaiContent, { flex: 0.5 }]}>
        <Image
          source={require("@/assets/images/logo-cholimex.jpg")}
          style={styles.logoCholimex}
        />
      </ThemedView>
      <ThemedView style={[styles.contaiInput, { flex: 0.5 }]}>
        <TextInput
          style={styles.inputContai}
          placeholder={"Tài khoản"}
          placeholderTextColor="#fff"
          value={userId}
          onChangeText={setUserId}
        />
        <ThemedView style={styles.contaiInputPW}>
          <TextInput
            style={styles.inputContaiPW}
            secureTextEntry={!isPasswordVisible}
            placeholder={"Mật khẩu"}
            placeholderTextColor="#fff"
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
                  ? require("@/assets/images/iconEye-hide.png")
                  : require("@/assets/images/iconEye-view.png")
              }
              style={styles.iconEye}
            />
          </TouchableOpacity>
        </ThemedView>
        <TouchableOpacity
          style={[styles.btnContai, isLoginDisabled && styles.disabledBtn]}
          onPress={handlePressLogin}
        >
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
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "transparent",
    width: "100%",
  },
  contaiInput: {
    alignSelf: "flex-start",
    backgroundColor: "transparent",
    width: "100%",
    paddingTop: 10,
  },
  logoCholimex: {
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
  contaiInputPW: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  inputContaiPW: {
    fontSize: 18,
    height: 60,
    borderBottomWidth: 1.0,
    borderColor: "#fff",
    color: "#fff",
    fontWeight: "500",
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
    backgroundColor: "#fff",
  },
  textContai: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    color: "#FF3333",
  },
  disabledBtn: {
    opacity: 0.6, // Độ mờ
    backgroundColor: "#cccccc", // Màu nền
    // Bất kỳ kiểu CSS khác bạn muốn áp dụng khi nút bị vô hiệu hóa
  },
});
