import React from "react";
import css from "styled-jsx/css";
import { motion, Variants } from "framer-motion";
import { Expand, Col, useTheme, Padding } from "../granit/components";

export function FullScreenMenu(props) {
  const theme = useTheme();
  const variants: Variants = {
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * theme.animation.duration,
        duration: theme.animation.duration * 3,
      },
    }),
    hidden: {
      y: theme.measure.unit * -1,
      opacity: 0,
    },
  };
  const linkCss = css.resolve`
    div {
      font-size: 24px;
    }
  `;

  const children = React.Children.map(props.children, (child, i) => (
    <Padding y={1}>
      <motion.div
        custom={i}
        variants={variants}
        initial="hidden"
        animate="visible"
        className={linkCss.className}
      >
        {child}
      </motion.div>
    </Padding>
  ));

  return (
    <>
      <Expand>
        <Col cross="center" main="center">
          {children}
        </Col>
      </Expand>
      {linkCss.styles}
      <style jsx>{`
        :global(html, body) {
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
