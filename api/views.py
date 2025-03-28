from rest_framework import viewsets
from .serializer import IncidentSerializer
from .models import Incident

# Create your views here.
class IncidentViewSet(viewsets.ModelViewSet):
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer