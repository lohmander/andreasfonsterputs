import {
  Box,
  Col,
  Expand,
  Flex,
  Padding,
  Position,
  Heading,
  Paragraph,
  WagtailImage,
  useTheme,
} from "granit/components";
import Link from "next/link";

export interface ProductCategoriesProps {
  categories: Array<{
    link: string;
    background_image: any;
    icon: {
      description: string;
      svg_file_url: string;
    };
    heading: string;
    text: string;
  }>;
  settings: {
    link_id?: string;
  };
}

export function ProductCategories(props: ProductCategoriesProps) {
  const theme = useTheme();

  return (
    <section id={props.settings?.link_id}>
      <Flex direction="column" lg={{ direction: "row" }}>
        {props.categories.map((category, i) => (
          <Link key={i} href={category.link}>
            <a>
              <div className="background">
                <WagtailImage fill {...category.background_image} />
              </div>
              <Position position="absolute" all={0}>
                <Expand>
                  <Col cross="center" main="center">
                    <img
                      className="icon"
                      src={category.icon.svg_file_url}
                      alt={category.icon.description}
                    />
                    <Heading level="h3">{category.heading}</Heading>
                    <Padding x={4}>
                      <Box max width={350}>
                        <Paragraph kind="small">{category.text}</Paragraph>
                      </Box>
                    </Padding>
                  </Col>
                </Expand>
              </Position>
            </a>
          </Link>
        ))}
      </Flex>
      <style jsx>{`
        section {
          background-color: black;
          color: white;
        }

        a {
          display: block;
          position: relative;
          flex-grow: 1;
          height: 500px;
          text-align: center;
        }

        a :global(p) {
          opacity: 0.7;
        }

        .background {
          height: 100%;
          opacity: 0.5;
          filter: saturate(0.4);
          transition: ${theme.animation.duration}s all ${theme.animation.curve};
        }

        a:hover .background {
          opacity: 0.75;
          filter: saturate(1);
        }

        a:hover :global(p) {
          opacity: 1;
        }

        .icon {
          height: 50px;
        }
      `}</style>
    </section>
  );
}
