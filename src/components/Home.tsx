import {motion, useTransform} from 'framer-motion'

import { useScroll } from 'framer-motion'
import Post from './Post'
import { DB, DBcontext } from '../Contexts/DBContext';
import { useContext } from 'react';

const Home = () => {

  const {posts} = useContext<DB>(DBcontext)

  const {scrollY} = useScroll()
  const y = useTransform(scrollY, [1500, 10000], [0, -8500])

  return (

    <motion.div className='flex flex-col items-center gap-y-8 pt-8'
      style={{y}} 
    >
      {posts.map((post) => <Post key={post.id} id={post.id} title={post.title} description={post.description} creator={post.creator} />)}
    </motion.div>

  )

}

export default Home