<div align="center">
  <h1>amFOSS Home</h1>
  <p>A full-stack web application for managing and visualizing amFOSS club member activity</p>
</div>

---

amFOSS Home is the central dashboard for the amFOSS community, helping track, manage, and visualize member attendance, status updates, and other key activities. It is designed to work seamlessly with our [Rust backend](https://github.com/amfoss/root), providing a modern, interactive interface for both members and administrators. All data is fetched and updated via a GraphQL API.

# Features

- **Attendance Tracking:**  
  See who attended, when they checked in and out, and view attendance history.

- **Status Updates:**  
  Track member status streaks and highlight top contributors.

- **Hall of Fame:**  
  Recognize members with the best attendance and most status updates.

- **Charts and Visualizations:**  
  Visualize attendance trends and statistics.

- **Member Directory:**  
  Browse all members, search for individuals, and view their stats.

- **Low Attendance Alerts:**  
  Quickly spot members who are low on attendance or status updates.

- **Calendar Integration:**  
  Pick any date to see attendance and activity for that day.

---

# Tech Stack

- **Frontend:**  
  - [Next.js](https://nextjs.org/)  
  - [React](https://react.dev/)  
  - [Tailwind CSS](https://tailwindcss.com/)  
  - [Chart.js](https://www.chartjs.org/)  
  - [Apollo Client](https://www.apollographql.com/docs/react/)

- **Backend:**  
  - [Rust](https://www.rust-lang.org/)  
  - [GraphQL API](https://root.amfoss.in/graphiql) ([see and test queries here](https://root.amfoss.in/graphiql))

---

# How It Works

- The **frontend** [home](https://home.amfoss.in) is what users see and interact with in their browser.
- The **backend** (Rust, [amfoss/root](https://github.com/amfoss/root)) handles all the data, logic, and storage.
- The frontend gets all its data by sending GraphQL queries and mutations to the backend at [https://root.amfoss.in/graphiql](https://root.amfoss.in/graphiql).

You can use the GraphiQL interface at [https://root.amfoss.in/graphiql](https://root.amfoss.in/graphiql) to try out queries and see what data is available.

---

# Getting Started

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

## Installation & Running

1. **Clone this repository:**
    ```sh
    git clone https://github.com/amfoss/home.git
    cd home
    ```

2. **Install dependencies:**
    ```sh
    npm install
    # or
    yarn install
    ```

3. **Start the development server:**
    ```sh
    npm run dev
    # or
    yarn dev
    ```

4. **API Proxying (Development Only):**

    By default, the frontend expects the backend GraphQL API to be available at `https://root.amfoss.in`.  
    If you need to proxy API requests locally (for example, if you are developing against a local backend instance), you can use a tool like [`lcp`](https://www.npmjs.com/package/lcp).  
    **Note:** `lcp` is not installed by default. Install it globally if you need this feature:

    ```sh
    npm install -g lcp
    ```

    Then run:

    ```sh
    npx lcp --proxyUrl https://root.amfoss.in
    ```

    This is a temporary solution until backend seeding is available in Root.  
    If you do not need a proxy, you can skip this step.

5. **Open the app:**
    - Go to [http://localhost:3000](http://localhost:3000) in your browser.

---

# Project Structure

Below is a typical directory structure for this project (as shown by the `tree` command):

```
home/
├── node_modules/
├── public/
│   └── ...static assets...
├── src/
│   ├── app/
│   │   └── dashboard/
│   │       └── dashboard.tsx
│   ├── components/
│   │   ├── Calendar.tsx
│   │   ├── Card.tsx
│   │   └── ...other components...
│   ├── lib/
│   │   └── apollo-client.ts
│   ├── services/
│   │   └── streak-service.ts
│   └── types/
│       └── types.ts
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

---

# Backend

The backend for this project is written in Rust and can be found at [amfoss/root](https://github.com/amfoss/root).

- It exposes a GraphQL API at [https://root.amfoss.in/graphiql](https://root.amfoss.in/graphiql).
- You can use this interface to test queries and mutations, and see what data is available for the frontend.

---

# Customization

- **Styling:**  
  Uses Tailwind CSS. You can change the look and feel by editing Tailwind classes or the config file.

- **API Integration:**  
  If the backend API changes, update the GraphQL queries in `/src/services/streak-service.ts`.

- **Adding Features:**  
  Add new components to `/src/components` and update the dashboard as needed.

---

# Contributing

## Reporting Issues

If you encounter a bug, please check existing issues first to avoid duplicates. If none exist, create a new issue with the following details:

* Title: Concise summary.
* Description: A detailed description of the issue.
* Steps to Reproduce: If it's a bug, include steps to reproduce.
* Expected and Actual Behavior: Describe what you expected and what actually happened.

## Suggesting Features

We welcome new ideas! Please open an issue titled "Feature Request: `<Feature Name>`" and provide:

* Problem: What problem does this feature solve?
* Solution: Describe how you envision it working.
* Alternatives Considered: Mention any alternatives you've considered.

## Submitting Code Changes

If you'd like to fix a bug, add a feature, or improve code quality:

* Check the open issues to avoid redundancy.
* Open a draft PR if you'd like feedback on an ongoing contribution.
* Make sure your pull request targets the correct branch.



# License

This project is licensed under the MIT License .

---

