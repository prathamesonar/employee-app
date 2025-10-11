# Employee Dashboard 

A comprehensive, multi-screen React application designed to display and manage employee data. This project was built to demonstrate core and advanced React concepts, including authentication, API integration, data visualization, and modern UI/UX patterns.

>###  **[Live Demo on Vercel](https://employee-psi-self.vercel.app/)** 
>
>**Backend deployed on Render:** `https://my-employee-app-backend.onrender.com`

---

## 📸 Screenshots

<table>
  <tr>
    <td align="center"><strong>Login Page</strong></td>
    <td align="center"><strong>Employee List (with Controls)</strong></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/99eaceba-ac09-485f-bbeb-b503a11643bd" alt="Login Page Screenshot" width="400"/></td>
    <td><img src="https://github.com/user-attachments/assets/4a85a3f0-f489-4e33-87a7-b7de14acb658" alt="Employee List Screenshot" width="400"/></td>
  </tr>
  <tr>
    <td align="center"><strong>City Distribution Pie Chart</strong></td>
    <td align="center"><strong>Interactive City Map</strong></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/52d0f4d3-b76d-4f01-b8e3-318d9191b5d4" alt="Pie Chart Screenshot" width="400"/></td>
    <td><img src="https://github.com/user-attachments/assets/93a31b35-7c87-404e-8980-70ba478cd9f7" alt="Map Screenshot" width="400"/></td>
  </tr>
</table>


---

##  Features

### Core Features
* **User Authentication:** Secure login page with client-side validation.
* **Protected Routes:** Pages are protected from unauthorized access.
* **Persistent Login:** User session is maintained across page refreshes using `localStorage`.
* **Global State Management:** Centralized state for user and employee data using React Context, making the app robust and refresh-safe.
* **REST API Integration:** Fetches data from an external REST API via a custom Node.js/Express backend proxy.
* **Camera & Photo Capture:** Allows users to capture and display a photo using their device's camera.

### Advanced Features
* **Advanced Table Controls:**
    * **Live Search:** Filter the employee list in real-time.
    * **Dynamic Sorting:** Sort the table by clicking on column headers.
    * **Pagination:** Easily navigate through large sets of data.
* **Multiple Data Visualizations:**
    * **Bar Chart:** Displays the salaries of the first 10 employees using **Recharts**.
    * **Pie Chart:** Shows the percentage distribution of employees by city.
    * **Interactive Map:** Visualizes all employee locations on a world map using **React Leaflet**, featuring **Marker Clustering** to handle overlapping points.
* **Modern UI/UX:**
    * **Navbar & Logout:** A persistent navigation bar with a functional logout button.
    * **Skeleton Loaders:** A modern loading state that improves perceived performance while data is being fetched.
    * **Responsive Design:** A clean and usable interface on both desktop and mobile devices.

---

## 🛠️ Tech Stack

### Frontend
* **React (v18)**
* **Vite** (Build Tool)
* **React Router** (Client-Side Routing)
* **Axios** (API Requests)
* **Recharts** (Charting Library)
* **React Leaflet**  (Interactive Maps)
* **React Webcam** (Camera Access)
* **CSS3** (Custom Styling)

### Backend
* **Node.js**
* **Express.js** (Server Framework)
* **Axios** (Proxy API Requests)
* **CORS**

---

## ⚙️ Getting Started: Local Setup

To run this project on your local machine, follow these steps:

### Prerequisites
* Node.js (v18 or higher)
* npm

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/prathamesonar/employee-app.git
    cd employee-app

    ```

2.  **Setup the Backend:**
    * Navigate to the backend directory and install dependencies.
        ```bash
        cd backend
        npm install
        ```
    * Start the backend server. It will run on `http://localhost:3001`.
        ```bash
        npm run dev
        ```

3.  **Setup the Frontend:**
    * Open a **new terminal** and navigate to the frontend directory.
        ```bash
        cd frontend
        npm install
        ```
    * Create a local environment file. Create a new file named `.env` in the `frontend` directory.
    * Add the following line to your new `.env` file:
        ```
        VITE_API_URL=http://localhost:3001
        ```
    * Start the frontend development server. It will run on `http://localhost:5173`.
        ```bash
        npm run dev
        ```

You can now open `http://localhost:5173` in your browser to see the application running locally.
