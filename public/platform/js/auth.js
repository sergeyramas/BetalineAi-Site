/* ============================================================
   auth.js — Login & Registration Pages
   ============================================================ */

window.AuthPage = (() => {
    function renderLogin() {
        const { navigate, showToast, state } = window.App;

        const layout = document.createElement('div');
        layout.className = 'auth-layout';
        layout.innerHTML = `
      <!-- Left Panel -->
      <div class="auth-left">
        <div class="auth-left-bg"></div>
        <div class="auth-orb auth-orb-1"></div>
        <div class="auth-orb auth-orb-2"></div>
        <div class="auth-left-content">
          <div class="auth-brand">
            <div class="auth-brand-logo">✦</div>
            <div class="auth-brand-name">BetaLine AI</div>
          </div>
          <h1 class="auth-left-title">Создайте умного ИИ-ассистента за&nbsp;5&nbsp;минут</h1>
          <p class="auth-left-subtitle">
            Настройте чат-бота под ваш бизнес без кода. Интегрируйте с сайтом, Telegram и WhatsApp.
          </p>
          <div class="auth-features">
            <div class="auth-feature">
              <div class="auth-feature-icon">🤖</div>
              <div class="auth-feature-text">
                <strong>Без кода</strong>
                Создайте бота через простой мастер вопросов
              </div>
            </div>
            <div class="auth-feature">
              <div class="auth-feature-icon">⚡</div>
              <div class="auth-feature-text">
                <strong>Быстрый запуск</strong>
                От регистрации до первого диалога — 5 минут
              </div>
            </div>
            <div class="auth-feature">
              <div class="auth-feature-icon">📊</div>
              <div class="auth-feature-text">
                <strong>Аналитика в реальном времени</strong>
                Отслеживайте эффективность и улучшайте бота
              </div>
            </div>
            <div class="auth-feature">
              <div class="auth-feature-icon">🛡️</div>
              <div class="auth-feature-text">
                <strong>Безопасность</strong>
                Все данные шифруются и хранятся на защищённых серверах
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel -->
      <div class="auth-right">
        <div class="auth-form-wrap">
          <div class="auth-form-header">
            <h2 class="auth-form-title">Добро пожаловать 👋</h2>
            <p class="auth-form-subtitle">Войдите в свой аккаунт BetaLine AI</p>
          </div>

          <!-- Social Buttons -->
          <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px;">
            <button class="auth-social-btn" id="btn-google">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Войти через Google
            </button>
          </div>

          <div class="auth-divider">или войдите через email</div>

          <form class="auth-form" id="login-form" novalidate>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input
                class="form-input"
                type="email"
                id="login-email"
                placeholder="your@email.com"
                autocomplete="email"
                required
              />
              <div class="form-error hidden" id="login-email-err">Введите корректный email</div>
            </div>
            <div class="form-group">
              <label class="form-label">Пароль</label>
              <div class="input-wrap">
                <input
                  class="form-input"
                  type="password"
                  id="login-password"
                  placeholder="Ваш пароль"
                  autocomplete="current-password"
                  required
                />
                <button type="button" class="pw-toggle" id="pw-toggle-login">👁️</button>
              </div>
              <div class="form-error hidden" id="login-pw-err">Введите пароль (минимум 6 символов)</div>
            </div>
            <div style="display:flex;justify-content:flex-end;">
              <a style="font-size:13px;color:var(--clr-primary-light);cursor:pointer;text-decoration:none;" id="forgot-pw">Забыли пароль?</a>
            </div>
            <button type="submit" class="btn btn-primary btn-lg" id="login-submit" style="width:100%;justify-content:center;">
              Войти в аккаунт
            </button>
          </form>

          <div class="auth-switch">
            Нет аккаунта? <a id="go-register">Зарегистрируйтесь бесплатно</a>
          </div>

          <div style="margin-top:24px;padding:14px;background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.2);border-radius:12px;font-size:13px;color:var(--clr-text-muted);">
            <strong style="color:var(--clr-primary-light);">🎯 Демо-доступ:</strong> используйте <code style="background:rgba(255,255,255,0.1);padding:2px 6px;border-radius:4px;">demo@betalineai.ru</code> / <code style="background:rgba(255,255,255,0.1);padding:2px 6px;border-radius:4px;">demo123</code>
          </div>
        </div>
      </div>
    `;

        // Attach events after render
        setTimeout(() => {
            // Password toggle
            const pwToggle = document.getElementById('pw-toggle-login');
            const pwInput = document.getElementById('login-password');
            if (pwToggle) {
                pwToggle.addEventListener('click', () => {
                    const isText = pwInput.type === 'text';
                    pwInput.type = isText ? 'password' : 'text';
                    pwToggle.textContent = isText ? '👁️' : '🙈';
                });
            }

            // Form submit
            const form = document.getElementById('login-form');
            if (form) {
                form.addEventListener('submit', handleLogin);
            }

            // Google social
            document.getElementById('btn-google')?.addEventListener('click', () => {
                showToast('Авторизация через Google скоро будет доступна', 'info');
            });

            // Forgot password
            document.getElementById('forgot-pw')?.addEventListener('click', () => {
                showToast('Ссылка восстановления отправлена на email', 'success');
            });

            // Switch to register
            document.getElementById('go-register')?.addEventListener('click', () => {
                navigate('register');
            });
        }, 50);

        return layout;
    }

    function handleLogin(e) {
        e.preventDefault();
        const { navigate, showToast, state } = window.App;

        const email = document.getElementById('login-email')?.value.trim();
        const password = document.getElementById('login-password')?.value;
        let valid = true;

        // Validate
        const emailErr = document.getElementById('login-email-err');
        const pwErr = document.getElementById('login-pw-err');
        emailErr?.classList.add('hidden');
        pwErr?.classList.add('hidden');

        if (!email || !email.includes('@')) {
            emailErr?.classList.remove('hidden');
            valid = false;
        }
        if (!password || password.length < 6) {
            pwErr?.classList.remove('hidden');
            valid = false;
        }
        if (!valid) return;

        // Simulate login
        const btn = document.getElementById('login-submit');
        btn.innerHTML = '<div class="spinner"></div> Входим...';
        btn.disabled = true;

        setTimeout(() => {
            // Accept demo credentials or any valid format
            if ((email === 'demo@betalineai.ru' && password === 'demo123') ||
                (email.includes('@') && password.length >= 6)) {
                const name = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
                state.user = { name, email, avatar: null };
                showToast(`Добро пожаловать, ${name}! 👋`, 'success');
                navigate('dashboard');
            } else {
                btn.innerHTML = 'Войти в аккаунт';
                btn.disabled = false;
                showToast('Неверный email или пароль', 'error');
            }
        }, 1200);
    }

    function renderRegister() {
        const { navigate, showToast, state } = window.App;

        const layout = document.createElement('div');
        layout.className = 'auth-layout';
        layout.innerHTML = `
      <!-- Left Panel -->
      <div class="auth-left">
        <div class="auth-left-bg"></div>
        <div class="auth-orb auth-orb-1"></div>
        <div class="auth-orb auth-orb-2"></div>
        <div class="auth-left-content">
          <div class="auth-brand">
            <div class="auth-brand-logo">✦</div>
            <div class="auth-brand-name">BetaLine AI</div>
          </div>
          <h1 class="auth-left-title">Создайте аккаунт и получите 14 дней бесплатно</h1>
          <p class="auth-left-subtitle">
            Без кредитной карты. Начните за 5 минут и создайте своего первого ИИ-бота.
          </p>
          <div class="auth-features">
            <div class="auth-feature">
              <div class="auth-feature-icon">🎁</div>
              <div class="auth-feature-text">
                <strong>14 дней бесплатно</strong>
                Полный доступ ко всем функциям без ограничений
              </div>
            </div>
            <div class="auth-feature">
              <div class="auth-feature-icon">🤝</div>
              <div class="auth-feature-text">
                <strong>Поддержка 24/7</strong>
                Менеджер поможет настроить бота под ваши задачи
              </div>
            </div>
            <div class="auth-feature">
              <div class="auth-feature-icon">🌐</div>
              <div class="auth-feature-text">
                <strong>Интеграции</strong>
                Telegram, WhatsApp, сайт, CRM системы и многое другое
              </div>
            </div>
            <div class="auth-feature">
              <div class="auth-feature-icon">📱</div>
              <div class="auth-feature-text">
                <strong>Мобильный доступ</strong>
                Управляйте ботами из любого места через мобильное приложение
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel -->
      <div class="auth-right">
        <div class="auth-form-wrap">
          <div class="auth-form-header">
            <h2 class="auth-form-title">Создать аккаунт 🚀</h2>
            <p class="auth-form-subtitle">Заполните форму для регистрации — это займёт минуту</p>
          </div>

          <form class="auth-form" id="register-form" novalidate>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
              <div class="form-group">
                <label class="form-label">Имя</label>
                <input class="form-input" type="text" id="reg-name" placeholder="Алексей" required />
                <div class="form-error hidden" id="reg-name-err">Введите имя</div>
              </div>
              <div class="form-group">
                <label class="form-label">Фамилия</label>
                <input class="form-input" type="text" id="reg-surname" placeholder="Иванов" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Компания (необязательно)</label>
              <input class="form-input" type="text" id="reg-company" placeholder="ООО «Ромашка»" />
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input class="form-input" type="email" id="reg-email" placeholder="your@email.com" autocomplete="email" required />
              <div class="form-error hidden" id="reg-email-err">Введите корректный email</div>
            </div>
            <div class="form-group">
              <label class="form-label">Пароль</label>
              <div class="input-wrap">
                <input class="form-input" type="password" id="reg-password" placeholder="Минимум 8 символов" autocomplete="new-password" required />
                <button type="button" class="pw-toggle" id="pw-toggle-reg">👁️</button>
              </div>
              <div class="form-error hidden" id="reg-pw-err">Минимум 8 символов</div>
              <div id="pw-strength-bar" style="height:3px;border-radius:2px;background:var(--clr-border);margin-top:6px;overflow:hidden;">
                <div id="pw-strength-fill" style="height:100%;width:0;border-radius:2px;transition:all 0.3s;"></div>
              </div>
              <div id="pw-strength-label" style="font-size:11px;color:var(--clr-text-dim);margin-top:3px;"></div>
            </div>

            <div style="display:flex;align-items:flex-start;gap:10px;font-size:13px;color:var(--clr-text-muted);">
              <input type="checkbox" id="agree-terms" style="margin-top:2px;accent-color:var(--clr-primary);" />
              <label for="agree-terms" style="cursor:pointer;">
                Я принимаю <a style="color:var(--clr-primary-light);cursor:pointer;">Условия использования</a> и <a style="color:var(--clr-primary-light);cursor:pointer;">Политику конфиденциальности</a>
              </label>
            </div>
            <div class="form-error hidden" id="reg-agree-err">Необходимо принять условия</div>

            <button type="submit" class="btn btn-primary btn-lg" id="reg-submit" style="width:100%;justify-content:center;">
              Создать аккаунт бесплатно
            </button>
          </form>

          <div class="auth-switch">
            Уже есть аккаунт? <a id="go-login">Войти</a>
          </div>
        </div>
      </div>
    `;

        setTimeout(() => {
            // Password toggle
            document.getElementById('pw-toggle-reg')?.addEventListener('click', () => {
                const input = document.getElementById('reg-password');
                const toggle = document.getElementById('pw-toggle-reg');
                const isText = input.type === 'text';
                input.type = isText ? 'password' : 'text';
                toggle.textContent = isText ? '👁️' : '🙈';
            });

            // Password strength
            document.getElementById('reg-password')?.addEventListener('input', (e) => {
                const pw = e.target.value;
                const fill = document.getElementById('pw-strength-fill');
                const label = document.getElementById('pw-strength-label');
                let strength = 0;
                if (pw.length >= 8) strength++;
                if (/[A-Z]/.test(pw)) strength++;
                if (/[0-9]/.test(pw)) strength++;
                if (/[^A-Za-z0-9]/.test(pw)) strength++;
                const colors = ['', '#ef4444', '#f59e0b', '#06b6d4', '#10b981'];
                const labels = ['', 'Очень слабый', 'Слабый', 'Хороший', 'Надёжный'];
                if (fill) {
                    fill.style.width = `${strength * 25}%`;
                    fill.style.background = colors[strength] || '';
                }
                if (label) label.textContent = pw.length > 0 ? labels[strength] || '' : '';
            });

            // Form submit
            document.getElementById('register-form')?.addEventListener('submit', handleRegister);

            // Switch to login
            document.getElementById('go-login')?.addEventListener('click', () => navigate('login'));
        }, 50);

        return layout;
    }

    function handleRegister(e) {
        e.preventDefault();
        const { navigate, showToast, state } = window.App;

        const name = document.getElementById('reg-name')?.value.trim();
        const email = document.getElementById('reg-email')?.value.trim();
        const password = document.getElementById('reg-password')?.value;
        const agreed = document.getElementById('agree-terms')?.checked;
        let valid = true;

        // Hide all errors
        ['reg-name-err', 'reg-email-err', 'reg-pw-err', 'reg-agree-err']
            .forEach(id => document.getElementById(id)?.classList.add('hidden'));

        if (!name) { document.getElementById('reg-name-err')?.classList.remove('hidden'); valid = false; }
        if (!email || !email.includes('@')) { document.getElementById('reg-email-err')?.classList.remove('hidden'); valid = false; }
        if (!password || password.length < 8) { document.getElementById('reg-pw-err')?.classList.remove('hidden'); valid = false; }
        if (!agreed) { document.getElementById('reg-agree-err')?.classList.remove('hidden'); valid = false; }
        if (!valid) return;

        const btn = document.getElementById('reg-submit');
        btn.innerHTML = '<div class="spinner"></div> Создаём аккаунт...';
        btn.disabled = true;

        setTimeout(() => {
            const surname = document.getElementById('reg-surname')?.value.trim();
            const fullName = surname ? `${name} ${surname}` : name;
            state.user = { name: fullName, email, avatar: null };
            showToast('Аккаунт успешно создан! Добро пожаловать 🎉', 'success');
            navigate('dashboard');
        }, 1500);
    }

    return { renderLogin, renderRegister };
})();
