import { motion } from 'framer-motion'

export default function RevealText({ text, className = '' }) {
  const words = text.split(' ')

  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.018 }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 10, filter: 'blur(3px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.p>
  )
}
