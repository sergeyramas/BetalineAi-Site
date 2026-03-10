/* ============================================================
   app.js — Router & State Management
   ============================================================ */

window.App = (() => {
    // ── State ──────────────────────────────────────────────────
    const state = {
        currentPage: 'login',   // login | register | dashboard | wizard | preview
        user: null,             // null or { name, email, avatar }
        bots: [],               // list of created bots
        currentBot: null,       // bot being created/previewed
        wizardStep: 1,
        wizardData: {},
    };

    // ── Sample demo bots ───────────────────────────────────────
    const demoBots = [
        {
            id: 'bot-1',
            name: 'Поддержка клиентов',
            emoji: '🎯',
            type: 'Служба поддержки',
            color: '#6366f1',
            status: 'active',
            dialogs: 1248,
            satisfaction: 94,
            createdAt: '10 марта 2026',
            tone: 2,
            topics: ['возврат', 'доставка', 'оплата', 'заказ'],
            channels: ['website', 'telegram'],
            greeting: 'Привет! Я ваш помощник по поддержке клиентов. Чем могу помочь?',
        },
        {
            id: 'bot-2',
            name: 'Генератор лидов',
            emoji: '🚀',
            type: 'Лидогенерация',
            color: '#06b6d4',
            status: 'active',
            dialogs: 583,
            satisfaction: 88,
            createdAt: '8 марта 2026',
            tone: 4,
            topics: ['цены', 'демо', 'возможности', 'интеграции'],
            channels: ['website', 'whatsapp'],
            greeting: 'Добро пожаловать! Хотите узнать, как мы можем вам помочь?',
        },
        {
            id: 'bot-3',
            name: 'HR-ассистент',
            emoji: '👥',
            type: 'Подбор персонала',
            color: '#a78bfa',
            status: 'inactive',
            dialogs: 97,
            satisfaction: 79,
            createdAt: '2 марта 2026',
            tone: 2,
            topics: ['вакансии', 'резюме', 'собеседование', 'условия'],
            channels: ['telegram'],
            greeting: 'Здравствуйте! Я помогу вам с вопросами карьеры и трудоустройства.',
        },
    ];

    // ── Utils ──────────────────────────────────────────────────
    const $ = selector => document.querySelector(selector);
    const $$ = selector => document.querySelectorAll(selector);

    function el(tag, attrs = {}, ...children) {
        const elem = document.createElement(tag);
        Object.entries(attrs).forEach(([k, v]) => {
            if (k === 'class') elem.className = v;
            else if (k === 'style') elem.style.cssText = v;
            else if (k.startsWith('on')) elem.addEventListener(k.slice(2), v);
            else elem.setAttribute(k, v);
        });
        children.forEach(child => {
            if (typeof child === 'string') elem.insertAdjacentHTML('beforeend', child);
            else if (child) elem.appendChild(child);
        });
        return elem;
    }

    function showToast(message, type = 'success') {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(40px)';
            toast.style.transition = '0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    function formatDate(dateStr) {
        return dateStr;
    }

    function getAvatarInitials(name) {
        return (name || 'U').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    }

    // ── Router ─────────────────────────────────────────────────
    function navigate(page, data = {}) {
        state.currentPage = page;
        if (data.bot) state.currentBot = data.bot;
        if (data.wizardStep) state.wizardStep = data.wizardStep;
        render();
        window.scrollTo(0, 0);
    }

    function render() {
        const app = document.getElementById('app');
        app.innerHTML = '';

        switch (state.currentPage) {
            case 'login': app.appendChild(window.AuthPage.renderLogin()); break;
            case 'register': app.appendChild(window.AuthPage.renderRegister()); break;
            case 'dashboard': app.appendChild(window.DashboardPage.render()); break;
            case 'wizard': app.appendChild(window.WizardPage.render()); break;
            case 'preview': app.appendChild(window.PreviewPage.render()); break;
        }
    }

    // ── Top Nav (shared) ───────────────────────────────────────
    function renderTopNav(activeLink) {
        const user = state.user || { name: 'Пользователь', email: 'user@example.com' };
        const initials = getAvatarInitials(user.name);

        const nav = document.createElement('nav');
        nav.className = 'topnav';
        nav.innerHTML = `
      <a class="topnav-brand" id="nav-brand">
        <div class="topnav-logo">✦</div>
        BetaLine AI
      </a>
      <div class="topnav-nav">
        <button class="topnav-link ${activeLink === 'dashboard' ? 'active' : ''}" id="nav-dash">
          📊 Дашборд
        </button>
        <button class="topnav-link ${activeLink === 'bots' ? 'active' : ''}" id="nav-bots">
          🤖 Мои боты
        </button>
        <button class="topnav-link ${activeLink === 'analytics' ? 'active' : ''}" id="nav-analytics">
          📈 Аналитика
        </button>
      </div>
      <div class="topnav-right">
        <div class="dropdown">
          <div class="avatar" id="user-avatar-btn" title="${user.name}">${initials}</div>
          <div class="dropdown-menu hidden" id="user-dropdown">
            <div style="padding:10px 14px; border-bottom:1px solid var(--clr-border); margin-bottom:4px;">
              <div style="font-weight:700;font-size:14px;">${user.name}</div>
              <div style="font-size:12px;color:var(--clr-text-muted);">${user.email}</div>
            </div>
            <div class="dropdown-item" id="dd-profile">👤 Профиль</div>
            <div class="dropdown-item" id="dd-settings">⚙️ Настройки</div>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item danger" id="dd-logout">🚪 Выйти</div>
          </div>
        </div>
      </div>
    `;

        // Events
        setTimeout(() => {
            const avatarBtn = document.getElementById('user-avatar-btn');
            const dropdown = document.getElementById('user-dropdown');
            if (avatarBtn) {
                avatarBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    dropdown.classList.toggle('hidden');
                });
            }
            document.addEventListener('click', () => dropdown?.classList.add('hidden'), { once: false });

            document.getElementById('nav-brand')?.addEventListener('click', () => navigate('dashboard'));
            document.getElementById('nav-dash')?.addEventListener('click', () => navigate('dashboard'));
            document.getElementById('nav-bots')?.addEventListener('click', () => navigate('dashboard'));
            document.getElementById('nav-analytics')?.addEventListener('click', () => navigate('dashboard'));
            document.getElementById('dd-logout')?.addEventListener('click', handleLogout);
            document.getElementById('dd-profile')?.addEventListener('click', () => showToast('Профиль скоро будет доступен', 'info'));
            document.getElementById('dd-settings')?.addEventListener('click', () => showToast('Настройки скоро будут доступны', 'info'));
        }, 50);

        return nav;
    }

    function handleLogout() {
        state.user = null;
        state.bots = [];
        showToast('Вы вышли из системы', 'info');
        navigate('login');
    }

    // ── Init ───────────────────────────────────────────────────
    function init() {
        // Preload demo data
        state.bots = demoBots;
        navigate('login');
    }

    // Public
    return {
        init,
        state,
        navigate,
        render,
        renderTopNav,
        showToast,
        getAvatarInitials,
        demoBots,
        el,
    };
})();
