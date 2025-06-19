# Forum Soft Blue 🌐

Selamat datang di Forum Soft Blue! Proyek ini adalah platform forum web modern yang dirancang untuk memfasilitasi diskusi, berbagi ide, dan menghubungkan pengguna dalam komunitas online. Forum ini dilengkapi dengan sistem autentikasi Supabase, profil pengguna yang komprehensif, dan antarmuka yang responsif.

## 🚀 Fitur Utama

### Autentikasi & Keamanan
- ✅ **Integrasi Supabase**: Sistem login/register dengan database cloud
- ✅ **Session Management**: Pengelolaan sesi pengguna yang aman
- ✅ **Error Handling**: Penanganan error yang komprehensif
- 🔒 **Security Features**: Validasi input dan proteksi XSS

### Profil Pengguna
- 👤 **Profile Management**: Edit profil lengkap dengan avatar upload
- 📊 **User Statistics**: Level, XP, rank, dan statistik aktivitas
- 🏆 **Achievement System**: Badge dan pencapaian pengguna
- 🎯 **Daily Missions**: Sistem misi harian untuk engagement
- ⚙️ **Privacy Settings**: Kontrol privasi dan notifikasi

### Forum & Diskusi
- 💬 **Discussion Threads**: Buat dan lihat thread diskusi
- 📝 **Post Management**: Sistem posting dan komentar
- 🔍 **Topic Categories**: Organisasi topik berdasarkan kategori
- 📱 **Responsive Design**: Optimal di desktop dan mobile

### Interface & UX
- 🎨 **Modern UI**: Desain yang bersih dan user-friendly
- 📱 **Mobile Responsive**: Tampilan optimal di semua perangkat
- 🌙 **Interactive Elements**: Animasi dan transisi yang smooth
- 📊 **Progress Tracking**: Visual progress bars dan indicators

## 📁 Struktur Proyek

```
foruward/
├── public/
│   ├── index.html          # Homepage forum
│   ├── about.html          # Halaman tentang forum
│   ├── forum.html          # Halaman utama forum
│   ├── post.html           # Detail post dan thread
│   ├── login.html          # Form login pengguna
│   ├── register.html       # Form registrasi pengguna
│   ├── profile.html        # Halaman profil pengguna (Enhanced)
│   ├── achievment.html     # Halaman pencapaian
│   ├── css/
│   │   └── styles.css      # Stylesheet utama (Enhanced)
│   ├── js/
│   │   ├── auth.js         # Modul autentikasi Supabase
│   │   ├── main.js         # JavaScript utama
│   │   └── profile.js      # JavaScript untuk halaman profil
│   └── img/
│       └── icon_p.jpeg     # Asset gambar
├── README.md               # Dokumentasi proyek
└── Code Citations.md       # Referensi kode
```

## 🛠️ Teknologi yang Digunakan

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Supabase (Authentication & Database)
- **Database**: PostgreSQL (via Supabase)
- **Styling**: Custom CSS dengan Flexbox/Grid
- **Icons**: SVG Icons untuk performa optimal

## ⚡ Setup & Instalasi

### Prasyarat
- Web browser modern (Chrome, Firefox, Safari, Edge)
- Koneksi internet untuk Supabase
- Local web server (opsional untuk development)

### Langkah Instalasi

1. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/foruward.git
   cd foruward
   ```

2. **Setup Supabase** (Sudah dikonfigurasi)
   - Project URL: `https://rpgveedqntbrffpmmkqo.supabase.co`
   - Anon Key sudah tersedia di `auth.js`

3. **Jalankan Local Server** (Opsional)
   ```bash
   # Menggunakan Python
   cd public
   python -m http.server 8000
   
   # Atau menggunakan Node.js
   npx serve public
   
   # Atau buka langsung index.html di browser
   ```

4. **Akses Aplikasi**
   - Buka `http://localhost:8000` (jika menggunakan server)
   - Atau buka `public/index.html` langsung di browser

## 🔧 Konfigurasi

### Supabase Configuration
File `js/auth.js` berisi konfigurasi Supabase:
```javascript
const SUPABASE_URL = 'https://rpgveedqntbrffpmmkqo.supabase.co';
const SUPABASE_KEY = 'your-anon-key';
```

### Database Schema (Rekomendasi)
Untuk pengembangan lebih lanjut, buat tabel berikut di Supabase:
```sql
-- Users profiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  username TEXT UNIQUE,
  bio TEXT,
  avatar_url TEXT,
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Forum posts
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🚀 Pengembangan Selanjutnya

### Fitur yang Direncanakan
- [ ] Real-time chat dengan Supabase Realtime
- [ ] Upload file dan gambar ke Supabase Storage
- [ ] Sistem notifikasi push
- [ ] Advanced search dan filtering
- [ ] Moderasi konten otomatis
- [ ] API endpoints untuk mobile app
- [ ] Dark mode theme
- [ ] Multi-language support

### Database Integration
- [ ] Implementasi tabel posts dan comments
- [ ] User profiles di database
- [ ] Achievement tracking
- [ ] Activity logging

## 🤝 Kontribusi

Kontribusi sangat diterima! Jika Anda memiliki saran untuk perbaikan atau fitur baru:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

### Guidelines Kontribusi
- Ikuti konvensi kode yang ada
- Tambahkan komentar untuk kode yang kompleks
- Test fitur baru sebelum submit
- Update dokumentasi jika diperlukan

## 📝 License

Proyek ini dilisensikan di bawah MIT License. Lihat file `LICENSE` untuk detail lebih lanjut.

## 🙏 Acknowledgments

- **Supabase** - Backend-as-a-Service yang luar biasa
- **Community** - Untuk feedback dan kontribusi
- **Open Source** - Untuk inspirasi dan referensi

## 📞 Support

Jika Anda mengalami masalah atau memiliki pertanyaan:
- Buka issue di GitHub
- Hubungi tim development
- Cek dokumentasi Supabase untuk masalah autentikasi

---

**Terima kasih telah menggunakan Forum Soft Blue! Kami harap platform ini bermanfaat untuk membangun komunitas yang aktif dan engaging.** 🌟