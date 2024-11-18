'use client'
import { useState, useRef, ReactNode } from 'react';

interface AccordionProps {
  children: ReactNode;
}

interface AccordionItemProps {
  children: ReactNode;
}

interface AccordionHeaderProps {
  children: ReactNode;
  id: string;
  isOpen: boolean;
  onClick: () => void;
}

interface AccordionPanelProps {
  children: ReactNode;
  id: string;
  isOpen: boolean;
}

export const Accordion = ({ children }: AccordionProps) => {
  return <div role="tablist">{children}</div>;
};

export const AccordionItem = ({ children }: AccordionItemProps) => {
  return <div className="accordion-item">{children}</div>;
};

export const AccordionHeader = ({ children, id, isOpen, onClick }: AccordionHeaderProps) => {
  return (
    <button
      id={`accordion-header-${id}`}
      aria-expanded={isOpen}
      aria-controls={`accordion-panel-${id}`}
      onClick={onClick}
      className={`accordion-header ${isOpen ? 'open' : ''}`}
    >
      {children}
    </button>
  );
};

export const AccordionPanel = ({ children, id, isOpen }: AccordionPanelProps) => {
  return (
    <div
      id={`accordion-panel-${id}`}
      role="region"
      aria-labelledby={`accordion-header-${id}`}
      hidden={!isOpen}
      className="accordion-panel"
    >
      {children}
    </div>
  );
};

export const AccessibleAccordion = () => {
  const [openPanel, setOpenPanel] = useState<string | null>(null);

  const handleToggle = (panelId: string) => {
    setOpenPanel((prev) => (prev === panelId ? null : panelId));
  };

  return (
    <Accordion>
      {['1', '2'].map((id) => (
        <AccordionItem key={id}>
          <AccordionHeader
            id={id}
            isOpen={openPanel === id}
            onClick={() => handleToggle(id)}
          >
            Section {id}
          </AccordionHeader>
          <AccordionPanel id={id} isOpen={openPanel === id}>
            Contenu de la section {id}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccessibleAccordion;
