import clsx from "clsx";
import React, { useState } from "react";

const tooltipPosition = {
  top: "top-4/4",
  right: "right-5",
  bottom: "-bottom-7",
  left: "left-1/2"
} // TODO: fix this styling issue with positioning

interface ToolTipProps {
  title: string;
  position?: keyof typeof tooltipPosition;
  children: React.ReactNode;
}

export const Tooltip: React.FC<ToolTipProps> = ({ title, position = "bottom", children }) => {
  const [showToolTip, setShowToolTip] = useState<boolean>(false);

  return (
    <div className="relative">
      <div
      className="inline-block"
        onMouseEnter={() => setShowToolTip(true)}
        onMouseLeave={() => setShowToolTip(false)}
      >
        {children}
      </div>
      <div
        className={clsx("tooltip bg-gray-800 text-white p-1 text-sm rounded absolute z-10",
          tooltipPosition[position],
          showToolTip ? "visible" : "invisible"
        )}
      >
        {title}
      </div>
    </div>
  )
}