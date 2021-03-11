import Head from "next/head";
import { PageFooter } from "components/PageFooter";
import { PageHeader } from "components/PageHeader";
import { HeroBlock } from "components/blocks/Hero";
import { ImageAndContent } from "components/blocks/ImageAndContent";
import { CustomerSegments } from "components/blocks/CustomerSegments";
import { USPBlock } from "components/blocks/USPBlock";
import { Callout } from "components/blocks/Callout";
import { Features } from "components/blocks/Features";
import { Partners } from "components/blocks/Partners";
import { ProductCategories } from "components/blocks/ProductCategories";
import { TextOnImage } from "components/blocks/TextOnImage";
import { Form } from "components/blocks/Form";
import { Essentials } from "granit/essentials";
import { Video } from "components/blocks/Video";
import { ProductInfo } from "components/blocks/ProductInfo";
import { RichTextBlock } from "components/blocks/RichText";

const blocks = {
  hero: HeroBlock,
  image_and_content: ImageAndContent,
  customer_segments: CustomerSegments,
  usp: USPBlock,
  callout: Callout,
  features: Features,
  partners: Partners,
  product_categories: ProductCategories,
  text_on_image: TextOnImage,
  form: Form,
  video: Video,
  product_info: ProductInfo,
  richtext: RichTextBlock,
};

export default function Page(props) {
  const { page, site } = props;
  const siteName = site.site_name;

  return (
    <>
      <Essentials.Head page={page} site={site} />
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/bdu2pvi.css" />
      </Head>
      <PageHeader
        title={siteName}
        menuPages={site.menu}
        brightness={page.page_header_brightness}
        logoBrightUrl={site.settings?.logo_bright}
        logoDarkUrl={site.settings?.logo_bright}
      />
      <Essentials.Body page={page} site={site} blocks={blocks} />
      <PageFooter site={site} settings={site?.settings} />
    </>
  );
}

export const getStaticProps = (context) =>
  Essentials.getStaticProps(context, ["GRANIT_GA_ID"]);

export async function getStaticPaths(context) {
  return {
    paths: [],
    fallback: "blocking",
  };
}
