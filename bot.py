"""
Telegram Bot - O'zbek tilida
Mini Ilova uchun bot kodi
"""

from telegram import Update, WebAppInfo, KeyboardButton, ReplyKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
import json
import logging

# Logging sozlash
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Bot tokeningizni bu yerga kiriting
BOT_TOKEN = "SIZNING_BOT_TOKEN"

# Web App URL (hosting qilganingizdan keyin)
WEB_APP_URL = "https://sizning-domen.com"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """
    /start buyrug'i - foydalanuvchiga xush kelibsiz xabari
    """
    keyboard = [
        [KeyboardButton(
            text="🛒 Do'konni ochish",
            web_app=WebAppInfo(url=WEB_APP_URL)
        )],
        [KeyboardButton(text="ℹ️ Ma'lumot")]
    ]
    
    reply_markup = ReplyKeyboardMarkup(
        keyboard,
        resize_keyboard=True,
        one_time_keyboard=False
    )
    
    await update.message.reply_text(
        "🎉 Xush kelibsiz!\n\n"
        "Bizning do'konimizdan mahsulot buyurtma qilish uchun "
        "quyidagi tugmani bosing:",
        reply_markup=reply_markup
    )

async def handle_web_app_data(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """
    Web App dan kelgan ma'lumotlarni qayta ishlash
    """
    try:
        # Web App dan kelgan JSON ma'lumotlar
        data = json.loads(update.message.web_app_data.data)
        
        # Buyurtma ma'lumotlarini olish
        items = data.get('items', [])
        customer = data.get('customer', {})
        payment = data.get('payment', {})
        total = data.get('total', 0)
        
        # Buyurtmani formatlash
        order_text = "📦 Yangi buyurtma!\n\n"
        order_text += "🛍 Mahsulotlar:\n"
        
        for item in items:
            order_text += f"• {item['name']} - {item['quantity']} × {item['price']:,} so'm = {item['total']:,} so'm\n"
        
        order_text += f"\n💰 Jami: {total:,} so'm\n\n"
        order_text += "👤 Mijoz ma'lumotlari:\n"
        order_text += f"📱 Telefon: {customer.get('phone', 'N/A')}\n"
        order_text += f"📍 Manzil: {customer.get('address', 'N/A')}\n"
        
        if customer.get('notes'):
            order_text += f"📝 Izoh: {customer.get('notes')}\n"
        
        order_text += f"\n💳 To'lov usuli: "
        if payment.get('method') == 'cash':
            order_text += "Naqd pul"
        else:
            order_text += "Karta orqali"
            if payment.get('hasReceipt'):
                order_text += " (Chek yuklangan)"
        
        # Foydalanuvchiga tasdiqlash
        await update.message.reply_text(
            "✅ Buyurtmangiz qabul qilindi!\n\n"
            "Buyurtma raqami: #" + str(update.message.message_id) + "\n\n"
            "Tez orada operator siz bilan bog'lanadi.\n"
            "Rahmat! 🙏"
        )
        
        # Admin/operator ga xabar yuborish (ADMIN_CHAT_ID ni o'zgartiring)
        ADMIN_CHAT_ID = None  # Bu yerga admin chat ID kiriting
        
        if ADMIN_CHAT_ID:
            await context.bot.send_message(
                chat_id=ADMIN_CHAT_ID,
                text=order_text
            )
        
        # Ma'lumotlarni saqlash (bazaga yoki faylga)
        logger.info(f"Yangi buyurtma: {order_text}")
        
    except Exception as e:
        logger.error(f"Xatolik: {e}")
        await update.message.reply_text(
            "❌ Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring."
        )

async def info(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """
    Ma'lumot buyrug'i
    """
    info_text = (
        "ℹ️ Do'kon haqida ma'lumot\n\n"
        "🛒 Bizdan mahsulot buyurtma qilish juda oson!\n\n"
        "1️⃣ Do'konni ochish tugmasini bosing\n"
        "2️⃣ Kerakli mahsulotlarni tanlang\n"
        "3️⃣ Savatchaga o'ting\n"
        "4️⃣ Ma'lumotlaringizni kiriting\n"
        "5️⃣ Buyurtma bering\n\n"
        "💳 To'lov usullari:\n"
        "• Naqd pul (yetkazib berilganda)\n"
        "• Karta orqali (chek yuklash kerak)\n\n"
        "🚚 Yetkazib berish: Bepul\n\n"
        "📞 Aloqa: @sizning_username"
    )
    
    await update.message.reply_text(info_text)

async def handle_text(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """
    Oddiy matnli xabarlarni qayta ishlash
    """
    text = update.message.text
    
    if text == "ℹ️ Ma'lumot":
        await info(update, context)
    else:
        await update.message.reply_text(
            "Buyurtma berish uchun '🛒 Do'konni ochish' tugmasini bosing."
        )

def main():
    """
    Botni ishga tushirish
    """
    # Application yaratish
    application = Application.builder().token(BOT_TOKEN).build()
    
    # Handlerlar qo'shish
    application.add_handler(CommandHandler("start", start))
    application.add_handler(MessageHandler(
        filters.StatusUpdate.WEB_APP_DATA,
        handle_web_app_data
    ))
    application.add_handler(MessageHandler(
        filters.TEXT & ~filters.COMMAND,
        handle_text
    ))
    
    # Botni ishga tushirish
    logger.info("Bot ishga tushirildi!")
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == '__main__':
    main()
