# 🍔 Campus Crave

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Status](https://img.shields.io/badge/Status-In%20Progress-yellow?style=flat-square)

**Campus Crave** is a canteen management and food ordering platform for **United International University (UIU)**. Students can browse food from campus vendors and order it, vendors can manage their menu and orders, and an admin keeps the whole marketplace in check. 🎓🍱

This repo is the **frontend**. The REST API lives here 👉 [campus-crave-server](https://github.com/abdullahaljubayer-101/campus-crave-server)

---

## 👥 Three roles, three dashboards

### 🧑‍🎓 Customer
- Browse products on the home page and by category
- View product details
- Add items to the **cart**
- Manage their account and avatar

### 🏪 Vendor
- Register as a vendor (needs admin approval)
- **Add products** with images and manage the product list
- View and manage **orders**
- Update shop information and avatar

### 🛡️ Admin
- Dashboard with **order, customer and vendor counts**
- View and search customers, vendors and products
- **Approve vendors**
- View orders

### 🔐 Auth
- Login with role-based redirects
- Separate sign-up flows for **customers** and **vendors**, with **email verification**
- **Forgot password** flow: confirm email → OTP → reset password
- Forms validated with **React Hook Form + Zod**

## 🛠️ Tech stack

| Layer | Tools |
| ----- | ----- |
| UI | React 18, Tailwind CSS, Preline UI |
| Routing | React Router v6 |
| Forms | React Hook Form, Zod |
| Build | Vite |
| Backend | [campus-crave-server](https://github.com/abdullahaljubayer-101/campus-crave-server) (Express + MySQL) |

## 🚀 Getting started

```bash
git clone https://github.com/abdullahaljubayer-101/campus-crave.git
cd campus-crave
npm install
```

Create a `.env` file in the project root and point it to the API:

```env
VITE_API_URL=http://localhost:<server-port>
```

Then start the dev server:

```bash
npm run dev
```

> Make sure [campus-crave-server](https://github.com/abdullahaljubayer-101/campus-crave-server) is running first.

## 📁 Project structure

```text
src/
├── components/     # Shared UI pieces
├── pages/
│   ├── auth/       # Login, register (customer/vendor), forgot password
│   ├── customer/   # Home, products, cart, account
│   ├── vendor/     # Products, orders, account
│   ├── admin/      # Dashboard, customers, vendors, products, orders
│   └── other/      # 404, terms
└── main.jsx        # Routes
```

## 🗺️ Roadmap

Some pages are scaffolded but not built yet:

- [ ] Customer: favorites, meals, vendors list, order history
- [ ] Vendor: dashboard stats, reviews, chat, notifications
- [ ] Admin: reviews, notifications, loan management
- [ ] Terms and conditions page

---

Made by **Abdullah Al Jubayer** · [GitHub](https://github.com/abdullahaljubayer-101) · [Portfolio](https://abdullahaljubayer.com)
