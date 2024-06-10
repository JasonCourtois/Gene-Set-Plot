from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('read-output/', views.read_output, name='read_output'),
    path('read-graph/', views.read_graph, name='read_graph'),
    path('read-selected/', views.read_selected, name='read_selected'),
    path('update-selected/', views.update_selected, name='update_selected')
]