// Authentication module for the web forum

// Inisialisasi Supabase
const SUPABASE_URL = 'https://rpgveedqntbrffpmmkqo.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwZ3ZlZWRxbnRicmZmcG1ta3FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NTY5MzgsImV4cCI6MjA2MjAzMjkzOH0.JQZsiWlO_YcAoxv_7RnGXcxTCmTcdF4VSGxDoaWI6FE';

// Cek apakah Supabase tersedia
let supabase = null;
if (typeof window.supabase !== 'undefined') {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

// === AUTHENTICATION FUNCTIONS ===

/**
 * Fungsi untuk menangani login user
 * @param {string} email - Email user
 * @param {string} password - Password user
 * @returns {Promise<{success: boolean, error?: string}>}
 */
async function loginUser(email, password) {
    // Validasi input
    if (!email || !password) {
        return { success: false, error: 'Email dan password harus diisi!' };
    }

    if (!supabase) {
        return { success: false, error: 'Sistem login sedang tidak tersedia. Silakan coba lagi nanti.' };
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            let errorMessage = 'Login gagal: ' + error.message;
            if (error.message.toLowerCase().includes('invalid login credentials')) {
                errorMessage = 'User tidak ditemukan atau password salah.';
            }
            return { success: false, error: errorMessage };
        }

        return { success: true, data: data };
    } catch (err) {
        return { success: false, error: 'Terjadi kesalahan: ' + err.message };
    }
}

/**
 * Fungsi untuk menangani registrasi user
 * @param {string} username - Username user
 * @param {string} email - Email user
 * @param {string} password - Password user
 * @returns {Promise<{success: boolean, error?: string}>}
 */
async function registerUser(username, email, password) {
    // Validasi input
    if (!username || !email || !password) {
        return { success: false, error: 'Semua field harus diisi!' };
    }

    if (!supabase) {
        return { success: false, error: 'Sistem registrasi sedang tidak tersedia. Silakan coba lagi nanti.' };
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: { username: username }
            }
        });

        if (error) {
            return { success: false, error: 'Registrasi gagal: ' + error.message };
        }

        return { success: true, data: data };
    } catch (err) {
        return { success: false, error: 'Terjadi kesalahan: ' + err.message };
    }
}

/**
 * Fungsi untuk menampilkan pesan error pada form login
 * @param {HTMLFormElement} form - Form element
 * @param {string} message - Pesan error
 */
function showLoginError(form, message) {
    // Hapus pesan error sebelumnya
    let errorDiv = document.getElementById('login-error');
    if (errorDiv) errorDiv.remove();

    // Buat elemen error baru
    errorDiv = document.createElement('div');
    errorDiv.id = 'login-error';
    errorDiv.style.color = 'red';
    errorDiv.style.marginTop = '10px';
    errorDiv.textContent = message;
    
    form.parentNode.insertBefore(errorDiv, form.nextSibling);
}

/**
 * Fungsi untuk menghapus pesan error
 */
function clearLoginError() {
    const errorDiv = document.getElementById('login-error');
    if (errorDiv) errorDiv.remove();
}

/**
 * Fungsi untuk logout user
 * @returns {Promise<{success: boolean, error?: string}>}
 */
async function logoutUser() {
    if (!supabase) {
        return { success: false, error: 'Sistem logout sedang tidak tersedia.' };
    }

    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            return { success: false, error: 'Logout gagal: ' + error.message };
        }
        return { success: true };
    } catch (err) {
        return { success: false, error: 'Terjadi kesalahan: ' + err.message };
    }
}

/**
 * Fungsi untuk mendapatkan user yang sedang login
 * @returns {Promise<{user: object|null, session: object|null}>}
 */
async function getCurrentUser() {
    if (!supabase) {
        return { user: null, session: null };
    }

    try {
        const { data: { user }, data: { session } } = await supabase.auth.getUser();
        return { user, session };
    } catch (err) {
        console.error('Error getting current user:', err);
        return { user: null, session: null };
    }
}

// === EVENT HANDLERS ===

/**
 * Inisialisasi event handlers untuk form login dan registrasi
 */
function initializeAuthHandlers() {
    // Handle Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const result = await loginUser(email, password);
            
            if (result.success) {
                clearLoginError();
                alert('Login berhasil!');
                window.location.href = 'forum.html';
            } else {
                showLoginError(loginForm, result.error);
            }
        });
    }

    // Handle Register Form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const result = await registerUser(username, email, password);
            
            if (result.success) {
                alert('Registrasi berhasil! Silakan cek email untuk verifikasi.');
                window.location.href = 'login.html';
            } else {
                alert(result.error);
            }
        });
    }
}

// Export functions untuk digunakan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loginUser,
        registerUser,
        logoutUser,
        getCurrentUser,
        showLoginError,
        clearLoginError,
        initializeAuthHandlers
    };
}

// Auto-initialize saat DOM loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAuthHandlers();
});