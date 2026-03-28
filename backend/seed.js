const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const MenuItem = require('./models/MenuItem');
const User = require('./models/User');
const Order = require('./models/Order');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

mongoose.connect(process.env.MONGO_URI);

const menuItems = [
  // SUSHI & ROLLS
  { name: "Philadelphia Luxury", description: "Premium salmon, double cream cheese, cucumber, and avocado.", price: 16, category: "Sushi", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600" },
  { name: "Black Dragon Roll", description: "Smoked eel, tempura prawn, cream cheese, topped with avocado.", price: 18, category: "Sushi", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600" },
  { name: "Spicy Tuna Crunch", description: "Fresh tuna, spicy mayo, green onion, and tempura flakes.", price: 14, category: "Sushi", image: "https://plus.unsplash.com/premium_photo-1726876958323-7ea469b32c6f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFNwaWN5JTIwVHVuYSUyMENydW5jaHxlbnwwfHwwfHx8MA%3D%3D" },
  { name: "Rainbow Roll", description: "California roll topped with tuna, salmon, and white fish.", price: 17, category: "Sushi", image: "https://images.unsplash.com/photo-1636425730652-ffdbada1ed4d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UmFpbmJvdyUyMFJvbGx8ZW58MHx8MHx8fDA%3D" },
  // HOT DISHES
  { name: "Tonkotsu Ramen", description: "12-hour pork bone broth, chashu pork, nitamago egg.", price: 15, category: "Hot Dishes", image: "https://media.istockphoto.com/id/1406672650/photo/japanese-tonkotsu-ramen.webp?a=1&b=1&s=612x612&w=0&k=20&c=P1wL3JXT2U6hb5l6UAgZ2YmBmKAOC-j4CSobXxOF08U=" },
  { name: "Seafood Yakisoba", description: "Stir-fry noodles with shrimp, scallops, and vegetables.", price: 14, category: "Hot Dishes", image: "https://media.istockphoto.com/id/2213811923/photo/wok-with-seafood-and-sauce.webp?a=1&b=1&s=612x612&w=0&k=20&c=PyMbwFUgrnmvK-4vO7WZFl-VVOlmLiWOg80QoHKjGnU=" },
  { name: "Chicken Teriyaki", description: "Grilled chicken with homemade sauce over steamed rice.", price: 13, category: "Hot Dishes", image: "https://plus.unsplash.com/premium_photo-1695167739750-a1e7c856438b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2hpY2tlbiUyMFRlcml5YWtpfGVufDB8fDB8fHww" },
  { name: "Beef Gyu-Don", description: "Sliced beef simmered with onions in a sweet dashi broth.", price: 14, category: "Hot Dishes", image: "https://plus.unsplash.com/premium_photo-1661412657617-d6eab13c563e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8amFwYW5lc2UlMjBjdWlzaW5lJTIwYmVlZnxlbnwwfHwwfHx8MA%3D%3D" },
  // APPETIZERS
  { name: "Ebi Tempura", description: "Tiger prawns deep-fried in light Japanese batter.", price: 12, category: "Appetizers", image: "https://plus.unsplash.com/premium_photo-1667807521884-e25207a0555b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8RWJpJTIwVGVtcHVyYXxlbnwwfHwwfHx8MA%3D%3D" },
  { name: "Pork Gyoza", description: "Pan-seared dumplings filled with seasoned pork.", price: 9, category: "Appetizers", image: "https://media.istockphoto.com/id/803171476/photo/gyoza-dumplings-2.webp?a=1&b=1&s=612x612&w=0&k=20&c=umCbXjw877btMZ65jOD5kbjxPnRHoo994TKu6t4wP78=" },
  // DESSERTS
  { name: "Matcha Mochi", description: "Sweet rice cake filled with green tea ice cream.", price: 7, category: "Desserts", image: "https://images.unsplash.com/photo-1724052526175-4a7332bd10e9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWF0Y2hhJTIwTW9jaGl8ZW58MHx8MHx8fDA%3D" },
  { name: "Raindrop Cake", description: "Mizu Shingen Mochi with roasted soybean flour.", price: 8, category: "Desserts", image: "https://images.unsplash.com/photo-1646797419118-105060f61434?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amFwYW5lc2UlMjBjYWtlfGVufDB8fDB8fHww" }
];

const importData = async () => {
  try {
    // Чистим всё
    await MenuItem.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    // Добавляем меню
    await MenuItem.insertMany(menuItems);

    // Добавляем тестовых пользователей
    // Пароли захешируются автоматически благодаря схеме User.js
    await User.create([
      { username: 'Admin', email: 'admin@zen.com', password: 'admin123', role: 'admin' },
      { username: 'JohnDoe', email: 'john@gmail.com', password: 'user123', role: 'user' }
    ]);

    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();