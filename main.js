window.addEventListener('DOMContentLoaded', () => {

  // Пример заполнения карточки студента
  const students = [
    {
      name: 'Диана',
      surname: 'Матвеева',
      middlename: 'Александровна',
      birthday: new Date('1997-11-13'),
      yearStart: 2015,
      faculty: 'Электроэнергетика',
    },
    {
      name: 'Сергей',
      surname: 'Ломакин',
      middlename: 'Алексеев',
      birthday: new Date('1994-01-01'),
      yearStart: 2013,
      faculty: 'Ядерная физика',
    },
    {
      name: 'Степан',
      surname: 'Резнов',
      middlename: 'Егорович',
      birthday: new Date('1991-05-03'),
      yearStart: 2009,
      faculty: 'Строительство',
    },
    {
      name: 'Анастасия',
      surname: 'Гричишина',
      middlename: 'Константиновна',
      birthday: new Date('2000-02-09'),
      yearStart: 2018,
      faculty: 'Экономика',
    },
  ];

  // Тело таблицы
  const tableBody = document.querySelector('.table-body-js');

  // Данные из формы добавления студентов
  const addUserForm = document.querySelector('.add-user-form-js');
  const addUserName = document.querySelector('.add-user-name-js');
  const addUserSurName = document.querySelector('.add-user-surname-js');
  const addUserMiddleName = document.querySelector('.add-user-middlename-js');
  const addUserBirthday = document.querySelector('.add-user-birthday-js');
  const addUserStartLearn = document.querySelector('.add-user-start-learn-js');
  const addUserFaculty = document.querySelector('.add-user-faculty-js');
  const addUserBnt = document.querySelector('.add-user-btn-js');

  // Данные из заголовков таблицы
  const headerName = document.querySelector('.table-header-name-js');
  const headerFaculty = document.querySelector('.table-header-faculty-js');
  const headerBirthday = document.querySelector('.table-header-birthday-js');
  const headerDuration = document.querySelector('.table-header-duration-js');

  // Данные из формы фильтра
  const filterFaculty = document.querySelector('.filter-faculty-js');
  const filterFullName = document.querySelector('.filter-fullname-js');
  const filterStartLearn = document.querySelector('.filter-start-learn-js');
  const filterFinishLearn = document.querySelector('.filter-finish-learn-js');

  // Блок для вывода ошибок при невалидной дате
  const errorTooltip = document.createElement('div');

  // Установка максимального значения даты для datepicker
  const inputsDate = document.querySelectorAll('.max');
  inputsDate.forEach((item) => {
    item.max = new Date().toLocaleDateString('en-ca');
  });

  // Проверка текстовых полей на наличие только букв, дефисов и пробелов
  addUserForm.querySelectorAll('[data-validation="text"]')
    .forEach((item) => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^A-Za-zА-Яа-яЁё-\s]/, '');
      });
    });

  // Создание строки таблицы
  function createTableRow(className) {
    const tr = document.createElement('tr');
    tr.classList.add(className);
    return tr;
  }

  // Создание ячейки таблицы
  function createTableData(className) {
    const td = document.createElement('td');
    td.classList.add(className);
    return td;
  }

  // Форматирование имени
  function formatName(name) {
    return name.substr(0, 1).toUpperCase() + name.substr(1).toLowerCase();
  }

  // Создание экзампляра студента
  function addUser() {
    const user = {};
    user.name = formatName(addUserName.value).trim();
    user.surname = formatName(addUserSurName.value).trim();
    user.middlename = formatName(addUserMiddleName.value).trim();
    user.birthday = new Date(addUserBirthday.value);
    user.yearStart = parseInt(addUserStartLearn.value, 10);
    user.faculty = formatName(addUserFaculty.value).trim();

    students.push(user);
  }

  // Создание строки таблицы и вставка экземпляра студента
  function createItemOfTable(array) {
    // Очистка всех полей таблицы
    tableBody.innerHTML = '';

    array.forEach((item) => {
      const tableUser = createTableRow('table__user');
      const tableUserName = createTableData('table__user-name');
      const tableUserFaculty = createTableData('table__user-faculty');
      const tableUserBirthday = createTableData('table__user-birthday');
      const tableUserDuration = createTableData('table__user-duration');

      const fullName = `${item.surname} ${item.name} ${item.middlename}`;
      // eslint-disable-next-line max-len
      const age = Math.floor((new Date().getTime() - new Date(item.birthday)) / (24 * 3600 * 365.25 * 1000));
      const finish = new Date(`${item.yearStart + 4}-09-01`);
      let course = new Date().getFullYear() - item.yearStart;

      if (finish.getFullYear() < new Date().getFullYear()) {
        course = 'Закончил';
      }

      if (finish.getFullYear() === new Date().getFullYear() && new Date().getMonth() > 8) {
        course = 'Закончил';
      }

      tableUserName.innerHTML = fullName;
      tableUserFaculty.innerHTML = item.faculty;
      tableUserBirthday.innerHTML = item.birthday;
      tableUserBirthday.innerHTML = `${item.birthday.toLocaleDateString('en-ca')} (${age})`;
      tableUserDuration.innerHTML = `${item.yearStart} - ${finish.getFullYear()} (${course})`;

      tableUser.append(tableUserName);
      tableUser.append(tableUserFaculty);
      tableUser.append(tableUserBirthday);
      tableUser.append(tableUserDuration);

      tableBody.append(tableUser);
    });
  }

  createItemOfTable(students);

  addUserBnt.addEventListener('click', (e) => {
    e.preventDefault();

    if (addUserName.value === ''
        || addUserSurName.value === ''
        || addUserMiddleName.value === ''
        || addUserBirthday.value === ''
        || addUserStartLearn.value === ''
        || addUserFaculty.value === '') {
      // При первом клике красим все пустые поля в красный
      addUserForm.querySelectorAll('input')
        .forEach((item) => {
          if (item.value === '') {
            item.classList.add('input--warning');
            document.querySelector('.add-user__error-msg')
              .classList.add('add-user__error-msg--active');
          }

          // Далее, при наборе текста меняем цвет полей обратно, если поле не пустое
          item.addEventListener('input', () => {
            if (item.value === '') {
              item.classList.add('input--warning');
            } else {
              item.classList.remove('input--warning');
              document.querySelector('.add-user__error-msg')
                .classList.remove('add-user__error-msg--active');
            }
          });
        });

      // Проверка дат
    } else if (new Date(addUserBirthday.value) > new Date() || new Date(addUserBirthday.value) < new Date('1900-01-01')) {

      // Создание блока с текстом ошибки
      errorTooltip.classList.add('add-user__error-tooltip');
      errorTooltip.innerHTML = `
      Дата рождения должна быть в диапазоне от 1900-01-01 до ${new Date().toLocaleDateString('en-ca')}`;
      document.querySelector('[data-name="birthday"]').append(errorTooltip);
    } else if (new Date(addUserStartLearn.value) < new Date('2000-01-01') || new Date(addUserStartLearn.value) > new Date()) {
      errorTooltip.classList.add('add-user__error-tooltip');
      errorTooltip.innerHTML = `
      Дата начала обучения должна быть в диапазоне от 1900-01-01 до ${new Date().toLocaleDateString('en-ca')}`;
      document.querySelector('[data-name="start-learn"]').append(errorTooltip);
    } else {
      errorTooltip.remove();
      addUser();
      createItemOfTable(students);
      addUserForm.reset();
    }
  });

  // Сортировка

  // ФИО
  headerName.addEventListener('click', () => {
    if (headerName.dataset.sort === 'default' || headerName.dataset.sort === 'descending') {
      headerName.dataset.sort = 'ascending';
      createItemOfTable(students.sort((a, b) => {
        if (a.surname < b.surname) {
          return -1;
        }
        if (a.surname < b.surname) {
          return 1;
        }
        return 0;
      }));
    } else {
      headerName.dataset.sort = 'descending';
      createItemOfTable(students.sort((a, b) => {
        if (a.surname > b.surname) {
          return -1;
        }
        if (a.surname > b.surname) {
          return 1;
        }
        return 0;
      }));
    }
  });

  // Факультет
  headerFaculty.addEventListener('click', () => {
    if (headerFaculty.dataset.sort === 'default' || headerFaculty.dataset.sort === 'descending') {
      headerFaculty.dataset.sort = 'ascending';
      createItemOfTable(students.sort((a, b) => {
        if (a.faculty < b.faculty) {
          return -1;
        }
        if (a.faculty < b.faculty) {
          return 1;
        }
        return 0;
      }));
    } else {
      headerFaculty.dataset.sort = 'descending';
      createItemOfTable(students.sort((a, b) => {
        if (a.faculty > b.faculty) {
          return -1;
        }
        if (a.faculty > b.faculty) {
          return 1;
        }
        return 0;
      }));
    }
  });

  // Дата рождения
  headerBirthday.addEventListener('click', () => {
    if (headerBirthday.dataset.sort === 'default' || headerBirthday.dataset.sort === 'descending') {
      headerBirthday.dataset.sort = 'ascending';
      createItemOfTable(students.sort((a, b) => b.birthday - a.birthday));
    } else {
      headerBirthday.dataset.sort = 'descending';
      createItemOfTable(students.sort((a, b) => a.birthday - b.birthday));
    }
  });

  // Начало учёбы
  headerDuration.addEventListener('click', () => {
    if (headerDuration.dataset.sort === 'default' || headerDuration.dataset.sort === 'descending') {
      headerDuration.dataset.sort = 'ascending';
      createItemOfTable(students.sort((a, b) => b.yearStart - a.yearStart));
    } else {
      headerDuration.dataset.sort = 'descending';
      createItemOfTable(students.sort((a, b) => a.yearStart - b.yearStart));
    }
  });

  // Фильтры
  filterFaculty.addEventListener('input', () => {
    const temp = [];
    students.forEach((item) => {
      if (item.faculty.toLowerCase().includes(filterFaculty.value.toLowerCase())) {
        temp.push(item);
        createItemOfTable(temp);
      }
    });
  });

  filterFullName.addEventListener('input', () => {
    const temp = [];
    students.forEach((item) => {
      const fullName = `${item.surname}${item.name}${item.middlename}`;
      item.fullName = fullName;
      if (item.fullName.toLowerCase().includes(filterFullName.value.toLowerCase())) {
        temp.push(item);
        createItemOfTable(temp);
      }
    });
  });

  filterStartLearn.addEventListener('input', () => {
    const temp = [];
    students.forEach((item) => {
      if (item.yearStart.toString().includes(filterStartLearn.value)) {
        temp.push(item);
        createItemOfTable(temp);
      }
    });
  });

  filterFinishLearn.addEventListener('input', () => {
    const temp = [];
    students.forEach((item) => {
      const finishLearn = item.yearStart + 4;
      if (finishLearn.toString().includes(filterFinishLearn.value)) {
        temp.push(item);
        createItemOfTable(temp);
      }
    });
  });
});
