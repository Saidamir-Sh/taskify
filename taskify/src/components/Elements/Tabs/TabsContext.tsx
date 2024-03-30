import { Dispatch, SetStateAction, useState, createContext, useContext } from "react";

interface TabsContextProps {
    currentIndex: number;
    setCurrentIndex: Dispatch<SetStateAction<number>>;
}

interface TabsProviderProps {
    children: React.ReactNode;
}

const initialContext: TabsContextProps = {
    currentIndex: 0,
    setCurrentIndex: () => {},
}

const TabsContext: React.Context<TabsContextProps> = createContext(initialContext);

export const TabsProvider: React.FC<TabsProviderProps> = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    return (
        <TabsContext.Provider value={{ currentIndex, setCurrentIndex }}>
            {children}
        </TabsContext.Provider>
    );
}

// custom hook to access and share tabs state
export const useTabsContext = (): TabsContextProps => {
    const context = useContext(TabsContext);

    if(context === undefined) {
        throw new Error("useTabsContext must be used within TabsProvider")
    }
    return context
}