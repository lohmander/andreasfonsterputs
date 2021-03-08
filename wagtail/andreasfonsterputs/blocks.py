from django.utils.translation import ugettext_lazy as _
from wagtail.core import blocks
from wagtailgranit.blocks import (
    EmbeddedLinkBlock,
    ImageChooserBlock,
    MediaChooserBlock,
    IllustrationChooserBlock,
    PageChooserBlock,
    NestedCollapsableStructBlock,
    SlugBlock,
)
from wagtailgranit.contrib.forms.blocks import FormChooserBlock


class EmbeddedLinkAndScrollBlock(EmbeddedLinkBlock):
    scroll_to = SlugBlock(
        required=False,
        help_text=_("Specify the Link id of the block you want to scroll to."),
    )


class SettingsBlock(NestedCollapsableStructBlock):
    link_id = SlugBlock(required=False)


class VideoBlock(blocks.StructBlock):
    video = MediaChooserBlock()
    auto_play = blocks.BooleanBlock(required=False)
    loop = blocks.BooleanBlock(required=False)
    controls = blocks.BooleanBlock(required=False)


class HeroBlock(blocks.StructBlock):
    background_image = ImageChooserBlock()
    background_video = MediaChooserBlock(required=False)
    overline = blocks.CharBlock()
    heading = blocks.CharBlock()
    link = EmbeddedLinkAndScrollBlock()


class CaptionedImage(blocks.StructBlock):
    image = ImageChooserBlock(required=False)
    caption = blocks.TextBlock(required=False)


class ImageAndContent(blocks.StructBlock):
    image_placement = blocks.ChoiceBlock(
        choices=[
            ("left", "Left"),
            ("right", "Right"),
        ]
    )
    image = CaptionedImage()
    heading = blocks.CharBlock()
    preamble = blocks.TextBlock()
    body = blocks.TextBlock()
    link = EmbeddedLinkBlock(required=False)


class CustomerSegmentsBlock(blocks.StructBlock):
    background_image = ImageChooserBlock()
    background_video = MediaChooserBlock(required=False)
    intro = blocks.StructBlock(
        [
            ("heading", blocks.CharBlock()),
            ("text", blocks.TextBlock()),
        ]
    )
    segments = blocks.ListBlock(
        blocks.StructBlock(
            [
                ("icon", IllustrationChooserBlock()),
                ("name", blocks.CharBlock()),
                ("text", blocks.TextBlock()),
                ("price", blocks.CharBlock(required=False)),
                ("link", EmbeddedLinkBlock()),
            ]
        ),
        max=3,
    )
    settings = SettingsBlock()


class USPBlock(blocks.StructBlock):
    image = CaptionedImage()
    logo = ImageChooserBlock()
    text = blocks.TextBlock()
    usps = blocks.ListBlock(
        blocks.StructBlock(
            [
                ("heading", blocks.CharBlock()),
                ("text", blocks.TextBlock()),
            ]
        ),
    )


class CalloutBlock(blocks.StructBlock):
    heading = blocks.CharBlock()
    text = blocks.TextBlock()
    link = EmbeddedLinkAndScrollBlock()


class FeaturesBlock(blocks.StructBlock):
    background_image = ImageChooserBlock()
    heading = blocks.CharBlock(required=False)
    text = blocks.TextBlock(required=False)
    features = blocks.ListBlock(
        blocks.StructBlock(
            [
                ("heading", blocks.CharBlock()),
                ("description", blocks.CharBlock()),
            ]
        )
    )


class PartnersBlock(blocks.StructBlock):
    partner_logos = blocks.ListBlock(ImageChooserBlock())
    text = blocks.TextBlock()


class ProductCategoriesBlock(blocks.StructBlock):
    categories = blocks.ListBlock(
        blocks.StructBlock(
            [
                ("link", PageChooserBlock(return_html_url=True)),
                ("background_image", ImageChooserBlock()),
                ("icon", IllustrationChooserBlock()),
                ("heading", blocks.CharBlock()),
                ("text", blocks.TextBlock()),
            ]
        )
    )
    settings = SettingsBlock()


class TextOnImageBlock(blocks.StructBlock):
    background_image = ImageChooserBlock()
    background_video = MediaChooserBlock(required=False)
    heading = blocks.CharBlock(required=False)
    text = blocks.CharBlock(required=False)


class FormBlock(blocks.StructBlock):
    image = CaptionedImage()
    secondary = blocks.StructBlock(
        [
            ("heading", blocks.CharBlock(required=False)),
            ("preamble", blocks.TextBlock(required=False)),
            ("text", blocks.TextBlock(required=False)),
        ]
    )
    heading = blocks.CharBlock()
    text = blocks.CharBlock()
    form = FormChooserBlock()
    settings = SettingsBlock()


class ProductInfoBlock(blocks.StructBlock):
    heading = blocks.CharBlock()
    text = blocks.RichTextBlock(features=["preamble", "link"])
    variant_selection_text = blocks.CharBlock()
    product_variants = blocks.ListBlock(
        blocks.StructBlock(
            [
                (
                    "color",
                    blocks.CharBlock(help_text=_("Specify a color HEX or rgb() color")),
                ),
                ("images", blocks.ListBlock(ImageChooserBlock())),
            ]
        )
    )


class RichTextBlock(blocks.RichTextBlock):
    def get_api_representation(self, value, context=None):
        return str(value)