import { Button } from "components/Button";
import {
  Heading,
  Paragraph,
  Col,
  Flex,
  Padding,
  useTheme,
} from "granit/components";
import { PageWidth } from "granit/components/PageWidth";
import { WagtailForm } from "granit/components/WagtailForm";
import { WagtailImage } from "granit/components/WagtailImage";
import { PagePadding } from "components/PagePadding";

export interface FormProps {
  image: any;
  heading: string;
  text: string;
  form: any;
  secondary: {
    heading?: string;
    preamble?: string;
    text?: string;
  };
  settings?: {
    link_id?: string;
  };
}

function Secondary(props: FormProps["secondary"]) {
  return (
    <>
      {props.heading ? <Heading level="h3">{props.heading}</Heading> : null}
      {props.preamble ? (
        <Paragraph kind="large">{props.preamble}</Paragraph>
      ) : null}
      {props.text ? <Paragraph kind="small">{props.text}</Paragraph> : null}
    </>
  );
}

export function Form(props: FormProps) {
  const theme = useTheme();

  return (
    <section id={props.settings?.link_id}>
      <PagePadding>
        <Padding bottom={4} lg={{ y: 12 }}>
          <PageWidth>
            <Flex
              direction="column"
              lg={{
                direction: "row",
                cross: props.secondary?.heading ? "flex-start" : "center",
              }}
            >
              <div>
                <Padding lg={{ x: 8 }}>
                  <Col>
                    {props.image.image ? (
                      <WagtailImage {...props.image.image} />
                    ) : null}
                    <Secondary {...props.secondary} />
                  </Col>
                </Padding>
              </div>
              <div>
                <Padding lg={{ x: 8 }}>
                  <Col>
                    <Heading level="h3">{props.heading}</Heading>
                    <Paragraph>{props.text}</Paragraph>
                    <WagtailForm
                      form={props.form}
                      successMessage="Formuläret har skickats!"
                      submitButtonText="Skicka"
                      ButtonComponent={Button}
                    />
                  </Col>
                </Padding>
              </div>
            </Flex>
          </PageWidth>
        </Padding>
      </PagePadding>
      <style jsx>{`
        section {
          background-color: #0a0a0a;
          color: white;
        }

        section :global(input) {
          background-color: transparent;
          color: white;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.25);
          padding-left: 0;
        }

        section :global(input:focus) {
          outline: none;
          background-color: rgba(255, 255, 255, 0.1);
        }

        section :global(select) {
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
          border: none;
        }

        section :global(input),
        section :global(select) {
          height: 40px;
        }

        section :global(label) {
          font-size: 12px;
        }

        div {
          flex-grow: 1;
          flex-shrink: 1;
        }

        @media screen and (min-width: ${theme.measure.breakpoints.lg}px) {
          div {
            width: 50%;
          }
        }
      `}</style>
    </section>
  );
}
