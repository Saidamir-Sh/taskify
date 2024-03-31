/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { AccordionProvider, useAccordionContext } from "./AccordionContext";

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
            {children}
        </AccordionProvider>
    );
}

export const AccordionTitle: React.FC<AccordionTitleProps> = ({ index, children }) => {
    const { expandedIndex, setExpandedIndex } = useAccordionContext();
    const isExpanded = expandedIndex === index;

    return (
        <div
            role="tab"
            aria-expanded={isExpanded}
            aria-controls={`accordion-detail-${index}`}
            onClick={() => setExpandedIndex(isExpanded ? null : index)}
        >
            {children}
        </div>
    )
}

export const AccordionDetail: React.FC<AccordionDetailProps> = ({index, children}) => {
    const { expandedIndex } = useAccordionContext();
    const isExpanded = expandedIndex === index;

    return (
        <div
            id={`accordion-detail-${index}`}
            role="tabpanel"
            aria-hidden={!isExpanded}
            className={`${isExpanded ? 'block' : 'hidden'}`}
        >
            {children}
        </div>
    )
}