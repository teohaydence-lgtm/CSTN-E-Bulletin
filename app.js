function setDisplay(id, value) {
    const el = document.getElementById(id);
    if (el) el.style.display = value;
}

const modal = document.getElementById('loginModal');
const viewerModal = document.getElementById('viewerModal');
const adminModal = document.getElementById('adminModal');
const passwordInput = document.getElementById('passwordInput');
const errorMessage = document.getElementById('errorMessage');
const dropdownMenu = document.getElementById('dropdownMenu');
const adminDropdownMenu = document.getElementById('adminDropdownMenu');

function openModal() {
    adminModal.style.display = 'flex';
    setTimeout(() => {
        adminModal.classList.add('show');
    }, 10);
    passwordInput.value = '';
    errorMessage.style.display = 'none';
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            if (!modal.classList.contains('show')) {
                modal.style.display = 'none';
            }
        }, 500);
    }
});

viewerModal.addEventListener('click', (e) => {
    if (e.target === viewerModal) {
        viewerModal.classList.remove('show');
        setTimeout(() => {
            if (!viewerModal.classList.contains('show')) {
                viewerModal.style.display = 'none';
            }
        }, 500);
    }
});

adminModal.addEventListener('click', (e) => {
    if (e.target === adminModal) {
        adminModal.classList.remove('show');
        setTimeout(() => {
            if (!adminModal.classList.contains('show')) {
                adminModal.style.display = 'none';
            }
        }, 500);
    }
});

function selectViewer() {
    modal.classList.remove('show');
    setTimeout(() => {
        if (!modal.classList.contains('show')) {
            modal.style.display = 'none';
        }
    }, 500);
    viewerModal.style.display = 'flex';
    setTimeout(() => {
        viewerModal.classList.add('show');
    }, 10);
}

function selectAdmin() {
    modal.classList.remove('show');
    setTimeout(() => {
        if (!modal.classList.contains('show')) {
            modal.style.display = 'none';
        }
    }, 500);
    adminModal.style.display = 'flex';
    setTimeout(() => {
        adminModal.classList.add('show');
    }, 10);
    passwordInput.value = '';
    errorMessage.style.display = 'none';
}

function closeViewerModal() {
    viewerModal.classList.remove('show');
    setTimeout(() => {
        if (!viewerModal.classList.contains('show')) {
            viewerModal.style.display = 'none';
        }
    }, 500);
    document.querySelector('.login-button').style.display = 'none';
    document.getElementById('welcomeMessage').style.display = 'flex';
}

function closeAdminModal(event) {
    if (event) {
        event.stopPropagation();
    }
    adminModal.classList.remove('show');
    setTimeout(() => {
        if (!adminModal.classList.contains('show')) {
            adminModal.style.display = 'none';
        }
    }, 500);
}

function checkPassword() {
    const enteredPassword = passwordInput.value;
    if (enteredPassword === 'SUPERADMIN3214') {
        adminModal.classList.remove('show');
        setTimeout(() => {
            if (!adminModal.classList.contains('show')) {
                adminModal.style.display = 'none';
            }
        }, 500);
        sessionStorage.setItem('bulletinAdmin', '1');
        applyAdminLogin();
    } else {
        errorMessage.style.display = 'flex';
        passwordInput.value = '';
    }
}

function applyAdminLogin() {
    document.querySelector('.login-button').style.display = 'none';
    document.getElementById('adminWelcomeMessage').style.display = 'flex';
    setDisplay('saveStatus', 'flex');
    closeLanguageDropdown();
    document.getElementById('languageWrap').style.display = 'none';
    renderLanguage('en');
    setDisplay('addRowButton', 'block');
    setDisplay('keyboardShortcuts', 'flex');
    const rows = document.querySelectorAll('.data-row');
    if (rows.length > 0) {
        setDisplay('removeRowButton', 'inline-block');
    }
    rows.forEach(row => {
        const leftEditable = row.querySelector('.data-row-left');
        const rightEditable = row.querySelector('.data-row-right');
        rightEditable.setAttribute('contenteditable', 'true');
        addChangeListeners(leftEditable);
        addChangeListeners(rightEditable);
    });
}

passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

function toggleAdminDropdown() {
    if (adminDropdownMenu.classList.contains('show')) {
        adminDropdownMenu.classList.remove('show');
        document.getElementById('adminWelcomeMessage').classList.remove('open');
        setTimeout(() => {
            if (!adminDropdownMenu.classList.contains('show')) {
                adminDropdownMenu.style.display = 'none';
            }
        }, 300);
    } else {
        adminDropdownMenu.style.display = 'flex';
        setTimeout(() => {
            adminDropdownMenu.classList.add('show');
            document.getElementById('adminWelcomeMessage').classList.add('open');
        }, 10);
    }
}

