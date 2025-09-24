from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import DetailView
from django.contrib import messages
from django.core.serializers import serialize
from .models import Product, News, Branch, Gallery, Category
from .forms import MessageContactForm
from os import getenv
from dotenv import load_dotenv
import asyncio
from aiogram import Bot
from asgiref.sync import async_to_sync

load_dotenv()

def get_common_context():
    return {
        "products": Product.objects.filter(is_active=True)[:6],
        "news_list": News.objects.filter(is_published=True)[:3],
        "branches": Branch.objects.filter(is_active=True)[:3],
        "gallery": Gallery.objects.filter(is_active=True)[:3],
        "categories": Category.objects.all(),
    }

def index(request):
    context = get_common_context()
    context["form"] = MessageContactForm()
    context["categories_json"] = serialize('json', context["categories"], fields=('slug', 'name'))
    context["products_json"] = serialize('json', context["products"], fields=('id', 'name', 'price', 'description', 'category'))

    if request.method == "POST":
        form = MessageContactForm(request.POST)
        if form.is_valid():
            saved_message = form.save()
            title = saved_message.title
            message_text = saved_message.message
            phone = saved_message.phone
            email = saved_message.email
            message_id = saved_message.id

            try:
                success = asyncio.run(
                    send_telegram_message(message_id, title, phone, email, message_text)
                )
                if success:
                    messages.success(request, "✅ Xabar muvaffaqiyatli yuborildi!")
                else:
                    messages.error(request, "❌ Telegramga yuborishda muammo bo‘ldi.")
            except Exception as e:
                print(f"Telegram xabar yuborishda xato: {e}")
                messages.error(request, "❌ Telegramga yuborishda muammo bo‘ldi.")

            context["form"] = MessageContactForm()
            return render(request, "index.html", context)
        else:
            messages.error(request, "❌ Forma ma'lumotlari xato!")
            context["form"] = form

    return render(request, "index.html", context)

class ProductDetailView(DetailView):
    model = Product
    template_name = "product_detail.html"
    context_object_name = "product"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        product = self.object

        context["features_list"] = product.features.all()
        return context




class NewsDetailView(DetailView):
    model = News
    template_name = "news_detail.html"
    context_object_name = "news"
    pk_url_kwarg = "pk"

    def get_object(self, queryset=None):
        obj = super().get_object(queryset)
        obj.views += 1
        obj.save(update_fields=["views"])
        return obj




async def send_telegram_message(message_id, title, phone, email, message_text):
    TELEGRAM_BOT_TOKEN = getenv('TELEGRAM_BOT_TOKEN')
    TELEGRAM_CHAT_ID = getenv('TELEGRAM_CHAT_ID')
    bot = Bot(token=TELEGRAM_BOT_TOKEN)

    telegram_message = (
        f"Yangi xabar:\n"
        f"{message_id}-sonli Yangi murojat kelib tushdi\n"
        f"Ism: {title}\n"
        f"Telefon: {phone}\n"
        f"Email: {email}\n"
        f"Xabar: {message_text}"
    )

    try:
        await bot.send_message(chat_id=TELEGRAM_CHAT_ID, text=telegram_message)
        await bot.session.close()
        return True
    except Exception as e:
        print(f"Telegram xabar yuborishda xato: {e}")
        return False

def contact_form(request):
    context = get_common_context()
    context["form"] = MessageContactForm()

    if request.method == "POST":
        form = MessageContactForm(request.POST)

        if form.is_valid():
            saved_message = form.save()
            # Forma ma'lumotlari
            title = saved_message.title
            message_text = saved_message.message
            phone = saved_message.phone
            email = saved_message.email
            message_id = saved_message.id
            print("Forma saqlandi:", title, phone, email, message_text)

            try:
                success = async_to_sync(send_telegram_message)(
                    message_id, title, phone, email, message_text
                )
                if success:
                    messages.success(request, "✅ Xabar muvaffaqiyatli yuborildi!")
                else:
                    messages.error(request, "❌ Telegramga yuborishda muammo bo‘ldi.")
            except Exception as e:
                print(f"Telegram xabar yuborishda xato: {e}")
                messages.error(request, "❌ Telegramga yuborishda muammo bo‘ldi.")

            context["form"] = MessageContactForm()  # Forma tozalash
            return render(request, "index.html", context)
        else:
            messages.error(request, "❌ Forma ma'lumotlari xato!")
            context["form"] = form

    return render(request, "index.html", context)