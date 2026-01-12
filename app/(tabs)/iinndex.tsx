import { Bot, Send, User } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

export default function ChatScreen() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Merhaba! Ben hukuk asistanın. Sana hangi konuda yardımcı olabilirim?", sender: "ai" },
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // 1. Kullanıcı mesajını ekle
    const userMsg: Message = { id: Date.now().toString(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // --- BURAYA İLERİDE RAG API BAĞLANTISI GELECEK ---
      // Şimdilik yapay bir bekleme ve cevap ekliyoruz
      setTimeout(() => {
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          text: `"${userMsg.text}" sorusuyla ilgili Anayasa veritabanında araştırma yapıyorum...`,
          sender: "ai",
        };
        setMessages((prev) => [...prev, aiMsg]);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View className={`flex-row mb-4 ${item.sender === "user" ? "justify-end" : "justify-start"}`}>
      {item.sender === "ai" && (
        <View className="w-8 h-8 rounded-full bg-blue-500 items-center justify-center mr-2">
          <Bot size={20} color="white" />
        </View>
      )}

      <View className={`p-4 rounded-2xl max-w-[80%] ${item.sender === "user" ? "bg-blue-600" : "bg-slate-800"}`}>
        <Text className="text-white text-base leading-6">{item.text}</Text>
      </View>

      {item.sender === "user" && (
        <View className="w-8 h-8 rounded-full bg-slate-700 items-center justify-center ml-2">
          <User size={20} color="white" />
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="flex-1 px-4 pt-2">
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="p-4 bg-slate-900 border-t border-slate-800"
      >
        <View className="flex-row items-center gap-2">
          <TextInput
            className="flex-1 bg-slate-800 text-white p-4 rounded-xl text-base"
            placeholder="Sorunuzu yazın..."
            placeholderTextColor="#94a3b8"
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity
            onPress={sendMessage}
            disabled={loading}
            className={`w-14 h-14 rounded-xl items-center justify-center ${loading ? "bg-slate-700" : "bg-blue-500"}`}
          >
            {loading ? <ActivityIndicator color="white" /> : <Send size={24} color="white" />}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
