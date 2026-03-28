# Japanese Restaurant API 

A comprehensive backend solution for a Japanese restaurant, featuring secure authentication, a dynamic menu, and a versatile order processing system.

## Setup Instructions

1. **Install Dependencies**: Run `npm install` to install all required packages.
2. **Environment Configuration**: Create a `.env` file in the root directory and add your `MONGO_URI` and `JWT_SECRET`.
3. **Seed Database**: Run `npm run seed` to populate the menu with initial dishes.
4. **Launch Server**: Start the development server using `npm run dev`.

## API Documentation

### Authentication

* **POST /api/auth/register**: Create a new user account with username, email, and password.
* **POST /api/auth/login**: Authenticate user and receive a JWT Token for private requests.

### Menu Items

* **GET /api/menu**: Retrieve the full list of available authentic Japanese dishes.
* **GET /api/menu/:id**: Get detailed information about a specific menu item.

### Orders (Private - Requires Bearer Token)

* **POST /api/orders**: Place a new order. Supports both **Delivery** (with item list) and **Table Booking** (with date and guests).
* **GET /api/orders/myorders**: View the order history for the currently logged-in user.

## 🛠 Tech Stack

* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB & Mongoose
* **Security**: JSON Web Tokens (JWT) & BcryptJS for password hashing
* **Development**: Nodemon & Dotenv

---

### Project Structure

* `/models`: Mongoose schemas defining the data structure for Users, Menu, and Orders.
* `/controllers`: Logical handlers that process API requests and interact with the database.
* `/middleware`: Security layer for JWT verification and route protection.
* `/routes`: Defined API endpoints and their associated controller functions.

---
## Screenshots of Features

### Menu Categories and Filtering
![Menu Categories](screenshots/5211031877362325308.jpg)

This screen shows category buttons that allow users to filter menu items by type.

---

### Full Menu View
![Full Menu](screenshots/5211031877362325305.jpg)

This screen displays all available menu items with images, prices, and descriptions.

---

### Sushi and Hot Dishes Section
![Sushi and Hot Dishes](screenshots/5211031877362325306.jpg)

Users can browse sushi and hot dishes separately using category filters.

---

### Appetizers and Desserts
![Appetizers and Desserts](screenshots/5211031877362325307.jpg)

This screen displays appetizer and dessert items available in the menu.

---

### Cart and Order Confirmation Page
![Cart Page](screenshots/5211031877362325318.jpg)

This screen shows selected items, total price, and allows users to confirm their order.

---

### Order Confirmation Message
![Order Confirmation](screenshots/5211031877362325319.jpg)

A confirmation message is displayed after a successful order placement.

---

### User Order History
![Order History](screenshots/5211031877362325320.jpg)

After logging in, users can view their order history and order status.

---

### Login Page
![Login Page](screenshots/5211031877362325324.jpg)

This screen allows users and administrators to log in using their credentials.

## Conclusion

Seiko Sushi demonstrates a complete restaurant web application with a clear user interface and a functional ordering workflow.
The project successfully implements menu browsing, category filtering, order placement, and user authentication.
Overall, the application meets the project requirements and shows practical use of web development technologies.

---

## Authors

- Ramina Kuzhentayeva  
- Danel Li


