import { Button } from "components/Button";
import {
  Heading,
  Paragraph,
  Text,
  Col,
  Box,
  useTheme,
  Padding,
  Flex,
  PageWidth,
  WagtailImage,
} from "granit/components";
import { PagePadding } from "components/PagePadding";
import Link from "next/link";

export interface ImageAndContentProps {
  image_placement: string;
  image: {
    image: any;
    caption: string;
  };
  heading: string;
  preamble: string;
  body: string;
  link: {
    text: string;
    to: string;
  };
}

export function ImageAndContent(props: ImageAndContentProps) {
  const theme = useTheme();
  const image = props.image.image;

  return (
    <section>
      <PagePadding top={2} bottom={4} lg={{ y: 10 }}>
        <PageWidth>
          <Flex
            direction="column"
            cross="center"
            media={{
              lg: {
                direction:
                  props.image_placement === "right" ? "row-reverse" : "row",
                cross: "center",
                main: "space-between",
              },
            }}
          >
            <Box width={800}>
              <figure>
                <div>
                  {props.image?.image ? (
                    <WagtailImage fill {...props.image.image} />
                  ) : null}
                </div>
                <figcaption>
                  <Box width={300}>
                    <Text color="white" size={14}>
                      {props.image.caption}
                    </Text>
                  </Box>
                </figcaption>
              </figure>
            </Box>
            <Box>
              <Padding media={{ lg: { x: 8 } }}>
                <Box width={520}>
                  <Col cross="flex-start">
                    <Heading level="h3">{props.heading}</Heading>
                    <Paragraph kind="large">{props.preamble}</Paragraph>
                    <Paragraph>{props.body}</Paragraph>
                    {props.link ? (
                      <div className="link">
                        <Link href={props.link.to} passHref>
                          <Button is="a">{props.link.text}</Button>
                        </Link>
                      </div>
                    ) : null}
                  </Col>
                </Box>
              </Padding>
            </Box>
          </Flex>
        </PageWidth>
      </PagePadding>
      <style jsx>{`
        figure {
          position: relative;
          margin: 0;
          padding: 0;
          width: 100%;
          padding-bottom: ${(image.height / image.width) * 100}%;
        }

        figure div {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        figcaption {
          position: absolute;
          bottom: ${theme.measure.unit * 2}px;
          left: ${theme.measure.unit * 2}px;
        }

        @media screen and (min-width: 768px) {
          figcaption {
            bottom: ${theme.measure.unit * 4}px;
            left: ${theme.measure.unit * 4}px;
          }
        }

        .link {
          margin-top: ${theme.measure.unit * 4}px;
        }
      `}</style>
    </section>
  );
}