const TRANSLATE_API_KEY = '';
const I18N = {
    en: { language: 'English', login: 'Login', welcome_user: 'Welcome, User', logout: 'Log Out', events: 'Events', announcements: 'Announcements', home: 'Home', church: 'Church', of: 'Of', saint: 'Saint Theresa', bulletin: 'E-Bulletin', trust: 'IN GOD WE TRUST', date_of_event: 'Date Of Event', event: 'Event' },
    ms: { language: 'Bahasa', login: 'Log Masuk', welcome_user: 'Selamat datang, Pengguna', logout: 'Log Keluar', events: 'Acara', announcements: 'Pengumuman', home: 'Utama', church: 'Gereja', of: '', saint: 'Santa Theresa', bulletin: 'E-Buletin', trust: 'KAMI PERCAYA KEPADA TUHAN', date_of_event: 'Tarikh Acara', event: 'Acara' },
    ta: { language: 'மொழி', login: 'உள்நுழை', welcome_user: 'வரவேற்கிறோம், பயனர்', logout: 'வெளியேறு', events: 'நிகழ்வுகள்', announcements: 'அறிவிப்புகள்', home: 'முகப்பு', church: 'தேவாலயம்', of: '', saint: 'புனித தெரசா', bulletin: 'மின்-செய்திமடல்', trust: 'நாங்கள் கடவுளை நம்புகிறோம்', date_of_event: 'நிகழ்வு தேதி', event: 'நிகழ்வு' }
};
const MONTHS_I18N = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    ms: ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'],
    ta: ['ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்']
};
const DAYS_I18N = {
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    ms: ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'],
    ta: ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி']
};
const translationCache = {};
let currentLang = 'en';

function isEditor() {
    return document.getElementById('adminWelcomeMessage').style.display === 'flex';
}

function localizeDate(text, lang) {
    const m = text.trim().match(/^(\w+),\s*(\d+)(?:st|nd|rd|th)\s+(\w+),\s*(\d{4})$/);
    if (!m) return null;
    const day = DAYS_I18N.en.indexOf(m[1]);
    const month = MONTHS_I18N.en.indexOf(m[3]);
    if (day < 0 || month < 0) return null;
    return `${DAYS_I18N[lang][day]}, ${m[2]} ${MONTHS_I18N[lang][month]}, ${m[4]}`;
}

async function translateTexts(texts, lang) {
    const missing = texts.filter(t => !(translationCache[lang] && translationCache[lang][t]));
    if (missing.length && TRANSLATE_API_KEY) {
        try {
            const res = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${TRANSLATE_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ q: missing, target: lang, format: 'text' })
            });
            const json = await res.json();
            translationCache[lang] = translationCache[lang] || {};
            json.data.translations.forEach((t, i) => { translationCache[lang][missing[i]] = t.translatedText; });
        } catch (err) {}
    }
    return texts.map(t => (translationCache[lang] && translationCache[lang][t]) || t);
}

async function renderLanguage(lang) {
    currentLang = lang;
    document.body.classList.remove('lang-ms', 'lang-ta');
    if (lang !== 'en') document.body.classList.add('lang-' + lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const text = I18N[lang][el.dataset.i18n];
        el.textContent = text;
        el.style.display = text === '' ? 'none' : '';
    });
    document.querySelectorAll('.language-option').forEach(el => {
        el.classList.toggle('selected', el.dataset.lang === lang);
    });
    const cells = document.querySelectorAll('.data-row-left, .data-row-right');
    if (lang === 'en') {
        cells.forEach(cell => {
            if (cell.dataset.original !== undefined) {
                cell.textContent = cell.dataset.original;
                delete cell.dataset.original;
            }
        });
        return;
    }
    const pending = [];
    cells.forEach(cell => {
        if (cell.dataset.original === undefined) cell.dataset.original = cell.textContent;
        const original = cell.dataset.original;
        const date = cell.classList.contains('data-row-left') ? localizeDate(original, lang) : null;
        if (date) cell.textContent = date;
        else if (original.trim()) pending.push(cell);
    });
    const translated = await translateTexts(pending.map(c => c.dataset.original), lang);
    if (currentLang !== lang) return;
    pending.forEach((cell, i) => { cell.textContent = translated[i]; });
}

