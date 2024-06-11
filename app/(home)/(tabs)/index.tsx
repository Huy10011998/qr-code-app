import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function QrCodeScreen() {
  const [isBgLoaded, setIsBgLoaded] = useState(false);

  useEffect(() => {
    const image = Image.resolveAssetSource(
      require("@/assets/images/bg-qrcode.png")
    );
    Image.getSize(
      image.uri,
      () => setIsBgLoaded(true),
      () => setIsBgLoaded(false)
    );
  }, []);

  if (!isBgLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF3333" />
      </View>
    );
  }

  return (
    <ParallaxScrollView
      containerBackground={
        <Image
          source={require("@/assets/images/bg-qrcode.png")}
          style={styles.bgQrCode}
        />
      }
    >
      <ThemedView style={styles.contaiQrcode}>
        <Image
          source={require("@/assets/images/qr-test.png")}
          style={styles.qrCodeIcon}
        />
      </ThemedView>
      <ThemedView style={styles.contaiContent}>
        <ThemedText type="subtitle">Thái Minh Thanh Quốc Huy</ThemedText>
        <ThemedText type="titleDepartment">
          Nhân Viên Công Nghệ Thông Tin
        </ThemedText>
        <ThemedView style={[styles.contaiContent, styles.rowContai]}>
          <Image
            source={require("@/assets/images/iconphone.png")}
            style={styles.iconPhone}
          />
          <ThemedText type="titlePhone">0834 601 321</ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={[styles.flexStart]}>
        <ThemedText type="subtitleFooter">
          Công ty cổ phần thực phẩm cholimex
        </ThemedText>
        <ThemedView
          style={[styles.contaiContent, styles.rowContai, styles.padTopLeft]}
        >
          <Image
            source={require("@/assets/images/iconlocation.png")}
            style={[styles.iconFooter, styles.flexStart]}
          />
          <ThemedText type="titleFooter">
            Đường số 7, KCN Vĩnh Lộc, Huyện Bình Chánh, TP.HCM, Việt Nam
          </ThemedText>
        </ThemedView>
        <ThemedView
          style={[styles.contaiContent, styles.rowContai, styles.padTopLeft]}
        >
          <Image
            source={require("@/assets/images/iconmail.png")}
            style={styles.iconFooter}
          />
          <ThemedText type="titleFooter">
            Email: huytmtq@cholimexfood.com.vn
          </ThemedText>
        </ThemedView>
        <ThemedView
          style={[styles.contaiContent, styles.rowContai, styles.padTopLeft]}
        >
          <Image
            source={require("@/assets/images/iconwebsite.png")}
            style={styles.iconFooter}
          />
          <ThemedText type="titleFooter">
            Website: www.cholimexfood.com.vn
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bgQrCode: {
    width: windowWidth,
    height: windowHeight,
  },
  contaiQrcode: {
    marginTop: 32,
    alignSelf: "flex-start",
  },
  contaiContent: {
    alignItems: "center",
    backgroundColor: "transparent",
  },
  qrCodeIcon: {
    width: 128,
    height: 128,
  },
  iconPhone: {
    marginTop: 15,
    width: 20,
    height: 20,
  },
  iconFooter: {
    width: 20,
    height: 20,
    alignItems: "center",
  },
  rowContai: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexStart: {
    alignSelf: "flex-start",
    backgroundColor: "transparent",
  },
  padTopLeft: {
    paddingTop: 5,
    paddingLeft: 10,
  },
});
