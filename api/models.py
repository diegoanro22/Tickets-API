from django.db import models

# Create your models here.


class Incident (models.Model):
    class Status (models.TextChoices):
        PENDING = 'Pendiente', 'Pendiente'
        IN_PROGRESS = 'En proceso', 'En proceso'
        RESOLVED = 'Resuelto', 'Resuelto'

    incident_id = models.AutoField(primary_key=True)
    reporter = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(
        max_length=255, choices=Status, default=Status.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
