import Main from './components/Main'
import Preview from './components/Preview'
import DBContext from './Contexts/DBContext';
import PageContext from './Contexts/PageContext'
import ProfileContext from './Contexts/ProfileContext'

const App = () => {

  return (

    <div className='h-[10000px] w-screen bg-black'>
      <PageContext><ProfileContext><DBContext>
        <Preview/>
        <Main/>
      </DBContext></ProfileContext></PageContext>
    </div>

  )

}

export default App