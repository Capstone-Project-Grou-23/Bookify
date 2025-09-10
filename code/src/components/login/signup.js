<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bookify - Profile Dashboard</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #f8f9fa;
      color: #333;
    }

    /* Sidebar */
    .sidebar {
      width: 220px;
      height: 100vh;
      background: #0a3d62;
      color: white;
      position: fixed;
      top: 0;
      left: 0;
      padding: 20px 0;
    }

    .sidebar h2 {
      text-align: center;
      margin-bottom: 30px;
      font-size: 22px;
      color: #1dd1a1;
    }

    .sidebar a {
      display: block;
      padding: 12px 20px;
      color: white;
      text-decoration: none;
      font-size: 16px;
      transition: background 0.3s;
    }

    .sidebar a:hover {
      background: #1dd1a1;
    }

    /* Main Content */
    .main-content {
      margin-left: 220px;
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }

    .header h1 {
      font-size: 20px;
      margin: 0;
      color: #0a3d62;
    }

    .profile {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .profile img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    /* Dashboard Cards */
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
      margin: 20px 0;
    }

    .card {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      text-align: center;
    }

    .card h3 {
      margin: 10px 0;
      color: #0a3d62;
    }

    .card span {
      font-size: 22px;
      font-weight: bold;
      color: #1dd1a1;
    }

    /* Layout */
    .content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
    }

    /* Courses / Orders */
    .section {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }

    .section h3 {
      margin-bottom: 15px;
      color: #0a3d62;
    }

    .course {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }

    /* Calendar */
    .calendar {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }

    .calendar h3 {
      margin-bottom: 10px;
      color: #0a3d62;
    }

    .calendar table {
      width: 100%;
      border-collapse: collapse;
      text-align: center;
    }

    .calendar th, .calendar td {
      padding: 10px;
      border-radius: 6px;
    }

    .calendar th {
      background: #0a3d62;
      color: white;
    }

    .calendar td:hover {
      background: #1dd1a1;
      color: white;
      cursor: pointer;
    }

    .highlight {
      background: #1dd1a1 !important;
      color: white;
      font-weight: bold;
    }

    /* Responsive */
    @media (max-width: 900px) {
      .content {
        grid-template-columns: 1fr;
      }
      .sidebar {
        width: 180px;
      }
      .main-content {
        margin-left: 180px;
      }
    }

    @media (max-width: 600px) {
      .sidebar {
        display: none;
      }
      .main-content {
        margin-left: 0;
      }
    }
  </style>
</head>
<body>

  <!-- Sidebar -->
  <div class="sidebar">
    <h2>📚 Bookify</h2>
    <a href="#">Dashboard</a>
    <a href="#">My Orders</a>
    <a href="#">Wishlist</a>
    <a href="#">Settings</a>
    <a href="#">Logout</a>
  </div>

  <!-- Main Content -->
  <div class="main-content">
    <!-- Header -->
    <div class="header">
      <h1>User Dashboard</h1>
      <div class="profile">
        <span>John Doe</span>
        <img src="https://via.placeholder.com/40" alt="profile">
      </div>
    </div>

    <!-- Cards -->
    <div class="cards">
      <div class="card">
        <h3>Orders</h3>
        <span>12</span>
      </div>
      <div class="card">
        <h3>Wishlist</h3>
        <span>5</span>
      </div>
      <div class="card">
        <h3>Saved Cards</h3>
        <span>2</span>
      </div>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Courses/Orders -->
      <div class="section">
        <h3>Recent Orders</h3>
        <div class="course">
          <span>📘 The Great Gatsby</span>
          <span>Delivered</span>
        </div>
        <div class="course">
          <span>📕 Rich Dad Poor Dad</span>
          <span>In Transit</span>
        </div>
        <div class="course">
          <span>📗 Atomic Habits</span>
          <span>Cancelled</span>
        </div>
      </div>

      <!-- Calendar -->
      <div class="calendar">
        <h3>Calendar</h3>
        <table>
          <thead>
            <tr>
              <th>Mo</th>
              <th>Tu</th>
              <th>We</th>
              <th>Th</th>
              <th>Fr</th>
              <th>Sa</th>
              <th>Su</th>
            </tr>
          </thead>
          <tbody id="calendar-body">
            <!-- JS will generate days -->
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <script>
    // Calendar Generator
    function generateCalendar() {
      const today = new Date();
      const month = today.getMonth();
      const year = today.getFullYear();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const calendarBody = document.getElementById("calendar-body");
      calendarBody.innerHTML = "";

      let date = 1;
      for (let i = 0; i < 6; i++) {
        let row = "<tr>";
        for (let j = 1; j <= 7; j++) {
          if (i === 0 && j < firstDay) {
            row += "<td></td>";
          } else if (date > daysInMonth) {
            break;
          } else {
            if (date === today.getDate()) {
              row += `<td class="highlight">${date}</td>`;
            } else {
              row += `<td>${date}</td>`;
            }
            date++;
          }
        }
        row += "</tr>";
        calendarBody.innerHTML += row;
      }
    }
    generateCalendar();
  </script>
</body>
</html>
