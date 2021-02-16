import React from "react";
import {
  Col,
  LimitedBox,
  Padding,
  Paragraph,
  Flex,
  Row,
  Text,
  useTheme,
  Grid,
  Heading,
} from "granit/components";
import { PageWidth } from "granit/components/PageWidth";
import Link from "next/link";

export interface SiteSettings {
  favicon?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  medium?: string;
  linkedin?: string;
  page_description?: string;
  address?: string;
  email?: string;
  economy_email?: string;
  phone?: string;
}

export interface PageFooterProps {
  site?: any;
  settings?: SiteSettings;
}

export function PageFooter(props: PageFooterProps) {
  const theme = useTheme();

  return (
    <footer>
      <Padding x={2} y={4} lg={{ x: 4, y: 12 }}>
        <PageWidth>
          <img
            src="/logo_alt_white.svg"
            alt={props.site?.siteName}
            className="logo"
          />
          <Flex
            direction="column"
            md={{ direction: "row", main: "space-between" }}
          >
            <LimitedBox maxWidth={36}>
              <Col>
                <hr />
                <Paragraph kind="small" color="rgba(255, 255, 255, 0.5)">
                  {props.settings?.page_description}
                </Paragraph>
              </Col>
            </LimitedBox>
            <Padding y={2} md={{ y: 0, x: 4 }}>
              <nav>
                {props.site?.menu?.map((item) => (
                  <Padding key={item.id} y={0.5}>
                    <Link href={item.meta?.html_url}>
                      <a>
                        <Text size={18} weight="500">
                          {item.title}
                        </Text>
                      </a>
                    </Link>
                  </Padding>
                ))}
              </nav>
            </Padding>
            <div className="contact">
              <Heading level="h4">Kontakta oss</Heading>
              <Grid columns={1} gutter={4} sm={{ columns: 2 }}>
                <div>
                  <Heading level="h5">Adress</Heading>
                  <Paragraph kind="small">
                    <span className="prewrap">{props.settings?.address}</span>
                  </Paragraph>
                </div>
                <div>
                  <Heading level="h5">Telefon</Heading>
                  <Paragraph kind="small">
                    <a href={`tel:${props.settings?.phone}`}>
                      {props.settings?.phone}
                    </a>
                  </Paragraph>
                </div>
                <div>
                  <Heading level="h5">Email</Heading>
                  <Paragraph kind="small">
                    <a href={`mailto:${props.settings?.email}`}>
                      {props.settings?.email}
                    </a>
                  </Paragraph>
                </div>
                <div>
                  <Heading level="h5">Ekonomi</Heading>
                  <Paragraph kind="small">
                    <a href={`mailto:${props.settings?.economy_email}`}>
                      {props.settings?.economy_email}
                    </a>
                  </Paragraph>
                </div>
              </Grid>

              <Heading level="h4">Följ North Projects</Heading>
              <Padding top={1}>
                <Row cross="center">
                  {props.settings?.facebook ? (
                    <a href={props.settings?.facebook} target="_blank">
                      <img
                        src="/facebook.svg"
                        alt="Facebook"
                        className="social-logo"
                      />
                    </a>
                  ) : null}
                  {props.settings?.linkedin ? (
                    <a href={props.settings?.linkedin} target="_blank">
                      <img
                        src="/linkedin.svg"
                        alt="LinkedIn"
                        className="social-logo"
                      />
                    </a>
                  ) : null}
                  {props.settings?.instagram ? (
                    <a href={props.settings?.instagram} target="_blank">
                      <img
                        src="/instagram.svg"
                        alt="Instagram"
                        className="social-logo"
                      />
                    </a>
                  ) : null}
                </Row>
              </Padding>
            </div>
          </Flex>
        </PageWidth>
      </Padding>
      <div className="copyright">
        <Padding x={2} y={1}>
          <PageWidth></PageWidth>
        </Padding>
      </div>
      <style jsx>{`
        .logo {
          width: 80px;
          margin-bottom: 40px;
        }

        hr {
          margin: 0;
          width: 100%;
          border: none;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        footer {
          background-color: black;
          color: ${theme.color.primaryContrast};
        }

        nav a {
          display: block;
          white-space: nowrap;
        }

        .contact {
          color: rgba(255, 255, 255, 0.5);
          width: 600px;
          max-width: 100%;
        }

        .prewrap {
          white-space: pre-wrap;
        }

        .copyright {
          background-color: black;
        }

        .social-logo {
          height: 30px;
          margin-right: 20px;
        }
      `}</style>
    </footer>
  );
}
