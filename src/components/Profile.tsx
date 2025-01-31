import {motion} from 'framer-motion'
import { useContext, useState } from 'react'
import { profileContext } from '../Contexts/ProfileContext'
import { MdEdit } from 'react-icons/md'
import { DB, DBcontext } from '../Contexts/DBContext'

const Profile = () => {

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

  const logout = () => {
    set({isLogin: false, id: 0, username: '', profileImage: '', email: '', password: '', bannerImage: ''})
  }

  return (

    <div className='overflow-hidden size-full'>
      <motion.div className='w-full h-[150px] '>
        <img src={profile.bannerImage == '' ? 'https://placeholder.apptor.studio/500/200/banner.png' : profile.bannerImage} alt="noImage" className='object-cover size-full'/>
        {isEditing && <motion.label htmlFor='bannerfile' className='p-0.5 w-[40px] block bg-gray-900 rounded-xl absolute right-[100px] top-[137px]'><input id='bannerfile' type="file" className='hidden' onChange={bannerChange} /><div><MdEdit className='text-4xl text-gray-200'/></div></motion.label>}
      </motion.div>
      <motion.div className='absolute top-[90px] left-[200px] h-[200px] w-[160px] border-gray-900 border-8'>
        <img src={profile.profileImage == '' ? 'https://placeholder.apptor.studio/500/200/banner.png' : profile.profileImage} alt="noImage" className='object-cover size-full'/>
        {isEditing && <motion.label htmlFor='profilefile' className='p-0.5 w-[40px] block bg-gray-900 rounded-xl absolute right-[10px] top-[150px]'><input id='profilefile' type="file" className='hidden' onChange={profileChange} /><div><MdEdit className='text-4xl text-gray-200'/></div></motion.label>}
      </motion.div>
      <motion.p className='text-gray-200 text-3xl font-bold absolute left-[380px] top-[190px]'>{profile.username}</motion.p>
      <motion.button onClick={() => setIsEditing(!isEditing)} className='text-gray-200 absolute bottom-[50px] right-[100px] bg-gray-700 py-3 px-6 rounded-2xl font-bold'>edit</motion.button>
      <motion.button onClick={logout} className='text-gray-200 font-bold bg-red-900 py-3 px-6 left-[100px] bottom-[50px] absolute rounded-2xl'>sign out</motion.button>
    </div>

  )

}

export default Profile