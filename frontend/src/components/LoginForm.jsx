import { useState } from 'react';

function LoginForm({ onShowRegistration }) {
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setMessage('入力内容を確認しました。認証 API の接続後にログインできるようになります。');
  }

  return (
    <div className="auth-card">
      <header className="form-header">
        <p className="form-kicker">WELCOME BACK</p>
        <h2>ログイン</h2>
        <p>おかえりなさい。続きから目標を育てましょう。</p>
      </header>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="login-email">
          メールアドレス
          <input id="login-email" name="email" type="email" autoComplete="email" placeholder="family@example.com" required />
        </label>
        <label htmlFor="login-password">
          パスワード
          <input id="login-password" name="password" type="password" autoComplete="current-password" placeholder="8文字以上で入力" minLength="8" required />
        </label>
        <button className="primary-button" type="submit">ログイン</button>
        {message && <p className="form-message" role="status">{message}</p>}
      </form>

      <footer className="form-footer">
        <p>アカウントをお持ちでないですか？</p>
        <button className="text-button" type="button" onClick={onShowRegistration}>新規登録</button>
      </footer>
    </div>
  );
}

export default LoginForm;
