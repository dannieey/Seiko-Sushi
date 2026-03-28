const authForm = document.getElementById('auth-form');
const toggleBtn = document.getElementById('toggle-auth');
const usernameGroup = document.getElementById('username-group');
const subtitle = document.getElementById('auth-subtitle');

let isLoginMode = true;

toggleBtn.onclick = () => {
    isLoginMode = !isLoginMode;
    usernameGroup.classList.toggle('hidden');
    subtitle.innerText = isLoginMode ? 'Welcome Back' : 'Create Your Account';
    toggleBtn.innerHTML = isLoginMode
        ? 'New to Seiko? <span class="text-red-600 font-semibold">Create Account</span>'
        : 'Already have an account? <span class="text-red-600 font-semibold">Sign In</span>';
};

authForm.onsubmit = async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;

    const endpoint = isLoginMode ? '/auth/login' : '/auth/register';
    const body = isLoginMode ? { email, password } : { username, email, password };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);


            localStorage.setItem('user', JSON.stringify(data));

            alert(isLoginMode ? 'Successfully logged in!' : 'Account created!');
            window.location.href = 'index.html';
        } else {
            alert(data.message || 'Authentication failed');
        }
    } catch (err) {
        console.error("Auth error:", err);
        alert("Server error. Please try again later.");
    }
};