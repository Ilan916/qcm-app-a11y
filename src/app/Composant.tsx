import { useState, ReactNode, FC } from 'react';

interface AccordionProps {
  children: ReactNode[];
}

interface AccordionItemProps {
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

interface AccordionHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

interface AccordionPanelProps {
  isOpen: boolean;
  children: ReactNode;
}

const Accordion: FC<AccordionProps> = ({ children }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {children.map((child, index) => (
        <AccordionItem
          key={index}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        >
          {child}
        </AccordionItem>
      ))}
    </div>
  );
};

const AccordionItem: FC<AccordionItemProps> = ({ isOpen, onToggle, children }) => (
  <div>
    {React.Children.map(children, (child) =>
      React.isValidElement(child) ? React.cloneElement(child, { isOpen, onToggle }) : child
    )}
  </div>
);

const AccordionHeader: FC<AccordionHeaderProps> = ({ isOpen, onToggle, children }) => (
  <button
    onClick={onToggle}
    aria-expanded={isOpen}
    aria-controls="accordion-panel"
  >
    {children}
  </button>
);

const AccordionPanel: FC<AccordionPanelProps> = ({ isOpen, children }) => (
  <div
    id="accordion-panel"
    role="region"
    hidden={!isOpen}
  >
    {children}
  </div>
);

export { Accordion, AccordionItem, AccordionHeader, AccordionPanel };
