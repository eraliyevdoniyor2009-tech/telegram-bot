# Telegram Mini Ilova - O'zbek tilida

Bu Telegram Mini Ilova to'liq o'zbek tilida ishlab chiqilgan. Ilova mahsulotlarni ko'rish, savatchaga qo'shish va buyurtma berish imkoniyatini beradi.

## Xususiyatlar

✅ **To'liq o'zbek tilida** - barcha matn va elementlar
✅ **Mobil qurilmalar uchun optimallashtirilgan** - responsive dizayn
✅ **Telegram Web App API** - to'liq integratsiya
✅ **Savatcha funksiyasi** - mahsulotlarni boshqarish
✅ **Buyurtma berish formasi** - telefon, manzil, izoh
✅ **To'lov usullari** - naqd va karta orqali to'lov
✅ **Chek yuklash** - karta to'lovi uchun
✅ **Kategoriyalar** - mahsulotlarni filtrlash

## Fayllar

- `index.html` - Asosiy HTML fayl
- `app.js` - JavaScript mantiqi
- `README.md` - Ushbu fayl

## O'rnatish

### 1. Telegram Bot yaratish

1. [@BotFather](https://t.me/BotFather) ga murojaat qiling
2. `/newbot` buyrug'ini yuboring
3. Bot nomi va username kiriting
4. Bot tokenini saqlang

### 2. Web Server o'rnatish

Fayllarni web serverga yuklang:

- GitHub Pages
- Netlify
- Vercel
- Yoki boshqa hosting xizmati

### 3. Mini Ilovani bog'lash

1. [@BotFather](https://t.me/BotFather) ga qayting
2. `/mybots` ni tanlang
3. O'z botingizni tanlang
4. "Bot Settings" → "Menu Button" → "Configure menu button"
5. URL kiriting (masalan: `https://sizning-domen.com`)
6. "Set URL" tugmasini bosing

### 4. Bot kodini yozish (Python misol)

```python
from telegram import Update, WebAppInfo
from telegram.ext import Application, CommandHandler, MessageHandler, filters

async def start(update: Update, context):
    await update.message.reply_text(
        "Xush kelibsiz! Do'konimizdan buyurtma berish uchun quyidagi tugmani bosing:",
        reply_markup={
            "keyboard": [[{
                "text": "🛒 Do'kon ochish",
                "web_app": {"url": "https://sizning-domen.com"}
            }]],
            "resize_keyboard": True
        }
    )

async def handle_web_app_data(update: Update, context):
    # Web App dan kelgan ma'lumotlar
    data = update.message.web_app_data.data
    
    # Buyurtmani qayta ishlash
    await update.message.reply_text(
        f"✅ Buyurtmangiz qabul qilindi!\n\n"
        f"Tez orada siz bilan bog'lanamiz."
    )

def main():
    app = Application.builder().token("SIZNING_BOT_TOKEN").build()
    
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(
        filters.StatusUpdate.WEB_APP_DATA, 
        handle_web_app_data
    ))
    
    app.run_polling()

if __name__ == '__main__':
    main()
```

## Til sozlamalari

Ilova **faqat o'zbek tilida** ishlaydi. Barcha matnlar o'zbek tilida:

### Asosiy elementlar
- **Do'kon** - Ilova nomi
- **Barchasi** - Barcha mahsulotlar
- **Oziq-ovqat** - Oziq-ovqat kategoriyasi
- **Ichimliklar** - Ichimliklar kategoriyasi
- **Gazaklar** - Gazaklar kategoriyasi
- **Uy-ro'zg'or** - Uy-ro'zg'or tovarlari

### Tugmalar
- **Qo'shish** - Savatchaga qo'shish
- **Savatchaga o'tish** - Savatchani ochish
- **Orqaga** - Orqaga qaytish
- **Buyurtma berish** - Buyurtmani tasdiqlash

### Forma maydonlari
- **Telefon raqami** - Mijoz telefon raqami
- **Manzil** - Yetkazib berish manzili
- **Izoh** - Qo'shimcha izoh
- **To'lov usuli** - To'lov usulini tanlash
- **Naqd pul** - Naqd pul orqali to'lov
- **Karta orqali** - Bank kartasi orqali to'lov
- **Chek yuklash** - To'lov chekini yuklash

### Xabarlar
- **Savatcha bo'sh** - Savatcha bo'sh
- **Bepul** - Bepul yetkazib berish
- **Jami** - Jami summa
- **Buyurtma qabul qilindi!** - Muvaffaqiyatli xabar
- **Yangi buyurtma** - Yangi buyurtma boshlash

## Mahsulotlarni o'zgartirish

`app.js` faylidagi `products` massivini o'zgartiring:

```javascript
const products = [
    { 
        id: 1, 
        name: 'Mahsulot nomi', 
        price: 10000, 
        category: 'food', 
        emoji: '🍞' 
    },
    // Qo'shimcha mahsulotlar...
];
```

## Kategoriyalarni o'zgartirish

`app.js` faylidagi `categories` massivini o'zgartiring:

```javascript
const categories = [
    { id: 'all', name: 'Barchasi' },
    { id: 'yangi', name: 'Yangi kategoriya' },
    // Qo'shimcha kategoriyalar...
];
```

## Qo'llab-quvvatlash

Muammolar yuzaga kelsa:
1. Konsolni tekshiring (F12)
2. Telegram Web App versiyasini tekshiring
3. URL to'g'riligini tasdiqlang

## Litsenziya

MIT

## Muallif

Telegram Mini Ilova - O'zbek tilida
