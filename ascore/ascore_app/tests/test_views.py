from django.test import TestCase, Client


class ViewsTests(TestCase):
    def setUp(self):
        super(ViewsTests, self).setUp()
        self.client = Client()

    def test_home(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
