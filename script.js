const subjectsDiv = document.getElementById('subjects');
const initialSubjects = 3;

function createSubjectRow(index) {
    const row = document.createElement('div');
    row.className = 'row subject-row align-items-center';
    row.innerHTML = `
        <div class="col-12 col-md-3 mb-2 mb-md-0">
            <label class="subject-label">Subject ${index}</label>
        </div>
        <div class="col-5 col-md-3">
            <input type="number" class="form-control units" placeholder="Units" min="1" step="1" required>
        </div>
        <div class="col-5 col-md-3">
            <input type="number" class="form-control grade" placeholder="Grade" min="1" max="5" step="0.01" required>
        </div>
        <div class="col-2 col-md-2 d-flex justify-content-end">
            <button type="button" class="delete-btn" title="Delete Subject" tabindex="-1">&times;</button>
        </div>
    `;
    row.querySelector('.delete-btn').addEventListener('click', function() {
        row.remove();
        updateLabels();
    });
    return row;
}

function updateLabels() {
    const rows = subjectsDiv.querySelectorAll('.subject-row');
    rows.forEach((row, idx) => {
        const label = row.querySelector('.subject-label');
        if (label) label.textContent = `Subject ${idx + 1}`;
    });
}

function addSubjectRow() {
    const row = createSubjectRow(subjectsDiv.children.length + 1);
    subjectsDiv.appendChild(row);
}

subjectsDiv.innerHTML = '';
for (let i = 1; i <= initialSubjects; i++) {
    subjectsDiv.appendChild(createSubjectRow(i));
}

document.getElementById('addSubject').addEventListener('click', function() {
    addSubjectRow();
});

document.getElementById('gwaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const grades = document.querySelectorAll('.grade');
    const units = document.querySelectorAll('.units');
    let totalWeighted = 0;
    let totalUnits = 0;
    let valid = true;
    for (let i = 0; i < grades.length; i++) {
        const grade = parseFloat(grades[i].value);
        const unit = parseFloat(units[i].value);
        if (isNaN(grade) || isNaN(unit) || grade < 1 || grade > 5 || unit < 1) {
            valid = false;
            break;
        }
        totalWeighted += grade * unit;
        totalUnits += unit;
    }
    let resultDiv = document.getElementById('result');
    if (!valid || totalUnits === 0) {
        resultDiv.textContent = 'Please enter valid numeric grades (1.00-5.00) and units (1 or more).';
        resultDiv.className = 'alert alert-danger mt-2 rounded-3';
        resultDiv.classList.remove('d-none');
        return;
    }
    const gwa = totalWeighted / totalUnits;
    resultDiv.textContent = `Your GWA is: ${gwa.toFixed(2)}`;
    resultDiv.className = 'alert alert-success mt-2 rounded-3';
    resultDiv.classList.remove('d-none');
});