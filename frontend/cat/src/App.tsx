import SignUp from './pages/Auth/Signup'
import { Route,Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signin from './pages/Auth/Signin';
import Dashboard from './pages/Dashboard/page';
import SafetyCheck from './pages/SafetyCheck/page';
import PublicOnlyRoute from './Routes/PublicRoute';
import Tasks from './pages/Dashboard/Tasks/page';
import TrainingHub from './pages/Dashboard/Training/page';
import MachineAnalytics from './pages/Dashboard/Analytics/page';
import Incidents from './pages/Dashboard/Incidents/page';
import { Navigate } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigate to="/auth/signin" />} />
        <Route path='/auth/signup' element={<PublicOnlyRoute><SignUp/></PublicOnlyRoute>}/>
        <Route path='/auth/signin' element={<PublicOnlyRoute><Signin/></PublicOnlyRoute>}/>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/safetycheck' element={<SafetyCheck />} />
        <Route path='/tasks' element={<Tasks />} />
        <Route path='/training' element={<TrainingHub />} />
        <Route path='/analytics' element={<MachineAnalytics />} />
        <Route path='/incidents' element={<Incidents />} />
      </Routes>
      <ToastContainer/>
    </div>
  )
}

export default App