import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <AuthProvider>
      <div style={{ margin: '2em' }}>
        <BrowserRouter>
          <PrivateRoute exact path="/" component={Home} />
          <PublicRoute exact path="/signin" component={SignIn} />
          <PublicRoute exact path="/signin#success" component={SignIn} />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
