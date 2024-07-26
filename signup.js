const users = JSON.parse(localStorage.getItem('users')) || [];

document.getElementById('check-username-btn').addEventListener('click', function() {
  const username = document.getElementById('username').value;
  const result = users.some(user => user.username === username) ? '이미 사용 중인 아이디입니다.' : '사용 가능한 아이디입니다.';
  document.getElementById('username-check-result').textContent = result;
});

document.getElementById('signup-btn').addEventListener('click', function() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!username || !password) {
    document.getElementById('signup-result').textContent = '아이디와 비밀번호를 입력해주세요.';
    return;
  }

  if (password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
    document.getElementById('signup-result').textContent = '비밀번호는 최소 8자 이상이어야 하며, 숫자와 특수 문자가 포함되어야 합니다.';
    return;
  }

  if (users.some(user => user.username === username)) {
    document.getElementById('signup-result').textContent = '이미 사용 중인 아이디입니다.';
    return;
  }

  users.push({ username, password });
  localStorage.setItem('users', JSON.stringify(users));
  document.getElementById('signup-result').textContent = '회원가입이 완료되었습니다.';
});
