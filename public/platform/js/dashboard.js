/* ============================================================
   dashboard.js — Personal Account Dashboard
   ============================================================ */

window.DashboardPage = (() => {

    function render() {
        const { state, renderTopNav, navigate, showToast } = window.App;

        const layout = document.createElement('div');
        layout.className = 'dashboard-layout';

        // Top Nav
        layout.appendChild(renderTopNav('dashboard'));

        // Content
        const content = document.createElement('div');
        content.className = 'dashboard-content';

        // Page header
        const hour = new Date().getHours();
        const greeting = hour < 12 ? 'Доброе утро' : hour < 18 ? 'Добрый день' : 'Добрый вечер';
        const userName = state.user?.name || 'Пользователь';

        content.innerHTML = `
      <div class="page-header" style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:16px;">
        <div>
          <div class="page-title">${greeting}, ${userName.split(' ')[0]}! 👋</div>
          <div class="page-subtitle">Вот что происходит с вашими ботами сегодня</div>
        </div>
        <button class="btn btn-primary" id="new-bot-btn">
          + Создать нового бота
        </button>
      </div>
    `;

        // Stats
        content.appendChild(renderStats());

        // Chart
        content.appendChild(renderChart());

        // Bots section
        content.appendChild(renderBotsSection());

        // Bottom grid
        content.appendChild(renderBottomWidgets());

        layout.appendChild(content);

        // Events after render
        setTimeout(() => {
            document.getElementById('new-bot-btn')?.addEventListener('click', () => {
                state.wizardData = {};
                state.wizardStep = 1;
                navigate('wizard');
            });
        }, 50);

        return layout;
    }

    function renderStats() {
        const { state } = window.App;
        const totalDialogs = state.bots.reduce((a, b) => a + b.dialogs, 0);
        const activeBots = state.bots.filter(b => b.status === 'active').length;
        const avgSat = state.bots.length
            ? Math.round(state.bots.filter(b => b.satisfaction > 0).reduce((a, b) => a + b.satisfaction, 0) / Math.max(state.bots.filter(b => b.satisfaction > 0).length, 1))
            : 0;

        const statsArr = [
            { icon: '💬', label: 'Диалогов всего', value: totalDialogs.toLocaleString('ru'), trend: '+12%', up: true, bg: 'rgba(99,102,241,0.15)' },
            { icon: '🤖', label: 'Активных ботов', value: activeBots, trend: `из ${state.bots.length} всего`, up: true, bg: 'rgba(6,182,212,0.15)' },
            { icon: '⭐', label: 'Удовлетворённость', value: avgSat ? `${avgSat}%` : '—', trend: '+3%', up: true, bg: 'rgba(16,185,129,0.15)' },
            { icon: '⚡', label: 'Среднее время ответа', value: '1.2с', trend: '-0.4с', up: true, bg: 'rgba(245,158,11,0.15)' },
        ];

        const grid = document.createElement('div');
        grid.className = 'stats-grid';

        statsArr.forEach(stat => {
            const card = document.createElement('div');
            card.className = 'stat-card';
            card.innerHTML = `
        <div class="stat-card-icon" style="background:${stat.bg}">${stat.icon}</div>
        <div class="stat-card-value">${stat.value}</div>
        <div class="stat-card-label">${stat.label}</div>
        <div class="stat-card-trend ${stat.up ? 'up' : 'down'}">
          ${stat.up ? '↑' : '↓'} ${stat.trend}
        </div>
      `;
            grid.appendChild(card);
        });

        return grid;
    }

    function renderChart() {
        const chartData = [35, 52, 48, 61, 75, 58, 82, 91, 74, 65, 88, 94, 78, 85];
        const maxVal = Math.max(...chartData);
        const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

        const wrap = document.createElement('div');
        wrap.className = 'chart-wrap';
        wrap.innerHTML = `
      <div class="chart-header">
        <div>
          <div class="chart-title">Диалоги за 2 недели</div>
          <div style="font-size:13px;color:var(--clr-text-muted);margin-top:2px;">Всего за период: ${chartData.reduce((a, b) => a + b, 0) * 10}</div>
        </div>
        <div class="tabs" style="margin-bottom:0;">
          <button class="tab-btn active" style="flex:none;padding:6px 14px;">2 нед</button>
          <button class="tab-btn" style="flex:none;padding:6px 14px;">1 мес</button>
          <button class="tab-btn" style="flex:none;padding:6px 14px;">3 мес</button>
        </div>
      </div>
      <div class="chart-bars" id="main-chart"></div>
    `;

        const chartEl = wrap.querySelector('#main-chart');
        chartData.forEach((val, i) => {
            const col = document.createElement('div');
            col.className = 'chart-bar-col';
            col.innerHTML = `
        <div class="chart-bar ${i === chartData.length - 1 ? 'highlight' : ''}" style="height:${Math.round((val / maxVal) * 100)}%;" title="${val * 10} диалогов"></div>
        <div class="chart-bar-label">${labels[i]}</div>
      `;
            chartEl.appendChild(col);
        });

        // Tab click demo
        wrap.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                wrap.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        return wrap;
    }

    function renderBotsSection() {
        const { state, navigate, showToast } = window.App;

        const section = document.createElement('div');

        const header = document.createElement('div');
        header.className = 'bots-section-header';
        header.innerHTML = `
      <div>
        <div style="font-size:20px;font-weight:800;margin-bottom:2px;">Мои боты</div>
        <div style="font-size:13px;color:var(--clr-text-muted);">${state.bots.length} бот(ов) в вашем аккаунте</div>
      </div>
      <div style="display:flex;gap:8px;">
        <input class="form-input" id="bots-search" type="text" placeholder="🔍 Поиск..." style="width:200px;padding:8px 14px;font-size:13px;" />
      </div>
    `;
        section.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'bots-grid';
        grid.id = 'bots-grid';

        function renderBotCards(filter = '') {
            grid.innerHTML = '';

            const filtered = state.bots.filter(bot =>
                !filter || bot.name.toLowerCase().includes(filter.toLowerCase())
            );

            filtered.forEach(bot => {
                const card = document.createElement('div');
                card.className = 'bot-card';
                card.innerHTML = `
          <div class="bot-card-header">
            <div style="position:relative;width:52px;height:52px;">
              <div class="bot-avatar" style="background:${bot.color}22;border:2px solid ${bot.color}44;width:52px;height:52px;border-radius:12px;font-size:26px;display:flex;align-items:center;justify-content:center;">${bot.emoji}</div>
              <div class="bot-status-dot ${bot.status}" style="position:absolute;bottom:-2px;right:-2px;"></div>
            </div>
            <div style="flex:1;margin-left:12px;">
              <div class="bot-card-name">${bot.name}</div>
              <div class="bot-card-type">${bot.type}</div>
              <div class="badge ${bot.status === 'active' ? 'badge-success' : 'badge-neutral'}" style="margin-top:4px;">${bot.status === 'active' ? '● Активен' : '○ Отключён'}</div>
            </div>
            <div class="dropdown">
              <button class="btn btn-ghost btn-icon bot-menu-btn" title="Действия">⋮</button>
              <div class="dropdown-menu hidden bot-dropdown">
                <div class="dropdown-item bot-preview-btn">💬 Протестировать</div>
                <div class="dropdown-item bot-edit-btn">✏️ Редактировать</div>
                <div class="dropdown-item bot-copy-btn">📋 Код интеграции</div>
                <div class="dropdown-item bot-toggle-btn">${bot.status === 'active' ? '⏸ Приостановить' : '▶️ Активировать'}</div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item danger bot-delete-btn">🗑 Удалить</div>
              </div>
            </div>
          </div>

          <div class="bot-card-stats">
            <div class="bot-stat">
              <div class="bot-stat-value">${bot.dialogs.toLocaleString('ru')}</div>
              <div class="bot-stat-label">Диалогов</div>
            </div>
            <div class="bot-stat">
              <div class="bot-stat-value">${bot.satisfaction > 0 ? bot.satisfaction + '%' : '—'}</div>
              <div class="bot-stat-label">Оценка</div>
            </div>
            <div class="bot-stat">
              <div class="bot-stat-value">${bot.channels.length}</div>
              <div class="bot-stat-label">Каналов</div>
            </div>
          </div>

          <div style="font-size:11px;color:var(--clr-text-dim);margin-top:8px;">Создан: ${bot.createdAt}</div>

          <div class="bot-card-actions">
            <button class="btn btn-primary btn-sm preview-btn" style="flex:1;justify-content:center;">💬 Тест</button>
            <button class="btn btn-secondary btn-sm analytics-btn" style="flex:1;justify-content:center;">📊 Стат.</button>
          </div>
        `;

                // Events
                const menuBtn = card.querySelector('.bot-menu-btn');
                const dropdown = card.querySelector('.bot-dropdown');
                menuBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    document.querySelectorAll('.bot-dropdown').forEach(d => {
                        if (d !== dropdown) d.classList.add('hidden');
                    });
                    dropdown.classList.toggle('hidden');
                });

                card.querySelector('.preview-btn').addEventListener('click', () => {
                    state.currentBot = bot;
                    navigate('preview', { bot });
                });
                card.querySelector('.bot-preview-btn').addEventListener('click', () => {
                    state.currentBot = bot;
                    navigate('preview', { bot });
                });
                card.querySelector('.bot-edit-btn').addEventListener('click', () => {
                    showToast('Редактор открывается...', 'info');
                });
                card.querySelector('.bot-copy-btn').addEventListener('click', () => {
                    const code = `<script src="https://cdn.betalineai.ru/widget.js?id=${bot.id}"><\/script>`;
                    navigator.clipboard?.writeText(code).then(() => showToast('Код скопирован в буфер', 'success'));
                });
                card.querySelector('.bot-toggle-btn').addEventListener('click', () => {
                    bot.status = bot.status === 'active' ? 'inactive' : 'active';
                    showToast(`Бот ${bot.status === 'active' ? 'активирован' : 'приостановлен'}`, 'success');
                    renderBotCards(document.getElementById('bots-search')?.value || '');
                });
                card.querySelector('.bot-delete-btn').addEventListener('click', () => {
                    if (confirm(`Удалить бота "${bot.name}"?`)) {
                        state.bots = state.bots.filter(b => b.id !== bot.id);
                        showToast('Бот удалён', 'success');
                        renderBotCards();
                    }
                });
                card.querySelector('.analytics-btn').addEventListener('click', () => {
                    showToast('Аналитика для этого бота', 'info');
                });

                grid.appendChild(card);
            });

            // "Add new" card
            const newCard = document.createElement('div');
            newCard.className = 'bot-card-new';
            newCard.innerHTML = `
        <div class="bot-card-new-icon">+</div>
        <div class="bot-card-new-title">Создать нового бота</div>
        <div class="bot-card-new-sub">Настройте ИИ-ассистента под ваши задачи за 5 минут</div>
      `;
            newCard.addEventListener('click', () => {
                state.wizardData = {};
                state.wizardStep = 1;
                navigate('wizard');
            });
            grid.appendChild(newCard);
        }

        renderBotCards();

        // Search
        setTimeout(() => {
            document.getElementById('bots-search')?.addEventListener('input', (e) => {
                renderBotCards(e.target.value);
            });
            document.addEventListener('click', () => {
                document.querySelectorAll('.bot-dropdown').forEach(d => d.classList.add('hidden'));
            });
        }, 50);

        section.appendChild(grid);
        section.style.marginBottom = '32px';
        return section;
    }

    function renderBottomWidgets() {
        const wrap = document.createElement('div');
        wrap.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:24px;';

        // Recent activity
        const activities = [
            { icon: '💬', text: 'Бот "Поддержка" ответил на 48 вопросов', time: '2 м назад' },
            { icon: '🎯', text: 'Новый лид захвачен ботом "Лидогенерация"', time: '15 м назад' },
            { icon: '⭐', text: 'Получена оценка 5 звёзд за диалог', time: '1 ч назад' },
            { icon: '🔔', text: 'Бот "HR-ассистент" приостановлен', time: '3 ч назад' },
            { icon: '📈', text: 'Достигнуто 1000 диалогов за день', time: 'вчера' },
        ];

        const activityCard = document.createElement('div');
        activityCard.classList.add('card');
        activityCard.innerHTML = `
      <div style="font-size:16px;font-weight:700;margin-bottom:16px;">🕓 Последние события</div>
      ${activities.map(a => `
        <div style="display:flex;align-items:flex-start;gap:12px;padding:10px 0;border-bottom:1px solid var(--clr-border);">
          <span style="font-size:20px;">${a.icon}</span>
          <div style="flex:1;">
            <div style="font-size:13px;line-height:1.4;">${a.text}</div>
            <div style="font-size:11px;color:var(--clr-text-dim);margin-top:2px;">${a.time}</div>
          </div>
        </div>
      `).join('')}
    `;

        // Quick actions
        const actions = [
            { icon: '🚀', title: 'Создать бота', desc: 'Мастер создания за 5 мин', color: '#6366f1', action: 'wizard' },
            { icon: '📖', title: 'База знаний', desc: 'Загрузить документы', color: '#06b6d4', action: null },
            { icon: '🔌', title: 'Интеграции', desc: 'Подключить каналы', color: '#10b981', action: null },
            { icon: '📊', title: 'Аналитика', desc: 'Полный отчёт', color: '#a78bfa', action: null },
        ];

        const actionsCard = document.createElement('div');
        actionsCard.classList.add('card');
        actionsCard.innerHTML = `<div style="font-size:16px;font-weight:700;margin-bottom:16px;">⚡ Быстрые действия</div>`;

        const { navigate, showToast, state } = window.App;
        actions.forEach(action => {
            const btn = document.createElement('div');
            btn.style.cssText = `display:flex;align-items:center;gap:14px;padding:12px;border-radius:12px;cursor:pointer;transition:all 0.2s;margin-bottom:8px;border:1px solid var(--clr-border);`;
            btn.innerHTML = `
        <div style="width:40px;height:40px;border-radius:10px;background:${action.color}22;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">${action.icon}</div>
        <div>
          <div style="font-size:14px;font-weight:600;">${action.title}</div>
          <div style="font-size:12px;color:var(--clr-text-muted);">${action.desc}</div>
        </div>
        <div style="margin-left:auto;color:var(--clr-text-dim);">→</div>
      `;
            btn.addEventListener('mouseenter', () => btn.style.background = 'var(--clr-surface2)');
            btn.addEventListener('mouseleave', () => btn.style.background = '');
            btn.addEventListener('click', () => {
                if (action.action === 'wizard') {
                    state.wizardData = {};
                    state.wizardStep = 1;
                    navigate('wizard');
                } else {
                    showToast('Раздел скоро будет доступен', 'info');
                }
            });
            actionsCard.appendChild(btn);
        });

        wrap.appendChild(activityCard);
        wrap.appendChild(actionsCard);
        return wrap;
    }

    return { render };
})();
