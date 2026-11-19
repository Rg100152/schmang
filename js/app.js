/* ============================================================
   Raj School Management System — Shared Application Engine
   - localStorage based connected data layer
   - Role based access + shared sidebar/topbar
   - No backend, no external libraries
   ============================================================ */

const KEYS = {
    students: 'raj_school_students',
    teachers: 'raj_school_teachers',
    notices: 'raj_school_notices',
    inquiries: 'raj_school_inquiries',
    timetable: 'raj_school_timetable',
    attendance: 'raj_school_attendance_log',
    user: 'raj_school_user'
};

/* ---------------- Seed data ---------------- */
const SEED_STUDENTS = [
    { roll: 'RS-101', name: 'Aarav Sharma',  class: '10-A', phone: '+91 98765 43210', feeAmount: 4500, feeStatus: 'Paid',    attendance: 'Present', marks: { math: 94, science: 89, cs: 98, english: 86 } },
    { roll: 'RS-102', name: 'Ananya Verma',  class: '10-A', phone: '+91 98234 56789', feeAmount: 4500, feeStatus: 'Pending',  attendance: 'Present', marks: { math: 88, science: 92, cs: 95, english: 90 } },
    { roll: 'RS-103', name: 'Rohan Gupta',   class: '10-B', phone: '+91 99112 33445', feeAmount: 4500, feeStatus: 'Paid',    attendance: 'Absent',  marks: { math: 76, science: 81, cs: 84, english: 79 } },
    { roll: 'RS-104', name: 'Priya Singh',   class: '9-A',  phone: '+91 97654 32109', feeAmount: 4000, feeStatus: 'Pending',  attendance: 'Present', marks: { math: 91, science: 87, cs: 93, english: 88 } },
    { roll: 'RS-105', name: 'Kabir Das',     class: '10-A', phone: '+91 98450 11223', feeAmount: 4500, feeStatus: 'Paid',    attendance: 'Present', marks: { math: 82, science: 85, cs: 91, english: 80 } }
];

const SEED_TEACHERS = [
    { id: 'T-01', name: 'Mrs. Sunita Rao',   subject: 'Mathematics',        qualification: 'M.Sc, B.Ed', phone: '+91 98100 11111', classes: '10-A, 9-A' },
    { id: 'T-02', name: 'Mr. Vikram Sethi',  subject: 'Science',            qualification: 'M.Sc, B.Ed', phone: '+91 98100 22222', classes: '10-A, 10-B' },
    { id: 'T-03', name: 'Ms. Neha Kapoor',   subject: 'Computer Science',   qualification: 'M.Tech, B.Ed', phone: '+91 98100 33333', classes: '10-A, 10-B' },
    { id: 'T-04', name: 'Mr. Arjun Mehta',   subject: 'English',            qualification: 'M.A, B.Ed',  phone: '+91 98100 44444', classes: '9-A, 10-B' }
];

const SEED_NOTICES = [
    { date: '20 Nov 2026', title: 'Winter Vacation Schedule', desc: 'School will remain closed from 25th Dec to 5th Jan.' },
    { date: '18 Nov 2026', title: 'Annual Science Exhibition', desc: 'All Class 9 & 10 students must submit project models by Monday.' }
];

const SEED_TIMETABLE = [
    { day: 'Monday',    period: '1', time: '08:30 - 09:15', className: '10-A', subject: 'Mathematics',      teacher: 'Mrs. Sunita Rao' },
    { day: 'Monday',    period: '2', time: '09:15 - 10:00', className: '10-A', subject: 'Science',          teacher: 'Mr. Vikram Sethi' },
    { day: 'Monday',    period: '3', time: '10:15 - 11:00', className: '10-A', subject: 'Computer Science', teacher: 'Ms. Neha Kapoor' },
    { day: 'Tuesday',   period: '1', time: '08:30 - 09:15', className: '10-A', subject: 'English',          teacher: 'Mr. Arjun Mehta' },
    { day: 'Tuesday',   period: '2', time: '09:15 - 10:00', className: '10-B', subject: 'Mathematics',      teacher: 'Mrs. Sunita Rao' },
    { day: 'Wednesday', period: '1', time: '08:30 - 09:15', className: '9-A',  subject: 'Science',          teacher: 'Mr. Vikram Sethi' },
    { day: 'Thursday',  period: '1', time: '08:30 - 09:15', className: '10-A', subject: 'Computer Science', teacher: 'Ms. Neha Kapoor' },
    { day: 'Friday',    period: '1', time: '08:30 - 09:15', className: '10-B', subject: 'English',          teacher: 'Mr. Arjun Mehta' }
];

