# 🏗️ OX GROUP – NestJS Backend Test Task

Bu loyiha **OX GROUP** test topshirig‘i asosida NestJS frameworki bilan yozilgan bo‘lib, quyidagi funksiyalarni o‘z ichiga oladi:

- OTP orqali login
- JWT autentifikatsiya va ro‘llar
- Kompaniya yaratish, o‘chirish
- OX API bilan integratsiya
- Mahsulotlar ro‘yxatini olish
- Foydalanuvchi sessiyasi va profil ma’lumotlarini olish

---

## 📦 Texnologiyalar

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- PostgreSQL
- JWT – autentifikatsiya uchun
- Class-validator – DTO validatsiyasi
- Axios – tashqi API bilan ishlash
- dotenv – konfiguratsiya uchun

---

## 🔐 Auth API

### `POST /auth/login`

- Body:
  ```json
  {
    "email": "user@example.com"
  }
Agar user mavjud bo‘lmasa, yangi manager sifatida yaratiladi.

Javobda random OTP kod qaytariladi.

POST /auth/verify
Body:

json
Копировать
Редактировать
{
  "email": "user@example.com",
  "otp": "123456"
}
OTP to‘g‘ri bo‘lsa, JWT token qaytariladi.

GET /auth/my-session
Foydalanuvchining sessiya tarixi haqida ma’lumot qaytaradi.

Kim, qachon foydalanuvchi profiliga kirgani ko‘rsatiladi.

GET /auth/my-profile
Foydalanuvchining email, role, kompaniya va boshqa ma’lumotlari qaytariladi.

🏢 Kompaniya API
POST /register-company
Body:

json
Копировать
Редактировать
{
  "token": "Bearer xyz",
  "subdomain": "demo"
}
https://{subdomain}.ox-sys.com/profile orqali token validatsiya qilinadi.

Agar kompaniya mavjud bo‘lmasa:

Kompaniya yaratiladi

Foydalanuvchiga admin roli biriktiriladi

Agar mavjud bo‘lsa:

Foydalanuvchi kompaniyaga manager sifatida biriktiriladi

DELETE /company/:id
Faqat admin foydalanuvchi o‘zi qo‘shgan kompaniyani o‘chira oladi

🛒 Mahsulotlar API
GET /products?page=1&size=10
Faqat manager roliga ruxsat beriladi

Mahsulotlar https://{subdomain}.ox-sys.com/variations API orqali olinadi

page va size query parametrlari qo‘llab-quvvatlanadi

size > 20 bo‘lsa, 400 xatolik qaytariladi

👮‍♂️ Ruxsatlar
@AdminOnly() – faqat admin foydalanuvchilarga ruxsat

@ManagerOnly() – faqat manager foydalanuvchilarga ruxsat

🌐 OX API haqida
Format: https://{subdomain}.ox-sys.com/{endpoint}

Header:

h
Копировать
Редактировать
Authorization: Bearer <token>
Accept: application/json
🔧 Loyihani ishga tushurish
1. Repositoriyni klonlash
bash
Копировать
Редактировать
git clone https://github.com/your-username/ox-group-task.git
cd ox-group-task
2. Paketlarni o‘rnatish
bash
Копировать
Редактировать
yarn install
# yoki
npm install
3. .env faylni sozlash
Loyiha root papkasida .env fayl yarating va quyidagilarni joylang:

ini
Копировать
Редактировать
DATABASE_URL=postgresql://user:password@localhost:5432/oxgroup
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
4. Prisma bilan bazani tayyorlash
bash
Копировать
Редактировать
npx prisma generate
npx prisma migrate dev --name init
5. Loyihani ishga tushurish
bash
Копировать
Редактировать
yarn start:dev
# yoki
npm run start:dev
✅ Qo‘shimcha imkoniyatlar
GET /auth/my-session – kim va qachon user profiliga kirganligini ko‘rsatadi

GET /auth/my-profile – userning hozirgi holatdagi profil ma’lumotlarini qaytaradi

✍️ Muallif
Ismi: Asilbek Abdugafforov
Kasbi: Node.js & NestJS Backend Developer
Telegram: @asilbek_nt

