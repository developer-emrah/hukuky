import { Ionicons } from '@expo/vector-icons';
import functions from '@react-native-firebase/functions';
import { useRef, useState } from 'react';
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


// Mesaj tipi tanımı
type Message = {
  id: string;
  answer: string;
  role: 'user' | 'assistant' | 'system';
};

export default function ChatScreen() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  


  const sendMessage = async () => {
    if (inputText.trim().length === 0) return;


    // firebase functions ile backend'e istek atılacak s
    // sadece bir string gönderilecek. (question)
    // cevap olarak (answer) dönecek.
    
    // Kullanıcı mesajını ekle ve inputu temizle
    const userMsg: Message = { id: Date.now().toString(), answer: inputText, role: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
// Fonksiyonunuzu bölgesiyle birlikte tanımlayın (Örn: europe-west1)

    const response = await functions()
      .httpsCallable('queryLegalAgent')({
        question: userMsg.answer, // Backend'de request.data.question olarak yakalayacaksınız
      });    
      console.log('Response data:', response.data);
      setMessages((prev) => [...prev, response.data as Message]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

 const renderItem = ({ item }: { item: Message }) => (
    <View className={`flex-row mb-4 ${item.role === "user" ? "justify-end" : "justify-start"}`}>
      {item.role === "assistant" && (
        <View className="w-8 h-8 rounded-full bg-blue-500 items-center justify-center mr-2">
          <Ionicons name="sparkles" size={20} color="white" />
        </View>
      )}

      <View className={`p-4 rounded-2xl max-w-[80%] ${item.role === "user" ? "bg-blue-600" : "bg-slate-800"}`}>
        <Text className="text-white text-base leading-6">{item.answer}</Text>
      </View>

      {item.role === "user" && (
        <View className="w-8 h-8 rounded-full bg-slate-700 items-center justify-center ml-2">
          <Ionicons name="person" size={20} color="white" />
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="flex-1 px-4 pt-2">
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          // İçerik boyutu her değiştiğinde (yeni mesaj geldiğinde) en alta kaydır
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          // Klavye açıldığında veya liste ilk yüklendiğinde de alta odaklanması için
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="p-4 bg-slate-900 border-t border-slate-800"
      >
        <View className="flex-row items-center gap-2">
          <TextInput
            className="flex-1 bg-slate-800 text-white p-4 rounded-xl text-base"
            placeholder="Hukuky'ye sorun..."
            placeholderTextColor="#94a3b8"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity
            onPress={sendMessage}
            disabled={loading}
            className={`w-14 h-14 rounded-xl items-center justify-center ${loading ? "bg-slate-700" : "bg-blue-500"}`}
          >
            {loading ? <ActivityIndicator color="white" /> : <Ionicons name="send" size={24} color="white" />}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}