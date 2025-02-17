import {motion} from 'framer-motion'
import { useContext } from 'react'
import { PopUp, popup } from '../Contexts/PopUpContext'

const PopUpHint = () => {

  const {setPhase} = useContext<popup>(PopUp)

  return (

    <motion.div key='popup' className='absolute top-0 left-0 w-screen h-screen'
      onMouseDown={() => setPhase('end')} 
      initial={{ opacity: 0}}
      animate={{ opacity: 1, transition: {duration: 1, ease: 'easeInOut'}}}
      exit={{opacity: 0, transition: {duration: .5, ease: 'easeInOut'}}}
    >
        <motion.div className='bg-black opacity-50 h-[85%] w-full absolute bottom-0'>
        </motion.div>
        <motion.div className='p-4 py-6 bg-gray-700 rounded-xl text-gray-300 inline-block absolute top-35 left-70 '>Drag this pannel down to change the active page</motion.div>
    </motion.div>

  )

}

export default PopUpHint