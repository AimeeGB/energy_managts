from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse
from django.urls import resolve
from .utils import decode_token
from .models import Cliente

class TokenAuthenticationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        current_url_name = resolve(request.path_info).url_name
        exempt_views = ['admin/register', 'admin/login']
        
        if current_url_name in exempt_views:
            return None
        
        auth_header = request.headers.get('Authorization')
        if auth_header:
            token = auth_header.split(' ')[1]
            user_id = decode_token(token)
            if user_id:
                try:
                    request.user = Cliente.objects.get(id=user_id)
                except Cliente.DoesNotExist:
                    return JsonResponse({'message': 'Usuario no encontrado'}, status=401)
            else:
                return JsonResponse({'message': 'Token inválido'}, status=401)
        else:
            return JsonResponse({'message': 'Encabezado de autorización no proporcionado'}, status=401)
