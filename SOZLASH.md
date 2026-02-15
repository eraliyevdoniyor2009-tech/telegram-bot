# O'rnatish va Sozlash Bo'yicha Qo'llanma

## 1. Web Ilova O'rnatish

### GitHub Pages orqali (BEPUL)

1. GitHub akkauntiga kiring
2. Yangi repository yarating
3. Fayllarni yuklang:
   - `index.html`
   - `app.js`

4. Settings → Pages
5. Source: "Deploy from branch"
6. Branch: main, folder: / (root)
7. Save tugmasini bosing

Sizning URL: `https://username.github.io/repository-nomi/`

### Netlify orqali (BEPUL)

1. [Netlify](https://netlify.com) ga kiring
2. "Add new site" → "Deploy manually"
3. Fayllarni drag & drop qiling
4. Tayyor! URL oling

### Vercel orqali (BEPUL)

1. [Vercel](https://vercel.com) ga kiring
2. "Add New" → "Project"
3. Fayllarni import qiling
4. Deploy tugmasini bosing

## 2. Telegram Bot Yaratish

### BotFather orqali bot yaratish

1. Telegram'da [@BotFather](https://t.me/BotFather) ni oching
2. `/start` buyrug'ini yuboring
3. `/newbot` ni bosing
4. Bot nomini kiriting (masalan: "Mening Do'konim")
5. Username kiriting (masalan: "mening_dokonim_bot")
6. **TOKEN** ni saqlang! (Masalan: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Bot sozlamalari

1. [@BotFather](https://t.me/BotFather) ga qayting
2. `/mybots` ni bosing
3. O'z botingizni tanlang
4. "Bot Settings" ni tanlang
5. "Menu Button" ni tanlang
6. "Configure menu button" ni bosing
7. URL kiriting (Web App URL)
8. "Edit menu button text" dan "Do'konni ochish" yoki boshqa nom kiriting

## 3. Bot Kodini Sozlash

### Python o'rnatish (agar yo'q bo'lsa)

Windows uchun:
1. [Python.org](https://python.org) dan yuklab oling
2. O'rnatish vaqtida "Add to PATH" ni belgilang

Linux/Mac uchun:
```bash
# Python allaqachon o'rnatilgan bo'lishi mumkin
python3 --version
```

### Kutubxonalarni o'rnatish

```bash
pip install python-telegram-bot
```

yoki

```bash
pip install -r requirements.txt
```

### Bot konfiguratsiyasi

`bot.py` faylini oching va quyidagilarni o'zgartiring:

```python
# 1. Bot tokeningizni kiriting
BOT_TOKEN = "1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"

# 2. Web App URL ni kiriting
WEB_APP_URL = "https://sizning-domen.com"

# 3. Admin chat ID (ixtiyoriy)
ADMIN_CHAT_ID = 123456789  # Sizning Telegram ID
```

### Telegram ID topish

1. [@userinfobot](https://t.me/userinfobot) ga `/start` yuboring
2. Bot sizga ID ni yuboradi

## 4. Botni Ishga Tushirish

### Mahalliy kompyuterda test qilish

```bash
python bot.py
```

yoki

```bash
python3 bot.py
```

Console'da ko'rinishi kerak:
```
Bot ishga tushirildi!
```

### Serverda ishga tushirish

#### VPS/Cloud Server (DigitalOcean, AWS, etc.)

```bash
# Screen yoki tmux ishlatish
screen -S telegram_bot
python3 bot.py

# Detach qilish: Ctrl+A, keyin D
# Qaytish: screen -r telegram_bot
```

#### Heroku orqali (BEPUL)

1. Heroku akkauntini yarating
2. Heroku CLI o'rnating
3. Quyidagi fayllarni yarating:

**Procfile:**
```
worker: python bot.py
```

**runtime.txt:**
```
python-3.11.0
```

4. Deploy qiling:
```bash
heroku login
heroku create sizning-bot-nomi
git push heroku main
heroku ps:scale worker=1
```

## 5. Tekshirish

1. Telegram'da botingizni oching
2. `/start` buyrug'ini yuboring
3. "🛒 Do'konni ochish" tugmasini bosing
4. Web ilova ochilib, mahsulotlar ko'rinishi kerak
5. Mahsulot qo'shib ko'ring
6. Buyurtma bering
7. Bot sizga tasdiqlash xabarini yuborishi kerak

## 6. Muammolarni Hal Qilish

### Web ilova ochilmayapti
- ✅ URL to'g'ri ekanligini tekshiring
- ✅ HTTPS bo'lishi kerak (HTTP emas)
- ✅ Bot sozlamalarida URL to'g'ri kiritilganligini tekshiring

### Bot javob bermayapti
- ✅ Bot ishlab turishini tekshiring (console)
- ✅ Token to'g'riligini tasdiqlang
- ✅ Internet aloqani tekshiring

### Buyurtma kelmayapti
- ✅ Console'dagi xatolarni ko'ring
- ✅ Browser console'ni tekshiring (F12)
- ✅ `tg.sendData()` ishlab turishini tasdiqlang

### Web App bo'sh sahifa
- ✅ `index.html` va `app.js` bir joyda ekanligini tekshiring
- ✅ Browser cache'ni tozalang
- ✅ Telegram'ni qayta ishga tushiring

## 7. Mahsulotlarni Boshqarish

### Mahsulot qo'shish

`app.js` faylidagi `products` massiviga qo'shing:

```javascript
const products = [
    // Mavjud mahsulotlar...
    
    { 
        id: 13,                    // Yangi ID
        name: 'Yangi mahsulot',    // O'zbek tilida
        price: 20000,              // So'mda
        category: 'food',          // Kategoriya
        emoji: '🍕'                // Emoji
    }
];
```

### Kategoriya qo'shish

```javascript
const categories = [
    // Mavjud kategoriyalar...
    
    { 
        id: 'new_category',        // Ingliz harflarda
        name: 'Yangi Kategoriya'   // O'zbek tilida
    }
];
```

### Narxlarni o'zgartirish

```javascript
{ id: 1, name: 'Non', price: 3000 }  // ← Bu yerda
```

## 8. Qo'shimcha Sozlamalar

### Yetkazib berish narxi

`app.js` faylidagi `updateCheckoutSummary()` funksiyasida:

```javascript
const deliveryFee = 0;  // 0 = Bepul, yoki summa kiriting
```

### Minimal buyurtma summa

```javascript
function updateCart() {
    const totalPrice = ...;
    const minOrder = 50000;  // Minimal buyurtma
    
    if (totalPrice < minOrder) {
        cartButton.disabled = true;
        // Xabar ko'rsatish
    }
}
```

## 9. Xavfsizlik

⚠️ **MUHIM:**
- Bot tokenni hech qachon ommaviy qilmang
- GitHub'ga yuklashdan oldin tokenni o'chiring
- `.gitignore` faylida `bot.py` ni qo'shing yoki
- Environment variables ishlatish:

```python
import os
BOT_TOKEN = os.getenv('BOT_TOKEN')
```

## 10. Qo'llab-quvvatlash

### Foydali havolalar
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Telegram Web Apps](https://core.telegram.org/bots/webapps)
- [python-telegram-bot](https://docs.python-telegram-bot.org/)

### Savol-javob

**S: Nima uchun Web App ochilmayapti?**
J: HTTPS kerak, BotFather'da URL to'g'ri sozlanganligini tekshiring.

**S: Buyurtma kelmayapti?**
J: Bot ishlab turishi va `tg.sendData()` to'g'ri ishlashini tekshiring.

**S: Qanday qilib dizaynni o'zgartiraman?**
J: `index.html` faylidagi CSS qismini tahrirlang.

**S: Adminlarga xabar qanday yuboriladi?**
J: `bot.py` da `ADMIN_CHAT_ID` ni sozlang.

---

**Omad tilaymiz! 🎉**

Qo'shimcha yordam kerak bo'lsa, murojaat qiling.
