import {motion} from 'framer-motion'
import { FC } from 'react';

type props = {
    setPhase: (arg: 'login' | 'register' | 'choice') => void;
}

const Choice: FC<props> = ({setPhase}) => {

  return (

    <div className='size-full flex justify-center items-center flex-col gap-y-21 overflow-hidden'>
        <motion.div className='w-[399px] h-[100px] bg-gray-800 rounded-full flex justify-center items-center text-4xl text-gray-100 glowMini'
          onClick={() => setPhase('login')} 
        >
            Sign in
        </motion.div>
        <motion.div className='w-[399px] h-[100px] bg-gray-800 rounded-full flex justify-center items-center text-4xl text-gray-100 glowMini'
          onClick={() => setPhase('register')} 
        >
            Sign up
        </motion.div>
    </div>

  )

}

export default Choice