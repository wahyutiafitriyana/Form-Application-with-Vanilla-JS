let students = getSavedStudents();

const filters = {
  searchItem: '',
  existStudents: false,
  sortBy: 'byEdited',
};

const ul = document.createElement('ul');
document.querySelector('.container').appendChild(ul);

// Show Exist Students
document.querySelector('#existCheck').addEventListener('change', (e) => {
  filters.existStudents = e.target.checked;
  renderStudents(students, filters);
});

// Add Student
document.querySelector('#addStudent').addEventListener('submit', (e) => {
  e.preventDefault();
  const timestamp = moment().valueOf();

  if (e.target.elements.addStudentName.value && e.target.elements.addStudentEmail.value && e.target.elements.addStudentPhone.value) {
    if (!isNaN(e.target.elements.addStudentPhone.value)) {
      students.push({
        id: uuidv4(),
        title: e.target.elements.addStudentName.value,
        email: e.target.elements.addStudentEmail.value,
        phone: e.target.elements.addStudentPhone.value,
        exist: true,
        created: timestamp,
        updated: timestamp,
      });

      e.target.elements.addStudentName.value = '';
      e.target.elements.addStudentEmail.value = '';
      e.target.elements.addStudentPhone.value = '';

      renderStudents(students, filters);
    } else {
      alert('Please enter a valid price');
    }
  } else {
    alert("Please enter title and price")
  }
});

// Search Student
document.querySelector('#searchText').addEventListener('input', (e) => {
  filters.searchItem = e.target.value;
  renderStudents(students, filters);
});

renderStudents(students, filters);

// Live Change
window.addEventListener('storage', (e) => {
  if (e.key === 'students') {
    students = JSON.parse(e.newValue);

    renderStudents(students, filters);
  }
});

// Sort Select
document.querySelector('#sort').addEventListener('change', (e) => {
  filters.sortBy = e.target.value;
  renderStudents(students, filters);
});
