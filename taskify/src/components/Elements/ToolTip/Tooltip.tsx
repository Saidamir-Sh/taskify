import clsx from "clsx";
import React, { useState } from "react";

const tooltipPosition = {
  top: "",
  right: "",
  bottom: "",
  left: ""
}

interface ToolTipProps {
  title: string;
  position?: keyof typeof tooltipPosition;
  children: React.ReactNode;
}

export const Tooltip: React.FC<ToolTipProps> = ({ title, position = "bottom", children }) => {
  const [showToolTip, setShowToolTip] = useState<boolean>(false);

  return (
    <>
      <div
        className="w-fit"
        onMouseEnter={() => setShowToolTip(true)}
        onMouseLeave={() => setShowToolTip(false)}
      >
        {children}
      </div>
      <div
        className={clsx("",
          tooltipPosition[position],
          showToolTip ? "block" : "hidden"
        )}
      >
        {title}
      </div>
    </>
  )
}