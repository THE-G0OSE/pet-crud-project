import {motion, useTransform} from 'framer-motion'

import { useScroll } from 'framer-motion'
import Post from './Post'
import { DB, DBcontext } from '../Contexts/DBContext';
import { useContext } from 'react';

const Home = () => {

  const {posts} = useContext<DB>(DBcontext)

  const {scrollY} = useScroll()
  const y = useTransform(scrollY, [1900, 10000], [0, -8100])

  const homeVariants = {
    initial: {opacity: 0, x: 0},
    animate: {opacity: 1,x: 0, transition: {duration: 1, ease: 'easeOut', delay: 1 }},
    exit: {opacity: 0, x: -1000, transition: {duration: 1, ease: 'easeOut'}}
  }

  return (

    <div className='relative overflow-hidden size-full'>
    <motion.div key='home' className='flex w-[1800.5px] h-[790px]  flex-col items-center gap-y-8 pt-8 absolute overflow-hidden'
      style={{y}} 
      variants={homeVariants}
    >
      {posts.map((post) => <Post key={post.id} id={post.id} title={post.title} description={post.description} creator={post.creator} />)}
    </motion.div>
    </div>

  )

}

export default Home