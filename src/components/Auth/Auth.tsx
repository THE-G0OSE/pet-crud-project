import { useState } from 'react'
import Choice from './Choice'
import Login from './Login'
import Registration from './Registration'

const Auth = () => {

    const [phase, setPhase] = useState<'choice' | 'register' | 'login'>('choice')

    const renderPage = (page: 'choice' | 'register' | 'login') => {
      switch(page){
        case 'choice':
          return <Choice setPhase={setPhase}/>
        case 'login':
          return <Login setPhase={setPhase}/>
        case 'register':
          return <Registration setPhase={setPhase}/>
      }
    }

  return (

    <div className='size-full'>
      {renderPage(phase)}
    </div>

  )

}

export default Auth