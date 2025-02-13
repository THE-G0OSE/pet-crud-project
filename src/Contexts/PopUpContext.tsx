import { createContext, useState } from 'react'

export type popup = {
    phase: 'start' | 'end';
    setPhase: (arg: 'start' | 'end') => void;
}

export const PopUp = createContext<popup>({phase: 'start', setPhase: () => {}})

interface props {
    children: React.ReactNode
}

const PopUpContext: React.FC<props> = ({children}) => {

  const [phase, setPhase] = useState<'start' | 'end'>('start')

  return (

    <PopUp.Provider value={{phase: phase, setPhase: setPhase}}>
        {children}
    </PopUp.Provider>
    
  )

}

export default PopUpContext