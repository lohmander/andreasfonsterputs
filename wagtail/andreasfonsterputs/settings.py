from django.utils.translation import ugettext_lazy as _
from wagtailgranit.settings import init_settings

# Initialize all default wagtail granit settings
globals().update(init_settings(__file__))


WSGI_APPLICATION = "andreasfonsterputs.wsgi.application"
INSTALLED_APPS += ["andreasfonsterputs"]  # noqa


LANGUAGE_CODE = "sv-se"
TIME_ZONE = "CET"
WAGTAIL_CONTENT_LANGUAGES = LANGUAGES = [
    ("sv", _("Swedish")),
]

# Wagtail Granit

SITE_SETTINGS_MODEL = "andreasfonsterputs.models.SiteSettings"