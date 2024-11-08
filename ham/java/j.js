let dataArray = [];
const form = document.getElementById('crudForm');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const cityInput = document.getElementById('city');
const editIndexInput = document.getElementById('editIndex');
const messageBox = document.getElementById('message');

// Event listener for form submission (add/edit record)
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Validate inputs
    if (!nameInput.value || !ageInput.value || !cityInput.value) {
        showMessage('All fields are required.', 'error');
        return;
    }

    const name = nameInput.value;
    const age = ageInput.value;
    const city = cityInput.value;
    const editIndex = editIndexInput.value;

    if (editIndex === "") {
        // Create new entry
        dataArray.push({ name, age, city });
        showMessage('Record added successfully!', 'success');
    } else {
        // Update existing entry
        dataArray[editIndex] = { name, age, city };
        showMessage('Record updated successfully!', 'success');
        editIndexInput.value = ""; // Reset edit index after update
    }

    // Reset form fields
    form.reset();
    renderTable();
});

// Function to render the data table
function renderTable() {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = ""; // Clear existing rows

    dataArray.forEach((data, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.age}</td>
            <td>${data.city}</td>
            <td>
                <button class="edit" onclick="editData(${index})">Edit</button>
                <button class="delete" onclick="deleteData(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to edit a record
function editData(index) {
    const data = dataArray[index];
    nameInput.value = data.name;
    ageInput.value = data.age;
    cityInput.value = data.city;
    editIndexInput.value = index; // Set the edit index
    nameInput.focus();
}

// Function to delete a record with confirmation
function deleteData(index) {
    if (confirm('Are you sure you want to delete this record?')) {
        dataArray.splice(index, 1); // Remove data from array
        renderTable(); // Re-render the table
        showMessage('Record deleted successfully!', 'success');
    }
}

// Function to show messages
function showMessage(message, type) {
    messageBox.textContent = message;
    messageBox.className = `message ${type}`;
    setTimeout(() => {
        messageBox.textContent = '';
        messageBox.className = 'message';
    }, 3000); // Hide message after 3 seconds
}

// Initial render
renderTable();
