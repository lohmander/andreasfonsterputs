import { Button } from "components/Button";
import {
  Heading,
  Paragraph,
  Box,
  Padding,
  Row,
  useTheme,
} from "granit/components";
import { Display } from "granit/components/Display";
import { PageWidth } from "granit/components/PageWidth";
import { PagePadding } from "components/PagePadding";
import Link from "next/link";
import { LinkButton } from "components/LinkButton";

export interface CalloutProps {
  heading: string;
  text: string;
  link: {
    text: string;
    to: string;
    scroll_to: string;
  };
}

export function Callout(props: CalloutProps) {
  const theme = useTheme();
  const linkButton = props.link ? (
    <div>
      <LinkButton {...props.link} />
    </div>
  ) : null;

  return (
    <section>
      <PageWidth>
        <PagePadding>
          <Padding bottom={4} md={{ x: 4, y: 6 }}>
            <Row main="space-between" cross="flex-end">
              <Box width={440}>
                <Heading level="h3">{props.heading}</Heading>
              </Box>
              <Display from="md">{linkButton}</Display>
            </Row>
            <Box width={440}>
              <Paragraph kind="small">{props.text}</Paragraph>
            </Box>
            <Display until="md">{linkButton}</Display>
          </Padding>
        </PagePadding>
      </PageWidth>
      <style jsx>{`
        section {
          background-color: ${theme.color.secondary};
          color: ${theme.color.secondaryContrast};
        }
      `}</style>
    </section>
  );
}
