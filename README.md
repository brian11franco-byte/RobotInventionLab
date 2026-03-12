# 🤖 Robot Inventor Lab

**Interactive English learning for Cambridge Global English Stage 3**

Built with Next.js 14, TypeScript, TailwindCSS, Framer Motion, Prisma, and Vercel Postgres.

---

## 🚀 Local Development

```bash
npm install
cp .env.example .env.local   # fill in DATABASE_URL and DIRECT_URL
npx prisma migrate dev --name init
npx prisma generate
npm run dev                   # open http://localhost:3000
```

---

## ☁️ Vercel Deployment

### 1 — Push to GitHub
```bash
git init && git add . && git commit -m "init"
git remote add origin https://github.com/YOUR_USERNAME/robot-inventor-lab.git
git push -u origin main
```

### 2 — Import on Vercel
Go to vercel.com → New Project → Import your repo.

### 3 — Add Vercel Postgres
Vercel Dashboard → Storage → Create Database → Postgres → copy DATABASE_URL and DIRECT_URL.

### 4 — Set Environment Variables
In Vercel Settings → Environment Variables:
- DATABASE_URL
- DIRECT_URL

### 5 — Set Build Command
In Vercel Settings → Build & Development:
```
Build Command: npx prisma generate && npx prisma migrate deploy && next build
```

### 6 — Deploy!

---

## 📚 Cambridge Lesson Mapping

| Lesson | Topic | Module |
|--------|-------|--------|
| 1 | Talking about robots | Discovery Lab |
| 2 | Present tense verbs | Skills Trainer |
| 3 | Countable & uncountable nouns | Robot Restaurant |
| 4 | Writing instructions | Instructions Lab |
| 5 | Reading comprehension | Story Corner |
| 6 | Creative expression | Builder & Song Studio |

---

## Sharing via Google Classroom
1. Deploy to Vercel, copy your URL
2. Google Classroom → Classwork → Assignment → paste URL
3. Students click link, enter nickname, start learning!
