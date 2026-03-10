/* ============================================================
   wizard.js — 5-Step Bot Creation Wizard
   ============================================================ */

window.WizardPage = (() => {
    const { navigate, showToast, state, renderTopNav } = window.App;

    const STEPS = [
        { label: 'Тип бота', icon: '🤖' },
        { label: 'Личность', icon: '🎭' },
        { label: 'Знания', icon: '📚' },
        { label: 'Каналы', icon: '📡' },
        { label: 'Внешний вид', icon: '🎨' },
    ];

    const BOT_TYPES = [
        { id: 'support', icon: '🎯', title: 'Поддержка клиентов', desc: 'Отвечает на вопросы, решает проблемы, снижает нагрузку на support' },
        { id: 'sales', icon: '🚀', title: 'Лидогенерация', desc: 'Квалифицирует лиды, назначает встречи, повышает конверсию' },
        { id: 'hr', icon: '👥', title: 'HR-ассистент', desc: 'Отвечает по вакансиям, собирает резюме, проводит скрининг' },
        { id: 'ecomm', icon: '🛒', title: 'Интернет-магазин', desc: 'Помогает с выбором товаров, статусом заказа, возвратами' },
        { id: 'education', icon: '🎓', title: 'Образование', desc: 'Отвечает на вопросы студентов, помогает с материалами' },
        { id: 'custom', icon: '⚙️', title: 'Свой вариант', desc: 'Настройте бота полностью под свои задачи' },
    ];

    const CHANNELS = [
        { id: 'website', icon: '🌐', name: 'Сайт' },
        { id: 'telegram', icon: '✈️', name: 'Telegram' },
        { id: 'whatsapp', icon: '💬', name: 'WhatsApp' },
        { id: 'instagram', icon: '📸', name: 'Instagram' },
        { id: 'vk', icon: '🔵', name: 'ВКонтакте' },
        { id: 'email', icon: '📧', name: 'Email' },
    ];

    const BOT_COLORS = [
        '#6366f1', '#06b6d4', '#a78bfa', '#10b981',
        '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6',
    ];

    function render() {
        const layout = document.createElement('div');
        layout.className = 'wizard-layout';
        layout.id = 'wizard-layout';

        // Reset wizard data if starting fresh
        if (!state.wizardData || Object.keys(state.wizardData).length === 0) {
            state.wizardData = {
                type: null,
                name: '',
                tone: 2,
                personality: '',
                topics: [],
                greeting: '',
                channels: ['website'],
                color: '#6366f1',
                emoji: '🤖',
            };
            state.wizardStep = 1;
        }

        layout.appendChild(renderHeader());
        layout.appendChild(renderBody());
        return layout;
    }

    function renderHeader() {
        const header = document.createElement('div');
        header.className = 'wizard-header';
        header.id = 'wizard-header';

        const brand = document.createElement('div');
        brand.className = 'wizard-brand';
        brand.textContent = 'BetaLine AI';
        brand.addEventListener('click', () => navigate('dashboard'));

        const stepsEl = document.createElement('div');
        stepsEl.className = 'wizard-steps';
        stepsEl.id = 'wizard-steps-container';
        stepsEl.appendChild(buildStepIndicators());

        const closeBtn = document.createElement('button');
        closeBtn.className = 'btn btn-ghost btn-sm';
        closeBtn.textContent = '✕ Отмена';
        closeBtn.addEventListener('click', () => navigate('dashboard'));

        header.appendChild(brand);
        header.appendChild(stepsEl);
        header.appendChild(closeBtn);

        return header;
    }

    function buildStepIndicators() {
        const frag = document.createDocumentFragment();
        STEPS.forEach((step, i) => {
            const num = i + 1;
            const isDone = num < state.wizardStep;
            const isActive = num === state.wizardStep;

            const stepEl = document.createElement('div');
            stepEl.className = 'wizard-step';

            const indicator = document.createElement('div');
            indicator.className = 'wizard-step-indicator';

            const numEl = document.createElement('div');
            numEl.className = `wizard-step-num ${isDone ? 'done' : isActive ? 'active' : ''}`;
            numEl.textContent = isDone ? '✓' : `${num}`;

            const labelEl = document.createElement('div');
            labelEl.className = `wizard-step-label ${isActive ? 'active' : ''}`;
            labelEl.textContent = step.label;

            indicator.appendChild(numEl);
            indicator.appendChild(labelEl);
            stepEl.appendChild(indicator);
            frag.appendChild(stepEl);

            // Connector
            if (i < STEPS.length - 1) {
                const conn = document.createElement('div');
                conn.className = `wizard-connector ${isDone ? 'done' : ''}`;
                frag.appendChild(conn);
            }
        });
        return frag;
    }

    function renderBody() {
        const body = document.createElement('div');
        body.className = 'wizard-body';
        body.id = 'wizard-body';

        const card = renderCurrentStep();
        body.appendChild(card);
        return body;
    }

    function renderCurrentStep() {
        switch (state.wizardStep) {
            case 1: return renderStep1();
            case 2: return renderStep2();
            case 3: return renderStep3();
            case 4: return renderStep4();
            case 5: return renderStep5();
            default: return renderSuccess();
        }
    }

    function updateWizardContent() {
        // Update step indicators
        const stepsContainer = document.getElementById('wizard-steps-container');
        if (stepsContainer) stepsContainer.replaceChildren(buildStepIndicators());

        // Update body
        const body = document.getElementById('wizard-body');
        if (body) {
            body.innerHTML = '';
            body.appendChild(renderCurrentStep());
        }
    }

    function nextStep() {
        if (state.wizardStep < 5) {
            state.wizardStep++;
            updateWizardContent();
        } else {
            finishWizard();
        }
    }

    function prevStep() {
        if (state.wizardStep > 1) {
            state.wizardStep--;
            updateWizardContent();
        }
    }

    // ── Step 1: Bot Type ──────────────────────────────────────
    function renderStep1() {
        const card = document.createElement('div');
        card.className = 'wizard-card';
        card.innerHTML = `
      <div class="wizard-step-title">Какой тип ассистента вы создаёте? 🤖</div>
      <div class="wizard-step-desc">Выберите категорию — это поможет нам предустановить оптимальные сценарии и личность бота.</div>
      <div class="wizard-options" id="type-options"></div>
      <div class="wizard-footer">
        <div class="wizard-progress-text">Шаг 1 из 5</div>
        <button class="btn btn-primary" id="step1-next" disabled>Далее →</button>
      </div>
    `;

        const optionsGrid = card.querySelector('#type-options');
        BOT_TYPES.forEach(type => {
            const opt = document.createElement('div');
            opt.className = `wizard-option ${state.wizardData.type === type.id ? 'selected' : ''}`;
            opt.innerHTML = `
        <div class="wizard-option-icon">${type.icon}</div>
        <div class="wizard-option-title">${type.title}</div>
        <div class="wizard-option-desc">${type.desc}</div>
      `;
            opt.addEventListener('click', () => {
                optionsGrid.querySelectorAll('.wizard-option').forEach(o => o.classList.remove('selected'));
                opt.classList.add('selected');
                state.wizardData.type = type.id;
                state.wizardData.emoji = type.icon;
                state.wizardData.typeName = type.title;
                card.querySelector('#step1-next').disabled = false;
            });
            optionsGrid.appendChild(opt);
        });

        card.querySelector('#step1-next').addEventListener('click', () => {
            if (!state.wizardData.type) return;
            nextStep();
        });

        return card;
    }

    // ── Step 2: Personality ───────────────────────────────────
    function renderStep2() {
        const card = document.createElement('div');
        card.className = 'wizard-card';
        card.innerHTML = `
      <div class="wizard-step-title">Имя и характер ассистента 🎭</div>
      <div class="wizard-step-desc">Задайте имя вашему боту и определите его стиль общения. Это формирует первое впечатление у пользователей.</div>

      <div class="form-group" style="margin-bottom:20px;">
        <label class="form-label">Имя бота</label>
        <input class="form-input" type="text" id="bot-name-input" placeholder="Например: Алиса, Макс, Помощник..." value="${state.wizardData.name || ''}" maxlength="30" />
        <div style="font-size:11px;color:var(--clr-text-dim);margin-top:4px;" id="name-counter">0/30 символов</div>
      </div>

      <div class="form-group" style="margin-bottom:20px;">
        <label class="form-label">Приветственное сообщение</label>
        <textarea class="form-textarea" id="bot-greeting" placeholder="Например: Привет! Я Алиса, ваш персональный помощник...">${state.wizardData.greeting || ''}</textarea>
      </div>

      <div class="form-group" style="margin-bottom:8px;">
        <label class="form-label">Тон общения</label>
        <div class="tone-slider-wrap">
          <input type="range" class="tone-slider" id="tone-slider" min="1" max="5" value="${state.wizardData.tone || 3}" />
          <div class="tone-labels">
            <span>Формальный</span>
            <span>Нейтральный</span>
            <span>Дружелюбный</span>
          </div>
        </div>
      </div>

      <div class="form-group" style="margin-bottom:24px;">
        <label class="form-label">Описание личности (необязательно)</label>
        <input class="form-input" type="text" id="bot-personality" placeholder="Компетентный, отзывчивый, краткий..." value="${state.wizardData.personality || ''}" />
      </div>

      <div class="wizard-footer">
        <button class="btn btn-ghost" id="step2-back">← Назад</button>
        <div class="wizard-progress-text">Шаг 2 из 5</div>
        <button class="btn btn-primary" id="step2-next">Далее →</button>
      </div>
    `;

        card.querySelector('#step2-back').addEventListener('click', prevStep);
        card.querySelector('#step2-next').addEventListener('click', () => {
            const name = card.querySelector('#bot-name-input').value.trim();
            if (!name) { showToast('Придумайте имя для бота', 'error'); return; }
            state.wizardData.name = name;
            state.wizardData.greeting = card.querySelector('#bot-greeting').value.trim();
            state.wizardData.tone = parseInt(card.querySelector('#tone-slider').value);
            state.wizardData.personality = card.querySelector('#bot-personality').value.trim();
            nextStep();
        });

        // Name counter
        const nameInput = card.querySelector('#bot-name-input');
        const counter = card.querySelector('#name-counter');
        nameInput.addEventListener('input', () => {
            counter.textContent = `${nameInput.value.length}/30 символов`;
        });
        counter.textContent = `${nameInput.value.length}/30 символов`;

        return card;
    }

    // ── Step 3: Knowledge ─────────────────────────────────────
    function renderStep3() {
        const card = document.createElement('div');
        card.className = 'wizard-card';
        card.innerHTML = `
      <div class="wizard-step-title">База знаний бота 📚</div>
      <div class="wizard-step-desc">Укажите темы и ключевые слова, которые будет знать ваш бот. Это ускорит его обучение.</div>

      <div class="form-group" style="margin-bottom:20px;">
        <label class="form-label">Тематики и ключевые слова</label>
        <div class="tags-input-wrap" id="tags-wrap">
          <input type="text" class="tags-actual-input" id="tags-input" placeholder="Введите тему и нажмите Enter..." />
        </div>
        <div style="font-size:12px;color:var(--clr-text-dim);margin-top:6px;">Нажмите Enter или запятую чтобы добавить тему</div>
      </div>

      <div class="form-group" style="margin-bottom:20px;">
        <label class="form-label">Загрузить документы (FAQ, инструкции)</label>
        <div style="border:2px dashed var(--clr-border);border-radius:12px;padding:24px;text-align:center;cursor:pointer;transition:all 0.2s;" id="file-drop">
          <div style="font-size:32px;margin-bottom:8px;">📄</div>
          <div style="font-size:14px;font-weight:600;margin-bottom:4px;">Перетащите файлы сюда</div>
          <div style="font-size:12px;color:var(--clr-text-muted);">PDF, DOCX, TXT — до 10MB</div>
          <div style="margin-top:12px;">
            <span class="btn btn-ghost btn-sm" id="file-browse-btn">Выбрать файлы</span>
          </div>
        </div>
        <div id="files-list" style="margin-top:8px;display:flex;flex-direction:column;gap:6px;"></div>
      </div>

      <div class="form-group" style="margin-bottom:24px;">
        <label class="form-label">URL вашего сайта (для автосбора данных)</label>
        <input class="form-input" type="url" id="site-url" placeholder="https://example.com" value="${state.wizardData.siteUrl || ''}" />
        <div style="font-size:12px;color:var(--clr-text-dim);margin-top:4px;">Бот автоматически обучится на основе контента сайта</div>
      </div>

      <div class="wizard-footer">
        <button class="btn btn-ghost" id="step3-back">← Назад</button>
        <div class="wizard-progress-text">Шаг 3 из 5</div>
        <button class="btn btn-primary" id="step3-next">Далее →</button>
      </div>
    `;

        // Tags logic
        const tagsWrap = card.querySelector('#tags-wrap');
        const tagsInput = card.querySelector('#tags-input');
        let tags = [...(state.wizardData.topics || [])];

        function renderTags() {
            tagsWrap.querySelectorAll('.tag-chip').forEach(t => t.remove());
            tags.forEach(tag => {
                const chip = document.createElement('div');
                chip.className = 'tag-chip';
                chip.innerHTML = `${tag}<span class="tag-chip-remove">✕</span>`;
                chip.querySelector('.tag-chip-remove').addEventListener('click', () => {
                    tags = tags.filter(t => t !== tag);
                    renderTags();
                });
                tagsWrap.insertBefore(chip, tagsInput);
            });
        }

        renderTags();

        tagsInput.addEventListener('keydown', (e) => {
            if ((e.key === 'Enter' || e.key === ',') && tagsInput.value.trim()) {
                e.preventDefault();
                const newTag = tagsInput.value.trim().replace(/,$/, '');
                if (newTag && !tags.includes(newTag)) tags.push(newTag);
                tagsInput.value = '';
                renderTags();
            }
        });

        // File drop styling
        const fileDrop = card.querySelector('#file-drop');
        fileDrop.addEventListener('dragover', (e) => { e.preventDefault(); fileDrop.style.borderColor = 'var(--clr-primary)'; });
        fileDrop.addEventListener('dragleave', () => { fileDrop.style.borderColor = 'var(--clr-border)'; });
        fileDrop.addEventListener('drop', (e) => {
            e.preventDefault();
            fileDrop.style.borderColor = 'var(--clr-border)';
            const files = Array.from(e.dataTransfer.files);
            showFiles(files, card);
        });
        card.querySelector('#file-browse-btn').addEventListener('click', () => {
            showToast('В демо-режиме загрузка файлов недоступна', 'info');
        });

        card.querySelector('#step3-back').addEventListener('click', prevStep);
        card.querySelector('#step3-next').addEventListener('click', () => {
            state.wizardData.topics = tags;
            state.wizardData.siteUrl = card.querySelector('#site-url').value.trim();
            nextStep();
        });

        return card;
    }

    function showFiles(files, card) {
        const list = card.querySelector('#files-list');
        files.forEach(file => {
            const item = document.createElement('div');
            item.style.cssText = 'display:flex;align-items:center;gap:8px;background:var(--clr-surface2);border:1px solid var(--clr-border);border-radius:8px;padding:8px 12px;font-size:13px;';
            item.innerHTML = `<span>📄</span><span style="flex:1;">${file.name}</span><span style="color:var(--clr-text-muted)">${(file.size / 1024).toFixed(0)}KB</span>`;
            list.appendChild(item);
        });
    }

    // ── Step 4: Channels ──────────────────────────────────────
    function renderStep4() {
        const card = document.createElement('div');
        card.className = 'wizard-card';
        card.innerHTML = `
      <div class="wizard-step-title">Где будет работать бот? 📡</div>
      <div class="wizard-step-desc">Выберите каналы для размещения вашего ассистента. Можно выбрать несколько.</div>
      <div class="channels-grid" id="channels-grid"></div>
      <div style="margin-top:20px;padding:16px;background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.2);border-radius:12px;font-size:13px;color:var(--clr-text-muted);">
        💡 После создания бота вы получите инструкции по интеграции для каждого канала
      </div>
      <div class="wizard-footer" style="margin-top:20px;">
        <button class="btn btn-ghost" id="step4-back">← Назад</button>
        <div class="wizard-progress-text">Шаг 4 из 5</div>
        <button class="btn btn-primary" id="step4-next">Далее →</button>
      </div>
    `;

        const grid = card.querySelector('#channels-grid');
        let selected = new Set(state.wizardData.channels || ['website']);

        CHANNELS.forEach(ch => {
            const item = document.createElement('div');
            item.className = `channel-item ${selected.has(ch.id) ? 'selected' : ''}`;
            item.innerHTML = `<div class="channel-icon">${ch.icon}</div><div class="channel-name">${ch.name}</div>`;
            item.addEventListener('click', () => {
                if (selected.has(ch.id) && selected.size === 1) return;
                if (selected.has(ch.id)) { selected.delete(ch.id); item.classList.remove('selected'); }
                else { selected.add(ch.id); item.classList.add('selected'); }
            });
            grid.appendChild(item);
        });

        card.querySelector('#step4-back').addEventListener('click', prevStep);
        card.querySelector('#step4-next').addEventListener('click', () => {
            state.wizardData.channels = Array.from(selected);
            nextStep();
        });

        return card;
    }

    // ── Step 5: Appearance ────────────────────────────────────
    function renderStep5() {
        const card = document.createElement('div');
        card.className = 'wizard-card';
        card.innerHTML = `
      <div class="wizard-step-title">Внешний вид бота 🎨</div>
      <div class="wizard-step-desc">Настройте цвет и иконку — они будут отображаться в чате и на кнопке запуска бота.</div>

      <div class="form-group" style="margin-bottom:24px;">
        <label class="form-label">Цвет бота</label>
        <div class="color-options" id="color-options"></div>
      </div>

      <div class="form-group" style="margin-bottom:24px;">
        <label class="form-label">Иконка / Аватар</label>
        <div style="display:flex;flex-wrap:wrap;gap:10px;" id="emoji-options"></div>
      </div>

      <div style="background:var(--clr-surface2);border:1px solid var(--clr-border);border-radius:16px;padding:20px;margin-bottom:24px;">
        <div style="font-size:12px;font-weight:700;color:var(--clr-text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">Предпросмотр</div>
        <div style="display:flex;align-items:center;gap:12px;">
          <div id="preview-bot-avatar" style="width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;background:${state.wizardData.color}33;border:2px solid ${state.wizardData.color};">${state.wizardData.emoji || '🤖'}</div>
          <div>
            <div style="font-size:16px;font-weight:700;">${state.wizardData.name || 'Мой бот'}</div>
            <div style="font-size:12px;color:var(--clr-text-muted);">${state.wizardData.typeName || 'ИИ-ассистент'}</div>
          </div>
        </div>
        <div style="margin-top:12px;background:${state.wizardData.color}1a;border:1px solid ${state.wizardData.color}44;border-radius:12px;padding:12px;font-size:13px;color:var(--clr-text-muted);" id="greeting-preview">
          ${state.wizardData.greeting || 'Привет! Чем могу помочь?'}
        </div>
      </div>

      <div class="wizard-footer">
        <button class="btn btn-ghost" id="step5-back">← Назад</button>
        <div class="wizard-progress-text">Шаг 5 из 5</div>
        <button class="btn btn-primary btn-lg" id="step5-finish">🚀 Создать бота</button>
      </div>
    `;

        // Color options
        const colorOpts = card.querySelector('#color-options');
        BOT_COLORS.forEach(color => {
            const dot = document.createElement('div');
            dot.className = `color-dot ${state.wizardData.color === color ? 'selected' : ''}`;
            dot.style.background = color;
            dot.addEventListener('click', () => {
                colorOpts.querySelectorAll('.color-dot').forEach(d => d.classList.remove('selected'));
                dot.classList.add('selected');
                state.wizardData.color = color;
                updatePreview(card);
            });
            colorOpts.appendChild(dot);
        });

        // Emoji options
        const emojis = ['🤖', '✦', '💬', '🎯', '⚡', '🌟', '🛡️', '💡', '🚀', '👋', '🦾', '🌐'];
        const emojiOpts = card.querySelector('#emoji-options');
        emojis.forEach(emoji => {
            const btn = document.createElement('div');
            btn.style.cssText = `width:44px;height:44px;border-radius:10px;border:2px solid ${state.wizardData.emoji === emoji ? 'var(--clr-primary)' : 'var(--clr-border)'};display:flex;align-items:center;justify-content:center;font-size:22px;cursor:pointer;transition:all 0.2s;background:${state.wizardData.emoji === emoji ? 'rgba(99,102,241,0.15)' : 'var(--clr-surface2)'};`;
            btn.textContent = emoji;
            btn.addEventListener('click', () => {
                emojiOpts.querySelectorAll('div').forEach(d => {
                    d.style.borderColor = 'var(--clr-border)';
                    d.style.background = 'var(--clr-surface2)';
                });
                btn.style.borderColor = 'var(--clr-primary)';
                btn.style.background = 'rgba(99,102,241,0.15)';
                state.wizardData.emoji = emoji;
                updatePreview(card);
            });
            emojiOpts.appendChild(btn);
        });

        card.querySelector('#step5-back').addEventListener('click', prevStep);
        card.querySelector('#step5-finish').addEventListener('click', () => {
            const btn = card.querySelector('#step5-finish');
            btn.innerHTML = '<div class="spinner"></div> Создаём бота...';
            btn.disabled = true;
            setTimeout(() => finishWizard(), 2000);
        });

        return card;
    }

    function updatePreview(card) {
        const avatar = card.querySelector('#preview-bot-avatar');
        const greeting = card.querySelector('#greeting-preview');
        if (avatar) {
            avatar.style.background = state.wizardData.color + '33';
            avatar.style.border = `2px solid ${state.wizardData.color}`;
            avatar.textContent = state.wizardData.emoji || '🤖';
        }
        if (greeting) {
            greeting.style.background = state.wizardData.color + '1a';
            greeting.style.border = `1px solid ${state.wizardData.color}44`;
        }
    }

    // ── Finish & Success ──────────────────────────────────────
    function finishWizard() {
        const newBot = {
            id: 'bot-' + Date.now(),
            name: state.wizardData.name || 'Мой бот',
            emoji: state.wizardData.emoji || '🤖',
            type: state.wizardData.typeName || 'ИИ-ассистент',
            color: state.wizardData.color || '#6366f1',
            status: 'active',
            dialogs: 0,
            satisfaction: 0,
            createdAt: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
            tone: state.wizardData.tone,
            topics: state.wizardData.topics || [],
            channels: state.wizardData.channels || ['website'],
            greeting: state.wizardData.greeting || 'Привет! Чем могу помочь?',
        };
        state.bots.unshift(newBot);
        state.currentBot = newBot;
        state.wizardStep = 6;
        updateWizardContent();
    }

    function renderSuccess() {
        const card = document.createElement('div');
        card.className = 'wizard-card';
        card.innerHTML = `
      <div class="wizard-success">
        <div class="success-icon">🎉</div>
        <h2 class="success-title">Бот успешно создан!</h2>
        <p class="success-sub">Ваш ИИ-ассистент <strong style="color:var(--clr-primary-light);">${state.currentBot?.name}</strong> готов к работе. Теперь его можно протестировать или сразу интегрировать на сайт.</p>
        <div class="success-actions">
          <button class="btn btn-primary btn-lg" id="go-preview">💬 Протестировать бота</button>
          <button class="btn btn-secondary btn-lg" id="go-dashboard">📊 В личный кабинет</button>
        </div>
        <div style="margin-top:24px;background:var(--clr-surface2);border:1px solid var(--clr-border);border-radius:12px;padding:16px;text-align:left;width:100%;">
          <div style="font-size:13px;font-weight:700;color:var(--clr-text-muted);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.05em;">Что дальше?</div>
          <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;color:var(--clr-text-muted);">
            <div>✅ Бот создан и готов к работе</div>
            <div>⏳ Получить код для установки на сайте → Интеграции</div>
            <div>⏳ Настроить автоматические ответы → Настройки</div>
            <div>⏳ Пополнить базу знаний → Обучение</div>
          </div>
        </div>
      </div>
    `;

        card.querySelector('#go-preview').addEventListener('click', () => {
            navigate('preview', { bot: state.currentBot });
        });
        card.querySelector('#go-dashboard').addEventListener('click', () => {
            state.wizardData = {};
            state.wizardStep = 1;
            navigate('dashboard');
        });

        return card;
    }

    return { render };
})();
