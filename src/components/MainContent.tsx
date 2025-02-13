import {useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import Nav from './Nav';
import { useContext, useState } from 'react';
import { pageContext, pageContextType } from '../Contexts/PageContext';
import Home from './Home';
import Profile from './Profile';
import MyPosts from './MyPosts';
import { profileContext } from '../Contexts/ProfileContext';
import Auth from './Auth/Auth';
import { changingContext } from '../Contexts/Changing';
import ChangingModal from './ChangingModal';


const MainContent = () => {

    const [changing, setChanging] = useState<boolean>(false)

  const pageVariants = {
    initial: {y: 0},
    move: {y: 700}
  }

  const {page} = useContext<pageContextType>(pageContext)
  const {profile} = useContext<profileContext>(profileContext)
  const {isChanging, changingId} = useContext<changingContext>(changingContext)

  const {scrollY} = useScroll()

  const x = useTransform(scrollY, [0, 1300], [-2280, 0])
    
  const renderPage = (pageName: 'home' | 'profile' | 'my') => {
    switch(pageName) {
      case 'home':
        return <Home key='homeElement'/>
      case 'profile': 
        if (profile.isLogin){
          return <Profile key='profileElement'/>
        } else {
          return <Auth key='authElement'/>
        }

      case 'my': 
        if (profile.isLogin){
          return <MyPosts key='myElement'/>
        } else {
        return <Auth key='authElement'/>
        }
    }
  }


  return (
    <motion.div className='w-full h-full '
      style={{x}}
    >
      <div className='flex justify-center items-center w-full h-[86%] absolute bottom-0 left-0'>
        <motion.div id='hui' className='bg-gray-900 w-[95%] h-[95%] rounded-3xl glowMini overflow-hidden'
          variants={pageVariants} 
          initial='initial'
          animate={changing ? 'move': 'initial'}
          transition={{duration: 1.5, ease: 'easeInOut', type: 'spring', stiffness: 50}}
        >
          <AnimatePresence>
            {renderPage(page)}
          </AnimatePresence>
        </motion.div>
      </div>
      <Nav changing={{get: changing, set: setChanging}}/> 
      <AnimatePresence>
      {isChanging && <ChangingModal id={changingId}/>}
      </AnimatePresence>
    </motion.div>
  )
}

export default MainContent