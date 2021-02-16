import {
  Row,
  Padding,
  Paragraph,
  PageWidth,
  WagtailImage,
} from "granit/components";

export interface PartnersProps {
  partner_logos: any[];
  text: string;
}

export function Partners(props: PartnersProps) {
  return (
    <section>
      <Padding x={2} y={8}>
        <PageWidth>
          <Row main="center" cross="center">
            {props.partner_logos.map((logo, i) => (
              <div key={i}>
                <Padding x={2} bottom={2}>
                  <WagtailImage disableBlur {...logo} />
                </Padding>
              </div>
            ))}
          </Row>
          <Paragraph kind="small">{props.text}</Paragraph>
        </PageWidth>
      </Padding>
      <style jsx>{`
        section {
          text-align: center;
        }

        div {
          max-width: 300px;
        }
      `}</style>
    </section>
  );
}
