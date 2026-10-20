import type { DetailedHTMLProps, HTMLAttributes } from "react";

type AsciiArtProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  piece: string;
  size?: string | number;
  speed?: string | number;
  still?: string | number | boolean;
  bg?: string;
  look?: string;
  chars?: string;
  mono?: string | number | boolean;
  contrast?: string | number;
  "dot-size"?: string | number;
  density?: string | number;
  steps?: string | number;
  all?: string | number | boolean;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ascii-art": AsciiArtProps;
    }
  }
}
