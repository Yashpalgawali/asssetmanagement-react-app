import { BrowserRouter,  Navigate, Route,  Routes } from 'react-router-dom'
import './ToDoApp.css'
import LogoutComponent from './LogoutComponent'
import FooterComponent from './FooterComponent'
import HeaderComponent from './HeaderComponent'
import ListToDoComponent from './ListToDoComponent'
import WelcomeComponent from './WelcomeComponent'
import ErrorComponent from './ErrorComponent' 
import LoginComponent from './LoginComponent'
import AuthProvider, { useAuth } from './Security/AuthContext'


function AuthenticatedRoute({children}) {
    const authContext = useAuth()
    if(authContext.isAuthenticated)
    {
        return children
    }
    else {
        return <Navigate to='/' />
    }

}

export default function ToDoApp() {
    return(
        <div className="ToDoApp">
          
          <AuthProvider>
            <BrowserRouter>
            <HeaderComponent />
                <Routes>
                    <Route path='/' element={<LoginComponent />}></Route>
                    <Route path='/login' element={
                        <AuthenticatedRoute> 
                            <LoginComponent />
                        </AuthenticatedRoute> 
                    }></Route>
                    {/* <Route path='/welcome' element={<WelComponent />}></Route> */}
                    {/* With parameters */}
                    <Route path='/welcome/:username' element={
                        <AuthenticatedRoute> 
                            <WelcomeComponent />
                        </AuthenticatedRoute>
                      }>
                    </Route>
                    <Route path='/todos' element={
                        <AuthenticatedRoute> 
                            <ListToDoComponent />
                        </AuthenticatedRoute>     
                        }></Route>
                    <Route path='/logout' element={
                        <AuthenticatedRoute> 
                            <LogoutComponent />
                        </AuthenticatedRoute> 
                    }></Route>

                    <Route path='*' element={<ErrorComponent />}></Route>
                </Routes>
                <FooterComponent />
            </BrowserRouter>
            </AuthProvider>
        </div>
    )
}

