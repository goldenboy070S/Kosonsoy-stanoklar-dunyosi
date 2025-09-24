from django.contrib import admin
from .models import Category, Product, Branch, News, ProductImage, Message, Gallery, GalleryImage,ProductFeature  # Add others as needed



@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)  # Will show current language's name

class ProdutImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

class ProductFeatureInline(admin.TabularInline):
    model = ProductFeature
    extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'is_active')
    inlines = [ProdutImageInline,ProductFeatureInline]

@admin.register(Branch)
class BranchAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'is_active')

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_published')



@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_read', 'phone', 'email')



class GalleryImageInline(admin.TabularInline):  # yoki StackedInline
    model = GalleryImage
    extra = 1

@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ('image', 'is_active')
    inlines = [GalleryImageInline]