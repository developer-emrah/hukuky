import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mesaj tipi tanımı
type Message = {
  id: string;
  text: string;
  sender: 'user' | 'assistant' | 'system';
  isLoading?: boolean; // Bot cevap verirken yükleniyor durumu için
};

export default function ChatScreen() {
  const [inputText, setInputText] = useState('');

  const flatListRef = useRef<FlatList>(null);
  
  // Başlangıç için örnek mesajlar
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Merhaba. Ben yapay zeka destekli hukuk asistanınızım. Yüklediğiniz mevzuatlar dahilinde sorularınızı yanıtlayabilirim.',
      sender: 'assistant',
    },
  ]);

  async function query(data: any) {
	const response = await fetch(
		"https://router.huggingface.co/v1/chat/completions",
		{
			headers: {
				Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}



  const sendMessage = async () => {
    if (inputText.trim().length === 0) return;
      const userMsgId = Date.now().toString();
    const userMessage: Message = { id: userMsgId, text: inputText, sender: 'user' };
    
    // Kullanıcı mesajını ekle ve inputu temizle
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
  // Botun "yazıyor..." durumunu ekle
    const loadingMsgId = (Date.now() + 1).toString();

    setMessages(prev => [...prev, { id: loadingMsgId, text: 'Cevaplıyor...', sender: 'assistant', isLoading: true }]);    

    await query({ 
    messages: [
        {
            role: "user",
            content: inputText,
        },
    ],
    model: "meta-llama/Llama-3.1-8B-Instruct",
}).then((response) => {
     setMessages(prev => [...prev, { 
            id: response.id, 
            text: response.choices[0].message.content, // Backend'den gelen gerçek cevap buraya gelecek
            sender: response.choices[0].message.role,
            isLoading: false 
        }]);
});

 

  
    
  

    // --- RAG BACKEND BAĞLANTISI BURADA OLACAK ---
    // Şimdilik sahte bir bekleme ve cevap simüle edelim.
    setTimeout(() => {
        // Yükleniyor mesajını kaldır ve gerçek cevabı ekle
        setMessages(prev => prev.filter(msg => msg.id !== loadingMsgId));
        
        // RAG MANTIĞI: Eğer backend cevap bulamazsa döneceği standart mesaj:
        //const mockNotFoundResponse = "İlgili kanun maddesini şu anki veritabanımda bulamadım. Lütfen ilgili kanun dökümanını (PDF) 'Yükle' sekmesinden sisteme ekleyiniz.";
        
        // Örnek cevap:
       
    }, 2000);
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';
    return (
      <View className={`my-2 mx-4 flex-row ${isUser ? 'justify-end' : 'justify-start'}`}>
        {!isUser && (
             <View className="h-8 w-8 rounded-full bg-legal-dark items-center justify-center mr-2 self-end">
                 <Ionicons name="bulb-outline" size={16} color="#FFF" />
             </View>
        )}
        <View
          className={`rounded-2xl px-4 py-3 max-w-[80%] ${
            isUser ? 'bg-legal-dark rounded-br-none' : 'bg-white border border-slate-200 rounded-bl-none'
          } ${item.isLoading ? 'opacity-70' : 'opacity-100'}`}>
          <Text className={`text-[15px] leading-6 ${isUser ? 'text-white' : 'text-legal-primary'}`}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-orange-300">
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90} // Tab bar + header yüksekliği kadar
        className="flex-1"
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 20, backgroundColor:"pink" }}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        
        {/* Input Alanı */}
        <View className="flex-row items-center p-4 bg-legal-bg border-t border-slate-200 pb-8 bg-cyan-300" >
          <View className="bg-red-500 flex-1 h-4">
            <TextInput
              className="flex-1 text-legal-primary text-base h-12"
              placeholder="Hukuki sorunuzu yazın..."
              placeholderTextColor="#000"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
          </View>
          <TouchableOpacity
            onPress={sendMessage}
            disabled={inputText.trim().length === 0}
            className={`h-12 w-12 rounded-full items-center justify-center shadow-sm ${inputText.trim().length > 0 ? 'bg-legal-dark' : 'bg-slate-300'}`}>
            <Ionicons name="enter" size={24} color="purple" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}