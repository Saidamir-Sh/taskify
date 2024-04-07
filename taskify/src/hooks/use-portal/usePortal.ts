import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import type { UsePortal } from "./types";

const usePortal: UsePortal = () => {
    const wrapper = useMemo(() => document.createElement("div"), []);

    useEffect(() => {
        document.body.appendChild(wrapper)
        return () => {
            document.body.removeChild(wrapper)
        }
    }, [])

    return {
        render: (children) => createPortal(children, wrapper),
    }
}

export { usePortal };