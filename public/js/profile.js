// Profile Page JavaScript
// Handles all profile-related functionality

document.addEventListener('DOMContentLoaded', function() {
    // Profile data (in real app, this would come from server/database)
    let profileData = {
        name: 'Nama Pengguna',
        email: 'user@email.com',
        bio: 'Belum ada bio',
        location: '',
        website: '',
        joinDate: '1 Januari 2024',
        postCount: 12,
        commentCount: 45,
        likesReceived: 89,
        level: 1,
        xp: 150,
        maxXP: 200,
        rank: 42,
        avatar: null
    };

    // Initialize profile page
    initializeProfile();
    initializeTabs();
    initializeAvatarUpload();
    initializeProfileForm();
    initializeSettings();
    loadActivityData();
    loadAchievements();
    renderMissions();

    function initializeProfile() {
        // Update profile display
        document.getElementById('displayName').textContent = profileData.name;
        document.getElementById('displayEmail').textContent = profileData.email;
        document.getElementById('displayBio').textContent = profileData.bio || 'Belum ada bio';
        document.getElementById('userLevel').textContent = profileData.level;
        document.getElementById('userXP').textContent = profileData.xp;
        document.getElementById('userRank').textContent = profileData.rank;
        
        // Update form fields
        document.getElementById('editName').value = profileData.name;
        document.getElementById('editEmail').value = profileData.email;
        document.getElementById('editBio').value = profileData.bio;
        document.getElementById('editLocation').value = profileData.location;
        document.getElementById('editWebsite').value = profileData.website;
        
        // Update stats
        document.getElementById('joinDate').textContent = profileData.joinDate;
        document.getElementById('postCount').textContent = profileData.postCount;
        document.getElementById('commentCount').textContent = profileData.commentCount;
        document.getElementById('likesReceived').textContent = profileData.likesReceived;
        document.getElementById('lastOnline').textContent = 'Sekarang';
        
        // Update XP progress
        const xpPercentage = (profileData.xp / profileData.maxXP) * 100;
        document.getElementById('xpFill').style.width = xpPercentage + '%';
        document.querySelector('.xp-text').textContent = `${Math.round(xpPercentage)}% menuju Level ${profileData.level + 1}`;
        
        // Update stats in overview
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length >= 4) {
            statNumbers[0].textContent = profileData.postCount;
            statNumbers[1].textContent = profileData.commentCount;
            statNumbers[2].textContent = profileData.likesReceived;
            statNumbers[3].textContent = '7'; // badges count
        }
    }

    function initializeTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Remove active class from all tabs and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                this.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });

        // Quick navigation buttons
        document.getElementById('editProfileBtn').addEventListener('click', function() {
            switchToTab('settings');
        });

        document.getElementById('settingsBtn').addEventListener('click', function() {
            switchToTab('settings');
        });
    }

    function switchToTab(tabName) {
        const tabButton = document.querySelector(`[data-tab="${tabName}"]`);
        if (tabButton) {
            tabButton.click();
        }
    }

    function initializeAvatarUpload() {
        const avatarInput = document.getElementById('avatarInput');
        const avatarImage = document.getElementById('avatarImage');
        const defaultAvatar = document.getElementById('defaultAvatar');

        avatarInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    avatarImage.src = e.target.result;
                    avatarImage.style.display = 'block';
                    defaultAvatar.style.display = 'none';
                    profileData.avatar = e.target.result;
                    showNotification('Foto profil berhasil diupload!', 'success');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    function initializeProfileForm() {
        const profileForm = document.getElementById('profileForm');
        const cancelBtn = document.getElementById('cancelEdit');

        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(profileForm);
            
            // Update profile data
            profileData.name = formData.get('name');
            profileData.email = formData.get('email');
            profileData.bio = formData.get('bio');
            profileData.location = formData.get('location');
            profileData.website = formData.get('website');
            
            // Update display
            initializeProfile();
            
            showNotification('Profil berhasil diperbarui!', 'success');
        });

        cancelBtn.addEventListener('click', function() {
            // Reset form to original values
            initializeProfile();
            showNotification('Perubahan dibatalkan', 'info');
        });
    }

    function initializeSettings() {
        // Security buttons
        document.getElementById('changePasswordBtn').addEventListener('click', function() {
            showPasswordChangeModal();
        });

        document.getElementById('enable2FABtn').addEventListener('click', function() {
            show2FAModal();
        });

        document.getElementById('viewLoginHistoryBtn').addEventListener('click', function() {
            showLoginHistoryModal();
        });

        // Privacy settings
        const privacyCheckboxes = document.querySelectorAll('#settings input[type="checkbox"]');
        privacyCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                savePrivacySettings();
            });
        });
    }

    function loadActivityData() {
        const activityTimeline = document.getElementById('activityTimeline');
        
        const activities = [
            {
                type: 'post',
                title: 'Membuat postingan "Tips Belajar JavaScript"',
                time: '2 jam yang lalu',
                details: 'Postingan mendapat 15 likes dan 8 komentar'
            },
            {
                type: 'comment',
                title: 'Mengomentari "Diskusi Framework Frontend"',
                time: '5 jam yang lalu',
                details: 'Komentar mendapat 3 likes'
            },
            {
                type: 'achievement',
                title: 'Mendapat badge "Kontributor Aktif"',
                time: '1 hari yang lalu',
                details: 'Reward: 50 XP dan badge khusus'
            },
            {
                type: 'post',
                title: 'Membuat postingan "Review Buku Programming"',
                time: '2 hari yang lalu',
                details: 'Postingan mendapat 25 likes dan 12 komentar'
            },
            {
                type: 'comment',
                title: 'Mengomentari "Tutorial CSS Grid"',
                time: '3 hari yang lalu',
                details: 'Komentar mendapat 7 likes'
            }
        ];

        activityTimeline.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon ${activity.type}"></div>
                <div class="activity-content">
                    <p><strong>${activity.title}</strong></p>
                    <p class="activity-details">${activity.details}</p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `).join('');
    }

    function loadAchievements() {
        const badgesGrid = document.getElementById('badgesGrid');
        
        const badges = [
            { name: 'Member Baru', description: 'Bergabung di forum', earned: true, icon: '🎉' },
            { name: 'Aktif Diskusi', description: 'Membuat 10 postingan', earned: true, icon: '💬' },
            { name: 'Kontributor', description: 'Memberikan 20 komentar', earned: true, icon: '🤝' },
            { name: 'Populer', description: 'Postingan mendapat 50 likes', earned: false, icon: '⭐' },
            { name: 'Mentor', description: 'Membantu 5 member baru', earned: false, icon: '🎓' },
            { name: 'Veteran', description: 'Aktif selama 1 tahun', earned: false, icon: '🏆' }
        ];

        badgesGrid.innerHTML = badges.map(badge => `
            <div class="badge-item ${badge.earned ? 'earned' : ''}">
                <div class="badge-icon" style="font-size: 2rem; margin-bottom: 8px;">${badge.icon}</div>
                <h4 style="margin: 8px 0 4px 0; font-size: 1rem;">${badge.name}</h4>
                <p style="margin: 0; font-size: 0.8rem; opacity: 0.8;">${badge.description}</p>
                ${badge.earned ? '<div style="margin-top: 8px; font-size: 0.7rem; font-weight: bold;">✓ DIRAIH</div>' : ''}
            </div>
        `).join('');
    }

    function renderMissions() {
        // Use missions from main.js if available
        if (typeof missions !== 'undefined') {
            const list = document.getElementById('missions-list');
            if (list) {
                list.innerHTML = '';
                missions.forEach((mission, idx) => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <strong>${mission.title}</strong> - ${mission.description}<br>
                        <div class="mission-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${(mission.progress / mission.target) * 100}%"></div>
                            </div>
                            <span class="progress-text">${mission.progress}/${mission.target}</span>
                        </div>
                        ${mission.completed ? '<span style="color:green; font-weight: bold;">(✓ Selesai)</span>' : ''}
                        ${!mission.completed && mission.progress >= mission.target ? 
                            `<button class="btn-primary" style="margin-top: 8px; padding: 6px 12px; font-size: 0.8rem;" onclick="claimMission(${idx})">Klaim Hadiah</button>` : ''}
                    `;
                    list.appendChild(li);
                });
            }
        }
    }

    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">&times;</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
            color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 12px;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 3000);
    }

    function showPasswordChangeModal() {
        alert('Fitur ubah password akan segera tersedia!');
    }

    function show2FAModal() {
        alert('Fitur 2FA akan segera tersedia!');
    }

    function showLoginHistoryModal() {
        alert('Fitur riwayat login akan segera tersedia!');
    }

    function savePrivacySettings() {
        showNotification('Pengaturan privasi disimpan!', 'success');
    }

    // Add CSS for progress bars and notifications
    const style = document.createElement('style');
    style.textContent = `
        .mission-progress {
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 8px 0;
        }
        
        .progress-bar {
            flex: 1;
            height: 6px;
            background: #e9ecef;
            border-radius: 3px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #3a7bd5 0%, #45a049 100%);
            transition: width 0.3s ease;
        }
        
        .progress-text {
            font-size: 0.8rem;
            color: #666;
            min-width: 40px;
        }
        
        .activity-details {
            font-size: 0.9rem;
            color: #666;
            margin: 4px 0;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});