import React, { useState } from 'react';
import api from '../services/api';

interface AuthFormProps {
  onLogin: (token: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('wojtek');
  const [password, setPassword] = useState<string>('admin');
  const [email, setEmail] = useState<string>('');
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isRegister) {
      await api.register({ username, password, email });
    } else {
      const token = await api.login({ username, password });
      
      onLogin(token);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded w-full">
      <h2 className="text-xl mb-4">{isRegister ? 'Register' : 'Login'}</h2>
      {isRegister && (
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
      )}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        {isRegister ? 'Register' : 'Login'}
      </button>
      <p className="mt-4 text-center">
        {isRegister ? 'Already have an account?' : "Don't have an account?"}
        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          className="text-blue-500 ml-2"
        >
          {isRegister ? 'Login' : 'Register'}
        </button>
      </p>
    </form>
  );
};

export default AuthForm;