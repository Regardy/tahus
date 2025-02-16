document.addEventListener("DOMContentLoaded", async () => {
  // Fetch donation data from server API with authentication token
  const res = await fetch("/donations?token=your_secret_token");
  const donations = await res.json();
  const list = document.getElementById("donation-list");
  
  // Display donations on the webpage
  donations.forEach(d => {
    const li = document.createElement("li");
    li.textContent = `${d.name} - Rp${d.amount}: ${d.message}`;
    list.appendChild(li);
  });
});
