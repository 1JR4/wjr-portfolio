import * as React from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

import { cn } from "@/lib/utils"

interface AccordionProps {
  children: React.ReactNode
  className?: string
}

interface AccordionItemProps {
  children: React.ReactNode
  className?: string
  defaultOpen?: boolean
}

interface AccordionTriggerProps {
  children: React.ReactNode
  className?: string
}

interface AccordionContentProps {
  children: React.ReactNode
  className?: string
}

const AccordionContext = React.createContext<{
  isOpen: boolean
  toggle: () => void
}>({
  isOpen: false,
  toggle: () => {},
})

const Accordion = ({ children, className }: AccordionProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      {children}
    </div>
  )
}

const AccordionItem = ({ children, className, defaultOpen = false }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)
  
  const toggle = React.useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  return (
    <AccordionContext.Provider value={{ isOpen, toggle }}>
      <div className={cn("border border-white/10 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

const AccordionTrigger = ({ children, className }: AccordionTriggerProps) => {
  const { isOpen, toggle } = React.useContext(AccordionContext)

  return (
    <button
      onClick={toggle}
      className={cn(
        "flex w-full items-center justify-between p-4 text-left font-medium text-white hover:bg-white/5 transition-colors",
        className
      )}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>
  )
}

const AccordionContent = ({ children, className }: AccordionContentProps) => {
  const { isOpen } = React.useContext(AccordionContext)

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
        >
          <div className={cn("p-4 pt-0 text-white/80", className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }