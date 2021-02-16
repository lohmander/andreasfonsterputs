import {
  Box,
  Padding,
  Position,
  Flex,
  Col,
  Grid,
  PageWidth,
  Heading,
  Paragraph,
  WagtailImage,
  useTheme,
} from "granit/components";
import { PagePadding } from "components/PagePadding";

export interface USPBlockProps {
  image: {
    image: any;
    caption?: string;
  };
  logo: any;
  text: string;
  usps: Array<{
    heading: string;
    text: string;
  }>;
}

export function USPBlock(props: USPBlockProps) {
  const theme = useTheme();

  return (
    <section>
      <PagePadding>
        <PageWidth>
          <Padding y={2} lg={{ y: 12 }}>
            <Flex direction="column" lg={{ direction: "row", cross: "center" }}>
              <figure>
                <WagtailImage {...props.image.image} />
                {props.image.caption ? (
                  <figcaption>{props.image.caption}</figcaption>
                ) : null}
              </figure>
              <Padding lg={{ left: 12 }}>
                <Col cross="flex-start">
                  <Padding y={4} lg={{ top: 0, bottom: 8 }}>
                    <Position position="relative">
                      <Box width={350} height={90}>
                        <WagtailImage fill {...props.logo} disableBlur />
                      </Box>
                    </Position>
                  </Padding>
                  <Paragraph kind="large">{props.text}</Paragraph>
                </Col>
              </Padding>
            </Flex>
            <Padding lg={{ top: 12 }}>
              <Grid
                columns={1}
                gutter={2}
                sm={{ columns: 2 }}
                md={{ columns: 2, gutter: 4 }}
                lg={{ columns: 4 }}
              >
                {props.usps.map((usp, i) => (
                  <div key={i}>
                    <Heading level="h4" color={theme.color.primary}>
                      {usp.heading}
                    </Heading>
                    <Paragraph>{usp.text}</Paragraph>
                  </div>
                ))}
              </Grid>
            </Padding>
          </Padding>
        </PageWidth>
      </PagePadding>
      <style jsx>{`
        section {
          background-color: black;
          color: white;
        }

        figure {
          padding: 0;
          margin: 0;
          min-width: 40%;

          flex-grow: 1;
          flex-shrink: 1;
        }
      `}</style>
    </section>
  );
}
