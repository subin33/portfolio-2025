import * as React from 'react';
import type { SVGProps } from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgSectionFlower = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 25 29"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <image
      href="/assets/icons/svgs/section-flower.svg"
      width="25"
      height="29"
      preserveAspectRatio="xMidYMid slice"
    />
  </svg>
);

export default SvgSectionFlower;
