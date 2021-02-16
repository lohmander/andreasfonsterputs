import { PagePadding } from "components/PagePadding";
import {
  Heading,
  Paragraph,
  Box,
  Padding,
  Position,
  PageWidth,
  VideoBackground,
  WagtailImage,
  useTheme,
} from "granit/components";

export interface TextOnImageProps {
  background_image: any;
  background_video?: string;
  heading: string;
  text: string;
}

export function TextOnImage(props: TextOnImageProps) {
  const theme = useTheme();
  return (
    <section>
      <WagtailImage fill {...props.background_image} />
      {props.background_video ? (
        <VideoBackground url={props.background_video} />
      ) : null}
      {props.heading || props.text ? (
        <Position position="absolute" bottom={0} x={0}>
          <PagePadding>
            <PageWidth>
              <Padding bottom={10}>
                <Box width={520}>
                  {props.heading ? (
                    <Heading level="h3">{props.heading}</Heading>
                  ) : null}
                  {props.text ? <Paragraph>{props.text}</Paragraph> : null}
                </Box>
              </Padding>
            </PageWidth>
          </PagePadding>
        </Position>
      ) : null}
      <style jsx>{`
        section {
          position: relative;
          height: ${theme.measure.unit * 100}px;
          color: white;
        }
      `}</style>
    </section>
  );
}
