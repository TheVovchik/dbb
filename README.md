# General setup guide

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Application technologies:
- Next JS
- TS
- Dropbox
- Axios
- Chakra UI (incl. react-icons)

## Getting Started

First run the node_modules instalation

```bash
yarn install
```

Create .env file in root folder with

```bash
NEXT_PUBLIC_MY_REDIRECT_URI=http://localhost:3000/api/dropbox
NEXT_PUBLIC_MY_URI=http://localhost:3000
NEXT_PUBLIC_APP_KEY=l4ldhc6hphho3wj
NEXT_PUBLIC_APP_SECRET=n90flzwz39ly5jq
```

Then run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
