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
import * as LocalAuthentication from "expo-local-authentication"; // Import thư viện LocalAuthentication
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
  const { setUserData, setToken, token } = useAuth();

  // Check if the user can log in based on input
  useEffect(() => {
    setIsLoginDisabled(!(userId.trim() && password.trim()));
  }, [userId, password]);

  const handlePressIconEyeView = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    if (token) {
      (navigation as any).navigate("(tabs)");
    } else {
      (navigation as any).navigate("index");
    }
  }, [token, navigation]);

  // Handle login press
  const handlePressLogin = async () => {
    if (isLoading) return;

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
        setToken(response.data.token); // Store token securely
        (navigation as any).navigate("(tabs)");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const code = error.response?.status;
        if (code === 401 || code === 404) {
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
        Alert.alert("Đăng nhập thất bại", "Đã xảy ra lỗi không xác định.");
      }
      setPassword(""); // Clear the password field
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Face ID login
  const handleFaceIDLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      // Kiểm tra xem thiết bị có hỗ trợ Face ID không
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (!compatible) {
        Alert.alert("Lỗi", "Thiết bị của bạn không hỗ trợ Face ID.");
        setIsLoading(false);
        return;
      }

      // Yêu cầu xác thực khuôn mặt
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Đăng nhập bằng khuôn mặt",
        fallbackLabel: "Sử dụng mật khẩu",
      });

      if (result.success) {
        // Nếu xác thực thành công, bạn có thể tự động đăng nhập hoặc lấy dữ liệu
        const response = await axios.post(
          "https://hrcert.cholimexfood.com.vn/api/auth/login", // API đăng nhập
          {
            userId, // Nếu cần, có thể lấy `userId` đã được lưu trong state
            password: "", // Bạn có thể bỏ qua mật khẩu nếu xác thực thành công qua Face ID
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
          setToken(response.data.token); // Lưu token
          (navigation as any).navigate("(tabs)");
        }
      } else {
        Alert.alert(
          "Đăng nhập thất bại",
          "Xác thực khuôn mặt không thành công."
        );
      }
    } catch (error) {
      console.error("Lỗi khi xác thực Face ID:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi đăng nhập bằng Face ID.");
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
              accessibilityLabel="Cholimex Logo"
            />
          </ThemedView>
          <ThemedView style={[styles.contaiInput, { flex: 0.5 }]}>
            <TextInput
              style={styles.inputContai}
              placeholder="Tài khoản"
              placeholderTextColor="#000"
              value={userId}
              onChangeText={setUserId}
              accessibilityLabel="Username Input"
            />
            <ThemedView style={styles.contaiInputPW}>
              <TextInput
                style={styles.inputContaiPW}
                secureTextEntry={!isPasswordVisible}
                placeholder="Mật khẩu"
                placeholderTextColor="#000"
                value={password}
                onChangeText={setPassword}
                accessibilityLabel="Password Input"
              />
              <TouchableOpacity
                style={styles.iconEyeContainer}
                onPress={handlePressIconEyeView}
                accessibilityLabel="Toggle Password Visibility"
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
              accessibilityLabel="Login Button"
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#FF3333" />
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

            {/* Nút đăng nhập bằng Face ID */}
            <TouchableOpacity
              style={[styles.btnContai, { marginTop: 20 }]}
              onPress={handleFaceIDLogin}
              disabled={isLoading}
              accessibilityLabel="Login with Face ID"
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#FF3333" />
              ) : (
                <Text style={styles.textContai}>Đăng nhập bằng FaceID</Text>
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
    borderBottomWidth: 1,
    borderColor: "#000",
    color: "#000",
    fontWeight: "500",
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
    borderBottomWidth: 1,
    borderColor: "#000",
    color: "#000",
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
    backgroundColor: "#FF3333",
    justifyContent: "center",
  },
  textContai: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  disabledBtn: {
    opacity: 0.6,
    backgroundColor: "#cccccc",
  },
});
