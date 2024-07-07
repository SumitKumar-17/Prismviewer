import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export function FaqAccordion() {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Prismviewer</AccordionTrigger>
          <AccordionContent>
           It is a simple tool which can be used to pull and push the prisma schema to a database.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it helpful?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes handy when there si a need to push a large amount of schema to the database
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Future targets</AccordionTrigger>
          <AccordionContent>
            As prisma Studio is not a public repository . planning to make something like Prisma  Studio which can be helpful to push and view the schema for faster development.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  