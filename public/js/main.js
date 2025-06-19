// JavaScript code for the web forum interactivity
// Note: Authentication logic has been moved to auth.js

document.addEventListener('DOMContentLoaded', function() {
    // Note: Authentication form handling has been moved to auth.js

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

    var dropdownBtn = document.querySelector('.dropdown-toggle');
    var dropdownList = document.getElementById('categoryDropdown');
    if (dropdownBtn && dropdownList) {
        dropdownBtn.addEventListener('click', function() {
            var expanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
            dropdownBtn.setAttribute('aria-expanded', !expanded);
            dropdownList.hidden = expanded;
        });
    }
});
