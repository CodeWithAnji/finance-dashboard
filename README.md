# Finance Dashboard UI

🔗 Live Demo: https://finance-dashboard-yn1p.vercel.app/
📂 Repository: https://github.com/CodeWithAnji/finance-dashboard

## Overview

## Overview

This project is a **Finance Dashboard UI** built using **React** and **TailwindCSS**.  
It allows users to **track financial activity**, view insights, and manage transactions in a clean and interactive interface.  

The dashboard demonstrates **state management, responsive design, role-based UI**, and advanced frontend features.

## Features

### Dashboard Overview
- Summary cards: Total Balance, Income, Expenses
- Time-based visualization (balance trend, daily expense trend)
- Category-based visualization (spending breakdown, income vs expense)
- Insights: Top spending category, monthly comparison, observations

### Transactions Section
- List transactions with: Date, Amount, Category, Type
- Features:
  - **Search:** By category, type, amount, or date
  - **Filter:** By transaction type (income/expense)
  - **Sort:** By date or amount
  - **Group By:** Category, type, or month
  - **Export:** CSV export of filtered transactions
  - **Role-based UI:** Admin can add/edit/delete; Viewer can only view

### Insights Section
- Metrics:
  - Top spending category
  - Current vs previous month comparison
  - Average daily expense
  - Highest spending day
  - Savings rate
- Handles empty data gracefully

### Notifications
- **React Toastify** notifications for add, update, delete, and export actions

### Responsive Design
- Works on mobile, tablet, and desktop

## Technology Stack
- **Frontend:** React.js
- **Styling:** TailwindCSS  
- **Icons:** React Icons  
- **Notifications:** react-toastify  
- **Charts:** Recharts  
- **Data:** Mock API for CRUD operations
- **State Management:** Context API
- **Deploy:** Vercel

### Setup Instructions

1. Clone the repository:
   
   git clone https://github.com/CodeWithAnji/finance-dashboard.git
   
   cd fd-ui
   
2. Install dependencies:
   
   npm install
   
3. Start the development server:
   
   npm start
   
4. Open in browser:
   
   http://localhost:5173/
   
### How to Use
- Switch Role: Toggle between Admin and Viewer
- Manage Transactions: Add, edit, delete (Admin only)
- Search & Filters: Search, filter by type, date, category, or amount
- Sort & Group: Sort by date or amount, group by category/type/month
- Export: Export filtered transactions as CSV
- View Insights: Check dashboard insights for trends and spending patterns
### Additional Features
- **Dark Mode:** TailwindCSS dark styling
- **Mock API Integration:** Simulates backend CRUD operations
- **Animations & Transitions:** Button hover effects and toast notifications
- **Export Functionality:** CSV export of filtered transactions
- **Advanced Filtering & Grouping:** Filters by type, category, amount, and date; sorting by date and amount
- Handles empty transactions gracefully
- Prevents invalid or missing data entries
- Safe calculations for division and percentages

### Screenshots
- Dashboard Overview

![dashboard](https://github.com/CodeWithAnji/finance-dashboard/blob/d4c39b844261061e056f1f305e23b7bf4cf10b68/src/screenshots/dashboard.png)

- Transactions section - role: user
  
![user](https://github.com/CodeWithAnji/finance-dashboard/blob/d4c39b844261061e056f1f305e23b7bf4cf10b68/src/screenshots/transaction-user.png)

- Transaction section -  role: admin
  
![admin](https://github.com/CodeWithAnji/finance-dashboard/blob/d4c39b844261061e056f1f305e23b7bf4cf10b68/src/screenshots/transaction-admin.png)

- Insights section

![insight](https://github.com/CodeWithAnji/finance-dashboard/blob/d4c39b844261061e056f1f305e23b7bf4cf10b68/src/screenshots/insights.png)

### Additional Notes
- Fully responsive UI for all devices
- Handles empty states gracefully
- Works with mock/static data; no backend required

## Author

Anjaneyulu Ganta  
Frontend Developer Intern Candidate  
📧 gantaanjaneyulu66@gmail.com  
🔗 GitHub: https://github.com/CodeWithAnji
