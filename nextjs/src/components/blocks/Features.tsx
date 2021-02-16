import css from "styled-jsx/css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Heading,
  Paragraph,
  Position,
  Grid,
  Padding,
  LimitedBox,
  Col,
  Text,
  TextAlign,
  SizedBox,
} from "granit/components";
import { LinearGradient } from "granit/components/LinearGradient";
import { PageWidth } from "granit/components/PageWidth";
import { WagtailImage } from "granit/components/WagtailImage";
import { PagePadding } from "components/PagePadding";

export interface FeaturesProps {
  background_image: any;
  heading?: string;
  text?: string;
  features: Array<{
    heading: string;
    description: string;
  }>;
}

const featureCss = css.resolve`
  h4 {
    margin-top: 0;
    color: inherit;
  }

  p {
    margin-bottom: 0;
  }

  div {
    display: flex;
    border-left: 2px solid white;
  }

  @media screen and (min-width: 768px) {
    div:nth-child(even) {
      justify-content: flex-end;
      text-align: right;
      border-right: 2px solid white;
      border-left: none;
    }
  }
`;

export function Features(props: FeaturesProps) {
  const { inView, ref } = useInView({ threshold: 0.5, triggerOnce: true });
  const variants = {
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 + 0.2, ease: "easeOut" },
    }),
    hidden: { opacity: 0, y: 30 },
  };

  return (
    <section ref={ref}>
      <Position position="relative" md={{ position: "static" }}>
        <SizedBox height={30} md={{ height: 0 }} />
        <Position position="absolute" all={0}>
          <WagtailImage fill {...props.background_image} />
        </Position>
        <Position position="absolute" all={0}>
          <LinearGradient
            angle={90}
            colors={["rgba(0, 0, 0, 0.4)", "transparent", "rgba(0, 0, 0, 0.4)"]}
          />
        </Position>
      </Position>
      <Position position="relative">
        <PagePadding>
          <PageWidth>
            <Padding y={2}>
              <Col cross="center">
                {props.heading ? (
                  <Heading level="h3">{props.heading}</Heading>
                ) : null}
                {props.text ? (
                  <LimitedBox maxWidth={60}>
                    <TextAlign align="center">
                      <Paragraph>{props.text}</Paragraph>
                    </TextAlign>
                  </LimitedBox>
                ) : null}
              </Col>
              <Padding top={2}>
                <Grid
                  columns={2}
                  gutter={1}
                  rowGutter={2}
                  md={{ columns: 2, rowGutter: 6 }}
                >
                  {props.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                      variants={variants}
                      transition={{ ease: "easeOut" }}
                      className={featureCss.className}
                    >
                      <Padding md={{ x: 2 }}>
                        <LimitedBox maxWidth={30}>
                          <Heading level="h4" className={featureCss.className}>
                            {feature.heading}
                          </Heading>
                          <Paragraph
                            size={12}
                            lineHeight={16}
                            md={{ size: 16, lineHeight: 20 }}
                            className={featureCss.className}
                          >
                            {feature.description}
                          </Paragraph>
                        </LimitedBox>
                      </Padding>
                    </motion.div>
                  ))}
                </Grid>
              </Padding>
            </Padding>
          </PageWidth>
        </PagePadding>
      </Position>
      {featureCss.styles}
      <style jsx>{`
        section {
          position: relative;
          min-height: 800px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: black;
        }
        @media screen and (min-width: 768px) {
          section {
            color: white;
          }
        }
      `}</style>
    </section>
  );
}
