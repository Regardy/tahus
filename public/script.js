document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("/donations?token=your_secret_token");
  const donations = await res.json();
  const list = document.getElementById("donation-list");
  donations.forEach(d => {
    const li = document.createElement("li");
    li.textContent = `${d.name} - Rp${d.amount}: ${d.message}`;
    list.appendChild(li);
  });
});
