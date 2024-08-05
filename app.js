document.addEventListener("DOMContentLoaded", () => {
    // Default to show the dashboard section
    showSection('dashboard');

    // Handle form submission to add new bills
    document.getElementById("add-bill-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const billName = document.getElementById("bill-name").value;
        const billAmount = document.getElementById("bill-amount").value;
        const billDueDate = document.getElementById("bill-due-date").value;
        const billStatus = document.getElementById("bill-status").value;

        addBill(billName, billAmount, billDueDate, billStatus);

        this.reset();
    });

    // Theme toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    themeToggleBtn.addEventListener('click', toggleTheme);
});

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';
}

function addBill(name, amount, dueDate, status) {
    const billTableBody = document.getElementById("bill-table-body");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${name}</td>
        <td>${amount}</td>
        <td>${dueDate}</td>
        <td>${status}</td>
        <td>
            <button onclick="deleteBill(this)">Delete</button>
        </td>
    `;

    billTableBody.appendChild(row);

    updateSummary();
}

function deleteBill(button) {
    const row = button.parentElement.parentElement;
    row.remove();
    updateSummary();
}

function updateSummary() {
    const totalBills = document.querySelectorAll("#bill-table-body tr").length;
    const paidBills = document.querySelectorAll("#bill-table-body tr td:nth-child(4)").length; // Assuming all paid for demo
    const unpaidBills = totalBills - paidBills;

    document.getElementById("total-bills").textContent = totalBills;
    document.getElementById("paid-bills").textContent = paidBills;
    document.getElementById("unpaid-bills").textContent = unpaidBills;
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}
