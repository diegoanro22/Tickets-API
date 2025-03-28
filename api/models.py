from django.db import models

# Create your models here.

STATUS_CHOICES = (
    ('P', 'Pendiente'),
    ('E', 'En proceso'),
    ('R', 'Resuelto'),
)


class Incident (models.Model):
    incident_id = models.AutoField(primary_key=True)
    reporter = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(
        max_length=255, choices=STATUS_CHOICES, default="Pending")
    created_at = models.DateTimeField(auto_now_add=True)
