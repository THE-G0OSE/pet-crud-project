import {motion, useScroll} from 'framer-motion'
import { useState } from 'react'
import { FaArrowDownLong } from 'react-icons/fa6'

const Preview = () => {

  const {scrollY} = useScroll()

  const [blur, setBlur] = useState<Number>(0)

  const handleScroll = () => {
    if(scrollY.get() < 1300) {
      setBlur(15 / 1300 * scrollY.get())
    }
  }

  scrollY.on('change', () => handleScroll() )

  const variants = (i: number, y:number, delay: number) => {
    return {
      initial: {x: i, opacity: 0, y: y},
      normal: {x: i > 0 ? 1600: 100, opacity: 1, transition: {delay: delay, duration: 1}}
    }
  }

  return (

    <motion.div className='w-screen h-screen fixed'
      style={{filter: `blur(${blur}px)`}}  
    >
      <motion.div className='bg-black border glow border-white p-4 absolute left-0 top-0 rounded-xl w-[400px] h-[300px] text-white text-2xl'
        variants={variants(-200, 100, .6)} 
        initial='initial'
        animate='normal'
      >
        In this project you can see HTML, CSS, Tailwind, Typescript, React and Motion
      </motion.div>
      <motion.div className='bg-black border glow border-white p-4 absolute left-0 top-0 rounded-xl w-[400px] h-[300px] text-white text-2xl'
        variants={variants(-200, 600, 1.2)} 
        initial='initial'
        animate='normal'
      >
        In this project you can see HTML, CSS, Tailwind, Typescript, React and Motion
      </motion.div>
      <motion.div className='bg-black border glow border-white p-4 absolute left-0 top-0 rounded-xl w-[400px] h-[300px] text-white text-2xl'
        variants={variants(1900, 100, 1.8)} 
        initial='initial'
        animate='normal'
      >
        In this project you can see HTML, CSS, Tailwind, Typescript, React and Motion
      </motion.div>
      <motion.div className='bg-black border glow border-white p-4 absolute left-0 top-0 rounded-xl w-[400px]  h-[300px] text-white text-2xl'
        variants={variants(1900, 600, 2.4)} 
        initial='initial'
        animate='normal'
      >
        In this project you can see HTML, CSS, Tailwind, Typescript, React and Motion
      </motion.div>
      <motion.div className='absolute top-[30%] left-[40%] w-[20%]'
        initial={{opacity: 0, y: -100}} 
        animate={{opacity: 1, y: 0}}
        transition={{delay: 3, duration: 2, ease: 'easeInOut'}}
      >
        <FaArrowDownLong className='text-white size-full glowSvg'/>
      </motion.div>
    </motion.div>

  )

}
export default Preview