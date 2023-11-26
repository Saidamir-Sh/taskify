import factory
from factory import Faker, Sequence
from ..models import User

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = Faker('user_name')