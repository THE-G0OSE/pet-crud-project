import {motion} from 'framer-motion'
import { FC, useContext, useState } from 'react';
import { useForm } from 'react-hook-form'
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { DB, DBcontext } from '../../Contexts/DBContext';
import { profileContext } from '../../Contexts/ProfileContext';

type form = {
  email: string;
  password: string
}

type props ={ 
  setPhase: (phase: 'choice' | 'login' | 'register') => void
}

const Login: FC<props> = ({setPhase}) => {

  const db = useContext<DB>(DBcontext)
  const profile = useContext<profileContext>(profileContext)

  const {register, handleSubmit, formState: { errors, isSubmitting }} = useForm<form>()

  const submity = (data: form)  => {
    const result = db.db.filter((user) => {if(user.email === data.email) return user})
    if(result.length > 0) {
      if ( data.password === result[0].password){

      setError('')
      profile.set({...result[0], isLogin: true})
      } else {
        setError('password doesn\'t match')
      }
    } else {
      setError('accout doesn\'t exist')
    }
  }

  const back = () => {
    setPhase('choice')
  }

  const [showPass, setShowPass] = useState<boolean>(false)

  const [error, setError] = useState<string>('')

  return (

    <motion.form key='loginform' onSubmit={handleSubmit(submity)} className='flex flex-col items-center justify-center size-full'
      initial={{opacity: 0, y: 0}}
      animate={{opacity: 1, y: 0, transition: {duration: 1, delay: 1, ease: 'easeInOut'}}}
      exit={{opacity: 0, y: 100, transition: {duration: 1, ease: 'easeInOut'}}}
    >
      <div className='w-[600px] h-[100px] flex flex-col justify-around'>
        <motion.div className='flex justify-between items-center pl-3 pr-3 w-full h-[50px] rounded-2xl bg-gray-800'
          initial={{y: 50, opacity: 0}} 
          animate={{y:0, opacity: 1, transition: { duration: 1, delay: 1,ease: 'easeInOut'}}}
        ><label className='font-bold text-gray-200' htmlFor="email">Email: </label> <input className='outline-none w-[490px] text-gray-200'  id='email' type="text" {...register('email', {required: 'Email is required'})} /></motion.div>
        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
      </div>
      <div className='w-[600px] h-[100px] flex flex-col justify-around'>
        <motion.div className='flex justify-between items-center pl-3 pr-3 w-full h-[50px] rounded-2xl bg-gray-800'
          initial={{y: 50, opacity: 0}} 
          animate={{y: 0, opacity: 1, transition: {duration: 1, delay: 1.3, ease: 'easeInOut'}}}
        ><label className='font-bold text-gray-200' htmlFor="password">Password: </label> 
          <input className='outline-none w-[400px] text-gray-200 ' id='password' type={showPass ? 'text' : 'password'}{...register('password', {required: 'Password is required'})} />
          <button onClick={() => setShowPass(!showPass)} type='button' className='inline-flex items-center justify-center'>{showPass ? <LuEyeClosed className='text-2xl text-white' /> : <LuEye className='text-2xl text-white'/>}</button>
        </motion.div>
        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
      </div>

      <div className='w-[600px] h-[100px] flex flex-col justify-around'>
        <div className='flex justify-between w-full'>
          <motion.button onClick={back} className='text-gray-200 flex justify-center items-center rounded-2xl bg-gray-800 w-[250px] py-3  mt-[30px]' type='button'
            initial={{x: -100, opacity: 0}} 
            animate={{x: 0, opacity: 1, transition: {duration: 1, delay:1.5, ease: 'easeInOut'}}}
          >Back</motion.button>
          <motion.button className='flex justify-center items-center text-gray-200 rounded-2xl bg-gray-700 w-[250px] py-3  mt-[30px]' type='submit'
            initial={{x: 100, opacity: 0}} 
            animate={{x: 0, opacity: 1, transition: {duration: 1, delay: 1.7, ease: 'easeInOut'}}}
          >{isSubmitting ? 'Loading...' : 'Log in'}</motion.button>
        </div>
        {error !== '' && <p className='text-red-500'>{error}</p>}
      </div>
    </motion.form>

  )

}

export default Login