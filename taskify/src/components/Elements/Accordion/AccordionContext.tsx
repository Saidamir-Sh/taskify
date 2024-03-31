import { Dispatch, SetStateAction, useState, createContext, useContext,  } from "react";

interface AccordionContextProps {
    expandedIndex: number | null;
    setExpandedIndex: Dispatch<SetStateAction<number | null>>;
}

interface AccordionProviderProps {
    children: React.ReactNode;
}

const initialContext: AccordionContextProps = {
    expandedIndex: null,
    setExpandedIndex: () => {},
}

const AccordionContext = createContext<AccordionContextProps>(initialContext);

export const AccordionProvider: React.FC<AccordionProviderProps> = ({ children }) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <AccordionContext.Provider value={{ expandedIndex, setExpandedIndex }}>
            {children}
        </AccordionContext.Provider>
    );
}

// custom hook to access and share state of accordion
export const useAccordionContext = (): AccordionContextProps => {
    const context = useContext(AccordionContext);

    if(!context) {
        throw new Error("useAccordionContext must be used within AccordionProvider")
    }
    return context
}