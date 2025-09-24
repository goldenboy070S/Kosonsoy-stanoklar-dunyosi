import asyncio
from aiogram import Bot
from django.conf import settings
from os import getenv
from dotenv import load_dotenv
load_dotenv()
async def send_telegram_message(message_id, title, phone, email, message_text):

    TELEGRAM_BOT_TOKEN = getenv("TELEGRAM_BOT_TOKEN")
    TELEGRAM_CHAT_ID = getenv("TELEGRAM_CHAT_ID")

    telegram_message = (
        f"📩 Yangi murojaat:\n"
        f"ID: {message_id}\n"
        f"Ism: {title}\n"
        f"Telefon: {phone}\n"
        f"Email: {email}\n"
        f"Xabar: {message_text}"
    )

    try:
        async with Bot(token=TELEGRAM_BOT_TOKEN) as bot:
            await bot.send_message(chat_id=TELEGRAM_CHAT_ID, text=telegram_message)
        return True
    except Exception as e:
        print(f"❌ Telegram xabar yuborishda xato: {e}")
        return False
