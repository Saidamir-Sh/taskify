import React, { useEffect, useRef } from "react";
import { AccordionProvider, useAccordionContext } from "./AccordionContext";
import { FaAngleDown } from "react-icons/fa";

interface AccordionProps {
    children: React.ReactNode;
}

interface AccordionTitleProps {
    index: number | null;
    children: React.ReactNode;
}

interface AccordionDetailProps {
    index: number | null;
    children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ children }) => {
    return (
        <AccordionProvider>
            <div className="w-full border border-gray-300 rounded-md">
                {children}
            </div>
        </AccordionProvider>
    );
}

export const AccordionTitle: React.FC<AccordionTitleProps> = ({ index, children }) => {
    const { expandedIndex, setExpandedIndex } = useAccordionContext();
    const isExpanded = expandedIndex === index;

    return (
        <div
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            aria-controls={`accordion-detail-${index}`}
            onClick={() => setExpandedIndex(isExpanded ? null : index)}
            className="cursor-pointer flex items-center justify-between px-4 py-3 border-b border-gray-300"
        >
            {children}
            <div className="transform transition-transform ease-in-out duration-300">
                <FaAngleDown className={`text-gray-600 ${isExpanded ? "rotate-180" : ""}`} />
            </div>
        </div>
    )
}

export const AccordionDetail: React.FC<AccordionDetailProps> = ({ index, children }) => {
    const { expandedIndex } = useAccordionContext();
    const isExpanded = expandedIndex === index;

    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.maxHeight = isExpanded ? `${contentRef.current.scrollHeight}px` : '0';
        }
    }, [isExpanded]);

    return (
        <div
            id={`accordion-detail-${index}`}
            role="tabpanel"
            aria-hidden={!isExpanded}
            className={`transition-all duration-300 ${isExpanded ? "block" : "hidden"}`}
        >
            <div ref={contentRef} className="px-4 py-3">
                {children}
            </div>
        </div>
    )
}
