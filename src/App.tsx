import Main from './components/Main'
import Preview from './components/Preview'
import Changing from './Contexts/Changing';
import DBContext from './Contexts/DBContext';
import PageContext from './Contexts/PageContext'
import PopUpContext from './Contexts/PopUpContext';
import ProfileContext from './Contexts/ProfileContext'

const App = () => {

  return (

    <div className='h-[10000px] w-screen bg-black'>
      <PageContext><ProfileContext><DBContext><Changing><PopUpContext>
        <Preview/>
        <Main/>
      </PopUpContext></Changing></DBContext></ProfileContext></PageContext>
    </div>

  )

}

export default App