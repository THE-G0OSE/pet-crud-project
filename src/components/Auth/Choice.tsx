import {AnimatePresence, motion} from 'framer-motion'
import { FC } from 'react';

type props = {
    setPhase: (arg: 'login' | 'register' | 'choice') => void;
}

const Choice: FC<props> = ({setPhase}) => {

  return (

    <motion.div key='mainLogin' className='flex flex-col items-center justify-center overflow-hidden size-full gap-y-21'
    >
      <AnimatePresence propagate>
        <motion.div className='w-[399px] h-[100px] bg-gray-800 rounded-full flex justify-center items-center text-4xl text-gray-100 glowMini'
          onClick={() => setPhase('login')} 
          initial={{y: 50, opacity: 0}} 
          animate={{y: 0, opacity: 1, transition: {duration: 1, delay: 2, ease: 'easeInOut'}}}
          exit={{y: 50, opacity: 0, transition: {duration: 1, ease: 'easeInOut'}}}

        >
            Sign in
        </motion.div>
        <motion.div className='w-[399px] h-[100px] bg-gray-800 rounded-full flex justify-center items-center text-4xl text-gray-100 glowMini'
          onClick={() => setPhase('register')} 
          initial={{y: 50, opacity: 0}} 
          animate={{y: 0, opacity: 1, transition: {duration: 1, delay: 2.3, ease: 'easeInOut'}}}
          exit={{y: 50, opacity: 0, transition: {duration: 1, ease: 'easeInOut'}}}
        >
            Sign up
        </motion.div>
      </AnimatePresence>
    </motion.div>

  )

}

export default Choice