import {AnimatePresence, motion} from 'framer-motion'
import { useContext } from 'react'
import { pageContext, pageContextType } from '../Contexts/PageContext'
import { RiHomeLine } from 'react-icons/ri'
import { MdOutlineEdit } from 'react-icons/md'
import { IoPersonOutline } from 'react-icons/io5'

type props = {
  changing: {get: boolean, set: (arg: boolean) => void}
}

const Nav: React.FC<props> = ({changing}) => {

  const page = useContext<pageContextType>(pageContext)    

    const changeHandle = (_:any, info: any, id: 'home'| 'my' | 'profile') => {
        if(info.offset.y > 150){
          page.set(id)
          changing.set(true)
          setTimeout(() => changing.set(false), 1500)
        }
    }

  return (

    <nav className='w-full h-[100px]'>
        <AnimatePresence>
        {!(page.page === 'home' && changing.get) && <motion.div key='home' id='home' className='text-gray-200 text-5xl flex justify-center items-center absolute left-[400px] top-[20px] w-[200px] h-[80px] rounded-xl bg-gray-900 glowMini'
            initial={{ x:0, y:0, opacity: 1, scale: 1}}
            drag={!changing.get}
            dragSnapToOrigin={true} 
            onDragEnd={(e, info) => changeHandle(e, info, 'home')}
            exit={{x: 500, y: 500, opacity: 0, scale: 0, transition: {duration: 1, delay: .1}}}
        ><RiHomeLine/></motion.div> }
        {!(page.page === 'my' && changing.get) && <motion.div key='my' id='my' className='text-gray-200 text-5xl flex justify-center items-center absolute left-[900px] top-[20px] w-[200px] h-[80px] rounded-xl bg-gray-900 glowMini'
            initial={{ x:0, y:0, opacity: 1, scale: 1}}
            drag={!changing.get}
            dragSnapToOrigin={true} 
            onDragEnd={(e, info) => changeHandle(e, info, 'my')}
            exit={{x: 0, y: 500, opacity: 0, scale: 0, transition: {duration: 1, delay: .1}}}
        ><MdOutlineEdit/></motion.div> }
        {!(page.page === 'profile' && changing.get) && <motion.div key='profile' id='profile' className='text-gray-200 text-5xl flex justify-center items-center absolute left-[1400px] top-[20px] w-[200px] h-[80px] rounded-xl bg-gray-900 glowMini'
            initial={{ x:0, y:0, opacity: 1, scale: 1}}
            drag={!changing.get}
            dragSnapToOrigin={true} 
            onDragEnd={(e, info) => changeHandle(e, info, 'profile')}
            exit={{x: -500, y: 500, opacity: 0, scale: 0, transition: {duration: 1, delay: .1}}}
        ><IoPersonOutline/></motion.div> }
        </AnimatePresence>
    </nav>

  )

}

export default Nav