import pytest
from django.core.exceptions import ValidationError
from .factories import UserFactory
from rest_framework.test import APIClient
from ..models import User

@pytest.mark.django_db
class TestUserModel:
    def test_model(self):
        user = UserFactory()
        assert user.pk == 1

    def test_username_case_insensitive(self):
        user = UserFactory(username='john')
        assert User.objects.get(username='JOhn') == user

    def test_email_case_insensitive(self):
        user = UserFactory(email='johndoe@example.com')
        assert User.objects.get(email='JohnDoe@example.com') == user

    def test_full_name(self):
        user = UserFactory(first_name='John', last_name='Doe')
        assert user.full_name == 'John Doe'

    def test_username_regex(self):
        user = User(
            username = 'johndoe@example.com',
            email = 'johndoe@example.com',
            first_name = 'John',
            last_name = 'Doe',
        )
        user.set_password('}P-9(e,W')
        with pytest.raises(ValidationError):
            if user.full_clean():
                user.save()
        assert User.objects.filter(user_name='johndoe@example.com').count() == 0

# TODO  - test user login