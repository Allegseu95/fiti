import { useState, useRef } from 'react';
import { TabItem, Tabs, Button, type TabsRef } from 'flowbite-react';

// icons
import { MdSettings, MdArrowBack, MdArrowForward } from 'react-icons/md';
import { SiGoogleforms } from 'react-icons/si';

// components
import { ChartTypes } from './ChartTypes';
import { Form } from './Form';

export const ConfigChart = () => {
  const tabsRef = useRef<TabsRef>(null);

  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    { title: 'Chart Type', icon: MdSettings, content: <ChartTypes /> },
    { title: 'Options', icon: SiGoogleforms, content: <Form /> },
  ];

  const handleNext = () => {
    const nextTab = Math.min(activeTab + 1, tabs.length - 1);
    setActiveTab(nextTab);
    tabsRef.current?.setActiveTab(nextTab);
  };

  const handleBack = () => {
    const prevTab = Math.max(activeTab - 1, 0);
    setActiveTab(prevTab);
    tabsRef.current?.setActiveTab(prevTab);
  };

  return (
    <div className="min-w-xl flex flex-col justify-between gap-10">
      <Tabs ref={tabsRef} onActiveTabChange={setActiveTab} variant="underline">
        {tabs.map(({ title, icon, content }, index) => (
          <TabItem key={index} title={title} icon={icon}>
            {content}
          </TabItem>
        ))}
      </Tabs>

      <div className="flex items-center justify-center gap-10">
        <Button
          pill
          outline
          color="cyan"
          onClick={handleBack}
          disabled={activeTab === 0}
          className="flex items-center justify-center gap-2"
        >
          <MdArrowBack />
          Back
        </Button>

        <Button
          pill
          onClick={handleNext}
          disabled={activeTab === tabs.length - 1}
          className="flex items-center justify-center gap-2"
        >
          Next
          <MdArrowForward />
        </Button>
      </div>
    </div>
  );
};
