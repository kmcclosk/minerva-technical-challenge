# Minerva

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This webapp has the following functionality:

- Registration.
- Login.
- Account display (wallet) = Balance and movements.
- Realization of money deposit.
- Transfer from account A to account B.

The app has an owl theme and is called Minerva.

The component library used is Material UI. While Typescript is used, in the interests of time, some types are any. useMemo and useCallback are not used, but there are cases which they may be helpful, such as when displaying the transaction history. The backing store of the app is local using React Context. Data is not persisted between sessions. A simple set of tests for the login page are created using react-testing-library.

A set of default users are already within the in-memory database for you to use. You can see the complete list in the file src/utils/db.ts. For convenience, you can use the username `owl0` and password `password0` to login. If you prefer, the Sign Up form will allow you to create new users who are automatically given a balance of 1000 OWL coins.

Once you are logged in you are able to exchange coins with the other users. A good initial user to transfer coins to is user `owl1`. If you would like to add more coins to your account a faucet is available on the user page as well. Finally, the user page shows your complete transaction history.

This project is deployed via Vercel and is available at https://minerva-technical-challenge.vercel.app/.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
