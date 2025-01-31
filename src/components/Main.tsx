import {easeOut, motion, useScroll, useTransform} from 'framer-motion'
import MainContent from './MainContent'

const Main = () => {

    const {scrollY} = useScroll()
    const x = useTransform(scrollY, [0, 1300], [2280, 0])

  return (
    <>
        <motion.div className='w-[102%] h-[102%] -left-2 -top-2 fixed rounded-2xl overflow-hidden border-3 border-white bg-black glow flex justify-center items-center'
            style={{x}}
        >
           <MainContent/> 
       </motion.div>
    </>
  )

}

export default Main