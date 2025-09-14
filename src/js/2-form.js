const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
if (!form) {
    throw new Error('Form with class ".feedback-form" not found');
}

const emailEl = form.elements.email;
const messageEl = form.elements.message;

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function saveState(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
    }
}

let formData = { email: '', message: '' };

const saved = loadState();
if (saved && typeof saved === 'object') {
    if (typeof saved.email === 'string') {
        emailEl.value = saved.email;
        formData.email = saved.email;
    }
    if (typeof saved.message === 'string') {
        messageEl.value = saved.message;
        formData.message = saved.message;
    }
}

form.addEventListener('input', (e) => {
    const target = e.target;
    if (!target || !target.name) return;

    if (target.name !== 'email' && target.name !== 'message') return;

    formData[target.name] = target.value;
    saveState(formData);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = (formData.email || '').trim();
    const message = (formData.message || '').trim();

    if (!email || !message) {
        alert('Fill please all fields');
        return;
    }

    console.log({ email, message });

    localStorage.removeItem(STORAGE_KEY);
    formData = { email: '', message: '' };
    form.reset();
});