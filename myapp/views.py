from django.shortcuts import render, HttpResponse
import os
import json
from django.http import JsonResponse, FileResponse
from django.conf import settings

# Create your views here.
def home(request):
    return render(request, "base.html")

def read_output(request):
    file_path = os.path.join(settings.BASE_DIR, 'myapp', 'output', 'embedding_df.json')
    try:
        with open(file_path, 'r') as json_file:
            data = json.load(json_file)
            # Return the data as JSON response
            return JsonResponse(data, safe=False)
    except FileNotFoundError:
        return JsonResponse({'error': 'File not found'}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    
def read_graph(request):
    file_path = os.path.join(settings.BASE_DIR, 'myapp', 'templates', 'graph.html')
    return FileResponse(open(file_path, 'rb'), content_type='text/html')

def read_selected(request):
    file_path = os.path.join(settings.BASE_DIR, 'myapp', 'settings', 'selected.json')
    try:
        with open(file_path, 'r') as json_file:
            data = json.load(json_file)
            # Return the data as JSON response
            return JsonResponse(data, safe=False)
    except FileNotFoundError:
        return JsonResponse({'error': 'File not found'}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

def update_selected(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            file_path = os.path.join(settings.BASE_DIR, 'myapp', 'settings', 'selected.json')
            with open(file_path, 'w') as json_file:
                json.dump(data, json_file, indent=4)
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})
