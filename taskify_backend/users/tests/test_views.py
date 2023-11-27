import pytest
from .factories import UserFactory
from rest_framework.test import APIClient
from ..models import User

register_request_data = {
    'username': 'jhon',
    'email': 'jhondoe@example.com',
    'first_name': 'Jhon',
    'last_name': 'Doe',
    'password': '}P-9(e,W'
}

@pytest.mark.django_db
class TestRegistration:
    def test_can_register(self):
        # TODO create a fixture for APIClient later...
        client = APIClient()
        response = client.post('/api/auth/register/', register_request_data)
        assert response.status_code == 201

    def test_username_unique(self):
        client = APIClient()
        response = client.post('/api/auth/register/', register_request_data)
        response = client.post('/api/auth/register/', register_request_data)
        assert 'with this username already exists' in response.data['username'][0]

    def test_email_unique(self):
        client = APIClient()
        response = client.post('/api/auth/register/', register_request_data)
        response = client.post('/api/auth/register/', register_request_data)
        assert 'with this email already exists' in response.data['email'][0]

    def test_username_required(self):
        del register_request_data['username']
        client = APIClient()
        response = client.post('/api/auth/register/', register_request_data)
        assert response.status_code == 400
        assert 'is required' in response.data['username'][0]

    def test_email_required(self):
        del register_request_data['email']
        client = APIClient()
        response = client.post('/api/auth/register/', register_request_data)
        assert response.status_code == 400
        assert 'is required' in response.data['email'][0]

    def test_username_max_length(self):
        register_request_data['username'] = 'johnnyjohnsondoe'
        client = APIClient()
        response = client.post('/api/auth/register', register_request_data)
        assert response.status_code == 400
        assert 'no more than 15 characters' in response.data['username'][0]

    def test_username_regex(self):
        register_request_data['username'] = 'joe@gmail.com'
        client = APIClient()
        response = client.post('/api/auth/register/', register_request_data)
        assert response.status_code == 400
        assert 'allowed in your username' in response.data['username'][0]

login_request_data = {
    'username': 'jhon',
    'password': '}P-9(e,W'
}

@pytest.mark.django_db
class TestLogin:
    def test_can_login(self):
        client = APIClient()
        user = UserFactory(username=login_request_data['username'])
        user.set_password(login_request_data['password'])
        user.save()
        response = client.post('/api/auth/login/', login_request_data)
        assert response.status_code == 200

    def test_can_login_with_email(self):
        client = APIClient()
        user = UserFactory(username=login_request_data['username'], email='jhondoe@example.com')
        user.set_password(login_request_data['password'])
        user.save()
        login_request_data['username'] = 'jhondoe@example.com'
        response = client.post('/api/auth/login/', login_request_data)
        assert response.status_code == 200

    def test_incorrect_password(self):
        client = APIClient()
        user = UserFactory(username=login_request_data['username'])
        user.set_password('sdfsdfwer')
        user.save()
        response = client.post('/api/auth/login/', login_request_data)
        assert response.status_code == 401
        assert 'No active account found' in response.data['detail']
