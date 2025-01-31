import {easeOut, useScroll, useTransform, motion } from 'framer-motion';
import Nav from './Nav';
import { useContext } from 'react';
import { pageContext, pageContextType } from '../Contexts/PageContext';
import Home from './Home';
import Profile from './Profile';
import MyPosts from './MyPosts';
import { profileContext } from '../Contexts/ProfileContext';
import Auth from './Auth/Auth';


const MainContent = () => {

  const {page} = useContext<pageContextType>(pageContext)
  const {profile} = useContext<profileContext>(profileContext)

  const {scrollY} = useScroll()

  const x = useTransform(scrollY, [0, 1300], [-2280, 0])
    
  const renderPage = (pageName: 'home' | 'profile' | 'my') => {
    switch(pageName) {
      case 'home':
        return <Home/>
      case 'profile': 
        if (profile.isLogin){
          return <Profile/>
        } else {
          return <Auth/>
        }

      case 'my': 
        if (profile.isLogin){
          return <MyPosts/>
        } else {
        return <Auth/>
        }
    }
  }


  return (
    <motion.div className='w-full h-full '
      style={{x}}
    >
      <div className='flex justify-center items-center w-full h-[86%] absolute bottom-0 left-0'>
        <div className='bg-gray-900 w-[95%] h-[95%] rounded-3xl glowMini overflow-hidden'>
      {renderPage(page)}
        </div>
      </div>
      <Nav/> 
    </motion.div>
  )
}

export default MainContent