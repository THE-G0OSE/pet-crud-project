import {motion} from 'framer-motion'
import { useContext, useEffect } from 'react';
import { DB, DBcontext } from '../Contexts/DBContext'
import { useForm } from 'react-hook-form'
import { changingContext } from '../Contexts/Changing';

type props = {
    id: number
}

type form = {
    title: string;
    description: string;
}

const ChangingModal:React.FC<props> = ({id}) => {

    const {posts, setPosts} = useContext<DB>(DBcontext)
    const {setIsChanging} = useContext<changingContext>(changingContext)

    const {register, handleSubmit, setValue, formState: {errors}} = useForm<form>()

    useEffect(() => {
        setValue('title', postData!.title)
        setValue('description', postData!.description)
    }, [])

    const postData = posts.find((post) => post.id == id)

    const submity = (data: form) => {
      setPosts(posts.map((post) => {
        if(post.id === id) {
            return {...post, title: data.title, description: data.description }
        } else {
            return post
        }
      }))       
      setIsChanging(false)
    }

  return (

    <motion.div className='fixed top-0 left-0 flex items-center justify-center w-screen h-screen'
        exit={{opacity: 0}} 
    >
        <motion.div className='fixed top-0 left-0 bg-black opacity-50 size-full'
            initial={{opacity: 0}} 
            animate={{opacity: .5, transition: {duration: 1}}}
        ></motion.div>
        <motion.div className='absolute w-[1000px] h-[700px] flex justify-center items-center bg-gray-700 rounded-3xl text-gray-200'
            initial={{y: -300, opacity: 0}}  
            animate={{y: 0, opacity: 1, transition: {duration: 1.5, delay: .4, ease: 'easeInOut'}}}
        >
            <form className='flex justify-between items-center flex-col h-[90%]' onSubmit={handleSubmit(submity)}>
                <div className='w-[700px] h-[80px]'>
                    <motion.div className='h-[50px] w-full bg-gray-800 rounded-full flex items-center px-6'
                        initial={{y: 50, opacity: 0}} 
                        animate={{y: 0, opacity: 1, transition: {duration: 1, delay: 1, ease: 'easeInOut'}}}
                    >
                      <label htmlFor="title">Title:</label><input className='ml-3 outline-none w-[600px]' type="text" id='title' {...register('title', {required: 'Title is required', minLength:{value: 4, message: 'Title must be at least 4 characters'}})} />
                    </motion.div>
                    {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                </div>
                <motion.div className='w-[700px] h-[420px] bg-gray-800 rounded-2xl p-4 '
                    initial={{y: 50, opacity: 0}} 
                    animate={{y: 0, opacity: 1, transition: {duration: 1, delay: 1.2, ease: 'easeInOut'}}}
                >
                    <label htmlFor="description">Description:</label>
                    <textarea className='h-[400px] block ml-3 outline-none w-[600px] resize-none' id='description' {...register('description', {required: 'Description is required', minLength:{value: 10, message: 'Descrition must be at least 10 characters'}})} />
                </motion.div>
                {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                <div className='flex justify-between items-center w-[700px]'>
                    <motion.button className='w-[320px] h-[50px] rounded-full bg-gray-600' onClick={() => setIsChanging(false)} type='button'
                        initial={{x: -100, opacity: 0}}     
                        animate={{x: 0, opacity: 1, transition: {duration: 1, delay: 1.4, ease: 'easeInOut'}}}
                    >Back</motion.button>
                    <motion.button className='w-[320px] h-[50px] rounded-full bg-gray-600' type='submit'
                        initial={{x: 100, opacity: 0}} 
                        animate={{x: 0, opacity: 1, transition: {duration: 1, delay: 1.6, ease: 'easeInOut'}}}
                    >Change</motion.button>
                </div>
            </form>
        </motion.div>
    </motion.div>

  )

}

export default ChangingModal