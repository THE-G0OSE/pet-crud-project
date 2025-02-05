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

    <form onSubmit={handleSubmit(submity)} className='size-full flex flex-col justify-center items-center'>
      <div className='w-[600px] h-[100px] flex flex-col justify-around'>
        <div className='flex justify-between items-center pl-3 pr-3 w-full h-[50px] rounded-2xl bg-gray-800'><label className='text-gray-200  font-bold' htmlFor="email">Email: </label> <input className='outline-none w-[490px] text-gray-200'  id='email' type="text" {...register('email', {required: 'Email is required'})} /></div>
        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
      </div>
      <div className='w-[600px] h-[100px] flex flex-col justify-around'>
        <div className='flex justify-between items-center pl-3 pr-3 w-full h-[50px] rounded-2xl bg-gray-800'><label className='text-gray-200  font-bold' htmlFor="password">Password: </label> 
          <input className='outline-none w-[400px] text-gray-200 ' id='password' type={showPass ? 'text' : 'password'}{...register('password', {required: 'Password is required'})} />
          <button onClick={() => setShowPass(!showPass)} type='button' className='inline-flex justify-center items-center'>{showPass ? <LuEyeClosed className='text-2xl text-white' /> : <LuEye className='text-2xl text-white'/>}</button>
        </div>
        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
      </div>

      <div className='w-[600px] h-[100px] flex flex-col justify-around'>
        <div className='flex justify-between w-full'>
          <button onClick={back} className='text-gray-200 flex justify-center items-center rounded-2xl bg-gray-800 w-[250px] py-3  mt-[30px]' type='button'>Back</button>
          <button className='flex justify-center items-center text-gray-200 rounded-2xl bg-gray-700 w-[250px] py-3  mt-[30px]' type='submit'>{isSubmitting ? 'Loading...' : 'Log in'}</button>
        </div>
        {error !== '' && <p className='text-red-500'>{error}</p>}
      </div>
    </form>

  )

}

export default Login