const userForm = document.getElementById("user-form");
const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
}

const today = new Date();

const minAge = 18;
const maxAge = 55;

const upperDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate()).toISOString().split('T')[0];
const lowerDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate()).toISOString().split('T')[0];

const dobInput = document.getElementById('dob');
dobInput.setAttribute('max', upperDate);
dobInput.setAttribute('min', lowerDate);

let userEntries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();

    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
        const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
        const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
        const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptTerms}</td>`
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const table = `<table class="table-auto w-full"><tr>
    <th class="px-4 py-2">Name</th>
    <th class="px-4 py-2">Email</th>
    <th class="px-4 py-2">Password</th>
    <th class="px-4 py-2">Dob</th>
    <th class="px-4 py-2">Accepted terms?</th>
    </tr>${tableEntries} </table>`;

    let details = document.getElementById("user-entries");
    details.innerHTML = table;
}
const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;

    const acceptTerms = document.getElementById("acceptTerms").checked;

    const entry = {
        name,
        email,
        password,
        dob,
        acceptTerms
    };

    userEntries.push(entry);

    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
}

userForm.addEventListener("submit", saveUserForm);
displayEntries();