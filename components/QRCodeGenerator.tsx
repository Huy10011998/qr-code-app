import React from "react";
import { TouchableOpacity, Alert } from "react-native";
import QRCode from "react-native-qrcode-svg";

interface QRCodeGeneratorProps {
  url: string; // Xác định kiểu dữ liệu cho url là string
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ url }) => {
  const handlePress = () => {
    if (url) {
      Alert.alert("URL", url);
    } else {
      Alert.alert("Error", "URL is empty!");
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      {url ? <QRCode value={url} size={128} /> : null}
    </TouchableOpacity>
  );
};

export default QRCodeGenerator;