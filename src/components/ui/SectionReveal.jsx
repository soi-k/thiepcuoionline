import { motion } from 'framer-motion'

export default function SectionReveal({
  children,
  className = '',
  delay = 0,
  y = 32,
  as: Component = motion.div,
}) {
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  )
}
