import { useState } from 'react';

function RegistrationForm({ onShowLogin }) {
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    if (form.get('password') !== form.get('passwordConfirmation')) {
      setMessage('パスワードと確認用パスワードが一致していません。');
      return;
    }

    setMessage('入力内容を確認しました。認証 API の接続後に登録できるようになります。');
  }

  return (
    <div className="auth-card">
      <header className="form-header">
        <p className="form-kicker">CREATE ACCOUNT</p>
        <h2>新規登録</h2>
        <p>はじめに、あなたのアカウントを作成しましょう。</p>
      </header>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="registration-name">
          お名前
          <input id="registration-name" name="name" type="text" autoComplete="name" placeholder="山田 花子" required />
        </label>
        <label htmlFor="registration-email">
          メールアドレス
          <input id="registration-email" name="email" type="email" autoComplete="email" placeholder="family@example.com" required />
        </label>
        <label htmlFor="registration-password">
          パスワード
          <input id="registration-password" name="password" type="password" autoComplete="new-password" placeholder="8文字以上で入力" minLength="8" required />
        </label>
        <label htmlFor="registration-password-confirmation">
          パスワード確認
          <input id="registration-password-confirmation" name="passwordConfirmation" type="password" autoComplete="new-password" placeholder="もう一度入力" minLength="8" required />
        </label>
        <button className="primary-button" type="submit">アカウントを作成</button>
        {message && <p className="form-message" role="status">{message}</p>}
      </form>

      <footer className="form-footer">
        <p>すでにアカウントをお持ちですか？</p>
        <button className="text-button" type="button" onClick={onShowLogin}>ログインへ戻る</button>
      </footer>
    </div>
  );
}

export default RegistrationForm;
