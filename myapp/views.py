from django.shortcuts import render, HttpResponse
import os
import json
from django.http import JsonResponse, FileResponse
from django.conf import settings
from .gene_test import umap_reduction

# Create your views here.
def home(request):
    return render(request, "base.html")

def read_output_config(request, umapSettings):
    print(umapSettings)
    data = json.loads(umap_reduction(umapSettings))
    return JsonResponse(data, safe=False)

def read_output(request):
    data = json.loads(umap_reduction(""))
    return JsonResponse(data, safe=False)
    
def read_graph(request):
    file_path = os.path.join(settings.BASE_DIR, 'myapp', 'templates', 'graph.html')
    return FileResponse(open(file_path, 'rb'), content_type='text/html')
