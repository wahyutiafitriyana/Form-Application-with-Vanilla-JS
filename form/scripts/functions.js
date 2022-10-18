// Saved Students
const getSavedStudents = () => {
  const studentJson = localStorage.getItem('students');
  try {
    return studentJson !== null ? JSON.parse(studentJson) : [];
  } catch (error) {
    return [];
  }
};

// Save Students
const saveStudents = (students) => {
  localStorage.setItem('students', JSON.stringify(students));
};

// Sort
const sortStudents = (students, sortBy) => {
  if (sortBy === 'byEdited') {
    return students.sort((a, b) => {
      if (a.updated > b.updated) {
        return -1;
      } else if (a.updated < b.updated) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === 'byCreated') {
    return students.sort((a, b) => {
      if (a.created > b.created) {
        return -1;
      } else if (a.created < b.created) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return students;
  }
};

// Render Students
const renderStudents = (students, filters) => {
  ul.innerHTML = '';

  students = sortStudents(students, filters.sortBy);

  let filteredPrd = students.filter((item) =>
    item.title.toLowerCase().includes(filters.searchItem.toLowerCase())
  );

  if (document.querySelector('#existCheck').checked) {
    filteredPrd = filteredPrd.filter((item) => item.exist);
  }

  if (filteredPrd.length > 0) {
    filteredPrd.forEach((student) => {
      ul.appendChild(createStudentDOM(student));
    });
  } else {
    ul.append('There is no any exist student!')
  }

  saveStudents(students);
};

// Remove Student
const removeStudent = (id) => {
  const prdIndex = students.findIndex((item) => item.id === id);
  prdIndex > -1 && students.splice(prdIndex, 1);
};

// Toggle Existing
const toggleStudent = (id) => {
  students.forEach((item) => item.id === id && (item.exist = !item.exist));
};

// Create HTML Elements
const createStudentDOM = (student) => {
  const studentEl = document.createElement('li');
  const checkbox = document.createElement('input');
  const studentItem = document.createElement('a');
  const emailItem = document.createElement('b');
  const removeBtn = document.createElement('button');
  const phoneText = document.createElement('b');

  // card
  studentEl.setAttribute(
    'class',
    'bg-white rounded overflow-hidden shadow-lg w-full student-card'
  );
  studentEl.setAttribute('style', 'margin-bottom: 1rem; padding: 2rem');

  // exist status
  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = student.exist;
  checkbox.addEventListener('change', () => {
    toggleStudent(student.id);
    saveStudents(students);
    renderStudents(students, filters);
  });
  studentEl.appendChild(checkbox);

  // student
  studentItem.textContent = student.title;
  studentItem.href = `./edit-student.html#${student.id}`;
  studentEl.appendChild(studentItem);

  // email
  emailItem.textContent = student.email;
  emailItem.href = `./edit-student.html#${student.id}`;
  studentEl.appendChild(emailItem);

  // price
  phoneText.textContent = 'Phone: ' + (student.phone == 0 ? 'Free' : student.phone);
  studentEl.appendChild(phoneText);

  // remove btn
  removeBtn.textContent = 'Remove';
  removeBtn.setAttribute(
    'class',
    'bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full'
  );
  studentEl.appendChild(removeBtn);
  removeBtn.addEventListener('click', () => {
    removeStudent(student.id);
    saveStudents(students);
    renderStudents(students, filters);
  });

  return studentEl;
};

// Last Update Date
const lastUpdateDate = (timestamp) => {
  return `Last Update at ${moment(timestamp).fromNow()}`;
};
