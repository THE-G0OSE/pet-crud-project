import {motion} from 'framer-motion'
import { FC, useContext } from 'react';
import { DB, DBcontext } from '../Contexts/DBContext';
import { profileContext } from '../Contexts/ProfileContext';
import { MdEdit } from 'react-icons/md';
import { changingContext } from '../Contexts/Changing';

type props = {
    title: string;
    description: string;
    creator: number;
    id: number;
} 

const Post: FC<props> = ({title, description, creator, id}) => {

    const {db} = useContext<DB>(DBcontext)
    const profile = useContext<profileContext>(profileContext)
    const {setIsChanging, setChangingId} = useContext<changingContext>(changingContext)

    const creatorData = db.find((user) => user.id == creator)

    const modalOpen = () => {
        setChangingId(id)
        setIsChanging(true)
    }

  return ( 

    <div className='flex flex-col w-[1000px] max-h-[500px] bg-gray-800 rounded-2xl p-8 overflow-scroll relative'>
    <div className='h-26'>
      {creatorData!.profileImage !== '' && <div className='inline-block w-[60px] h-[75px] bg-gray-700 rounded-xl overflow-hidden'><img className='object-cover size-full' src={creatorData!.profileImage} alt="fuck" /></div>}
      <p className='text-gray-400 text-2xl inline ml-4 absolute '>{creatorData!.username}</p>
      <p className='text-gray-200 text-3xl inline absolute ml-20 mt-14 font-bold'>{title}</p>
    </div>
      <p className='text-gray-300 text-2xl mt-5'>{description}</p>
      {profile.profile.id === creator && <button onClick={modalOpen} className='absolute right-6 top-6 bg-gray-700 p-2 rounded-xl'><MdEdit className='text-gray-200 text-2xl'/></button>}
    </div>

  )

}

export default Post