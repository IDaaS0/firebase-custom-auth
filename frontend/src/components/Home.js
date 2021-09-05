import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

const Home = () => {
    const history = useHistory();
    const handleLogout = () => {
        auth.signOut();
        history.push('/signin');
    };

    return (
        <div>
            <h1>ホームページ</h1>
            <button onClick={handleLogout}>ログアウト</button>
        </div>
    )
};

export default Home;