import deepmerge from "deepmerge";
import { Padding, PaddingProps } from "../granit/components";

export function PagePadding(props: PaddingProps) {
  const media = deepmerge({ md: { x: 4 } }, props.media ?? {});

  return <Padding x={2} {...props} media={media} />;
}
