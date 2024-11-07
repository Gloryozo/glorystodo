import { Link, useNavigate } from 'react-router-dom';
import './Authentication.css';
import React from 'react';
import { useUser } from '../context/useUser';

export const AuthenticationMode = Object.freeze({
    Login: 'login',
    Register: 'Register',
});

export default function Authentication({authenticationMode}) {
    const { user, setUser, signUp, signIn } = useUser()
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            if (authenticationMode === AuthenticationMode.Register) {
                await signUp()
                navigate('/signin')
            } else {
                await signIn()
                navigate('/')
            }
        } catch (error) {
          const message = error.response && error.response.data ? error.response.data.error : error
          alert(message)
        }
     }
  return (
    <div className="auth-container">
        <h3>{authenticationMode === AuthenticationMode.Login ? 'Sign in' : 'Sign up'}</h3>
      <form onSubmit={handleSubmit}>
        <div>
            <label>Email</label>
            <input type="email" placeholder="Email" value={user.email} onChange={e => setUser({...user, email: e.target.value})} />
        </div>
        <div>
            <label>Password</label>
            <input type="password" placeholder="Password" value={user.password} onChange={e => setUser({...user, password: e.target.value})} />
        </div>
        <div>
            <button type="submit">{authenticationMode === AuthenticationMode.Login ? 'Login' : 'Submit'}</button>
        </div>
        <div>
           <Link to={authenticationMode === AuthenticationMode.Login ? 'No account? Sign up' :'Already signed up? Sign in'}>
                {authenticationMode === AuthenticationMode.Login ? 'Sign up' : 'Sign in'}
            </Link>
        </div>
      </form>
    </div>
  );
}