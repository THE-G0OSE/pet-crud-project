import {AnimatePresence, motion} from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import { profileContext } from '../Contexts/ProfileContext'
import { MdEdit } from 'react-icons/md'
import { DB, DBcontext } from '../Contexts/DBContext'

const Profile = () => {

  const [showed, setShowed] = useState<boolean>(false)

  const profileVariants = {
    initial: {x: -400, transition: {duration: 1, ease: 'easeInOut'}},
    show: {x: 0, transition: {duration: 2, ease: 'easeInOut', delay: 3}}
  }

  const bannerVariants = {
    initial: {y: -150, transition: {duration: 1, ease: 'easeInOut'}},
    show: {y: 0, transition: {duration: 2, ease: 'easeInOut', delay: 4}}
  }

  const nameVariants = {
    initial: {y: 50, opacity: 0, transition: { duration: 1, ease: 'easeInOut'}},    
    show: {y: 0, opacity: 1, transition: {duration: 1, ease: 'easeInOut', delay: 4}}
  }

  const buttonVariants1 = {
    initial: {x: -150, scale: 1, transition: {duration: 1, ease: 'easeInOut'}},
    show: {x: 0, scale: 1, transition: showed ? {duration: .4, type: 'spring', stiffness: 200} : {duration: 1, ease: 'easeOut', delay: 5}},
    tap: {scale: 0.9, transition: {type: 'spring', duration: .5, stiffness: 200}},
    hover: {scale: 1.1, transition: {type: 'spring', duration: .4, stiffness: 200}}
  }

  const buttonVariants2 = {
    initial: {x: 150, scale: 1, transition: {duration: 1, ease: 'easeInOut'}},
    show: {x: 0, scale: 1, transition: showed ? {duration: .4, type: 'spring', stiffness: 200} : {duration: 1, ease: 'easeOut', delay: 5}},
    tap: {scale: 0.9, transition: {type: 'spring', duration: .5, stiffness: 200}},
    hover: {scale: 1.1, transition: {type: 'spring', duration: .4, stiffness: 200}}
  }

  const editVariants = {
    initial: {y: 40}, transition: {duration: .4, type: 'spring', stiffness: 100},
    show: {y: 0, scale: 1, transition: {duration: .4, type: 'spring', stiffness: 100}},
    hover: {scale: 1.1, transition: {duration: .4, type: 'spring', stiffness: 200}},
    tap: {scale: 1.1, rotateZ: -20, transition: {duration: .2, type: 'spring', stiffness: 200}}
  }

  const db = useContext<DB>(DBcontext)

  const {profile, set} = useContext<profileContext>(profileContext)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const bannerChange = (e: any) => {
    const img = e.target.files[0];
    if(img) {
      set({...profile, bannerImage: URL.createObjectURL(img)})
      db.setdb(db.db.map((user) => {if(user.id === profile.id) return {...user, bannerImage: URL.createObjectURL(img)}; else return user}))
    }
  }

  const profileChange = (e: any) => {
    const img = e.target.files[0];
    if(img) {
      set({...profile, profileImage: URL.createObjectURL(img)})
      console.log(db.db, profile)
      db.setdb(db.db.map((user) => {if(user.id == profile.id) return {...user, profileImage: URL.createObjectURL(img)}; else return user}))
    }
  }

  const buttonHoverStart = () => {
    setShowed(true)
  }

  const buttonHoverEnd = () => {
    setTimeout(() => setShowed(false), 1500)
  }

  const logout = () => {
    set({isLogin: false, id: 0, username: '', profileImage: '', email: '', password: '', bannerImage: ''})
  }

  return (

    <motion.div key='profileBody' className='overflow-hidden size-full'
      exit={{opacity: 0, transition:{duration: 1}}}
    >
      <AnimatePresence>
    <div className='relative top-0 left-0 overflow-hidden size-full rounded-3xl'>
      <AnimatePresence propagate>
        <motion.div key='banner' className='w-full h-[150px] relative overflow-hidden'
          variants={bannerVariants} 
          initial='initial'
          animate='show'
          exit='initial'
        >
          <img src={profile.bannerImage == '' ? 'https://placeholder.apptor.studio/500/200/banner.png' : profile.bannerImage} alt="noImage" className='object-cover size-full'/>
          <AnimatePresence>
            {isEditing && <motion.label key='profileEdit' htmlFor='bannerfile' className='p-0.5 w-[40px] cursor-pointer block bg-gray-900 rounded-xl absolute right-[100px] top-[115px]'
            variants={editVariants} 
            initial='initial'
            animate='show'
            exit='initial'
            whileHover='hover'
            whileTap='tap'
          ><input id='bannerfile' type="file" className='hidden' onChange={bannerChange} /><div><MdEdit className='text-4xl text-gray-200'/></div></motion.label>}
          </AnimatePresence>
        </motion.div>
        <motion.div key='profile' className='relative top-[-100px] left-[150px] h-[200px] w-[160px] border-gray-900 border-8 overflow-hidden'
          variants={profileVariants} 
          initial='initial'
          animate='show'
          exit='initial'
        >
          <img src={profile.profileImage == '' ? 'https://placeholder.apptor.studio/500/200/banner.png' : profile.profileImage} alt="noImage" className='object-cover size-full'/>
          <AnimatePresence>
            {isEditing && <motion.label key='bannerEdit' htmlFor='profilefile' className='p-0.5 w-[40px] cursor-pointer block bg-gray-900 rounded-xl absolute right-[10px] top-[150px]'
              variants={editVariants} 
              initial='initial'
              animate='show'
              exit='initial'
              whileHover='hover'
              whileTap='tap'
            ><input id='profilefile' type="file" className='hidden' onChange={profileChange} /><div><MdEdit className='text-4xl text-gray-200'/></div></motion.label>}
          </AnimatePresence>
        </motion.div>
        <motion.p key='name' className='text-gray-200 text-3xl font-bold absolute left-[340px] top-[190px]'
          variants={nameVariants} 
          initial='initial'
          animate='show'
          exit='initial'
        >{profile.username}</motion.p>
        <motion.button key='edit' onClick={() => setIsEditing(!isEditing)} className='text-gray-200 cursor-pointer absolute bottom-[30px] right-[30px] bg-gray-700 py-3 px-6 rounded-2xl font-bold'
          variants={buttonVariants2}  
          initial='initial'
          animate='show'
          whileHover='hover'
          whileTap='tap'
          exit='initial'
          onHoverStart={buttonHoverStart}
          onHoverEnd={buttonHoverEnd}
        >edit</motion.button>
        <motion.button key='sign out' onClick={logout} className='text-gray-200 cursor-pointer font-bold bg-red-900 py-3 px-6 left-[30px] bottom-[30px] absolute rounded-2xl'
          variants={buttonVariants1}  
          initial='initial'
          animate='show'
          whileHover='hover'
          whileTap='tap'
          exit='initial'
          onHoverStart={buttonHoverStart}
          onHoverEnd={buttonHoverEnd}
        >sign out</motion.button>
        </AnimatePresence>
      </div>
      </AnimatePresence>
      </motion.div>
  
  )

}

export default Profile