/* ============================================
   DummyStore — Auth Logic (Login & Signup)
   ============================================ */

// ── Toggle Password Visibility ──
function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    btn.innerHTML = icons.eye;
  } else {
    input.type = 'password';
    btn.innerHTML = icons.eye;
  }
}

// ── Login Handler ──
async function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  const errorEl = document.getElementById('login-error');
  const btnText = document.getElementById('login-btn-text');
  const spinner = document.getElementById('login-spinner');
  const btn = document.getElementById('login-btn');

  // Reset error
  errorEl.classList.add('hidden');
  errorEl.textContent = '';

  // Validate
  if (!username || !password) {
    errorEl.textContent = 'Please fill in all fields.';
    errorEl.classList.remove('hidden');
    return;
  }

  // Show loading
  btnText.classList.add('hidden');
  spinner.classList.remove('hidden');
  btn.disabled = true;

  try {
    const data = await api.login(username, password);

    // Store tokens and user data
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('loggedUser', JSON.stringify({
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      image: data.image,
    }));

    showToast(`Welcome back, ${data.firstName}!`, 'success');

    // Redirect after short delay
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 800);
  } catch (err) {
    errorEl.textContent = err.message || 'Invalid username or password. Please try again.';
    errorEl.classList.remove('hidden');
  } finally {
    btnText.classList.remove('hidden');
    spinner.classList.add('hidden');
    btn.disabled = false;
  }
}

// ── Signup Handler ──
async function handleSignup(event) {
  event.preventDefault();

  const firstName = document.getElementById('signup-firstname').value.trim();
  const lastName = document.getElementById('signup-lastname').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const username = document.getElementById('signup-username').value.trim();
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;
  const errorEl = document.getElementById('signup-error');
  const btnText = document.getElementById('signup-btn-text');
  const spinner = document.getElementById('signup-spinner');
  const btn = document.getElementById('signup-btn');

  // Reset error
  errorEl.classList.add('hidden');
  errorEl.textContent = '';

  // Validate
  if (!firstName || !lastName || !email || !username || !password) {
    errorEl.textContent = 'Please fill in all fields.';
    errorEl.classList.remove('hidden');
    return;
  }
  if (password !== confirm) {
    errorEl.textContent = 'Passwords do not match.';
    errorEl.classList.remove('hidden');
    return;
  }
  if (password.length < 6) {
    errorEl.textContent = 'Password must be at least 6 characters.';
    errorEl.classList.remove('hidden');
    return;
  }

  // Show loading
  btnText.classList.add('hidden');
  spinner.classList.remove('hidden');
  btn.disabled = true;

  try {
    const data = await api.signup({ firstName, lastName, email, username, password });

    showToast('Account created successfully! Please login.', 'success');

    // Redirect to login after short delay
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1200);
  } catch (err) {
    errorEl.textContent = err.message || 'Signup failed. Please try again.';
    errorEl.classList.remove('hidden');
  } finally {
    btnText.classList.remove('hidden');
    spinner.classList.add('hidden');
    btn.disabled = false;
  }
}

// ── Redirect if already logged in ──
document.addEventListener('DOMContentLoaded', () => {
  if (isLoggedIn()) {
    const path = window.location.pathname;
    if (path.includes('login') || path.includes('signup')) {
      // Already logged in, show info
      showToast('You are already logged in!', 'success');
    }
  }
});
