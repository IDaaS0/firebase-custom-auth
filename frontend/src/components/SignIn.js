import { useHistory } from 'react-router-dom';
import { auth, provider } from '../firebase';
import { useState } from 'react';
import Cookies from 'js-cookie';

const SignIn = () => {
    const history = useHistory();
    const [error, setError] = useState('');

    if (history.location.hash === "#success") {
        auth.signInWithCustomToken(Cookies.get('custom_token'))
            .then((userCredential) => {
                window.close();
            }).catch((error) => {
                window.close();
            })
    }
    
    const handleLogin = async (event) => {
        try {
            await auth.signInWithPopup(provider);
            history.push('/');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSlackLogin = async (event) => {
        event.preventDefault();
        const windowSentry = () => {
            let win1 =  window.open(
                `https://slack.com/oauth/authorize?client_id=${process.env.REACT_APP_SLACK_CLIENT_ID}&scope=identity.basic&redirect_uri=${process.env.REACT_APP_SLACK_REDIRECT}`,
                null,
                "width=400,height=600"
            )
            const check = () => {
                console.log(win1.closed)
                const timeoutId = setTimeout(check, 1000);
                if (win1.closed) {
                    window.location.reload();
                    clearTimeout(timeoutId);
                }
            }
            check();
        }
        windowSentry();
    }

    return (
        <div>
            <h1>ログイン</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleLogin}>Googleログイン</button>
            <button onClick={handleSlackLogin}>Slackログイン</button>
        </div>
    );
};

export default SignIn;