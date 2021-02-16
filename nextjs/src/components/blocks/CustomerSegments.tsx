import { useState } from "react";
import { Button } from "components/Button";
import {
  Box,
  Col,
  Expand,
  Flex,
  Padding,
  Position,
  Row,
  Heading,
  Paragraph,
  useTheme,
} from "granit/components";
import { Display } from "granit/components/Display";
import { VideoBackground } from "granit/components/VideoBackground";
import { WagtailImage } from "granit/components/WagtailImage";
import { PagePadding } from "components/PagePadding";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import css from "styled-jsx/css";

export interface SegmentItemProps {
  icon: {
    svg_file_url: string;
    description: string;
  };
  name: string;
  text: string;
  price: string;
  link: {
    text: string;
    to: string;
  };
  includeLinkOffset: boolean;
}

export interface CustomerSegmentsProps {
  background_image: any;
  background_video?: string;
  intro: {
    heading: string;
    text: string;
  };
  segments: Array<SegmentItemProps>;
  settings?: {
    link_id?: string;
  };
}

export function SegmentItem(props: SegmentItemProps) {
  const theme = useTheme();
  const transformOffset = props.includeLinkOffset ? 10 : 5;
  const rootClasses = ["root"];

  if (props.link) {
    rootClasses.push("offset");
  }

  return (
    <div className={rootClasses.join(" ")}>
      <Padding y={5} x={4}>
        <div className="wrap">
          <Expand>
            <Col cross="center" main="space-between">
              <div className="ctn">
                <Row main="center" cross="flex-end">
                  {props.icon ? (
                    <Padding bottom={0.33} right={1}>
                      <img
                        src={props.icon.svg_file_url}
                        alt={props.icon.description}
                      />
                    </Padding>
                  ) : null}
                  <Heading level="h4">{props.name}</Heading>
                </Row>
                <Paragraph kind="small" color="rgba(255, 255, 255, 0.5)">
                  {props.text}
                </Paragraph>
                {props.price ? (
                  <Heading level="h4">{props.price}</Heading>
                ) : null}
              </div>
              {props.link ? (
                <Link href={props.link.to} passHref>
                  <Button is="a">{props.link.text}</Button>
                </Link>
              ) : null}
            </Col>
          </Expand>
        </div>
      </Padding>
      <style jsx>{`
        .root {
          flex-grow: 1;
          flex-shrink: 1;
          display: flex;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.2);
          transform: translateY(${theme.measure.unit * transformOffset}px);
          transition: ${theme.animation.duration}s all ${theme.animation.curve};
        }

        .root:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }

        .offset:hover {
          transform: translateY(0);
        }

        .wrap {
          display: flex;
          max-width: 350px;
          height: 100%;
        }

        .ctn {
          margin-bottom: ${theme.measure.unit * 5}px;
        }
      `}</style>
    </div>
  );
}

export interface MobileSegmentItemProps extends SegmentItemProps {
  isOpen: boolean;
  onClick: () => void;
}

function MobileSegmentItem(props: MobileSegmentItemProps) {
  const theme = useTheme();
  const contentVariants: Variants = {
    hidden: {
      height: 0,
      opacity: 0,
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        ease: "easeOut",
      },
    },
  };
  const contentCss = css.resolve`
    div {
      overflow: hidden;
    }
  `;
  const headingCss = css.resolve`
    h5 {
      margin: 0;
    }
  `;

  return (
    <div className="root">
      <header onClick={props.onClick}>
        <Padding y={2}>
          <Row cross="center" main="center">
            {props.icon ? (
              <Padding right={1}>
                <img
                  src={props.icon.svg_file_url}
                  alt={props.icon.description}
                />
              </Padding>
            ) : null}
            <Heading className={headingCss.className} level="h5">
              {props.name}
            </Heading>
          </Row>
        </Padding>
      </header>
      <motion.div
        className={contentCss.className}
        initial="hidden"
        variants={contentVariants}
        animate={props.isOpen ? "visible" : "hidden"}
      >
        <Padding x={2} bottom={2}>
          <Paragraph kind="small" color="rgba(255, 255, 255, 0.5)">
            {props.text}
          </Paragraph>
          {props.price ? <Heading level="h4">{props.price}</Heading> : null}
          {props.link ? (
            <Padding y={2}>
              <Link href={props.link.to} passHref>
                <Button is="a">{props.link.text}</Button>
              </Link>
            </Padding>
          ) : null}
        </Padding>
      </motion.div>
      <hr />
      {headingCss.styles}
      {contentCss.styles}
      <style jsx>{`
        .root {
          transition: ${theme.animation.duration}s all ${theme.animation.curve};
        }
      `}</style>
      <style jsx>{`
        .root {
          background-color: black;
        }

        .root:active {
          background-color: #222;
        }

        hr {
          margin: 0;
          border: none;
          border-top: 1px solid #333;
        }
      `}</style>
    </div>
  );
}

export function CustomerSegments(props: CustomerSegmentsProps) {
  const [openMobileSegment, setOpenMobileSegment] = useState<null | number>(
    null
  );
  const anyHasLink = props.segments.filter((x) => !!x.link).length > 0;

  return (
    <section id={props.settings?.link_id}>
      <div className="root">
        <Position position="absolute" all={0}>
          <WagtailImage fill {...props.background_image} />
          {props.background_video ? (
            <VideoBackground url={props.background_video} />
          ) : null}
        </Position>
        <Display from="lg">
          <div className="rulers">
            {props.segments.map((_, i) => (
              <div key={i} />
            ))}
          </div>
        </Display>
        <Position position="relative" zIndex={2}>
          <Row main="center">
            <PagePadding>
              <Padding y={12}>
                <Box max width={440}>
                  <Heading level="h3">{props.intro.heading}</Heading>
                  <Paragraph kind="small">{props.intro.text}</Paragraph>
                </Box>
              </Padding>
            </PagePadding>
          </Row>
        </Position>
        <Display from="lg">
          <div>
            <Flex direction="column" lg={{ direction: "row" }}>
              {props.segments.map((props, i) => (
                <SegmentItem
                  {...props}
                  includeLinkOffset={anyHasLink}
                  key={i}
                />
              ))}
            </Flex>
          </div>
        </Display>
      </div>
      <Display until="lg">
        <div>
          {props.segments.map((props, i) => (
            <MobileSegmentItem
              key={i}
              isOpen={openMobileSegment === i}
              onClick={() => {
                setOpenMobileSegment(openMobileSegment === i ? null : i);
              }}
              {...props}
            />
          ))}
        </div>
      </Display>
      <style jsx>{`
        section {
          color: white;
          text-align: center;
          overflow: hidden;
        }

        .root {
          position: relative;
        }

        .rulers {
          position: absolute;
          display: flex;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .rulers div {
          flex-grow: 1;
          flex-shrink: 1;
          border-right: 1px solid rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </section>
  );
}
