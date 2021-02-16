import { PagePadding } from "components/PagePadding";
import {
  Flex,
  Heading,
  LimitedBox,
  PageWidth,
  Row,
  Padding,
  StyledHTML,
  WagtailImage,
  Text,
  useTheme,
  SizedBox,
} from "granit/components";
import { useState } from "react";

interface ProductVariant {
  color: string;
  images: any[];
}

export interface ProductInfoProps {
  heading: string;
  text: string;
  variant_selection_text: string;
  product_variants: Array<ProductVariant>;
}

function VariantButton(
  props: ProductVariant & { onClick: () => void; selected: boolean }
) {
  return (
    <div
      style={{ backgroundColor: props.color }}
      onClick={props.onClick}
      className={props.selected ? "selected" : null}
    >
      <style jsx>{`
        div {
          width: 50px;
          height: 50px;
          box-shadow: inset 0 0 0 4px #f2f0ea;
          margin-right: 5px;
          cursor: pointer;
        }

        div:hover,
        .selected {
          border: 2px solid #333;
        }
      `}</style>
    </div>
  );
}

function VariantImages(props: ProductVariant) {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);

  if (props.images.length < 1) {
    return <div />;
  }

  return (
    <div className="root">
      <Padding y={2}>
        <Padding x={2}>
          <figure>
            <WagtailImage key={selected} {...props.images[selected]} alt="" />
          </figure>
        </Padding>
        <Padding top={2}>
          <Row main="center">
            {props.images.map((img, i) => (
              <div key={i} onClick={() => setSelected(i)} className="thumb">
                <Padding right={2}>
                  <LimitedBox maxWidth={10}>
                    <WagtailImage {...img} />
                  </LimitedBox>
                </Padding>
              </div>
            ))}
          </Row>
        </Padding>
      </Padding>
      <style jsx>{`
        .root {
          background-color: white;
        }

        figure {
          margin: 0;
        }

        .thumb {
          cursor: pointer;
          transition: ${theme.animation.duration}s opacity
            ${theme.animation.curve};
        }

        .thumb:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}

export function ProductInfo(props: ProductInfoProps) {
  const [selected, setSelected] = useState(0);

  return (
    <section>
      <PagePadding>
        <PageWidth>
          <Padding y={2} lg={{ y: 8 }}>
            <Flex direction="column" lg={{ direction: "row", cross: "center" }}>
              {props.product_variants?.length > 0 ? (
                <VariantImages
                  key={selected}
                  {...props.product_variants[selected]}
                />
              ) : null}
              <Padding lg={{ left: 8 }}>
                <SizedBox lg={{ width: 50 }} xl={{ width: 60 }}>
                  <Flex direction="column-reverse" lg={{ direction: "column" }}>
                    <div>
                      <Heading level="h3">{props.heading}</Heading>
                      <StyledHTML html={props.text} />
                    </div>
                    <div>
                      <Padding y={2}>
                        <Text>{props.variant_selection_text}</Text>
                      </Padding>
                      <Row>
                        {props.product_variants?.map((variant, i) => (
                          <VariantButton
                            key={i}
                            {...variant}
                            selected={selected === i}
                            onClick={() => setSelected(i)}
                          />
                        ))}
                      </Row>
                    </div>
                  </Flex>
                </SizedBox>
              </Padding>
            </Flex>
          </Padding>
        </PageWidth>
      </PagePadding>
      <style jsx>{`
        section {
          background-color: #f2f0ea;
        }
      `}</style>
    </section>
  );
}
