/* ===================================================
   LIFE DASHBOARD — desain.js
   Vanilla JS | LocalStorage | No frameworks
   =================================================== */

/* ══════════════════════════════════════════
   0. i18n — TRANSLATIONS
══════════════════════════════════════════ */
const TRANSLATIONS = {
  id: {
    theme_label:     '🌙 Gelap',
    theme_label_on:  '☀️ Terang',
    lang_label:      '🇮🇩 ID',
    lang_label_on:   '🇺🇸 EN',
    timer_title:     '⏱ Focus Timer',
    timer_duration:  'Durasi:',
    timer_start:     '▶ Mulai',
    timer_stop:      '⏸ Stop',
    timer_reset:     '↺ Reset',
    timer_ready:     'Siap untuk fokus?',
    timer_running:   'Fokus! Jangan terganggu 💪',
    timer_paused:    'Dijeda. Klik Start untuk lanjut.',
    timer_done:      'Sesi selesai! Saatnya istirahat.',
    todo_title:      'Tugasku ✏️',
    todo_placeholder:'Tambah tugas baru...',
    todo_add:        'Tambah',
    todo_empty:      'Catat Tugasmu hari ini!!!',
    diff_easy:       'Mudah',
    diff_normal:     'Normal',
    diff_hard:       'Sulit',
    sort_by:         'Urutkan:',
    sort_created:    'Dibuat',
    sort_deadline:   'Deadline',
    sort_diff:       'Kesulitan',
    sort_done:       'Status',
    sort_dir_label:  'Tipe Urutan :',
    sort_asc:        '↑ Menaik (A-Z)',
    sort_desc:       '↓ Menurun (Z-A)',
    cat_label:       'Kategori:',
    todo_confirm:    '✔ Simpan',
    links_title:     '🔗 Quick Links',
    links_add:       'Add Link',
    link_name_ph:    'Nama Link',
    link_url_ph:     'URL',
    links_empty:     'Belum ada link. Tambahkan favoritmu! 🌐',
    edit_title:      '✏️ Edit Tugas',
    edit_save:       'Simpan',
    edit_cancel:     'Batal',
    deadline_label:  'Deadline:',
    overdue:         '⚠ Terlambat',
    no_deadline:     'Tanpa deadline',
    duplicate_msg:   '⚠ Tugas sudah ada!',
    greet: {
      morning: 'Selamat Pagi, Rizka! ☀️',
      noon:    'Selamat Siang, Rizka! 🌤️',
      afternoon:'Selamat Sore, Rizka! 🌇',
      night:   'Selamat Malam, Rizka! 🌙',
    },
    days:   ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'],
    months: ['Januari','Februari','Maret','April','Mei','Juni',
             'Juli','Agustus','September','Oktober','November','Desember'],
  },
  en: {
    theme_label:     '🌙 Dark',
    theme_label_on:  '☀️ Light',
    lang_label:      '🇮🇩 ID',
    lang_label_on:   '🇺🇸 EN',
    timer_title:     '⏱ Focus Timer',
    timer_duration:  'Duration:',
    timer_start:     '▶ Start',
    timer_stop:      '⏸ Stop',
    timer_reset:     '↺ Reset',
    timer_ready:     'Ready to focus?',
    timer_running:   'Stay focused! 💪',
    timer_paused:    'Paused. Click Start to resume.',
    timer_done:      'Session done! Time to rest.',
    todo_title:      'My Tasks ✏️',
    todo_placeholder:'Add a new task...',
    todo_add:        'Add',
    todo_empty:      'List your tasks for today!',
    diff_easy:       'Easy',
    diff_normal:     'Normal',
    diff_hard:       'Hard',
    sort_by:         'Sort by:',
    sort_created:    'Created',
    sort_deadline:   'Deadline',
    sort_diff:       'Difficulty',
    sort_done:       'Status',
    sort_dir_label:  'Sort Type',
    sort_asc:        '↑ Ascending (A-Z)',
    sort_desc:       '↓ Descending (Z-A)',
    cat_label:       'Category:',
    todo_confirm:    '✔ Save',
    links_title:     '🔗 Quick Links',
    links_add:       'Add Link',
    link_name_ph:    'Link Name',
    link_url_ph:     'URL',
    links_empty:     'No links yet. Add your favorites! 🌐',
    edit_title:      '✏️ Edit Task',
    edit_save:       'Save',
    edit_cancel:     'Cancel',
    deadline_label:  'Deadline:',
    overdue:         '⚠ Overdue',
    no_deadline:     'No deadline',
    duplicate_msg:   '⚠ Task already exists!',
    greet: {
      morning:   'Good Morning, Rizka! ☀️',
      noon:      'Good Afternoon, Rizka! 🌤️',
      afternoon: 'Good Evening, Rizka! 🌇',
      night:     'Good Night, Rizka! 🌙',
    },
    days:   ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    months: ['January','February','March','April','May','June',
             'July','August','September','October','November','December'],
  }
};

