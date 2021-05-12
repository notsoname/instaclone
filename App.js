import { Route } from 'react-router';
import './App.css';
import Login from './Auth/Login/Login';
import PrivateRoutes from './Auth/PrivateRoutes/PrivateRoutes';
import SignUp from './Auth/SignUp/SignUp';
import Content from './components/Content/Content';
import Header from './components/Header/Header';
import OnePost from './components/onePost/OnePost';
import UserProfile from './components/UserProfile/UserProfile';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div>
        <AuthProvider>
            <PrivateRoutes path='/' component={Header}/>
            <div className="App">
              <Route exact path='/login' component={Login}/>
              <Route exact path='/signUp' component={SignUp}/>
              <Route exact path='/profile/:id' render={
                ({match}) => {
                  const {id} = match.params
                  return <UserProfile id={id}/>
                }
              }/>
              <PrivateRoutes exact path='/' component={Content}/>
              <Route exact path='/post/:id' render={
                ({match}) => {
                  console.log(match)
                  const {id} = match.params;
                return <OnePost id={id}/>
                }
              }/>
            </div>
        </AuthProvider>
    </div>
  );
}

export default App;
