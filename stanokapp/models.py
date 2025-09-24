from django.db import models
from django.core.validators import RegexValidator
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

phone_regex = RegexValidator(
    regex=r'^\+998\d{9}$',
    message="Telefon raqami +998 bilan boshlanib, 9 ta raqamdan iborat bo'lishi kerak. Masalan: +998901234567"
)

class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yaratilgan vaqt")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Yangilangan vaqt")

    class Meta:
        abstract = True


class Category(TimeStampedModel):
    name = models.CharField(max_length=200, unique=True, verbose_name="Kategoriya nomi")
    slug = models.SlugField(max_length=220, unique=True, blank=True, verbose_name="Slug")

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = "Kategoriya"
        verbose_name_plural = "Kategoriyalar"


class Product(models.Model):
    name = models.CharField(max_length=200, db_index=True, verbose_name="Mahsulot nomi")
    slug = models.SlugField(max_length=220, unique=True, blank=True, verbose_name="Slug")
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        related_name='products',
        null=True,
        blank=True,
        verbose_name="Kategoriya"
    )
    image = models.ImageField(upload_to='images/products/', blank=True, null=True, verbose_name="Asosiy rasm")
    price = models.DecimalField(max_digits=12, decimal_places=2, verbose_name="Narx")
    description = models.TextField(blank=True, verbose_name="Tavsif")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yaratilgan vaqt")
    stock = models.PositiveIntegerField(default=0, verbose_name="Ombordagi soni")
    is_active = models.BooleanField(default=True, verbose_name="Faol")
    video_url = models.URLField(blank=True, null=True, help_text="YouTube video havolasini kiriting", verbose_name="Video havola")

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = "Mahsulot"
        verbose_name_plural = "Mahsulotlar"

    def get_absolute_url(self):
        return reverse('product_detail', args=[self.pk])


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='images',
        verbose_name="Mahsulot"
    )
    image = models.ImageField(upload_to='images/products/extra/', blank=True, null=True, verbose_name="Qo‘shimcha rasm")

    def __str__(self):
        return f"{self.product.name} - Qo‘shimcha rasm"

    class Meta:
        verbose_name = "Mahsulot rasmi"
        verbose_name_plural = "Mahsulot rasmlari"


class ProductFeature(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='features',
        verbose_name="Mahsulot"
    )
    value = models.CharField(max_length=255, verbose_name="Xususiyat")

    def __str__(self):
        return f"{self.product.name} - {self.value}"

    class Meta:
        verbose_name = "Mahsulot xususiyati"
        verbose_name_plural = "Mahsulot xususiyatlari"


class Branch(TimeStampedModel):
    name = models.CharField(max_length=200, verbose_name="Filial nomi")
    address = models.CharField(max_length=400, verbose_name="Manzil")
    phone = models.CharField(validators=[phone_regex], max_length=20, verbose_name="Telefon raqami")
    email = models.EmailField(blank=True, null=True, verbose_name="Email")
    is_active = models.BooleanField(default=True, verbose_name="Faol")

    class Meta:
        verbose_name = "Filial"
        verbose_name_plural = "Filiallar"

    def __str__(self):
        return f"{self.name} — {self.phone}"


class News(TimeStampedModel):
    title = models.CharField(max_length=200, verbose_name="Sarlavha")
    slug = models.SlugField(max_length=220, unique=True, blank=True, verbose_name="Slug")
    image = models.ImageField(upload_to='images/news/', blank=True, null=True, verbose_name="Rasm")
    description = models.TextField(verbose_name="Matn")
    views = models.PositiveIntegerField(default=0, verbose_name="Ko‘rishlar soni")
    is_published = models.BooleanField(default=True, verbose_name="E’lon qilinganmi")

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Yangilik"
        verbose_name_plural = "Yangiliklar"

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('news_detail', kwargs={'pk': self.pk})


class Message(TimeStampedModel):
    title = models.CharField(max_length=100, verbose_name="Sarlavha")
    message = models.TextField(verbose_name="Xabar matni")
    phone = models.CharField(validators=[phone_regex], max_length=20, blank=True, verbose_name="Telefon raqami")
    email = models.EmailField(blank=True, null=True, verbose_name="Email")
    is_read = models.BooleanField(default=False, verbose_name="O‘qilganmi")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Xabar"
        verbose_name_plural = "Xabarlar"


class Gallery(models.Model):
    image = models.ImageField(upload_to='images/gallery/', blank=True, null=True, verbose_name="Rasm")
    is_active = models.BooleanField(default=True, verbose_name="Faol")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yaratilgan vaqt")

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Galereya"
        verbose_name_plural = "Galereyalar"

    def __str__(self):
        return f"Rasm {self.pk}"


class GalleryImage(models.Model):
    gallery = models.ForeignKey(
        Gallery,
        on_delete=models.CASCADE,
        related_name="images",
        verbose_name="Galereya"
    )
    image = models.ImageField(upload_to="images/gallery/extra/", blank=True, null=True, verbose_name="Qo‘shimcha rasm")

    def __str__(self):
        return f"{self.gallery} uchun rasm"

    class Meta:
        verbose_name = "Galereya rasmi"
        verbose_name_plural = "Galereya rasmlari"
