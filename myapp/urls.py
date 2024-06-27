from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('read-output/<str:umapSettings>', views.read_output, name='read_output'),
    path('read-graph/', views.read_graph, name='read_graph')
]