"use node";

import { v } from "convex/values";
import { Groq } from "groq-sdk";
import { action } from "./_generated/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

export const analyzeImageGroq = action({
  args: {
    imageBase64: v.string(),
  },

  handler: async (ctx, args) => {
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
            "description": "Sabah kahvaltılarının ve hatta hızlı akşam yemeklerinin vazgeçilmez tacı olan menemen, doğru teknikle yapıldığında bir ziyafete dönüşür. Domatesin o hafif ekşimsi suyu, biberin taze aromasıyla birleşip yumurtayla bağlandığında ortaya çıkan lezzet tek kelimeyle inanılmazdır. Suyuna taze ekmek banmalık bu tarif, sizi çocukluğunuza götürecek.",
            "ingredients": ["3 adet orta boy salkım domates", "2 adet ince yeşil biber", "2 adet büyük boy yumurta", "2 yemek kaşığı zeytinyağı veya tereyağı", "Yarım çay kaşığı tuz", "İsteğe bağlı bir tutam karabiber"],
            "instructions": [
              "Öncelikle hazırlık aşamasına geçiyoruz. Yeşil biberleri ortadan ikiye bölüp çekirdeklerini dikkatlice temizleyin ve çok ince yarım aylar şeklinde doğrayın.",
              "Domateslerin kabuklarını incecik soyun. Eğer daha sulu olmasını isterseniz kabuklu da bırakabilirsiniz. Ardından domatesleri çok küçük küpler halinde doğrayarak bir kenara alın.",
              "Geniş ve tercihen bakır veya döküm bir tavaya tereyağını (veya zeytinyağını) ekleyip orta ateşte eritin. Yağ kızdığında doğradığınız ince biberleri ekleyin ve biberlerin rengi hafif dönüp kokusu çıkana kadar yaklaşık 3-4 dakika sürekli karıştırarak soteleyin.",
              "Biberler yumuşadığında küp küp doğradığınız domatesleri tavaya ilave edin. Üzerine tuzu ekleyerek domateslerin suyunu daha hızlı salmasını sağlayın. Tavanın kapağını kapatın ve domatesler tamamen eriyip sos kıvamına gelene kadar, ara sıra karıştırarak yaklaşık 10 dakika pişirin.",
              "Domatesler iyice suyunu çekip kıvam aldığında, yumurtaları doğrudan tavanın içine kırın. İsteğe bağlı olarak sarılarını bütün bırakabilir veya tahta bir kaşıkla hafifçe dağıtarak domatesli sosla mükemmel bir şekilde harmanlanmasını sağlayabilirsiniz. Yumurtalar istediğiniz pişme derecesine geldiğinde ocaktan alın ve sıcak sıcak servis yapın."
            ],
            "calories": "350 kcal",
            "prepTime": "20 dk"
          }
          // Diğer 2 tarif buraya...
        ]
      }
    `;

    // base64
    const imageString = args.imageBase64.startsWith("data:image")
      ? args.imageBase64
      : `data:image/jpeg;base64,${args.imageBase64}`;

    try {
      console.log("Groq AI dusunuyor...");

      // 3. Groq'a İsteği Gönder
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              {
                type: "image_url",
                image_url: {
                  url: imageString,
                },
              },
            ],
          },
        ],
        // Görsel işleme destekleyen model:
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        // Modelin çıktısını JSON nesnesi olmaya zorluyoruz
        response_format: { type: "json_object" },
        temperature: 0.5, // Yaratıcılık oranı
        stop: null,
        top_p: 1,
        max_completion_tokens: 4096,
      });

      const text = chatCompletion.choices[0]?.message?.content || "";

      console.log("Groq Ham Cevap:", text.substring(0, 100) + "...");

      // 4. Temizlik (Regex) - response_format kullansak da garantiye alalım
      const cleanText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      // 5. JSON Parse ve Return
      return JSON.parse(cleanText);
    } catch (error) {
      console.error("Groq AI Hatası:", error);
      throw new Error(
        "Tarif oluşturulurken bir sorun oluştu. Lütfen tekrar dene.",
      );
    }
  },
});
