const USERS = {
  "Amir Khan": "amir123",
  "Parvej": "parvej123",
  "Meraj": "meraj123",
  "Modassir": "modassir123",
  "Rizwan": "rizwan123"
};

let loggedInUser = null;
let expensesData = []; // Store fetched expenses

function login() {
  const user = document.getElementById("userSelect").value;
  const pass = document.getElementById("passwordInput").value;

  if (USERS[user] && USERS[user] === pass) {
    loggedInUser = user;
    document.getElementById("currentUser").innerText = user;
    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("appSection").classList.remove("hidden");
    
    // Set default date to today
    document.getElementById("dateInput").valueToDate = new Date();
    document.getElementById("monthFilter").value = new Date().toISOString().slice(0, 7);
    
    loadMonthlyExpenses();
  } else {
    alert("Invalid credentials!");
  }
}

function logout() {
  loggedInUser = null;
  document.getElementById("loginSection").classList.remove("hidden");
  document.getElementById("appSection").classList.add("hidden");
}

function addExpense() {
  const item = document.getElementById("itemInput").value;
  const amount = parseFloat(document.getElementById("amountInput").value);
  const date = document.getElementById("dateInput").value;

  if (!item || isNaN(amount) || !date) {
    alert("Please fill all fields!");
    return;
  }

  const newExpense = {
    addedBy: loggedInUser,
    item: item,
    amount: amount,
    date: date
  };

  // Save to your Database (e.g. Firebase Firestore)
  expensesData.push(newExpense);

  // Trigger Notification to Roommates via OneSignal Webhook API
  sendRoomNotification(loggedInUser, item, amount);

  alert("Expense Added!");
  document.getElementById("itemInput").value = "";
  document.getElementById("amountInput").value = "";
  loadMonthlyExpenses();
}

function sendRoomNotification(payer, item, amount) {
  // Push Notification trigger via OneSignal REST API / Firebase Cloud Messaging
  fetch("https://onesignal.com/api/v1/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic YOUR_ONESIGNAL_REST_API_KEY"
    },
    body: JSON.stringify({
      app_id: "YOUR_ONESIGNAL_APP_ID",
      included_segments: ["All"],
      contents: { "en": `${payer} added ${amount.toFixed(3)} KWD for ${item}` }
    })
  });
}

function loadMonthlyExpenses() {
  const selectedMonth = document.getElementById("monthFilter").value; // e.g. "2026-09"
  const tbody = document.getElementById("expenseTableBody");
  tbody.innerHTML = "";

  const roomates = Object.keys(USERS);
  let totals = { "Amir Khan": 0, "Parvej": 0, "Meraj": 0, "Modassir": 0, "Rizwan": 0 };
  let grandTotal = 0;

  const filtered = expensesData.filter(e => e.date.startsWith(selectedMonth));

  filtered.forEach(exp => {
    totals[exp.addedBy] += exp.amount;
    grandTotal += exp.amount;

    let row = `<tr>
      <td>${exp.date}</td>
      <td>${exp.addedBy}</td>
      <td>${exp.item}</td>
      <td>${exp.amount.toFixed(3)} KWD</td>
    </tr>`;
    tbody.innerHTML += row;
  });

  // Calculate Month-End Balances
  const perPersonShare = grandTotal / roomates.length;
  let summaryHTML = `<p><strong>Total Spent:</strong> ${grandTotal.toFixed(3)} KWD</p>`;
  summaryHTML += `<p><strong>Per Person Share (5 people):</strong> ${perPersonShare.toFixed(3)} KWD</p><hr><ul>`;

  roomates.forEach(person => {
    const spent = totals[person];
    const balance = spent - perPersonShare;
    if (balance >= 0) {
      summaryHTML += `<li><strong>${person}:</strong> Paid ${spent.toFixed(3)} KWD (Gets back <span style="color:green;">+${balance.toFixed(3)} KWD</span>)</li>`;
    } else {
      summaryHTML += `<li><strong>${person}:</strong> Paid ${spent.toFixed(3)} KWD (Owes <span style="color:red;">${Math.abs(balance).toFixed(3)} KWD</span>)</li>`;
    }
  });
  summaryHTML += "</ul>";

  document.getElementById("summaryResults").innerHTML = summaryHTML;
}