/* ---------------- Generic storage helpers ---------------- */
function read(key, seed) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) {
            localStorage.setItem(key, JSON.stringify(seed));
            return JSON.parse(JSON.stringify(seed));
        }
        return JSON.parse(raw);
    } catch (e) {
        return JSON.parse(JSON.stringify(seed));
    }
}
function write(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

function getStudents() { return read(KEYS.students, SEED_STUDENTS); }
function saveStudents(list) { write(KEYS.students, list); }
function getTeachers() { return read(KEYS.teachers, SEED_TEACHERS); }
function saveTeachers(list) { write(KEYS.teachers, list); }
function getNotices() { return read(KEYS.notices, SEED_NOTICES); }
function saveNotices(list) { write(KEYS.notices, list); }
function getInquiries() { return read(KEYS.inquiries, []); }
function saveInquiries(list) { write(KEYS.inquiries, list); }
function getTimetable() { return read(KEYS.timetable, SEED_TIMETABLE); }
function saveTimetable(list) { write(KEYS.timetable, list); }
function getAttendanceLog() { return read(KEYS.attendance, []); }
function saveAttendanceLog(list) { write(KEYS.attendance, list); }

/* ---------------- Utility helpers ---------------- */
function esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[c]);
}
function money(n) { return '₹' + Number(n || 0).toLocaleString('en-IN'); }
function todayStr() {
    return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}
function initials(name) {
    return String(name || '?').trim().split(/\s+/).slice(0, 2).map(x => x[0]).join('').toUpperCase();
}
function toast(message) {
    document.querySelectorAll('.toast').forEach(t => t.remove());
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3200);
}
function openModal(id) { const m = document.getElementById(id); if (m) m.classList.add('open'); }
function closeModal(id) { const m = document.getElementById(id); if (m) m.classList.remove('open'); }
function closeModals() { document.querySelectorAll('.modal.open').forEach(m => m.classList.remove('open')); }
function nextRoll() {
    const nums = getStudents().map(s => Number(String(s.roll).replace(/\D/g, '')) || 0);
    return 'RS-' + (Math.max(100, ...nums) + 1);
}

/* ---------------- Auth & access ---------------- */
const NAV = [
    { id: 'dashboard',  href: 'dashboard.html',  icon: '📊', label: 'Dashboard',          roles: ['Admin', 'Teacher', 'Student'] },
    { id: 'students',   href: 'students.html',   icon: '🎓', label: 'Students',            roles: ['Admin', 'Teacher'] },
    { id: 'teachers',   href: 'teachers.html',   icon: '👩‍🏫', label: 'Teachers',           roles: ['Admin'] },
    { id: 'attendance', href: 'attendance.html', icon: '✅', label: 'Attendance',          roles: ['Admin', 'Teacher'] },
    { id: 'fees',       href: 'fees.html',       icon: '💳', label: 'Fee Collection',      roles: ['Admin', 'Student'] },
    { id: 'results',    href: 'results.html',    icon: '🏆', label: 'Exam & Results',      roles: ['Admin', 'Teacher', 'Student'] },
    { id: 'timetable',  href: 'timetable.html',  icon: '🗓️', label: 'Timetable',           roles: ['Admin', 'Teacher', 'Student'] }
];

function getUser() {
    try { return JSON.parse(localStorage.getItem(KEYS.user)); } catch (e) { return null; }
}

