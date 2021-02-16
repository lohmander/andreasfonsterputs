import React from "react";
import { Button as BaseButton, ButtonProps } from "granit/components/Button";
import { ArrowRight } from "phosphor-react";

export const Button = React.forwardRef((props: ButtonProps, ref) => {
  return (
    <BaseButton
      ref={ref}
      accessoryRight={<ArrowRight size={18} />}
      {...props}
    />
  );
});
