import { useState } from 'react';
import LoginForm from './components/LoginForm.jsx';
import RegistrationForm from './components/RegistrationForm.jsx';

function App() {
  const [screen, setScreen] = useState('login');

  return (
    <main className="auth-layout">
      <section className="auth-intro" aria-labelledby="service-name">
        <a className="brand" href="#top" onClick={(event) => event.preventDefault()}>
          <span className="brand-mark" aria-hidden="true">FG</span>
          <span id="service-name">Family Goals</span>
        </a>
        <div className="intro-copy">
          <p className="eyebrow">家族の毎日に、小さな達成を。</p>
          <h1>同じ目標を、
            <br />いっしょに育てよう。</h1>
          <p>家族の目標や習慣を共有して、日々のがんばりを応援し合える場所です。</p>
        </div>
        <div className="intro-decoration" aria-hidden="true">
          <span>✦</span><span>●</span><span>✦</span>
        </div>
      </section>

      <section className="auth-panel" aria-live="polite">
        {screen === 'login' ? (
          <LoginForm onShowRegistration={() => setScreen('registration')} />
        ) : (
          <RegistrationForm onShowLogin={() => setScreen('login')} />
        )}
      </section>
    </main>
  );
}

export default App;
