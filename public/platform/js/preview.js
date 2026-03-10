/* ============================================================
   preview.js — Bot Preview / Live Chat Test
   ============================================================ */

window.PreviewPage = (() => {

    function render() {
        const { state, renderTopNav, navigate, showToast } = window.App;
        const bot = state.currentBot || state.bots[0] || {
            name: 'Демо-бот',
            emoji: '🤖',
            type: 'ИИ-ассистент',
            color: '#6366f1',
            status: 'active',
            dialogs: 0,
            satisfaction: 0,
            channels: ['website'],
            topics: [],
            tone: 3,
            greeting: 'Привет! Я ИИ-ассистент. Чем могу помочь?',
        };

        const layout = document.createElement('div');
        layout.className = 'preview-layout';

        // Top Nav
        const topNav = renderTopNav('');
        topNav.style.position = 'fixed';
        layout.appendChild(topNav);

        // Sidebar
        layout.appendChild(renderSidebar(bot));

        // Chat area
        layout.appendChild(renderChat(bot));

        return layout;
    }

    function renderSidebar(bot) {
        const { navigate, showToast, state } = window.App;

        const sidebar = document.createElement('div');
        sidebar.className = 'preview-sidebar';

        sidebar.innerHTML = `
      <button class="btn btn-ghost btn-sm" id="back-to-dash" style="margin-bottom:16px;width:100%;justify-content:flex-start;">← Назад к дашборду</button>

      <div class="preview-sidebar-title">Информация о боте</div>

      <div class="bot-info-block">
        <div class="bot-info-avatar" style="background:${bot.color}22;border:3px solid ${bot.color}44;border-radius:50%;">${bot.emoji}</div>
        <div class="bot-info-name">${bot.name}</div>
        <div class="bot-info-type">${bot.type}</div>
        <div style="display:flex;justify-content:center;margin-bottom:12px;">
          <div class="badge ${bot.status === 'active' ? 'badge-success' : 'badge-neutral'}">${bot.status === 'active' ? '● Активен' : '○ Не активен'}</div>
        </div>

        <div class="bot-info-row">
          <span class="bot-info-row-label">Диалогов</span>
          <span class="bot-info-row-val">${(bot.dialogs || 0).toLocaleString('ru')}</span>
        </div>
        <div class="bot-info-row">
          <span class="bot-info-row-label">Удовлетворённость</span>
          <span class="bot-info-row-val">${bot.satisfaction > 0 ? bot.satisfaction + '%' : '—'}</span>
        </div>
        <div class="bot-info-row">
          <span class="bot-info-row-label">Тон</span>
          <span class="bot-info-row-val">${getToneName(bot.tone)}</span>
        </div>
        <div class="bot-info-row">
          <span class="bot-info-row-label">Каналы</span>
          <span class="bot-info-row-val">${(bot.channels || []).length}</span>
        </div>
      </div>

      <div class="preview-sidebar-title" style="margin-top:16px;">Тематики</div>
      <div id="topics-wrap" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;">
        ${(bot.topics && bot.topics.length ? bot.topics : ['общение', 'вопросы'])
                .map(t => `<div class="badge badge-primary">${t}</div>`).join('')}
      </div>

      <div class="preview-sidebar-title" style="margin-top:0;">Каналы</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px;">
        ${(bot.channels || ['website']).map(ch => `
          <div style="background:var(--clr-surface2);border:1px solid var(--clr-border);border-radius:8px;padding:6px 12px;font-size:12px;display:flex;align-items:center;gap:6px;">
            ${getChannelIcon(ch)} ${getChannelName(ch)}
          </div>
        `).join('')}
      </div>

      <div class="preview-sidebar-title">Быстрые действия</div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <button class="btn btn-secondary btn-sm" id="copy-widget-code">📋 Код для сайта</button>
        <button class="btn btn-secondary btn-sm" id="reset-chat-btn">🔄 Сбросить чат</button>
        <button class="btn btn-secondary btn-sm" id="edit-bot-btn">✏️ Редактировать</button>
      </div>
    `;

        setTimeout(() => {
            document.getElementById('back-to-dash')?.addEventListener('click', () => navigate('dashboard'));
            document.getElementById('copy-widget-code')?.addEventListener('click', () => {
                const code = `<script src="https://cdn.betalineai.ru/widget.js?id=${bot.id || 'demo'}"><\/script>`;
                navigator.clipboard?.writeText(code)
                    .then(() => showToast('Код для вставки скопирован!', 'success'))
                    .catch(() => showToast('Код: ' + code, 'info'));
            });
            document.getElementById('reset-chat-btn')?.addEventListener('click', () => {
                resetChat(bot);
            });
            document.getElementById('edit-bot-btn')?.addEventListener('click', () => {
                showToast('Редактор откроется в следующей версии', 'info');
            });
        }, 50);

        return sidebar;
    }

    function renderChat(bot) {
        const chatArea = document.createElement('div');
        chatArea.className = 'chat-area';
        chatArea.id = 'chat-area';

        // Top bar
        chatArea.innerHTML = `
      <div class="chat-topbar">
        <div class="chat-topbar-avatar" style="background:${bot.color}22;border:2px solid ${bot.color}44;border-radius:50%;width:40px;height:40px;">${bot.emoji}</div>
        <div class="chat-topbar-info">
          <div class="chat-topbar-name">${bot.name}</div>
          <div class="chat-topbar-status">Онлайн</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;margin-left:auto;">
          <div class="badge badge-success">🟢 ИИ активен</div>
          <div style="font-size:12px;color:var(--clr-text-muted);">Тестирование</div>
        </div>
      </div>

      <div class="chat-messages" id="chat-messages"></div>

      <div class="chat-quick-replies" id="quick-replies"></div>

      <div class="chat-input-area">
        <textarea
          class="chat-input"
          id="chat-input"
          placeholder="Напишите сообщение..."
          rows="1"
        ></textarea>
        <button class="chat-send-btn" id="chat-send">➤</button>
      </div>
    `;

        setTimeout(() => {
            initChat(bot);
        }, 100);

        return chatArea;
    }

    let chatMessages = [];

    function initChat(bot) {
        chatMessages = [];
        // Add greeting after short delay
        setTimeout(() => {
            addBotMessage(bot.greeting || 'Привет! Чем могу помочь?', bot);
            showQuickReplies(getInitialQuickReplies(bot));
        }, 600);

        const input = document.getElementById('chat-input');
        const sendBtn = document.getElementById('chat-send');

        if (input) {
            input.addEventListener('input', () => {
                input.style.height = 'auto';
                input.style.height = Math.min(input.scrollHeight, 120) + 'px';
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(bot);
                }
            });
        }

        sendBtn?.addEventListener('click', () => sendMessage(bot));
    }

    function resetChat(bot) {
        const messagesEl = document.getElementById('chat-messages');
        const quickReplies = document.getElementById('quick-replies');
        if (messagesEl) messagesEl.innerHTML = '';
        if (quickReplies) quickReplies.innerHTML = '';
        chatMessages = [];
        setTimeout(() => {
            addBotMessage(bot.greeting || 'Привет! Чем могу помочь?', bot);
            showQuickReplies(getInitialQuickReplies(bot));
        }, 400);
    }

    function sendMessage(bot) {
        const input = document.getElementById('chat-input');
        if (!input) return;
        const text = input.value.trim();
        if (!text) return;

        input.value = '';
        input.style.height = 'auto';

        // Hide quick replies
        const qr = document.getElementById('quick-replies');
        if (qr) qr.innerHTML = '';

        addUserMessage(text);
        chatMessages.push({ role: 'user', text });

        // Show typing indicator
        showTyping(bot);

        // Generate bot response
        const delay = 800 + Math.random() * 800;
        setTimeout(() => {
            removeTyping();
            const response = generateResponse(text, bot);
            addBotMessage(response, bot);
            chatMessages.push({ role: 'bot', text: response });

            // Maybe show follow-up quick replies
            if (Math.random() > 0.4) {
                showQuickReplies(getContextualReplies(text, bot));
            }
        }, delay);
    }

    function addUserMessage(text) {
        const msgs = document.getElementById('chat-messages');
        if (!msgs) return;
        const now = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        const div = document.createElement('div');
        div.className = 'chat-msg user';
        div.innerHTML = `
      <div>
        <div class="chat-bubble">${escapeHtml(text)}</div>
        <div class="chat-time">${now}</div>
      </div>
      <div class="chat-msg-avatar" style="background:rgba(99,102,241,0.2);">👤</div>
    `;
        msgs.appendChild(div);
        scrollToBottom();
    }

    function addBotMessage(text, bot) {
        const msgs = document.getElementById('chat-messages');
        if (!msgs) return;
        const now = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        const div = document.createElement('div');
        div.className = 'chat-msg bot';
        div.innerHTML = `
      <div class="chat-msg-avatar" style="background:${bot?.color || '#6366f1'}22;border:2px solid ${bot?.color || '#6366f1'}44;">${bot?.emoji || '🤖'}</div>
      <div>
        <div class="chat-bubble">${escapeHtml(text)}</div>
        <div class="chat-time">${now}</div>
      </div>
    `;
        msgs.appendChild(div);
        scrollToBottom();
    }

    function showTyping(bot) {
        const msgs = document.getElementById('chat-messages');
        if (!msgs) return;
        const div = document.createElement('div');
        div.className = 'chat-msg bot';
        div.id = 'typing-indicator';
        div.innerHTML = `
      <div class="chat-msg-avatar" style="background:${bot?.color || '#6366f1'}22;">${bot?.emoji || '🤖'}</div>
      <div class="chat-typing"><span></span><span></span><span></span></div>
    `;
        msgs.appendChild(div);
        scrollToBottom();
    }

    function removeTyping() {
        document.getElementById('typing-indicator')?.remove();
    }

    function showQuickReplies(replies) {
        const container = document.getElementById('quick-replies');
        if (!container) return;
        container.innerHTML = '';
        replies.forEach(reply => {
            const btn = document.createElement('button');
            btn.className = 'quick-reply';
            btn.textContent = reply;
            btn.addEventListener('click', () => {
                const input = document.getElementById('chat-input');
                if (input) {
                    input.value = reply;
                    // Trigger send
                    const bot = window.App.state.currentBot || window.App.state.bots[0];
                    sendMessage(bot);
                }
            });
            container.appendChild(btn);
        });
    }

    function scrollToBottom() {
        const msgs = document.getElementById('chat-messages');
        if (msgs) msgs.scrollTop = msgs.scrollHeight;
    }

    // ── Response generation ───────────────────────────────────
    function generateResponse(text, bot) {
        const lower = text.toLowerCase();

        // Greetings
        if (/привет|здравствуй|добрый|хай|hello|hi/.test(lower)) {
            const greets = [
                `Привет! Я ${bot.name}, рад вас видеть! Чем могу помочь?`,
                `Здравствуйте! Я ${bot.name}. Готов ответить на ваши вопросы.`,
                `Приветствую! Меня зовут ${bot.name}. Как я могу вам помочь сегодня?`,
            ];
            return greets[Math.floor(Math.random() * greets.length)];
        }

        // Thanks
        if (/спасибо|благодарю|thanks|thank/.test(lower)) {
            return 'Пожалуйста! Рад был помочь. Если у вас возникнут ещё вопросы — обращайтесь 😊';
        }

        // Bot info
        if (/что ты|кто ты|как тебя зовут|твоё имя|скажи о себе/.test(lower)) {
            return `Я — ${bot.name}, ИИ-ассистент на платформе BetaLine AI. Моя специализация: ${bot.type.toLowerCase()}. Я создан, чтобы помогать вам быстро и качественно.`;
        }

        // Capabilities
        if (/что умеешь|что можешь|возможности|помоч|помочь/.test(lower)) {
            const topics = bot.topics?.length ? bot.topics.join(', ') : 'ответы на вопросы, консультации, информирование';
            return `Я могу помочь вам с: ${topics}. Просто задайте вопрос — и я постараюсь ответить максимально точно!`;
        }

        // Price
        if (/цена|стоимость|сколько|тариф|план/.test(lower)) {
            return 'Стоимость зависит от выбранного тарифа. Есть бесплатный план на 14 дней, а платные планы начинаются от 990 ₽/мес. Хотите узнать подробнее о тарифах?';
        }

        // Contact
        if (/связаться|контакт|телефон|email|почта|менеджер/.test(lower)) {
            return 'Вы можете связаться с нашими менеджерами:\n📧 info@betalineai.ru\n📞 8-800-123-45-67 (бесплатно)\nИли оставьте заявку и мы перезвоним!';
        }

        // Problem/complaint
        if (/проблема|ошибка|не работает|сломан|баг/.test(lower)) {
            return 'Понимаю, это неприятно! Опишите проблему подробнее, и я постараюсь помочь или передам информацию специалисту. Также можно написать в поддержку: support@betalineai.ru';
        }

        // Default intelligent responses
        const defaults = [
            `Отличный вопрос! По теме "${text.slice(0, 30)}..." могу сказать следующее: я обрабатываю ваш запрос и формирую ответ на основе базы знаний. Уточните, пожалуйста, что именно вас интересует?`,
            `Я вас понял. Это интересная тема. Для более точного ответа — уточните детали вашего запроса, и я предоставлю исчерпывающую информацию.`,
            `Хороший вопрос! По данной теме могу предложить несколько вариантов. Какой аспект вас интересует больше всего?`,
            `Ваш запрос принят. Я ${bot.name} и специализируюсь на ${bot.type.toLowerCase()}. Для точного ответа можете задать вопрос подробнее.`,
        ];
        return defaults[Math.floor(Math.random() * defaults.length)];
    }

    function getInitialQuickReplies(bot) {
        const byType = {
            support: ['У меня вопрос по заказу', 'Как оформить возврат?', 'Сроки доставки'],
            sales: ['Хочу узнать цены', 'Запросить демо', 'Есть ли скидки?'],
            hr: ['Открытые вакансии', 'Как подать резюме?', 'Условия работы'],
            ecomm: ['Где мой заказ?', 'Как оплатить?', 'Каталог товаров'],
            education: ['Программа курсов', 'Стоимость обучения', 'Как записаться?'],
        };
        return byType[bot.id?.includes('bot-1') ? 'support' : bot.id?.includes('bot-2') ? 'sales' : 'support']
            || ['Что вы умеете?', 'Как с вами связаться?', 'Расскажите о себе'];
    }

    function getContextualReplies(text, bot) {
        if (/цена|тариф/.test(text.toLowerCase())) {
            return ['Базовый тариф', 'Корпоративный план', 'Есть ли триал?'];
        }
        if (/проблем|ошибк/.test(text.toLowerCase())) {
            return ['Создать обращение', 'Написать в чат', 'Позвонить'];
        }
        return ['Узнать больше', 'Связаться с менеджером', 'Оставить заявку'];
    }

    function getToneName(tone) {
        const names = { 1: 'Официальный', 2: 'Формальный', 3: 'Нейтральный', 4: 'Дружелюбный', 5: 'Неформальный' };
        return names[tone] || 'Нейтральный';
    }

    function getChannelIcon(ch) {
        const icons = { website: '🌐', telegram: '✈️', whatsapp: '💬', instagram: '📸', vk: '🔵', email: '📧' };
        return icons[ch] || '📱';
    }

    function getChannelName(ch) {
        const names = { website: 'Сайт', telegram: 'Telegram', whatsapp: 'WhatsApp', instagram: 'Instagram', vk: 'ВКонтакте', email: 'Email' };
        return names[ch] || ch;
    }

    function escapeHtml(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\n/g, '<br/>');
    }

    return { render };
})();
