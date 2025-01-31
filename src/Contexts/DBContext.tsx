import { createContext, FC, useState } from "react";

export type DB ={
    createUser: (username: string, email: string, password: string) => void;
    db: db;
    setdb: (db:db) => void;
    posts: posts;
    setPosts: (posts: posts) => void;
}

type db = {id: number, username: string, email: string, password: string, profileImage: string, bannerImage: string}[]
type posts = {id: number, title: string, description: string, creator: number}[]



export const DBcontext = createContext<DB>({createUser: () => {}, db: [], setdb: () => {}, posts: [], setPosts: () => {}})

type props = {
    children: React.ReactNode;
}

const DBContext: FC<props> = ({children}) => {
    
    const [db, setdb] = useState<db>([])
    const [posts, setPosts] = useState<posts>([])

    const createUser = (username: string, email: string, password: string) => {
        setdb([...db, {id: db.length + 1, username: username, email: email, password: password, profileImage: '', bannerImage: ''}])
    }

  return (

    <DBcontext.Provider value={{createUser: createUser, db: db, setdb: setdb, posts: posts, setPosts: setPosts}}>
      {children}
    </DBcontext.Provider>

  )

}

export default DBContext