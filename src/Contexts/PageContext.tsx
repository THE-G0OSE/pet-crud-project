import { createContext, FC, ReactNode, useState } from "react"


export type pageContextType = {
    page: 'home' | 'profile' | 'my';
    set: (arg: 'home' | 'profile' | 'my') => void;
}

interface props {
    children: ReactNode;
}

export const pageContext = createContext<pageContextType>({page:'home', set: () => {}})

const PageContext: FC<props> = ({children}) => {
    
    const [page, setPage] = useState<'home' | 'profile' | 'my'>('home')

  return (

    <pageContext.Provider value={{page: page, set: setPage}}>
        {children}
    </pageContext.Provider>

  )

}

export default PageContext