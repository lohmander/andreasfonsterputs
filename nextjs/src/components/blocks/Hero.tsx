import React from "react";
import Link from "next/link";
import css from "styled-jsx/css";
import {
  Text,
  Heading,
  Box,
  Row,
  Col,
  Padding,
  Position,
  WagtailImage,
  VideoBackground,
  LinearGradient,
  PageWidth,
  Button,
  useTheme,
} from "granit/components";
import { LinkButton, LinkButtonProps } from "components/LinkButton";

export interface HeroBlockProps {
  background_image: any;
  background_video?: string;
  overline: string;
  heading: string;
  link?: LinkButtonProps;
}

export function HeroBlock(props: HeroBlockProps) {
  const theme = useTheme();
  const headingCss = css.resolve`
    h2 {
      margin-top: ${theme.measure.unit * 2}px;
      margin-bottom: ${theme.measure.unit * 4}px;
    }
  `;

  return (
    <section>
      <div className="img">
        <WagtailImage fill {...props.background_image} />
      </div>
      {props.background_video ? (
        <VideoBackground url={props.background_video} />
      ) : null}
      <Position position="absolute" x={0} bottom={0}>
        <Box height={500}>
          <LinearGradient colors={["transparent", "rgba(0, 0, 0, 0.5)"]} />
        </Box>
      </Position>
      <Position position="absolute" x={0} bottom={0}>
        <Padding bottom={4} x={2} media={{ lg: { bottom: 12, x: 12 } }}>
          <PageWidth>
            <Box width={600}>
              <Col>
                <Text
                  color="white"
                  size={24}
                  weight="normal"
                  letterSpacing={-0.2}
                  lineHeight={32}
                >
                  {props.overline}
                </Text>
                <Heading
                  level="h2"
                  color="white"
                  className={headingCss.className}
                >
                  {props.heading}
                </Heading>
                {props.link ? (
                  <Row>
                    <LinkButton {...props.link} />
                  </Row>
                ) : null}
              </Col>
            </Box>
          </PageWidth>
        </Padding>
      </Position>
      {headingCss.styles}
      <style jsx>{`
        @keyframes slow-zoom {
          0% {
            transform: scale(1);
          }

          100% {
            transform: scale(1.1);
          }
        }

        section {
          position: relative;
          max-height: 90vh;
          height: 800px;
          overflow: hidden;
        }

        p {
          margin-bottom: ${theme.measure.unit * 4}px;
        }

        .img {
          position: relative;
          width: 100%;
          height: 100%;
          animation: slow-zoom 10s ease;
          animation-fill-mode: forwards;
        }
      `}</style>
    </section>
  );
}
