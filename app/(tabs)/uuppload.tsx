import * as DocumentPicker from "expo-document-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CheckCircle, FileText, FileUp, Upload } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { storage } from "../../firebaseConfig"; // Config dosyasını import et

export default function UploadScreen() {
  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [uploading, setUploading] = useState(false);
  const [lastUrl, setLastUrl] = useState<string | null>(null);

  // 1. Dosya Seçme Fonksiyonu
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      // Seçilen dosyayı state'e at
      setFile(result.assets[0]);
      setLastUrl(null); // Yeni dosya seçince eski linki temizle
    } catch (err) {
      console.log("Dosya seçilemedi:", err);
    }
  };

  // 2. Firebase Storage'a Yükleme Fonksiyonu
  const uploadToFirebase = async () => {
    if (!file) return;
    setUploading(true);

    try {
      // A. Dosyayı Blob formatına çevir (React Native için fetch trick)
      const response = await fetch(file.uri);
      const blob = await response.blob();

      // B. Yüklenecek yol ve isim belirle (Örn: pdfs/123123_anayasa.pdf)
      const fileName = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `pdfs/${fileName}`);

      // C. Yüklemeyi başlat
      const snapshot = await uploadBytes(storageRef, blob);
      console.log("Dosya yüklendi!", snapshot);

      // D. Yüklenen dosyanın URL'ini al
      const downloadURL = await getDownloadURL(storageRef);
      setLastUrl(downloadURL);

      Alert.alert("Başarılı", "PDF başarıyla yüklendi! ID: " + fileName);

      // E. Formu temizle
      setFile(null);
    } catch (error: any) {
      console.error("Yükleme Hatası:", error);
      Alert.alert("Hata", "Yükleme sırasında bir sorun oluştu.\n" + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-900 p-6">
      {/* Başlık Alanı */}
      <View className="items-center mt-10 mb-12">
        <View className="w-20 h-20 bg-slate-800 rounded-full items-center justify-center mb-4 border border-slate-700">
          <FileUp size={32} color="#3b82f6" />
        </View>
        <Text className="text-2xl font-bold text-white mb-2">Belge Yükle</Text>
        <Text className="text-slate-400 text-center px-4">
          Analiz edilecek PDF dokümanını seçin ve buluta yükleyin.
        </Text>
      </View>

      {/* Dosya Seçme Alanı (Dashed Border) */}
      <TouchableOpacity
        onPress={pickDocument}
        className="border-2 border-dashed border-slate-600 rounded-2xl h-48 items-center justify-center bg-slate-800/50 mb-8 active:bg-slate-800"
      >
        {file ? (
          <View className="items-center">
            <FileText size={48} color="#4ade80" />
            <Text className="text-white mt-4 font-semibold text-lg px-4 text-center" numberOfLines={1}>
              {file.name}
            </Text>
            <Text className="text-slate-400 text-sm mt-1">
              {file.size ? (file.size / 1024 / 1024).toFixed(2) : "0"} MB
            </Text>
          </View>
        ) : (
          <View className="items-center">
            <Upload size={32} color="#94a3b8" />
            <Text className="text-slate-300 font-medium mt-3">PDF Seçmek İçin Dokun</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Yükle Butonu */}
      {file && (
        <TouchableOpacity
          onPress={uploadToFirebase}
          disabled={uploading}
          className={`w-full py-4 rounded-xl flex-row items-center justify-center gap-3 shadow-lg ${
            uploading ? "bg-slate-700" : "bg-blue-500"
          }`}
        >
          {uploading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <CheckCircle size={24} color="white" />
              <Text className="text-white font-bold text-lg">Sisteme Yükle</Text>
            </>
          )}
        </TouchableOpacity>
      )}

      {/* Başarılı Yükleme Bilgisi */}
      {lastUrl && !file && (
        <View className="mt-6 p-4 bg-green-900/20 border border-green-800 rounded-xl">
          <Text className="text-green-400 text-center">✅ Son dosya başarıyla yüklendi.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