/* ──────────────────────────────────────────
   STATE — shared across modules
────────────────────────────────────────── */
const STATE = {
  lang:  localStorage.getItem('ld_lang')  || 'id',   // 'id' | 'en'
  theme: localStorage.getItem('ld_theme') || 'dark',  // 'dark' | 'light'
};

function t(key) { return TRANSLATIONS[STATE.lang][key] || key; }

/* Apply theme + lang to <html> */
function applyGlobal() {
  document.documentElement.setAttribute('data-theme', STATE.theme);
  document.documentElement.setAttribute('data-lang',  STATE.lang);
  document.documentElement.lang = STATE.lang === 'id' ? 'id' : 'en';
}

applyGlobal();

/* ══════════════════════════════════════════
   1. SETTINGS PANEL  (theme + language)
══════════════════════════════════════════ */
(function initSettings() {
  const themeToggle = document.getElementById('theme-toggle');
  const langToggle  = document.getElementById('lang-toggle');

  /* Sync initial toggle states */
  themeToggle.checked = STATE.theme === 'light';
  langToggle.checked  = STATE.lang  === 'en';

  /* ── i18n: translate every [data-i18n] element ── */
  function applyTranslations() {
    /* Static text nodes */
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (TRANSLATIONS[STATE.lang][key] !== undefined) {
        el.textContent = TRANSLATIONS[STATE.lang][key];
      }
    });

    /* Placeholder attributes */
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (TRANSLATIONS[STATE.lang][key] !== undefined) {
        el.placeholder = TRANSLATIONS[STATE.lang][key];
      }
    });

    /* <option> elements inside selects */
    document.querySelectorAll('option[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (TRANSLATIONS[STATE.lang][key] !== undefined) {
        el.textContent = TRANSLATIONS[STATE.lang][key];
      }
    });

    /* Settings labels need special handling (on vs off state) */
    updateSettingLabels();
  }

  function updateSettingLabels() {
    /* Theme label */
    const themeLabelEl = themeToggle.closest('.setting-row').querySelector('.setting-label');
    themeLabelEl.textContent = STATE.theme === 'light' ? t('theme_label_on') : t('theme_label');

    /* Lang label */
    const langLabelEl = langToggle.closest('.setting-row').querySelector('.setting-label');
    langLabelEl.textContent = STATE.lang === 'en' ? t('lang_label_on') : t('lang_label');
  }

  /* ── Theme toggle ── */
  themeToggle.addEventListener('change', () => {
    STATE.theme = themeToggle.checked ? 'light' : 'dark';
    localStorage.setItem('ld_theme', STATE.theme);
    applyGlobal();
    applyTranslations();
    /* Re-render todo so deadline colours refresh */
    window.__rerenderTodo && window.__rerenderTodo();
  });

  /* ── Language toggle ── */
  langToggle.addEventListener('change', () => {
    STATE.lang = langToggle.checked ? 'en' : 'id';
    localStorage.setItem('ld_lang', STATE.lang);
    applyGlobal();
    applyTranslations();
    /* Re-render to pick up new labels */
    window.__rerenderTodo  && window.__rerenderTodo();
    window.__rerenderLinks && window.__rerenderLinks();
    /* Update clock greeting immediately */
    window.__tickClock && window.__tickClock();
    /* Update timer label */
    window.__refreshTimerLabel && window.__refreshTimerLabel();
  });

  /* Initial translation pass */
  applyTranslations();
})();


