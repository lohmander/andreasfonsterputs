import { PagePadding } from "components/PagePadding";
import {
  Center,
  LimitedBox,
  Padding,
  renderFontTheme,
  StyledHTML,
  useTheme,
} from "granit/components";

export interface RichTextBlockProps {
  value: string;
}

export function RichTextBlock(props: RichTextBlockProps) {
  const theme = useTheme();

  return (
    <PagePadding>
      <Padding y={8}>
        <Center>
          <LimitedBox maxWidth={80}>
            <StyledHTML html={props.value} />
          </LimitedBox>
        </Center>
      </Padding>
    </PagePadding>
  );
}
