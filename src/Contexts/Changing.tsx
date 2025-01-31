import { createContext, useState } from "react";

export type changingContext = {
    changingId: number;
    isChanging: boolean;
    setChangingId: (arg: number) => void;
    setIsChanging: (arg: boolean) => void;
}

type props = {
    children: React.ReactNode;
}

export const changingContext = createContext<changingContext>({changingId: 0, isChanging: false, setChangingId: () => {}, setIsChanging: () => {}})

const Changing: React.FC<props> = ({children}) => {

  const [isChanging, setIsChanging] = useState<boolean>(false)
  const [changingId, setChangingId] = useState<number>(0)

  return (

    <changingContext.Provider value={{changingId: changingId, isChanging: isChanging, setChangingId: setChangingId, setIsChanging: setIsChanging}}>
        {children}
    </changingContext.Provider>

  )

}

export default Changing