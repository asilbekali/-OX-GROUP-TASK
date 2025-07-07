<<<<<<< HEAD
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

=======
<<<<<<< HEAD
# -OX-GROUP-TASK
=======
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
>>>>>>> b121c92 (add project to repository)
>>>>>>> 69dc15c (auth section full finished)