function chooseLanguage(lang) {
    localStorage.setItem('bulletinLang', lang);
    renderLanguage(lang);
}

function toggleLanguageDropdown() {
    const dropdown = document.getElementById('languageDropdown');
    const button = document.getElementById('languageButton');
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('open');
        setTimeout(() => {
            if (!dropdown.classList.contains('show')) dropdown.style.display = 'none';
        }, 300);
    } else {
        dropdown.style.display = 'block';
        setTimeout(() => {
            dropdown.classList.add('show');
            button.classList.add('open');
        }, 10);
    }
}

function closeLanguageDropdown() {
    if (document.getElementById('languageDropdown').classList.contains('show')) toggleLanguageDropdown();
}

document.addEventListener('click', (e) => {
    const path = e.composedPath();
    if (!path.includes(document.getElementById('languageButton')) && !path.includes(document.getElementById('languageDropdown'))) {
        closeLanguageDropdown();
    }
});

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const calendarPopup = document.getElementById('calendarPopup');
const today = new Date();
let calYear = today.getFullYear();
let calMonth = today.getMonth();
let selectedDate = null;
let activeCell = null;
let calendarHideTimer;

function ordinal(n) {
    if (n % 100 >= 11 && n % 100 <= 13) return n + 'th';
    return n + (['th', 'st', 'nd', 'rd'][n % 10] || 'th');
}

function formatDate(d) {
    return `${DAY_NAMES[d.getDay()]}, ${ordinal(d.getDate())} ${MONTH_NAMES[d.getMonth()]}, ${d.getFullYear()}`;
}

function parseDate(text) {
    const m = text.trim().match(/^\w+,\s*(\d+)(?:st|nd|rd|th)\s+(\w+),\s*(\d{4})$/);
    if (!m) return null;
    const month = MONTH_NAMES.indexOf(m[2]);
    return month < 0 ? null : new Date(+m[3], month, +m[1]);
}

function renderCalendar() {
    document.getElementById('calendarMonthText').textContent = MONTH_NAMES[calMonth];
    document.getElementById('calendarYearText').textContent = calYear;
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach(d => {
        const el = document.createElement('div');
        el.className = 'calendar-weekday';
        el.textContent = d;
        grid.appendChild(el);
    });
    const offset = (new Date(calYear, calMonth, 1).getDay() + 6) % 7;
    const days = new Date(calYear, calMonth + 1, 0).getDate();
    for (let i = 0; i < offset; i++) {
        const el = document.createElement('div');
        el.className = 'calendar-day empty';
        grid.appendChild(el);
    }
    for (let d = 1; d <= days; d++) {
        const el = document.createElement('div');
        el.className = 'calendar-day';
        el.textContent = d;
        if (selectedDate && selectedDate.getFullYear() === calYear && selectedDate.getMonth() === calMonth && selectedDate.getDate() === d) {
            el.classList.add('selected');
        }
        el.addEventListener('click', () => selectDay(d));
        grid.appendChild(el);
    }
}

function selectDay(d) {
    const alreadySelected = selectedDate && selectedDate.getFullYear() === calYear && selectedDate.getMonth() === calMonth && selectedDate.getDate() === d;
    selectedDate = alreadySelected ? null : new Date(calYear, calMonth, d);
    if (activeCell) {
        activeCell.textContent = selectedDate ? formatDate(selectedDate) : '';
        markAsUnsaved();
    }
    renderCalendar();
}

function changeMonth(delta) {
    calMonth += delta;
    if (calMonth < 0) { calMonth = 11; calYear--; }
    if (calMonth > 11) { calMonth = 0; calYear++; }
    renderCalendar();
}

function changeYear(delta) {
    calYear += delta;
    renderCalendar();
}

function positionCalendar(cell) {
    const container = document.querySelector('.scroll-container').getBoundingClientRect();
    const rect = cell.getBoundingClientRect();
    calendarPopup.style.top = (rect.bottom - container.top + 6) + 'px';
    calendarPopup.style.left = (rect.left - container.left) + 'px';
}

function openCalendar(cell) {
    clearTimeout(calendarHideTimer);
    activeCell = cell;
    selectedDate = parseDate(cell.textContent);
    const base = selectedDate || new Date();
    calYear = base.getFullYear();
    calMonth = base.getMonth();
    renderCalendar();
    positionCalendar(cell);
    calendarPopup.style.display = 'block';
    setTimeout(() => calendarPopup.classList.add('show'), 10);
}

