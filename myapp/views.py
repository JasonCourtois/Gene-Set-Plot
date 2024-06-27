from django.shortcuts import render, HttpResponse
import os
import json
from django.http import JsonResponse, FileResponse
from django.conf import settings
from .gene_test import umap_reduction

# Create your views here.
def home(request):
    return render(request, "base.html")

def read_output(request, umapSettings):
    if request.method == "POST":
        data = json.loads(request.body)
        fileData = data.get("file")
        print(umapSettings)
        data = json.loads(umap_reduction(umapSettings, fileData))
        return JsonResponse(data, safe=False)
    else: 
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
def read_graph(request):
    file_path = os.path.join(settings.BASE_DIR, 'myapp', 'templates', 'graph.html')
    return FileResponse(open(file_path, 'rb'), content_type='text/html')
