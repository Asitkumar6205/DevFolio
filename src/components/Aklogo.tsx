import React from "react";

type Props = {
  width?: number | string;
  height?: number | string;
  className?: string;
  color?: string; // accepts any CSS color, default uses currentColor
};

const AkLogo: React.FC<Props> = ({
  width = "100%",
  height = "100%",
  className,
  color = "currentColor",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1271.2 941.1"
      width={width}
      height={height}
      className={className}
      fill={color}
    >
      <polygon points="193.6 928.5 0 928.5 704.7 99.8 704.7 928.5 547.5 928.5 543.8 520.6 193.6 928.5" />
      <polygon points="752.9 480.1 1083 0 1260.3 0 941.1 480.1 1271.2 941.1 1083 941.1 752.9 480.1" />
    </svg>
  );
};

export default AkLogo;
