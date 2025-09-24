from django.urls import path
from .views import ProductDetailView,NewsDetailView
from . import views

urlpatterns=[
    path('',views.contact_form,name='index'),
    path('product/<int:pk>/',ProductDetailView.as_view(),name='product_detail'),
    # path('product/<slug:slug>/', ProductDetailView.as_view(), name='product_detail'),
    

    
    
    path('news/<int:pk>/',NewsDetailView.as_view(),name='news_detail'),
    # path('contact/', views.contact_form, name='submit_message'),
]