function closeCalendar() {
    if (!calendarPopup) return;
    activeCell = null;
    calendarPopup.classList.remove('show');
    calendarHideTimer = setTimeout(() => {
        if (!calendarPopup.classList.contains('show')) calendarPopup.style.display = 'none';
    }, 300);
}

document.addEventListener('click', (e) => {
    const isAdmin = document.getElementById('adminWelcomeMessage').style.display === 'flex';
    const cell = e.target.closest('.data-row-left');
    if (isAdmin && cell) {
        if (cell === activeCell) closeCalendar();
        else openCalendar(cell);
    } else if (!e.composedPath().includes(calendarPopup)) {
        closeCalendar();
    }
});

function adminLogout() {
    sessionStorage.removeItem('bulletinAdmin');
    closeCalendar();
    document.getElementById('languageWrap').style.display = 'block';
    renderLanguage(localStorage.getItem('bulletinLang') || 'en');
    document.querySelectorAll('.data-row-right').forEach(el => el.setAttribute('contenteditable', 'false'));
    document.getElementById('adminWelcomeMessage').style.display = 'none';
    setDisplay('saveStatus', 'none');
    document.querySelector('.login-button').style.display = 'block';
    adminDropdownMenu.classList.remove('show');
    document.getElementById('adminWelcomeMessage').classList.remove('open');
    setTimeout(() => {
        adminDropdownMenu.style.display = 'none';
    }, 300);
    setDisplay('addRowButton', 'none');
    setDisplay('removeRowButton', 'none');
    setDisplay('keyboardShortcuts', 'none');
}

function closeKeyboardShortcuts() {
    const shortcutsBox = document.getElementById('keyboardShortcuts');
    shortcutsBox.classList.add('falling');
    setTimeout(() => {
        shortcutsBox.style.display = 'none';
        shortcutsBox.classList.remove('falling');
    }, 800);
}

function showKeyboardShortcuts() {
    const shortcutsBox = document.getElementById('keyboardShortcuts');
    shortcutsBox.style.display = 'flex';
    shortcutsBox.classList.remove('falling');
    shortcutsBox.style.top = '135px';
    shortcutsBox.classList.add('appearing');
    setTimeout(() => {
        shortcutsBox.classList.remove('appearing');
    }, 600);
}

function addRow() {
    const container = document.getElementById('dataRowsContainer');
    const buttonContainer = container.querySelector('.button-container');
    const newRow = document.createElement('div');
    newRow.className = 'data-row';
    newRow.innerHTML = `
        <div class="data-row-strike"></div>
        <div class="data-row-left" contenteditable="false"></div>
        <div class="data-row-right" contenteditable="true"></div>
    `;
    container.insertBefore(newRow, buttonContainer);
    setDisplay('removeRowButton', 'inline-block');

    const leftEditable = newRow.querySelector('.data-row-left');
    const rightEditable = newRow.querySelector('.data-row-right');
    addChangeListeners(leftEditable);
    addChangeListeners(rightEditable);
    markAsUnsaved();
}

function removeRow() {
    const container = document.getElementById('dataRowsContainer');
    const buttonContainer = container.querySelector('.button-container');
    const rows = container.querySelectorAll('.data-row');
    if (rows.length > 0) {
        const lastRow = rows[rows.length - 1];
        lastRow.remove();
        const remainingRows = container.querySelectorAll('.data-row');
        if (remainingRows.length === 0) {
            setDisplay('removeRowButton', 'none');
            setDisplay('keyboardShortcuts', 'none');
        }
        markAsUnsaved();
    }
}

function saveChanges() {
    const container = document.getElementById('dataRowsContainer');
    const rows = container.querySelectorAll('.data-row');
    const data = [];
    
    rows.forEach(row => {
        const leftContent = row.querySelector('.data-row-left').innerHTML;
        const rightContent = row.querySelector('.data-row-right').innerHTML;
        data.push({
            left: leftContent,
            right: rightContent
        });
    });
    
    localStorage.setItem('bulletinData', JSON.stringify(data));
}

let saveTimer, savedTimer;

function markAsUnsaved() {
    const status = document.getElementById('saveStatus');
    clearTimeout(saveTimer);
    clearTimeout(savedTimer);
    status.textContent = 'Saving...';
    saveTimer = setTimeout(() => {
        saveChanges();
        status.textContent = 'Saved!';
        savedTimer = setTimeout(() => {
            status.textContent = 'Saved.';
        }, 3000);
    }, 500);
}

function addChangeListeners(element) {
    element.addEventListener('input', markAsUnsaved);
}

