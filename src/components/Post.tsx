import {motion} from 'framer-motion'
import { FC, useContext } from 'react';
import { DB, DBcontext } from '../Contexts/DBContext';

type props = {
    title: string;
    description: string;
    creator: number;
} 

const Post: FC<props> = ({title, description, creator}) => {

    const {db, posts} = useContext<DB>(DBcontext)

    const creatorData = db.find((user) => user.id == creator)

  return ( 

    <div className='w-[1000px] max-h-[500px] bg-gray-800 rounded-2xl p-8 overflow-scroll relative'>
      {creatorData!.profileImage !== '' && <div className='inline-block w-[60px] h-[75px] bg-gray-700 rounded-xl overflow-hidden'><img className='object-cover size-full' src={creatorData!.profileImage} alt="fuck" /></div>}
      <p className='text-gray-400 text-2xl inline ml-4 absolute '>{creatorData!.username}</p>
      <p className='text-gray-200 text-3xl inline absolute ml-20 mt-10 font-bold'>{title}</p>
      <p className='text-gray-300 text-2xl mt-5'>{description}</p>
    </div>

  )

}

export default Post