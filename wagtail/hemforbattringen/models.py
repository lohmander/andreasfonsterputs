from django.db import models
from django.utils.translation import ugettext_lazy as _
from wagtail.core.fields import StreamField
from wagtail.admin.edit_handlers import TabbedInterface, ObjectList, FieldPanel
from wagtail.api import APIField
from wagtail.contrib.settings.models import register_setting
from wagtailgranit.models import AbstractStandardPage, AbstractSiteSettings
from hemforbattringen import blocks


class StandardPage(AbstractStandardPage):
    page_header_brightness = models.CharField(
        max_length=6,
        default="dark",
        choices=[
            ("dark", _("Dark")),
            ("bright", _("Bright")),
        ],
        verbose_name=_("Page header brightness"),
    )
    body = StreamField(
        [
            ("hero", blocks.HeroBlock()),
            ("image_and_content", blocks.ImageAndContent()),
            ("customer_segments", blocks.CustomerSegmentsBlock()),
            ("usp", blocks.USPBlock()),
            ("callout", blocks.CalloutBlock()),
            ("features", blocks.FeaturesBlock()),
            ("partners", blocks.PartnersBlock()),
            ("product_categories", blocks.ProductCategoriesBlock()),
            ("text_on_image", blocks.TextOnImageBlock()),
            ("form", blocks.FormBlock()),
            ("video", blocks.VideoBlock()),
            ("product_info", blocks.ProductInfoBlock()),
            (
                "richtext",
                blocks.RichTextBlock(features=["h2", "h3", "h4", "preamble", "link"]),
            ),
        ],
        verbose_name=_("Body"),
    )
    menu_section = models.CharField(
        max_length=5,
        default="right",
        choices=[
            ("right", _("Right")),
            ("left", _("Left")),
        ],
    )

    appearance_panels = [
        FieldPanel("page_header_brightness"),
        FieldPanel("menu_section"),
    ]

    edit_handler = TabbedInterface(
        [
            ObjectList(AbstractStandardPage.content_panels, heading=_("Content")),
            ObjectList(AbstractStandardPage.promote_panels, heading=_("Promote")),
            ObjectList(appearance_panels, heading=_("Appearance")),
            ObjectList(AbstractStandardPage.settings_panels, heading=_("Settings")),
        ]
    )

    api_fields = AbstractStandardPage.api_fields + [
        APIField("page_header_brightness"),
        APIField("menu_section"),
    ]


@register_setting
class SiteSettings(AbstractSiteSettings):
    page_description = models.TextField(null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    economy_email = models.EmailField(null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)

    footer_panels = [
        FieldPanel("page_description"),
        FieldPanel("address"),
        FieldPanel("email"),
        FieldPanel("economy_email"),
        FieldPanel("phone"),
    ]

    edit_handler = TabbedInterface(
        [
            ObjectList(AbstractSiteSettings.appearance_panels, heading=_("Apperance")),
            ObjectList(
                AbstractSiteSettings.social_media_panels, heading=_("Social media")
            ),
            ObjectList(
                AbstractSiteSettings.data_protection_panels,
                heading=_("Data protection"),
            ),
            ObjectList(footer_panels, heading=_("Page footer")),
        ]
    )