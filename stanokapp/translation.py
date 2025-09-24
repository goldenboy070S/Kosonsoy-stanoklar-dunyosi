from modeltranslation.translator import register, TranslationOptions

from .models import Category, Product, Branch, News,ProductFeature

@register(Category)
class CategoryTranslationOptions(TranslationOptions):
    fields = ('name',)

@register(Product)
class ProductTranslationOptions(TranslationOptions):
    fields = ('name', 'description')

@register(Branch)
class BranchTranslationOptions(TranslationOptions):
    fields = ('name', 'address')

@register(News)
class NewsTranslationOptions(TranslationOptions):
    fields = ('title', 'description')

@register(ProductFeature)
class ProductFeatureTranslationOptions(TranslationOptions):
    fields = ('value',)