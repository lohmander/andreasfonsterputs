import animateScrollTo from "animated-scroll-to";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "./Button";

export interface LinkButtonProps {
  text: string;
  to?: string;
  scroll_to?: string;
}

export function LinkButton(props: LinkButtonProps) {
  const router = useRouter();
  const { text, to, scroll_to } = props;

  if (!to && scroll_to) {
    return (
      <Button
        is="a"
        href={`#${scroll_to}`}
        onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById(scroll_to);

          if (el) {
            animateScrollTo(el);
            router.push(`${location.pathname}#${scroll_to}`);
          } else {
            console.warn("There's no block with link id", scroll_to);
          }
        }}
      >
        {text}
      </Button>
    );
  }

  let href = to;

  if (scroll_to) {
    href += `#${scroll_to}`;
  }

  return (
    <Link href={href} passHref>
      <Button is="a">{text}</Button>
    </Link>
  );
}
