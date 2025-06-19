// JavaScript code for the web forum interactivity

// Inisialisasi Supabase
const SUPABASE_URL = 'https://rpgveedqntbrffpmmkqo.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwZ3ZlZWRxbnRicmZmcG1ta3FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NTY5MzgsImV4cCI6MjA2MjAzMjkzOH0.JQZsiWlO_YcAoxv_7RnGXcxTCmTcdF4VSGxDoaWI6FE';

// Cek apakah Supabase tersedia
let supabase = null;
if (typeof window.supabase !== 'undefined') {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

document.addEventListener('DOMContentLoaded', function() {
    
    // === FORM HANDLING ===
    // Handle Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Validasi input
            if (!email || !password) {
                alert('Email dan password harus diisi!');
                return;
            }

            if (!supabase) {
                alert('Sistem login sedang tidak tersedia. Silakan coba lagi nanti.');
                return;
            }

            try {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password
                });

                // Hapus pesan error sebelumnya
                let errorDiv = document.getElementById('login-error');
                if (errorDiv) errorDiv.remove();

                if (error) {
                    errorDiv = document.createElement('div');
                    errorDiv.id = 'login-error';
                    errorDiv.style.color = 'red';
                    errorDiv.style.marginTop = '10px';
                    
                    if (error.message.toLowerCase().includes('invalid login credentials')) {
                        errorDiv.textContent = 'User tidak ditemukan atau password salah.';
                    } else {
                        errorDiv.textContent = 'Login gagal: ' + error.message;
                    }
                    loginForm.parentNode.insertBefore(errorDiv, loginForm.nextSibling);
                } else {
                    alert('Login berhasil!');
                    window.location.href = 'forum.html';
                }
            } catch (err) {
                alert('Terjadi kesalahan: ' + err.message);
            }
        });
    }

    // Handle Register Form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // Sebelum (salah)
            const username = document.getElementById('username').value;
            
            // Sesudah (benar) - sudah diperbaiki
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Validasi input
            if (!username || !email || !password) {
                alert('Semua field harus diisi!');
                return;
            }

            if (!supabase) {
                alert('Sistem registrasi sedang tidak tersedia. Silakan coba lagi nanti.');
                return;
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
                    alert('Registrasi gagal: ' + error.message);
                } else {
                    alert('Registrasi berhasil! Silakan cek email untuk verifikasi.');
                    window.location.href = 'login.html';
                }
            } catch (err) {
                alert('Terjadi kesalahan: ' + err.message);
            }
        });
    }

    // === NAVIGATION ===
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    
    if (toggle && links) {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            links.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (links.classList.contains('show') && !links.contains(e.target) && !toggle.contains(e.target)) {
                links.classList.remove('show');
            }
        });

        // Close dropdown when clicking menu links
        links.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                links.classList.remove('show');
            });
        });
    }

    // === PROFILE DROPDOWN ===
    const profileMenu = document.querySelector('.profile-menu');
    const profileIcon = document.querySelector('.profile-icon');
    const profileDropdown = document.querySelector('.profile-dropdown');
    
    if (profileMenu && profileIcon && profileDropdown) {
        // Toggle dropdown saat icon diklik
        profileIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            profileMenu.classList.toggle('open');
            console.log('Profile dropdown toggled:', profileMenu.classList.contains('open'));
        });
        
        // Tutup dropdown saat klik di luar
        document.addEventListener('click', function(e) {
            if (profileMenu.classList.contains('open') && !profileMenu.contains(e.target)) {
                profileMenu.classList.remove('open');
                console.log('Profile dropdown closed');
            }
        });
        
        // Tutup dropdown saat link diklik
        profileDropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                profileMenu.classList.remove('open');
            });
        });
    } else {
        console.log('Profile dropdown elements not found:', {
            profileMenu: !!profileMenu,
            profileIcon: !!profileIcon,
            profileDropdown: !!profileDropdown
        });
    }

    // === FORUM TOPICS ===
    const loadForumTopics = () => {
        const topics = [
            { title: 'First Topic', id: 1 },
            { title: 'Second Topic', id: 2 },
            { title: 'Third Topic', id: 3 }
        ];

        const topicsContainer = document.getElementById('topics-container');
        if (topicsContainer) {
            topics.forEach(topic => {
                const topicElement = document.createElement('div');
                topicElement.className = 'topic';
                topicElement.innerHTML = `<a href="post.html?id=${topic.id}">${topic.title}</a>`;
                topicsContainer.appendChild(topicElement);
            });
        }
    };

    if (document.body.id === 'forum-page') {
        loadForumTopics();
    }

    // === MISSIONS SYSTEM ===
    const missions = [
        {
            id: 1,
            title: "Login Harian",
            description: "Login ke forum hari ini.",
            progress: 1, // Set to 1 since user just loaded the page
            target: 1,
            reward: { xp: 10, gold: 5 },
            completed: false
        },
        {
            id: 2,
            title: "Buat Posting",
            description: "Buat 1 posting hari ini.",
            progress: 0,
            target: 1,
            reward: { xp: 20, gold: 10 },
            completed: false
        },
        {
            id: 3,
            title: "Beri Komentar",
            description: "Beri 3 komentar hari ini.",
            progress: 0,
            target: 3,
            reward: { xp: 15, gold: 7 },
            completed: false
        }
    ];

    function renderMissions() {
        const list = document.getElementById('missions-list');
        if (list) {
            list.innerHTML = '';
            missions.forEach((mission, idx) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${mission.title}</strong> - ${mission.description}<br>
                    Progress: ${mission.progress}/${mission.target}
                    ${mission.completed ? '<span style="color:green;">(Selesai)</span>' : ''}
                    ${!mission.completed && mission.progress >= mission.target ? 
                        `<button onclick="claimMission(${idx})">Klaim Hadiah</button>` : ''}
                `;
                list.appendChild(li);
            });
        }
    }

    // Make claimMission globally available
    window.claimMission = function(idx) {
        if (missions[idx].progress >= missions[idx].target && !missions[idx].completed) {
            missions[idx].completed = true;
            alert(`Selamat! Anda mendapat ${missions[idx].reward.xp} XP dan ${missions[idx].reward.gold} Gold`);
            renderMissions();
        }
    };

    // Render missions if container exists
    if (document.getElementById('missions-list')) {
        renderMissions();
    }
});
