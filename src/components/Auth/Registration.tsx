import {motion} from 'framer-motion'
import { FC, useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { DB, DBcontext } from '../../Contexts/DBContext';
import { profileContext } from '../../Contexts/ProfileContext';

type form = {
  username: string;
  password: string;
  repeat: string;
  email: string;

}

type props ={
  setPhase: (arg: 'choice' | 'register' | 'login') => void
}

const Registration: FC<props> = ({setPhase}) => {

  const DB = useContext<DB>(DBcontext)
  const profile = useContext<profileContext>(profileContext)

  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<form>()
  const [errorState, setError] = useState<string>('')

  const [showPass, setShowPass] = useState<boolean>(false)
  const [showRepeat, setShowRepeat] = useState<boolean>(false)

  const back = () => {
    setPhase('choice')
  }

  const onSubmit: SubmitHandler<form> = (data) => {
    if(data.repeat != data.password){
      setError('passwords didn\'t match') 
    } else if(DB.db.filter((user) => {if (user.username === data.username)return user}).length > 0) {
      setError('username already taken')
    } else if(DB.db.filter((user) => {if (user.email === data.email)return user}).length > 0) {
      setError('email already used')
    } else {
      setError('')
      DB.createUser(data.username, data.email, data.password)
      profile.set({id: DB.db.length + 1, isLogin: true, username: data.username, email: data.email, password: data.password, profileImage: '', bannerImage: ''})
      setPhase('choice')
      console.log(DB.db)
    }
  }

  return (

    <motion.form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center size-full'
      initial={{opacity: 0, y: 0}} 
      animate={{opacity: 1, y: 0, transition: {duration: 1, delay: 2, ease: 'easeInOut'}}}
      exit={{opacity: 0, y: 100, transition: {duration: 1, ease: 'easeInOut'}}}
    >
      <motion.label htmlFor="username" className='w-[600px] h-[100px] p-3'
        initial={{x: 100, opacity: 0}} 
        animate={{x: 0, opacity: 1, transition: {duration: 1, delay: 2, ease: 'easeInOut'}}}
      >
        <div className='bg-gray-800 p-3 rounded-2xl font-bold flex justify-between items-center'><span className='text-white' >Username: </span>
        <input className='font-light text-white outline-none w-[440px]' id='username' type="text" {...register('username', {required: 'Username is required'})} /></div>
        {errors.username && <p className='text-red-500'>{errors.username.message}</p>}
      </motion.label>
      <motion.label htmlFor="email" className='w-[600px] h-[100px] p-3'
        initial={{x: -100, opacity: 0}} 
        animate={{x: 0, opacity: 1, transition: {duration: 1, delay: 2.2, ease: 'easeInOut'}}}
      >
        <div className='bg-gray-800 p-3 rounded-2xl font-bold flex justify-between items-center'><span className='text-white' >Email: </span>
        <input className='font-light text-white outline-none w-[500px]' id='email' type="email" {...register('email', {required: 'Email is required'})} /></div>
        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
      </motion.label>
      <motion.label htmlFor="password" className='w-[600px] h-[100px] p-3'
        initial={{x: 100, opacity: 0}} 
        animate={{x: 0, opacity: 1, transition: {duration: 1, delay: 2.4, ease: 'easeInOut'}}}
      >
        <div className='bg-gray-800 p-3 rounded-2xl font-bold flex justify-between items-center'><span className='text-white' >Password: </span>
        <div className='inline-flex justify-between items-center'>
          <input className='font-light text-white outline-none w-[400px]' id='password' type={showPass ? 'text' : 'password'} {...register('password', {required: 'Password is required', minLength: {value: 8, message: 'Password must be at least 8 characters'}})} /></div>
          <button onClick={() => setShowPass(!showPass)} type='button' className='inline-flex justify-center items-center'>{showPass ? <LuEyeClosed className='text-2xl text-white' /> : <LuEye className='text-2xl text-white'/>}</button>
        </div>
        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
      </motion.label>
      <motion.label htmlFor="repeat" className='w-[600px] h-[100px] p-3'
        initial={{x: -100, opacity: 0}} 
        animate={{x: 0, opacity: 1, transition: {duration: 1, delay: 2.6, ease: 'easeInOut'}}}
      >
        <div className='bg-gray-800 p-3 rounded-2xl font-bold flex justify-between items-center'><span className='text-white' >Repeat password: </span>
        <div className='inline-flex justify-between items-center'>
          <input className='font-light text-white outline-none w-[350px]' id='repeat' type={showRepeat ? 'text' : 'password'} {...register('repeat', {required: 'Repeat password'})} /></div>
          <button onClick={() => setShowRepeat(!showRepeat)} type='button' className='inline-flex justify-center items-center'>{showRepeat ? <LuEyeClosed className='text-2xl text-white' /> : <LuEye className='text-2xl text-white'/>}</button>
        </div>       
        {errors.repeat && <p className='text-red-500'>{errors.repeat.message}</p>}
        {errorState !== '' && <p className='text-red-500'>{errorState}</p>}
      </motion.label>
      <div className='flex justify-between w-[580px]'>
        <motion.button onClick={back} className='m-t-4 text-white h-[50px] w-[270px] bg-gray-800 rounded-2xl' type='button'
          initial={{y: 50, opacity: 0}} 
          animate={{y:0, opacity: 1, transition: {duration: 1, delay: 2.8, ease: 'easeInOut'}}}
        >Back</motion.button>
        <motion.button className='m-t-4 text-white h-[50px] w-[270px] bg-gray-700 rounded-2xl' type='submit'
          initial={{y: 50, opacity: 0}} 
          animate={{y:0, opacity: 1, transition: {duration: 1, delay: 3, ease: 'easeInOut'}}}
        >{isSubmitting ? 'Loading...' : 'Register'}</motion.button>
      </div>
    </motion.form>

  )

}

export default Registration