from django.test import TestCase
from django.test.client import Client

from django.urls import reverse
from django.http import HttpResponseRedirect

class TestAuthSystem(TestCase):

    def setUp(self) -> None:
        self.creds_employer = {
            "email": "sanych120@mail.ru",
            "username": "Danil",
            "address": "Esenina 15",
            "city": "Moscow",
            "password1": "somepassword123",
            "password2": "somepassword123"
            
            }
        
        self.client = Client()

    def test_register_employer(self):
        url = reverse("registration-employer")
        response = self.client.post(url, self.creds_employer)
        self.assertEqual(type(response), HttpResponseRedirect)