function loadSavedData() {
    if (!document.getElementById('dataRowsContainer')) return;
    const savedData = localStorage.getItem('bulletinData');
    if (savedData) {
        const data = JSON.parse(savedData);
        const container = document.getElementById('dataRowsContainer');
        const buttonContainer = container.querySelector('.button-container');
        const isAdmin = document.getElementById('adminWelcomeMessage').style.display === 'flex';
        
        data.forEach(item => {
            const newRow = document.createElement('div');
            newRow.className = 'data-row';
            newRow.innerHTML = `
                <div class="data-row-strike"></div>
                <div class="data-row-left" contenteditable="false">${item.left}</div>
                <div class="data-row-right" contenteditable="${isAdmin}">${item.right}</div>
            `;
            container.insertBefore(newRow, buttonContainer);
            
            if (isAdmin) {
                const leftEditable = newRow.querySelector('.data-row-left');
                const rightEditable = newRow.querySelector('.data-row-right');
                addChangeListeners(leftEditable);
                addChangeListeners(rightEditable);
            }
        });
        
        if (!isAdmin) {
            setDisplay('addRowButton', 'none');
            setDisplay('removeRowButton', 'none');
                    setDisplay('keyboardShortcuts', 'none');
        } else {
            const rows = container.querySelectorAll('.data-row');
            if (rows.length > 0) {
                setDisplay('removeRowButton', 'inline-block');
            }
            setDisplay('keyboardShortcuts', 'flex');
        }
    } else {
        setDisplay('addRowButton', 'none');
        setDisplay('removeRowButton', 'none');
            setDisplay('keyboardShortcuts', 'none');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setDisplay('addRowButton', 'none');
    setDisplay('removeRowButton', 'none');
    setDisplay('keyboardShortcuts', 'none');
    loadSavedData();
    if (sessionStorage.getItem('bulletinAdmin') === '1') {
        applyAdminLogin();
    } else {
        renderLanguage(localStorage.getItem('bulletinLang') || 'en');
    }
});

document.addEventListener('keydown', (e) => {
    if (document.getElementById('dataRowsContainer') && document.getElementById('adminWelcomeMessage').style.display === 'flex') {
        if (e.ctrlKey && e.altKey) {
            if (e.key === 'a') {
                e.preventDefault();
                addRow();
            } else if (e.key === 'r') {
                e.preventDefault();
                removeRow();
            } else if (e.key.length === 1) {
                e.preventDefault();
                showKeyboardShortcuts();
            }
        }
    }
});

function toggleDropdown() {
    if (dropdownMenu.classList.contains('show')) {
        dropdownMenu.classList.remove('show');
        document.getElementById('welcomeMessage').classList.remove('open');
        setTimeout(() => {
            if (!dropdownMenu.classList.contains('show')) {
                dropdownMenu.style.display = 'none';
            }
        }, 300);
    } else {
        dropdownMenu.style.display = 'flex';
        setTimeout(() => {
            dropdownMenu.classList.add('show');
            document.getElementById('welcomeMessage').classList.add('open');
        }, 10);
    }
}

function logout() {
    document.getElementById('welcomeMessage').style.display = 'none';
    document.querySelector('.login-button').style.display = 'block';
    dropdownMenu.classList.remove('show');
    document.getElementById('welcomeMessage').classList.remove('open');
    setTimeout(() => {
        dropdownMenu.style.display = 'none';
    }, 300);
}

function triggerFileUpload() {
    fileInput.click();
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.querySelector('.person-icon').innerHTML = '';
            document.querySelector('.person-icon').style.backgroundImage = `url(${e.target.result})`;
            document.querySelector('.person-icon').style.backgroundSize = 'cover';
            document.querySelector('.person-icon').style.backgroundPosition = 'center';
        };
        reader.readAsDataURL(file);
    }
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.welcome-message') && !e.target.closest('.dropdown-menu')) {
        dropdownMenu.classList.remove('show');
        document.getElementById('welcomeMessage').classList.remove('open');
        setTimeout(() => {
            if (!dropdownMenu.classList.contains('show')) {
                dropdownMenu.style.display = 'none';
            }
        }, 300);
    }
    if (!e.target.closest('.admin-welcome-message') && !e.target.closest('.admin-dropdown-menu')) {
        adminDropdownMenu.classList.remove('show');
        document.getElementById('adminWelcomeMessage').classList.remove('open');
        setTimeout(() => {
            if (!adminDropdownMenu.classList.contains('show')) {
                adminDropdownMenu.style.display = 'none';
            }
        }, 300);
    }
});