/* ══════════════════════════════════════════
   2. GREETING & CLOCK
══════════════════════════════════════════ */
(function initClock() {
  const timeEl  = document.getElementById('current-time');
  const dateEl  = document.getElementById('current-date');
  const greetEl = document.getElementById('greeting-msg');

  function pad(n) { return String(n).padStart(2, '0'); }

  function getGreeting(h) {
    const g = t('greet');
    if (h >= 5  && h < 12) return g.morning;
    if (h >= 12 && h < 15) return g.noon;
    if (h >= 15 && h < 19) return g.afternoon;
    return g.night;
  }

  function tick() {
    const now   = new Date();
    const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
    const days   = TRANSLATIONS[STATE.lang].days;
    const months = TRANSLATIONS[STATE.lang].months;

    timeEl.textContent  = `${pad(h)}:${pad(m)}:${pad(s)}`;
    dateEl.textContent  = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    greetEl.textContent = getGreeting(h);
  }

  window.__tickClock = tick;
  tick();
  setInterval(tick, 1000);
})();


/* ══════════════════════════════════════════
   3. FOCUS TIMER
══════════════════════════════════════════ */
(function initTimer() {
  const display    = document.getElementById('timer-display');
  const label      = document.getElementById('timer-label');
  const btnStart   = document.getElementById('btn-start');
  const btnStop    = document.getElementById('btn-stop');
  const btnReset   = document.getElementById('btn-reset');

  /* Duration popup */
  const durPopupBtn   = document.getElementById('dur-popup-btn');
  const durPopup      = document.getElementById('dur-popup');
  const durDisplayLbl = document.getElementById('dur-display-label');

  let selectedMinutes = 25;          // default
  let duration        = selectedMinutes * 60;
  let remaining       = duration;
  let intervalId      = null;
  let isRunning       = false;

  /* ── Duration popup open/close ── */
  function toggleDurPopup(force) {
    const open = force !== undefined ? force : durPopup.classList.contains('hidden');
    if (open) {
      durPopup.classList.remove('hidden');
      durPopupBtn.classList.add('open');
      durPopupBtn.setAttribute('aria-expanded', 'true');
    } else {
      durPopup.classList.add('hidden');
      durPopupBtn.classList.remove('open');
      durPopupBtn.setAttribute('aria-expanded', 'false');
    }
  }

  durPopupBtn.addEventListener('click', e => {
    e.stopPropagation();
    toggleDurPopup();
  });

  document.addEventListener('click', e => {
    const wrapper = document.getElementById('dur-popup-wrapper');
    if (wrapper && !wrapper.contains(e.target)) toggleDurPopup(false);
  });

  /* ── Radio button change ── */
  document.querySelectorAll('input[name="timer-dur"]').forEach(radio => {
    radio.addEventListener('change', () => {
      if (isRunning) return; // ignore while running
      selectedMinutes  = parseInt(radio.value, 10);
      duration         = selectedMinutes * 60;
      remaining        = duration;
      durDisplayLbl.textContent = `${selectedMinutes} min`;
      display.classList.remove('running', 'finished');
      label.textContent = t('timer_ready');
      render();
      toggleDurPopup(false);
    });
  });

  /* ── Timer helpers ── */
  function pad(n) { return String(n).padStart(2, '0'); }

  function render() {
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    display.textContent = `${pad(m)}:${pad(s)}`;
  }

  function refreshLabel() {
    if (isRunning)              label.textContent = t('timer_running');
    else if (remaining === 0)   label.textContent = t('timer_done');
    else if (remaining < duration) label.textContent = t('timer_paused');
    else                        label.textContent = t('timer_ready');
  }

  window.__refreshTimerLabel = refreshLabel;

  function start() {
    if (isRunning) return;
    isRunning = true;
    display.classList.add('running');
    display.classList.remove('finished');
    label.textContent = t('timer_running');

    intervalId = setInterval(() => {
      remaining--;
      render();
      if (remaining <= 0) {
        clearInterval(intervalId);
        isRunning = false;
        remaining = 0;
        display.classList.remove('running');
        display.classList.add('finished');
        label.textContent = t('timer_done');
        render();
      }
    }, 1000);
  }

  function stop() {
    if (!isRunning) return;
    clearInterval(intervalId);
    isRunning = false;
    display.classList.remove('running');
    label.textContent = t('timer_paused');
  }

  function reset() {
    clearInterval(intervalId);
    isRunning = false;
    remaining = duration;
    display.classList.remove('running', 'finished');
    label.textContent = t('timer_ready');
    render();
  }

  btnStart.addEventListener('click', start);
  btnStop.addEventListener('click',  stop);
  btnReset.addEventListener('click', reset);

  render();
  label.textContent = t('timer_ready');
})();


