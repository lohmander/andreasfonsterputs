import React, { useState } from "react";
import Link from "next/link";
import {
  Expand,
  Heading,
  Padding,
  Position,
  Row,
  Spacer,
  useTheme,
} from "granit/components";
import { LinearGradient } from "granit/components/LinearGradient";
import { PageWidth } from "granit/components/PageWidth";
import { getPathFromURL } from "granit/utils";
import { Display } from "../granit/components/Display";
import { Modal } from "../granit/components/Modal";
import { FullScreenMenu } from "./FullScreenMenu";
import { Turn as MenuBurger } from "hamburger-react";
import { groupBy } from "lodash";

export interface PageHeaderProps {
  title: string;
  brightness: "dark" | "bright";
  menuPages?: any[];
  logoBrightUrl?: any;
  logoDarkUrl?: any;
}

export function PageHeader(props: PageHeaderProps) {
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const color = menuOpen
    ? "white"
    : props.brightness === "bright"
    ? "white"
    : "black";

  const menuPages = groupBy(props.menuPages, "menu_section");
  const menuLink = (page) => (
    <Link
      key={page.id}
      href={getPathFromURL(page.meta.html_url)}
      locale={page.meta.locale}
    >
      <a
        className="item"
        hrefLang={page.meta.locale}
        onClick={() => setMenuOpen(false)}
      >
        {page.title}
        <style jsx>{`
          a {
            white-space: nowrap;
            color: ${color};
            font-weight: 500;
            font-family: ${theme.font.family};
          }
        `}</style>
      </a>
    </Link>
  );
  const rightLinks = menuPages?.right?.map(menuLink) ?? [];
  const leftLinks = menuPages?.left?.map(menuLink) ?? [];
  const logo =
    props.brightness === "bright"
      ? props.logoBrightUrl ?? props.logoDarkUrl
      : props.logoDarkUrl ?? props.logoBrightUrl;

  return (
    <>
      <Position position="absolute" zIndex={2} x={0} top={0}>
        <Position position="relative">
          <Position position="absolute" all={0}>
            <LinearGradient colors={["rgba(0, 0, 0, 0.25)", "transparent"]} />
          </Position>
          <Position position="relative" zIndex={3}>
            <Padding all={2} media={{ md: { all: 4 } }}>
              <PageWidth>
                <Row cross="center" main="space-between">
                  <Link href="/">
                    <a>
                      {logo ? (
                        <img
                          className="logo"
                          src={logo.svg_file_url}
                          alt={props.title}
                        />
                      ) : (
                        <Heading level="h4" color={color}>
                          {props.title}
                        </Heading>
                      )}
                    </a>
                  </Link>
                  <Expand>
                    <Display from="md" display="flex">
                      <div>
                        <Expand>
                          <nav className="desktop">
                            <Expand>
                              <Row>
                                {leftLinks.map((link) => (
                                  <Padding left={2} key={link.key}>
                                    {link}
                                  </Padding>
                                ))}
                                <Spacer />
                                {rightLinks.map((link) => (
                                  <Padding left={2} key={link.key}>
                                    {link}
                                  </Padding>
                                ))}
                              </Row>
                            </Expand>
                          </nav>
                        </Expand>
                      </div>
                    </Display>
                  </Expand>
                  <Display until="md">
                    <div>
                      <MenuBurger
                        color={menuOpen ? "white" : color}
                        direction="left"
                        toggled={menuOpen}
                        onToggle={() => setMenuOpen(!menuOpen)}
                      />
                    </div>
                  </Display>
                </Row>
              </PageWidth>
            </Padding>
          </Position>
        </Position>
      </Position>
      <Modal isOpen={menuOpen} onRequestClose={() => {}}>
        <FullScreenMenu>
          {leftLinks}
          {rightLinks}
        </FullScreenMenu>
      </Modal>

      <style jsx>{`
        .logo {
          height: 40px;
        }

        .item {
          white-space: nowrap;
          margin-left: ${theme.measure.unit * 2}px;
        }

        .fs-menu {
          font-size: 24px;
        }

        nav {
          display: flex;
        }

        .desktop {
          padding-left: 40px;
        }
      `}</style>
    </>
  );
}
