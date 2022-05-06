from django.views import generic

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


class IndexView(generic.TemplateView):
    template_name = 'common/index.html'

    url = "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2020-01-01/2020-12-31?apiKey=taIMgMrmnZ8SUZmdpq9_7ANRDxw3IPIx"

class RestViewSet(viewsets.ViewSet):
    @action(
        detail=False,
        methods=['get'],
        permission_classes=[AllowAny],
        url_path='rest-check',
    )
    def rest_check(self, request):


        return Response(
            {"result": "If you're seeing this, the REST APId is working!"},
            status=status.HTTP_200_OK,
        )