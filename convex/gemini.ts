"use node"; // BU ÇOK ÖNEMLİ! Bu satır Convex'e bu kodun Node.js ortamında çalışacağını söyler.

import { GoogleGenerativeAI } from "@google/generative-ai";
import { v } from "convex/values";
import { action } from "./_generated/server";

// API Key'i ortam değişkenlerinden çekiyoruz
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const analyzeImage = action({
  // Frontend'den beklediğimiz tek parametre: Base64 formatında resim string'i
  args: {
    imageBase64: v.string(),
  },

  handler: async (ctx, args) => {
    // 1. Model Seçimi
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
    });

    // 2. Prompt Mühendisliği (AI'ya ne yapacağını anlatıyoruz)
    // JSON yapısını çok net belirtiyoruz ki uygulama patlamasın.
    const prompt = `
      Sen deneyimli ve yaratıcı bir Türk mutfağı şefisin. 
      Görevin: Sana gönderilen fotoğraftaki yiyecek malzemelerini tespit etmek ve bu malzemelerle yapılabilecek en iyi 3 yemek tarifini oluşturmak. Görünmeyen malzemeler hakkında tahminde bulunma veya varsayımlarda bulunma. Bir malzeme konusunda emin değilseniz, onu dikkate alma
      
      Kurallar:
      1. Sadece fotoğrafta görünen veya evde bulunması muhtemel temel malzemeleri (tuz, yağ, baharat vb.) kullan.
      2. 3 farklı kategori belirle: "Pratik", "Çocuk Dostu" ve "Düşük Kalorili/Sağlıklı".
      3. Cevabın KESİNLİKLE sadece aşağıdaki JSON formatında olmalı. Başka hiçbir açıklama metni ekleme.
      4. Eğer tarifte birden fazla malzeme eksikse, o tarifi önerme.
      
      İstenen JSON Formatı:
      {
        "detectedIngredients": ["tespit edilen malzeme 1", "tespit edilen malzeme 2"],
        "recipes": [
          {
            "id": 1,
            "title": "Yemek Adı",
            "category": "Kategori (Örn: Pratik)",
            "description": "Yemeğin kısa ve iştah açıcı bir açıklaması.",
            "ingredients": ["1 adet soğan", "2 yemek kaşığı yağ"],
            "instructions": ["Soğanları doğrayın", "Yağı kızdırın"],
            "calories": "350 kcal",
            "prepTime": "20 dk"
          }
          // Diğer 2 tarif buraya...
        ]
      }
    `;

    // 3. Resmi Hazırlama
    const imagePart = {
      inlineData: {
        data: args.imageBase64,
        mimeType: "image/jpeg", // React Native genelde jpeg gönderir
      },
    };

    try {
      console.log("AI dusunuyor...");

      // 4. İsteği Gönder
      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      let text = response.text();

      console.log("AI Ham Cevap:", text.substring(0, 100) + "..."); // Logla kontrol edelim

      // 5. Temizlik (Regex)
      // AI bazen inatla ```json ... ``` şeklinde kod bloğu içinde gönderir. Bunu temizliyoruz.
      const cleanText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      // 6. JSON Parse ve Return
      return JSON.parse(cleanText);
    } catch (error) {
      console.error("AI Hatası:", error);
      // Frontend'e hatayı fırlatıyoruz ki kullanıcıya uyarı gösterebilelim
      throw new Error(
        "Tarif oluşturulurken bir sorun oluştu. Lütfen tekrar dene."
      );
    }
  },
});
