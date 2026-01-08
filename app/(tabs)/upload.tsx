import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UploadScreen() {
  const [uploading, setUploading] = useState(false);
  const [lastUploadedFile, setLastUploadedFile] = useState<string | null>(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // Sadece PDF
        copyToCacheDirectory: true,
      });

      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        uploadFileToServer(file);
      }
    } catch (err) {
      console.error("Dosya seçme hatası:", err);
    }
  };

  const uploadFileToServer = async (file: DocumentPicker.DocumentPickerAsset) => {
    setUploading(true);
    // --- RAG BACKEND UPLOAD İŞLEMİ BURADA OLACAK ---
    console.log("Dosya Backend'e gönderiliyor:", file.uri, file.name);
    
    // Backend'e FormData ile gönderim simülasyonu:
    // const formData = new FormData();
    // formData.append('document', { uri: file.uri, name: file.name, type: file.mimeType } as any);
    // await fetch('YOUR_BACKEND_URL/upload', { method: 'POST', body: formData });

    setTimeout(() => {
        // İşlem tamamlandı simülasyonu
        setUploading(false);
        setLastUploadedFile(file.name);
        alert("Döküman başarıyla işlendi ve bilgi tabanına eklendi.");
    }, 3000);
  };

  return (
    <SafeAreaView className="flex-1 bg-legal-bg">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
        
        <View className="items-center mb-8">
            <Text className="text-2xl font-bold text-legal-dark text-center">Bilgi Tabanını Genişlet</Text>
            <Text className="text-legal-secondary text-center mt-3 leading-6">
                Asistanın daha doğru cevap verebilmesi için ilgili kanun maddelerini içeren PDF dökümanlarını buraya yükleyin.
            </Text>
        </View>
        
        <TouchableOpacity
          onPress={pickDocument}
          disabled={uploading}
          className="bg-white border-2 border-dashed border-slate-300 rounded-3xl p-8 items-center justify-center shadow-sm active:bg-slate-50"
        >
          {uploading ? (
            <>
                 <ActivityIndicator size="large" color="#1E293B" />
                 <Text className="text-legal-primary font-semibold mt-4">Döküman İşleniyor...</Text>
                 <Text className="text-legal-secondary text-sm mt-2">Vektörleştirme biraz zaman alabilir.</Text>
            </>
          ) : (
            <>
                <View className="bg-slate-100 p-6 rounded-full mb-4">
                 <Ionicons name="document-text-outline" size={40} color="#1E293B" />
                </View>
                 <Text className="text-lg font-semibold text-legal-dark">Bir PDF Dökümanı Seç</Text>
                 <Text className="text-legal-secondary text-sm mt-2 text-center">
                    Maksimum dosya boyutu: 10MB
                 </Text>
            </>
          )}
        </TouchableOpacity>

        {lastUploadedFile && !uploading && (
             <View className="mt-8 bg-green-50 border border-green-200 p-4 rounded-xl flex-row items-center">
                 <Ionicons name="checkmark-circle" size={24} color="#059669" />
                 <View className="ml-3">
                     <Text className="text-green-800 font-semibold">Son Yükleme Başarılı</Text>
                     <Text className="text-green-700 text-sm" numberOfLines={1}>{lastUploadedFile}</Text>
                 </View>
             </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}