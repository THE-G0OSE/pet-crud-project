import { createContext, FC, ReactNode, useState } from "react"

type profile = {
    id: number;
    username: string;
    password: string;
    email: string;
    profileImage: string;
    bannerImage: string;
    isLogin: boolean;
}

export interface profileContext {
    profile: profile;
    set: (arg: profile) => void;
}

type props = {
    children: ReactNode;
}

export const profileContext = createContext<profileContext>({profile: {id: 0, username: '', password: '', email: '', profileImage: 'https://placeholder.apptor.studio/500/200/banner.png', bannerImage: 'https://placeholder.apptor.studio/500/200/banner.png', isLogin: false}, set: () => {}})

const ProfileContext: FC<props> = ({children}) => {

    const [profile, setProfile] = useState<profile>({id: 0, username: '', password: '', email: '', profileImage: 'https://placeholder.apptor.studio/500/200/banner.png', bannerImage: 'https://placeholder.apptor.studio/500/200/banner.png', isLogin: false})

  return (

    <profileContext.Provider value={{profile: profile, set: setProfile}}>
        {children}
    </profileContext.Provider>

  )

}

export default ProfileContext