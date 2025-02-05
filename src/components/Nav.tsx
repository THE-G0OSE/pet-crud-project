import {AnimatePresence, motion} from 'framer-motion'
import { useContext, useState } from 'react'
import { pageContext, pageContextType } from '../Contexts/PageContext'

type props = {
  changing: {get: boolean, set: (arg: boolean) => void}
}

const Nav: React.FC<props> = ({changing}) => {

  const page = useContext<pageContextType>(pageContext)    

    const changeHandle = (e:any, info: any) => {
        if(info.offset.y > 150){
          page.set(e.target.id) 
          changing.set(true)
          setTimeout(() => changing.set(false), 1500)
        }
    }

  return (

    <nav className='w-full h-[100px]'>
        <AnimatePresence>
        {!(page.page === 'home' && changing.get) && <motion.div key='home' id='home' className='absolute left-[400px] top-[20px] w-[200px] h-[80px] rounded-xl bg-gray-900 glowMini'
            initial={{ x:0, y:0, opacity: 1, scale: 1}}
            drag={!changing.get}
            dragSnapToOrigin={true} 
            onDragEnd={(e, info) => changeHandle(e, info)}
            exit={{x: 500, y: 500, opacity: 0, scale: 0, transition: {duration: 1, delay: .1}}}
        ></motion.div> }
        {!(page.page === 'my' && changing.get) && <motion.div key='my' id='my' className='absolute left-[900px] top-[20px] w-[200px] h-[80px] rounded-xl bg-gray-900 glowMini'
            initial={{ x:0, y:0, opacity: 1, scale: 1}}
            drag={!changing.get}
            dragSnapToOrigin={true} 
            onDragEnd={(e, info) => changeHandle(e, info)}
            exit={{x: 0, y: 500, opacity: 0, scale: 0, transition: {duration: 1, delay: .1}}}
        ></motion.div> }
        {!(page.page === 'profile' && changing.get) && <motion.div key='profile' id='profile' className='absolute left-[1400px] top-[20px] w-[200px] h-[80px] rounded-xl bg-gray-900 glowMini'
            initial={{ x:0, y:0, opacity: 1, scale: 1}}
            drag={!changing.get}
            dragSnapToOrigin={true} 
            onDragEnd={(e, info) => changeHandle(e, info)}
            exit={{x: -500, y: 500, opacity: 0, scale: 0, transition: {duration: 1, delay: .1}}}
        ></motion.div> }
        </AnimatePresence>
    </nav>

  )

}

export default Nav