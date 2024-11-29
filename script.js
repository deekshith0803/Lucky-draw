// Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQBaG7sw0_Gmo49lDy7l5VEx6ECvi3xT4",
  authDomain: "lucky-draw-25e77.firebaseapp.com",
  databaseURL: "https://lucky-draw-25e77-default-rtdb.firebaseio.com",
  projectId: "lucky-draw-25e77",
  storageBucket: "lucky-draw-25e77.firebasestorage.app",
  messagingSenderId: "512875473433",
  appId: "1:512875473433:web:29f1e4627f1e4c0b9d9888",
  measurementId: "G-G57QCJD16P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Login as Admin
function loginAdmin() {
  const email = prompt("Enter admin email:");
  const password = prompt("Enter admin password:");
  const adminEmail = "deekshithm321@gmail.com"; // admin email
  const adminPassword = "admin123"; // admin password

  if (email === adminEmail && password === adminPassword) {
    document.getElementById("futuristicFormContainer").style.display = "none";
    document.getElementById("adminActions").style.display = "block";
    document.getElementById("loginButtonContainer").style.display = "none";
    alert("Logged in as admin.");
  } else {
    alert("Invalid credentials.");
  }
}

// Logout Admin
function logoutAdmin() {
  // document.getElementById("futuristicFormContainer").style.display = "none";
  document.getElementById("adminActions").style.display = "none";
  document.getElementById("loginButtonContainer").style.display = "block";
  alert("Logged out.");
}

// Handle Form Submission
document
  .getElementById("futuristicForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const course = document.getElementById("course").value;

    set(ref(db, "users/" + name), { name, phone, course })
      .then(() => alert("Data saved successfully!"))
      .catch((error) => alert("Error saving data: " + error));
  });

// Select Random User
function selectRandomUser() {
  const dbRef = ref(db);

  get(child(dbRef, "users"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("Snapshot data:", snapshot.val()); // Log the snapshot data
        const users = Object.values(snapshot.val());
        const randomUser = users[Math.floor(Math.random() * users.length)];

        // Update the display element
        const displayElement = document.getElementById("randomUserDisplay");
        displayElement.innerHTML = `
        <div class="user-card">
          <h3>Winner 🥇</h3>
          <p><strong>Name:</strong> ${randomUser.name}</p>
          <p><strong>Phone:</strong> ${randomUser.phone}</p>
          <p><strong>Course:</strong> ${randomUser.course}</p>
        </div>
      `;
      } else {
        console.log("No users found in the database.");
        document.getElementById("randomUserDisplay").innerHTML =
          "<p>No users found in the database.</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching users:", error.message);
      document.getElementById(
        "randomUserDisplay"
      ).innerHTML = `<p>Error fetching users: ${error.message}</p>`;
    });
}

// Event Listeners
document.getElementById("loginButton").addEventListener("click", loginAdmin);

// Export Functions for HTML Buttons
window.logoutAdmin = logoutAdmin;
window.selectRandomUser = selectRandomUser;
