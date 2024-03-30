/* eslint-disable react-hooks/rules-of-hooks */
import { TabsProvider, useTabsContext } from "./TabsContext";

interface TabTitlesProps {
    items: {
        id: number;
        title: string;
    }[];
}

interface TabContentProps {
    items: {
        id: number;
        content: React.ReactNode;
    }[]
}

interface TabsProps {
    children: React.ReactNode;
}

type TabsComposition = {
    Titles: (props: TabTitlesProps) => React.ReactNode;
    Content: (props: TabContentProps) => React.ReactNode;
}


type TabsWrapper = (props: TabsProps) => React.ReactNode;

export const Tabs: TabsWrapper & TabsComposition = ({ children }) => {
    return <TabsProvider>{children}</TabsProvider>
}

Tabs.Titles = ({ items }) => {
    const { currentIndex, setCurrentIndex } = useTabsContext();

    return (
        <div role="tablist" className="inline-flex gap-7 pb-3 w-full">
        {items.map(({id, title}, index) => (
            <button
                key={id}
                id={`tab-control-${id}`}
                role="tab"
                aria-controls={`tab-content-${id}`}
                aria-selected={currentIndex === index}
                onClick={() => {
                    setCurrentIndex(index)
                }}
                className={`focus:outline-none font-medium ${currentIndex === index ? 'text-sky-600' : 'text-gray-500'}`}

            >
                {title}
            </button>
        ))}
        </div>
    )
}

Tabs.Content = ({ items }) => {
    const { currentIndex } = useTabsContext();
    const { id, content } = items[currentIndex];

    return (
        <div
            key={id}
            id={`tab-content-${id}`}
            role="tabpanel"
            aria-labelledby={`tab-control-${id}`}
        >
            {content}
        </div>
    )
}