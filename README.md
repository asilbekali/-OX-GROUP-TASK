
#  OX GROUP – NestJS Backend Test Task

Bu loyiha **OX GROUP** kompaniyasining texnik topshirig‘i asosida `NestJS` frameworkida ishlab chiqilgan bo‘lib, quyidagi funksiyalarni o‘z ichiga oladi:

- OTP orqali login qilish
- JWT asosidagi autentifikatsiya va rollar (admin, manager)
- Kompaniya yaratish va o‘chirish
- OX API bilan integratsiya (subdomain/token orqali)
- Mahsulotlar ro‘yxatini olish
- Foydalanuvchi sessiyasi va profili bilan ishlash

---

## 📦 Texnologiyalar

- [NestJS](https://nestjs.com/) – asosiy backend framework
- [Prisma ORM](https://www.prisma.io/) – ma’lumotlar bazasi ORM
- PostgreSQL – asosiy ma’lumotlar bazasi
- JWT – token asosidagi autentifikatsiya
- class-validator – DTO validatsiya uchun
- Axios – tashqi API bilan ishlash
- dotenv – muhit (environment) sozlamalari uchun

---

## 🔐 API Endpoints

### Auth

- `POST /auth/login`  
  Email yuboriladi, OTP generatsiya qilinadi. Agar user mavjud bo‘lmasa, yaratiladi (manager roli bilan).

- `POST /auth/verify`  
  Email va OTP yuboriladi. To‘g‘ri bo‘lsa, JWT qaytariladi.

- `GET /auth/my-profile`  
  Foydalanuvchining email, roli, kompaniyasi va boshqa ma’lumotlari.

- `GET /auth/my-session`  
  Foydalanuvchi qachon va qanday qurilmadan tizimga kirganini ko‘rsatadi.

### Company

- `POST /register-company`  
  Subdomain va token yuboriladi. OX API orqali token validatsiya qilinadi. Kompaniya mavjud bo‘lmasa, yaratiladi.

- `DELETE /company/:id`  
  Faqat `admin` o‘zi yaratgan kompaniyani o‘chira oladi.

### Products

- `GET /products?page=1&size=10`  
  Kompaniya tokeni orqali OX API (`/variations`) dan mahsulotlar ro‘yxatini olish.  
  Faqat `manager` roliga ruxsat beriladi.  
  `size` > 20 bo‘lsa, 400 xatolik qaytariladi.

---

## 🛡️ Ruxsatlar

- `@AdminOnly()` – faqat admin foydalanuvchilar uchun endpointlar
- `@ManagerOnly()` – faqat manager foydalanuvchilar uchun endpointlar

---

## 🌐 OX API bilan ishlash

- URL formati: `https://{subdomain}.ox-sys.com/{endpoint}`
- Headerlar:
  ```http
  Authorization: Bearer <token>
  Accept: application/json
  ```

---

## ⚙️ Loyihani ishga tushurish

### 1. Repozitoriyani klonlash:
```bash
git clone https://github.com/your-username/ox-group-task.git
cd ox-group-task
```

### 2. Paketlarni o‘rnatish:
```bash
yarn install
```

### 3. `.env` faylni yaratish:
`.env` fayl loyihaning root (asosiy) papkasida quyidagicha bo‘ladi:

```env
DATABASE_URL="postgresql://neondb_owner:npg_G2FPKy5vLdli@ep-soft-tooth-a24ae9uw-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
JWT_SECRET=ox_group
JWT_EXPIRES_IN=1d
```

### 4. Prisma bilan bazani sozlash:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Loyihani ishga tushurish:
```bash
yarn start:dev
```

---

## 🧪 Sinov uchun foydalanuvchi

```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

---

## ☁️ Deployment haqida

Loyihani AWS serveriga joylashtirish rejalashtirilgan edi, ammo **AWS EC2 (n2) va Lightsail xizmatlari uchun ajratilgan bepul limitlar tugaganligi** sababli, hozircha deploy qilinmadi.

---

## 👤 Muallif

- **Ismi:** Asilbek Abdugafforov  
- **Kasbi:** Node.js & NestJS Backend Developer  
- **Telegram:** [@asilbek_nt](https://t.me/asilbek_nt)

---

## 📝 Litsenziya

MIT License – ochiq manba, istalgan maqsadda foydalanishingiz mumkin.

---

## 🎯 OX GROUP topshirig‘i bo‘yicha eslatma

> Bu loyiha 48 soat ichida tayyorlanishi va GitHub orqali taqdim etilishi kerak.  
> Frontend kerak emas. Kod toza, optimal va to‘liq ishlaydigan bo‘lishi zarur.

**✅ Omad!**
