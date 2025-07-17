import React from 'react'
import SignUp from './pages/Auth/Signup'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signin from './pages/Auth/Signin';
import Dashboard from './pages/Dashboard/page';
import SafetyCheck from './pages/SafetyCheck/page';
import PublicOnlyRoute from './Routes/PublicRoute';
import Tasks from './pages/Dashboard/Tasks/page';
import TrainingHub from './pages/Dashboard/Training/page';
import MachineAnalytics from './pages/Dashboard/Analytics/page';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/auth/signup' element={<PublicOnlyRoute><SignUp/></PublicOnlyRoute>}/>
        <Route path='/auth/signin' element={<PublicOnlyRoute><Signin/></PublicOnlyRoute>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/safetycheck' element={<SafetyCheck />} />
        <Route path='/tasks' element={<Tasks />} />
        <Route path='/training' element={<TrainingHub />} />
        <Route path='/analytics' element={<MachineAnalytics />} />
      </Routes>
      <ToastContainer/>
    </div>
  )
}

export default App