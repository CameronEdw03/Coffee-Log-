import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LogIn() {
  const [screen, setScreen] = useState(1);
  const [fade, setFade] = useState(false);
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleNext = () => {
    setFade(true);
    setTimeout(() => {
      setScreen((prev) => prev + 1);
      setFade(false);
    }, 500);
  };
  
  const navigate = useNavigate()

  const handleSignIn = () => {
    if( username === '' || password === '') {
        alert('Please fill out all fields')
    } else {
        navigate('/Home')
    }
    
  }



  const renderScreen = () => {
    if (screen === 1) {
      return (
        <>
          <img
            src="/HeaderPageOne.svg"
            alt="header"
            className="w-200px -mt-12 h-auto"
          />
          <button className="cursor-pointer" onClick={handleNext}>
            <img src="/NextBtn.svg" alt="next btn" className="mt-10" />
          </button>
        </>
      );
    }

    if (screen === 2) {
      return (
        <>
          <img
            src="/QuestionOne.svg"
            alt="question-one"
            className="w-200px -mt-90 h-auto"
          />
          {['Once a day', 'Once a week', 'Twice a day', 'New to coffee'].map(
            (text, idx) => (
              <button
                key={idx}
                className="mt-5 w-[300px] h-[50px] text-[25px] transition-all duration-300 hover:rounded-md hover:bg-orange-300 hover:text-black cursor-pointer"
                onClick={handleNext}
              >
                {String.fromCharCode(65 + idx)}. {text}
              </button>
            )
          )}
        </>
      );
    }

    if (screen === 3) {
      return (
        <>
          <img
            src="/QuestionTwo.svg"
            alt="question-two"
            className="w-200px -mt-90 h-auto"
          />
          {['Esspreso', 'French Press', 'Pour Over',].map((text, idx) => (
            <button
              key={idx}
              className="mt-5 w-[300px] h-[50px] text-[25px] transition-all duration-300 hover:rounded-md hover:bg-orange-300 hover:text-black cursor-pointer"
              onClick={handleNext}
            >
              {String.fromCharCode(65 + idx)}. {text}
            </button>
          ))}
        </>
      );
    }

    if (screen === 4) {
      return (
        <>
          <img
            src="/SignIn.svg"
            alt="sign-in"
            className="w-200px -mt-90 h-auto mb-8"
          />
          <input
            type="text"
            placeholder="Username"
            className="mb-4 w-[300px] h-[50px] px-4 text-[18px] border-none focus:border-black rounded-md"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 w-[300px] h-[50px] px-4 text-[18px] border-none  rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="mt-2 w-[300px] h-[50px] text-[20px] bg-orange-300 text-black rounded-md hover:bg-orange-400 transition-all duration-300 cursor-pointer"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </>
      );
    }

    return <p>Screen not found</p>;
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen transition-opacity duration-500 ${
        fade ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {renderScreen()}
    </div>
  );
}

export default LogIn;


