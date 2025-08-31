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
      viewBox="0 0 600 520"
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label="AK logo"
    >
      {/* Symmetric A (outer triangle with centered vertical cutout) */}
      <path
        d="M50 460 L200 60 L350 460 Z M170 200 H230 V460 H170 Z"
        fill={color}
        fillRule="evenodd"
      />

      {/* Symmetric K / chevron */}
      <polygon
        points="360,100 540,280 360,460 410,460 490,280 410,100"
        fill={color}
      />
    </svg>
  );
};

export default AkLogo;
