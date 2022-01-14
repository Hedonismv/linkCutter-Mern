import "materialize-css"
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

function App() {
    const {token, userId, logOut, login, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    if(!ready){
        return <Loader/>
    }
    return (
        <AuthContext.Provider value={{
            token, userId, logOut, login, isAuthenticated
        }}>
            {isAuthenticated && <Navbar/>}
            <div className={'container'}>
                {routes}
            </div>
        </AuthContext.Provider>
    );
}

export default App;
