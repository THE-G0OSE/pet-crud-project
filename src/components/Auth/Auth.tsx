import {AnimatePresence, motion} from 'framer-motion'
import { useState } from 'react'
import Choice from './Choice'
import Login from './Login'
import Registration from './Registration'

const Auth = () => {

    const [phase, setPhase] = useState<'choice' | 'register' | 'login'>('choice')

    const renderPage = (page: 'choice' | 'register' | 'login') => {
      switch(page){
        case 'choice':
          return <Choice key='choice' setPhase={setPhase}/>
        case 'login':
          return <Login key='login' setPhase={setPhase}/>
        case 'register':
          return <Registration key='register' setPhase={setPhase}/>
      }

    }

  return (
    <motion.div key='authDiv' className='size-full'
      initial={{ opacity: 0}} 
      animate={{ opacity:1 , transition: {duration: 2, delay: 1, ease: 'easeInOut'}}}
      exit={{ opacity: 0, transition: {duration: 1, ease: 'easeInOut'}}}
    >
      <AnimatePresence propagate>
        {renderPage(phase)}
      </AnimatePresence>
    </motion.div>
  )

}

export default Auth