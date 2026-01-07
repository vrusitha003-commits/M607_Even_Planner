# EventApp

A full-stack event planning web application developed for a university assignment. The platform allows users to browse, search, and book events, while administrators can manage event listings and view business data.

## 🛠 Tech Stack

* **Frontend:** EJS (Templating), Bootstrap 5, HTML/CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (NoSQL) using Mongoose ODM
* **API Integration:** Google Maps JavaScript API (for location visualization)
* **Authentication:** Session-based auth with `bcryptjs` encryption

## 🚀 Key Features

### User Features
* **Authentication:** Secure Login and Registration system.
* **Event Discovery:** Browse all upcoming events or search by keyword (e.g., "Tech", "Music").
* **Booking System:** Book tickets for events and view them in the personal dashboard.
* **User Dashboard:** Manage profile settings (update username/password) and view booking history.
* **Interactive Maps:** Visual representation of event venues using Google Maps.

### Admin Features
* **Role-Based Access Control:** Secure Admin Panel accessible only to users with the 'admin' role.
* **Event Management:** Create, Read, and Delete events.
* **Data Entry:** Add event details including price, date, description, and coordinates.

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/](https://github.com/)[YOUR_USERNAME]/event_planner_app.git
cd event_planner_app
npm install
```
### 2. Configure Environment Variables
Create a .env file in the root directory and add your credentials:
```bash
PORT=3000
MONGO_URI=mongodb+srv://<your_username>:<your_password>@cluster.mongodb.net/eventApp
SESSION_SECRET=your_random_secret_string
GOOGLE_MAPS_API_KEY=your_google_cloud_api_key
```
### 3 Run the application
```
node app.js
```

### Open your browser and navigate to: http://localhost:3000







