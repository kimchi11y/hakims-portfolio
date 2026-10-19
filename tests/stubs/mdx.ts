import type { ComponentType } from "react";
import type { MDXProps } from "mdx/types";

/** Stand-in for `.mdx` imports. Unit tests assert on post metadata, never on
 *  rendered MDX, so compiling the real documents would only cost time. */
const MdxStub: ComponentType<MDXProps> = () => null;

export default MdxStub;
