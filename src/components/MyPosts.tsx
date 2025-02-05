import { motion, AnimatePresence } from 'framer-motion';
import { useContext } from "react";
import { useForm } from "react-hook-form"
import { DB, DBcontext } from "../Contexts/DBContext";
import { profileContext } from "../Contexts/ProfileContext";

const MyPosts = () => {

  const {posts, setPosts} = useContext<DB>(DBcontext)
  const {profile} = useContext<profileContext>(profileContext)

  type form = {
    title: string;
    description: string;
  }

  const {register, handleSubmit, setValue, formState: {errors, isSubmitting}} = useForm<form>()

  const submity = (data: form) => {
    setPosts([...posts, {id: posts.length + 1, title: data.title, description: data.description, creator: profile.id}])
    setValue('title', '')
    setValue('description', '')
  }

  const noMore = (e: React.FormEvent<HTMLInputElement>)  => {
    if(e.currentTarget.value.length > 50) {
      e.currentTarget.value = e.currentTarget.value.slice(0, 50)
    }
  }

  const mainVariants = {
    initial: {y: 200, opacity: 0},
    animate: {y: 0, opacity: 1, transition: { duration: 2, delay: 2.2, ease: 'easeInOut'}},
    exit: {y: 200, opacity: 0, transition: {duration: 1, ease: 'easeInOut'}}
  }

  const titleVariants = {
    initial: {x: 200, opacity: 0},
    animate: {x: 0, opacity: 1, transition: {duration: 1.2, delay: 4.2, ease: 'easeInOut'}},
    exit: {x: 200, opacity: 0, transition: {duration: 1, ease: 'easeIn'}},
  }

  const DescriptionVariants = {
    initial: {x: -200, opacity: 0},
    animate: {x: 0, opacity: 1, transition: {duration: 1.2, delay: 4.5, ease: 'easeInOut'}},
    exit: {x: -200, opacity: 0, transition: {duration: 1, ease: 'easeIn'}},
  }

  const buttonVariants = {
    initial: {x: 200, opacity: 0},
    animate: {x: 0, opacity: 1, transition: {duration: 1.2, delay: 4.8, ease: 'easeInOut'}},
    exit: {x: 200, opacity: 0, transition: {duration: 1, ease: 'easeIn'}},
  }

  return (

    <motion.div key='newPost' className='h-[800px] w-[1800px] flex justify-center items-center bg-none fixed'>
      <AnimatePresence propagate>
      <motion.form key='form' className='flex flex-col items-center justify-between w-[700px] py-[30px] h-[500px] rounded-2xl bg-gray-800' onSubmit={handleSubmit(submity)}
        variants={mainVariants}
        initial='initial'
        animate='animate'
        exit='exit'
      >
        <AnimatePresence propagate>
        <div key='title' className='w-[500px] h-[70px]'>
          <AnimatePresence propagate>
          <motion.div className='w-full px-3 flex justify-between items-center rounded-2xl h-[50px] bg-gray-700 text-gray-200'
            variants={titleVariants}
          >
            <label htmlFor="title">Title: </label> <input  onInput={noMore} className='w-[430px] outline-none' id='title' type="text" {...register('title', {required: 'Post must have a title', minLength: {value: 4, message: 'Title must be at least 4 characters'}})} />
          </motion.div>
          </AnimatePresence>
          {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
        </div>
        <div className='w-[500px] h-[250px] '>
          <AnimatePresence propagate>
          <motion.div className='w-full p-[15px] flex flex-col justify-between items-start rounded-2xl h-full bg-gray-700 text-gray-200'
            variants={DescriptionVariants} 
          >
            <label htmlFor="description">Description: </label> <textarea className='w-[470px] resize-none h-[200px] outline-none' id='description' {...register('description', {required: 'Post must have a description', minLength: {value: 10, message: 'Description must be at least 10 characters'}})} />
          </motion.div>
          </AnimatePresence>
          {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
        </div>

        <motion.button className='w-[500px] h-[50px] rounded-2xl bg-gray-600 text-gray-200' type="submit"
          variants={buttonVariants} 
        >{isSubmitting ? 'Posting...' : 'Post'}</motion.button>
        </AnimatePresence>

      </motion.form>
      </AnimatePresence>

    </motion.div>

  )

}

export default MyPosts