function checkAuth() {
    // "Live Demo" link auto-logs in as admin
    if (new URLSearchParams(location.search).get('demo') === '1') {
        write(KEYS.user, { name: 'Demo Admin', role: 'Admin' });
    }
    const user = getUser();
    const page = document.body.dataset.page || '';
    const publicPage = (page === 'login' || page === 'home');

    if (!user && !publicPage) {
        location.replace('index.html');
        return null;
    }
    if (user && page === 'login') {
        location.replace('dashboard.html');
        return user;
    }

    const current = NAV.find(n => n.id === page);
    if (current && user && !current.roles.includes(user.role)) {
        toast('Access denied for ' + user.role + ' role');
        setTimeout(() => location.replace('dashboard.html'), 700);
        return user;
    }
    return user;
}

function logout() {
    localStorage.removeItem(KEYS.user);
    location.href = 'index.html';
}

/* ---------------- Shared app shell ---------------- */
function buildShell(user) {
    const slot = document.getElementById('app-shell');
    if (!slot) return;

    const page = document.body.dataset.page || 'dashboard';
    const links = NAV
        .filter(n => n.roles.includes(user.role))
        .map(n => `<li><a href="${n.href}" class="${n.id === page ? 'active' : ''}" ${n.id === page ? 'aria-current="page"' : ''}>
            <span class="nav-icon">${n.icon}</span>${n.label}</a></li>`)
        .join('');

    const pending = getStudents().filter(s => s.feeStatus === 'Pending').length;
    const inquiries = user.role === 'Admin' ? getInquiries().length : 0;

    slot.innerHTML = `
        <div class="sidebar-overlay" id="sidebarOverlay" onclick="toggleSidebar()"></div>
        <aside class="sidebar" id="sidebar">
            <div class="logo-box">
                <div class="logo-icon">R</div>
                <div><h3>Raj School</h3><small>ERP Portal</small></div>
            </div>
            <ul class="nav-links">${links}</ul>
            <div class="sidebar-foot">
                <button class="btn btn-danger btn-block" onclick="logout()">🚪 Logout</button>
            </div>
        </aside>
        <div class="main-wrapper">
            <header class="topbar">
                <div style="display:flex;align-items:center;gap:14px;">
                    <button class="menu-toggle" onclick="toggleSidebar()" aria-label="Menu">☰</button>
                    <h3 id="pageHeading">${(NAV.find(n => n.id === page) || {}).label || 'Dashboard'}</h3>
                </div>
                <div style="display:flex;align-items:center;gap:12px;">
                    ${inquiries ? `<a class="badge badge-info" href="dashboard.html#inquiries">${inquiries} new inquiries</a>` : ''}
                    ${pending && ['Admin', 'Student'].includes(user.role) ? `<span class="badge badge-pending">${pending} fee pending</span>` : ''}
                    <span class="user-badge" id="loggedUserBadge">${esc(user.name)} · ${esc(user.role)}</span>
                </div>
            </header>
            <div id="content-slot"></div>
        </div>`;

    const content = document.querySelector('main.content');
    const contentSlot = document.getElementById('content-slot');
    if (content && contentSlot) contentSlot.appendChild(content);
}

function toggleSidebar() {
    document.getElementById('sidebar')?.classList.toggle('open');
    document.getElementById('sidebarOverlay')?.classList.toggle('show');
}

/* ---------------- Data export / reset (admin utility) ---------------- */
function exportData() {
    const data = {};
    Object.values(KEYS).forEach(k => { data[k] = JSON.parse(localStorage.getItem(k) || 'null'); });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'raj-school-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    a.click();
    URL.revokeObjectURL(a.href);
    toast('Backup downloaded');
}
function resetData() {
    if (!confirm('Reset all demo data to defaults? This cannot be undone.')) return;
    Object.values(KEYS).forEach(k => localStorage.removeItem(k));
    localStorage.removeItem(KEYS.user);
    location.href = 'index.html';
}

/* ---------------- Boot ---------------- */
(function init() {
    const user = checkAuth();
    if (!user) return;
    if (!document.getElementById('app-shell')) return; // login / landing pages
    document.body.classList.add('app');
    buildShell(user);
})();
