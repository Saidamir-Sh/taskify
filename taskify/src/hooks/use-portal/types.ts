import type { ReactPortal } from "react";

type RenderPortal = (children: React.ReactNode) => ReactPortal | null;

type UsePortal = () => {
    render: RenderPortal;
}

export type { UsePortal, RenderPortal };