/* ══════════════════════════════════════════
   4. TOAST NOTIFICATION
══════════════════════════════════════════ */
(function initToast() {
  /* create element once */
  const toast = document.createElement('div');
  toast.className = 'toast';
  document.body.appendChild(toast);
  let timer = null;

  window.__showToast = function(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove('show'), 2800);
  };
})();


/* ══════════════════════════════════════════
   5. TO-DO LIST
══════════════════════════════════════════ */
(function initTodo() {
  const LS_KEY  = 'life_dashboard_todos';
  const listEl  = document.getElementById('todo-list');
  const inputEl = document.getElementById('todo-input');
  const emptyEl = document.getElementById('todo-empty');

  /* ── Sort state (driven by radio buttons in popup) ── */
  let sortField = 'created';
  let sortDir   = 'asc';

  /* ── Meta panel elements ── */
  const metaPanel    = document.getElementById('todo-meta-panel');
  const diffSel      = document.getElementById('todo-difficulty');
  const deadlineIn   = document.getElementById('todo-deadline');
  const btnAdd       = document.getElementById('btn-add-todo');      // opens panel
  const btnConfirm   = document.getElementById('btn-confirm-todo');  // saves task
  const btnCancelMeta = document.getElementById('btn-cancel-meta');

  /* ── Sort popup elements ── */
  const sortIconBtn  = document.getElementById('sort-icon-btn');
  const sortPopup    = document.getElementById('sort-popup');

  /* ── Modal elements ── */
  const modal        = document.getElementById('edit-modal');
  const editInput    = document.getElementById('edit-input');
  const editDiff     = document.getElementById('edit-difficulty');
  const editDeadline = document.getElementById('edit-deadline');
  const btnSave      = document.getElementById('btn-save-edit');
  const btnCancel    = document.getElementById('btn-cancel-edit');
  let   editingId    = null;

  /* ═══ META PANEL OPEN / CLOSE ═══ */
  let pendingText = '';

  function openMeta() {
    pendingText = inputEl.value.trim();
    if (!pendingText) { inputEl.focus(); return; }
    metaPanel.classList.remove('hidden');
    diffSel.value    = 'normal';
    deadlineIn.value = '';
    diffSel.focus();
  }

  function closeMeta() {
    metaPanel.classList.add('hidden');
  }

  btnAdd.addEventListener('click', openMeta);

  btnCancelMeta.addEventListener('click', () => {
    closeMeta();
    inputEl.focus();
  });

  /* Enter in input field also opens panel */
  inputEl.addEventListener('keydown', e => {
    if (e.key === 'Enter') openMeta();
  });

  /* Confirm button inside panel — actually saves the task */
  btnConfirm.addEventListener('click', () => {
    addTodo(pendingText, diffSel.value, deadlineIn.value);
    inputEl.value = '';
    closeMeta();
    inputEl.focus();
  });

  /* Enter inside meta panel fields also confirms */
  deadlineIn.addEventListener('keydown', e => {
    if (e.key === 'Enter') btnConfirm.click();
    if (e.key === 'Escape') { closeMeta(); inputEl.focus(); }
  });

  /* ═══ SORT POPUP ═══ */
  function toggleSortPopup(force) {
    const open = force !== undefined ? force : sortPopup.classList.contains('hidden');
    if (open) {
      sortPopup.classList.remove('hidden');
      sortIconBtn.classList.add('open');
      sortIconBtn.setAttribute('aria-expanded', 'true');
    } else {
      sortPopup.classList.add('hidden');
      sortIconBtn.classList.remove('open');
      sortIconBtn.setAttribute('aria-expanded', 'false');
    }
  }

  sortIconBtn.addEventListener('click', e => {
    e.stopPropagation();
    toggleSortPopup();
  });

  document.addEventListener('click', e => {
    const wrapper = document.getElementById('sort-popup-wrapper');
    if (wrapper && !wrapper.contains(e.target)) toggleSortPopup(false);
  });

  /* Radio: sort field */
  document.querySelectorAll('input[name="sort-field"]').forEach(radio => {
    radio.addEventListener('change', () => {
      sortField = radio.value;
      renderTodos();
    });
  });

  /* Radio: sort direction */
  document.querySelectorAll('input[name="sort-dir"]').forEach(radio => {
    radio.addEventListener('change', () => {
      sortDir = radio.value;
      renderTodos();
    });
  });

  /* ═══ STORAGE ═══ */
  function loadTodos() {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; }
    catch { return []; }
  }
  function saveTodos(todos) { localStorage.setItem(LS_KEY, JSON.stringify(todos)); }

  /* ═══ SORT ═══ */
  const DIFF_ORDER = { easy: 0, normal: 1, hard: 2 };

  function getSorted(todos) {
    const arr = [...todos];
    arr.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'created') {
        cmp = a.id > b.id ? 1 : -1;
      } else if (sortField === 'deadline') {
        const ta = a.deadline ? new Date(a.deadline).getTime() : Infinity;
        const tb = b.deadline ? new Date(b.deadline).getTime() : Infinity;
        cmp = ta - tb;
      } else if (sortField === 'difficulty') {
        cmp = DIFF_ORDER[a.difficulty||'normal'] - DIFF_ORDER[b.difficulty||'normal'];
      } else if (sortField === 'done') {
        cmp = (a.done ? 1 : 0) - (b.done ? 1 : 0);
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return arr;
  }

  /* ═══ FORMAT DEADLINE ═══ */
  function formatDeadline(dtStr) {
    if (!dtStr) return '';
    const d = new Date(dtStr);
    const pad = n => String(n).padStart(2, '0');
    const days   = TRANSLATIONS[STATE.lang].days;
    const months = TRANSLATIONS[STATE.lang].months;
    return `${days[d.getDay()]}, ${pad(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  function isOverdue(dtStr) {
    if (!dtStr) return false;
    return new Date(dtStr) < new Date();
  }

  /* ═══ RENDER ═══ */
  function renderTodos() {
    const todos = getSorted(loadTodos());
    listEl.innerHTML = '';

    if (todos.length === 0) {
      emptyEl.textContent = t('todo_empty');
      emptyEl.classList.remove('hidden');
      return;
    }
    emptyEl.classList.add('hidden');

    const diffLabel = { easy: t('diff_easy'), normal: t('diff_normal'), hard: t('diff_hard') };

    todos.forEach(todo => {
      const li = document.createElement('li');
      li.className = `todo-item${todo.done ? ' done' : ''}`;
      li.dataset.id = todo.id;

      /* Checkbox */
      const chk = document.createElement('input');
      chk.type = 'checkbox';
      chk.className = 'todo-check';
      chk.checked = todo.done;
      chk.setAttribute('aria-label', 'Mark done');
      chk.addEventListener('change', () => toggleDone(todo.id));

      /* Body */
      const body = document.createElement('div');
      body.className = 'todo-body';

      const textSpan = document.createElement('span');
      textSpan.className = 'todo-text';
      textSpan.textContent = todo.text;

      const meta = document.createElement('div');
      meta.className = 'todo-meta';

      const diff  = todo.difficulty || 'normal';
      const badge = document.createElement('span');
      badge.className = `badge-diff badge-${diff}`;
      badge.textContent = diffLabel[diff] || diff;
      meta.appendChild(badge);

      if (todo.deadline) {
        const dl = document.createElement('span');
        dl.className = `todo-deadline${isOverdue(todo.deadline) && !todo.done ? ' overdue' : ''}`;
        const prefix = isOverdue(todo.deadline) && !todo.done ? t('overdue') + ' · ' : '';
        dl.textContent = prefix + formatDeadline(todo.deadline);
        meta.appendChild(dl);
      }

      body.append(textSpan, meta);

      /* Actions */
      const actions = document.createElement('div');
      actions.className = 'todo-actions';

      const btnEdit = document.createElement('button');
      btnEdit.className = 'btn btn-icon btn-edit';
      btnEdit.textContent = '✏️';
      btnEdit.setAttribute('aria-label', 'Edit task');
      btnEdit.addEventListener('click', () => openEdit(todo));

      const btnDel = document.createElement('button');
      btnDel.className = 'btn btn-icon btn-delete';
      btnDel.textContent = '🗑️';
      btnDel.setAttribute('aria-label', 'Delete task');
      btnDel.addEventListener('click', () => deleteTodo(todo.id));

      actions.append(btnEdit, btnDel);
      li.append(chk, body, actions);
      listEl.appendChild(li);
    });
  }

  window.__rerenderTodo = renderTodos;

  /* ═══ CRUD ═══ */
  function addTodo(text, difficulty, deadline) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const todos = loadTodos();
    const duplicate = todos.some(item => item.text.toLowerCase() === trimmed.toLowerCase());
    if (duplicate) { window.__showToast(t('duplicate_msg')); return; }

    todos.push({
      id:         Date.now().toString(),
      text:       trimmed,
      difficulty: difficulty || 'normal',
      deadline:   deadline   || '',
      done:       false,
    });
    saveTodos(todos);
    renderTodos();
  }

  function toggleDone(id) {
    saveTodos(loadTodos().map(item => item.id === id ? { ...item, done: !item.done } : item));
    renderTodos();
  }

  function deleteTodo(id) {
    saveTodos(loadTodos().filter(item => item.id !== id));
    renderTodos();
  }

  function openEdit(todo) {
    editingId = todo.id;
    editInput.value    = todo.text;
    editDiff.value     = todo.difficulty || 'normal';
    editDeadline.value = todo.deadline   || '';
    modal.classList.remove('hidden');
    editInput.focus();
    editInput.select();
  }

  function closeEdit() {
    editingId = null;
    modal.classList.add('hidden');
    editInput.value = '';
  }

  function saveEdit() {
    const newText = editInput.value.trim();
    if (!newText || !editingId) { closeEdit(); return; }
    const todos = loadTodos();
    const dup = todos.some(item =>
      item.id !== editingId && item.text.toLowerCase() === newText.toLowerCase()
    );
    if (dup) { window.__showToast(t('duplicate_msg')); return; }
    saveTodos(todos.map(item =>
      item.id === editingId
        ? { ...item, text: newText, difficulty: editDiff.value, deadline: editDeadline.value }
        : item
    ));
    closeEdit();
    renderTodos();
  }

  btnSave.addEventListener('click', saveEdit);
  btnCancel.addEventListener('click', closeEdit);
  editInput.addEventListener('keydown', e => {
    if (e.key === 'Enter')  saveEdit();
    if (e.key === 'Escape') closeEdit();
  });
  modal.addEventListener('click', e => { if (e.target === modal) closeEdit(); });

  renderTodos();
})();


/* ══════════════════════════════════════════
   6. QUICK LINKS
══════════════════════════════════════════ */
(function initLinks() {
  const LS_KEY    = 'life_dashboard_links';
  const container = document.getElementById('links-container');
  const nameInput = document.getElementById('link-name-input');
  const urlInput  = document.getElementById('link-url-input');
  const btnAdd    = document.getElementById('btn-add-link');
  const emptyEl   = document.getElementById('links-empty');

  function loadLinks() {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; }
    catch { return []; }
  }

  function saveLinks(links) { localStorage.setItem(LS_KEY, JSON.stringify(links)); }

  function normalizeUrl(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return null;
    try {
      const url = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
      new URL(url);
      return url;
    } catch { return null; }
  }

  function getFaviconUrl(url) {
    try { return `https://www.google.com/s2/favicons?domain=${new URL(url).origin}&sz=32`; }
    catch { return ''; }
  }

  function renderLinks() {
    const links = loadLinks();
    container.innerHTML = '';

    emptyEl.textContent = t('links_empty');

    if (links.length === 0) {
      emptyEl.classList.remove('hidden');
      return;
    }
    emptyEl.classList.add('hidden');

    links.forEach(link => {
      const wrapper = document.createElement('div');
      wrapper.className = 'link-wrapper';

      const a = document.createElement('a');
      a.className = 'link-item';
      a.href = link.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.title = link.url;

      const favicon = document.createElement('img');
      favicon.className = 'link-favicon';
      favicon.src = getFaviconUrl(link.url);
      favicon.alt = '';
      favicon.onerror = () => { favicon.style.display = 'none'; };

      const nameSpan = document.createElement('span');
      nameSpan.textContent = link.name;

      a.append(favicon, nameSpan);

      const removeBtn = document.createElement('button');
      removeBtn.className = 'btn-remove-link';
      removeBtn.textContent = '✕';
      removeBtn.setAttribute('aria-label', `Remove ${link.name}`);
      removeBtn.addEventListener('click', () => {
        saveLinks(loadLinks().filter(l => l.id !== link.id));
        renderLinks();
      });

      wrapper.append(a, removeBtn);
      container.appendChild(wrapper);
    });
  }

  window.__rerenderLinks = renderLinks;

  function addLink(name, url) {
    const normalUrl = normalizeUrl(url);
    if (!normalUrl) {
      urlInput.focus();
      urlInput.style.borderColor = 'var(--danger)';
      setTimeout(() => { urlInput.style.borderColor = ''; }, 1600);
      return;
    }
    const links = loadLinks();
    links.push({ id: Date.now().toString(), name: name.trim() || 'Link', url: normalUrl });
    saveLinks(links);
    renderLinks();
    nameInput.value = '';
    urlInput.value  = '';
    nameInput.focus();
  }

  btnAdd.addEventListener('click', () => addLink(nameInput.value, urlInput.value));
  urlInput.addEventListener('keydown',  e => { if (e.key === 'Enter') addLink(nameInput.value, urlInput.value); });
  nameInput.addEventListener('keydown', e => { if (e.key === 'Enter') urlInput.focus(); });

  renderLinks();
})();


/* ══════════════════════════════════════════
   7. SETTINGS GEAR BUTTON — open/close dropdown
══════════════════════════════════════════ */
(function initSettingsGear() {
  const gearBtn = document.getElementById('settings-gear-btn');
  const panel   = document.getElementById('settings-panel');

  function togglePanel(force) {
    const isOpen = force !== undefined ? force : panel.classList.contains('hidden');
    if (isOpen) {
      panel.classList.remove('hidden');
      gearBtn.classList.add('open');
      gearBtn.setAttribute('aria-expanded', 'true');
    } else {
      panel.classList.add('hidden');
      gearBtn.classList.remove('open');
      gearBtn.setAttribute('aria-expanded', 'false');
    }
  }

  gearBtn.addEventListener('click', e => {
    e.stopPropagation();
    togglePanel();
  });

  document.addEventListener('click', e => {
    if (!gearBtn.contains(e.target) && !panel.contains(e.target)) togglePanel(false);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') togglePanel(false);
  });
})();
