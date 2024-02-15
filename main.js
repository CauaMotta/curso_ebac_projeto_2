const form = document.getElementsByTagName('form')[0];
const nome = document.getElementById('name');
const tel = document.getElementById('tel');
const btn = form.getElementsByTagName('button')[0];
const alert = document.getElementsByClassName('alert')[0];
const ul = document.getElementsByTagName('ul')[0];
const btnCancel = document.createElement('button');
const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
let id;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (btn.innerText == 'Cadastrar') {
        saveContact(nome.value, tel.value, generateId());
    } else if (btn.innerText == 'Editar') {
        editContact(nome.value, tel.value, id);
    }
    reset();
})

form.addEventListener('reset', () => {
    btn.innerText = 'Cadastrar';
    form.removeChild(btnCancel);
    id = null;
})

nome.addEventListener('keyup', () => {
    nameValidate();
})

nome.addEventListener('change', () => {
    nameValidate();
})

tel.addEventListener('keyup', () => {
    telValidate();
})

tel.addEventListener('change', () => {
    telValidate();
})

function saveContact(name, tel, id) {
    const contact = {
        id: id,
        name: name,
        tel: tel
    }
    contacts.push(contact)
    localStorage.setItem('contacts', JSON.stringify(contacts));
    addContact(contact);
}

function addContact(contact) {
    const li = document.createElement('li');
    li.innerHTML = `
                    <div>
                        <i class="fa-solid fa-user"></i>
                        <p>${contact.name}</p>
                    </div>
                    <div>
                        <i class="fa-solid fa-phone"></i>
                        <p>${contact.tel}</p>
                    </div>
                    `;

    const btnEdit = document.createElement('button');
    btnEdit.setAttribute('class', 'btnContacts');
    btnEdit.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    btnEdit.addEventListener('click', () => {
        btnCancel.innerHTML = `<i class="fa-solid fa-ban"></i>`;
        btnCancel.setAttribute('class', 'btnCancel');
        btnCancel.setAttribute('type', 'reset');
        btn.insertAdjacentElement('afterend', btnCancel);

        nome.value = contact.name;
        tel.value = contact.tel;
        id = contact.id;
        btn.innerText = 'Editar';
    });

    const btnDelet = document.createElement('button');
    btnDelet.setAttribute('class', 'btnContacts');
    btnDelet.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
    btnDelet.addEventListener('click', () => {
        deletContact(contact.id);
    });

    li.appendChild(btnEdit);
    li.appendChild(btnDelet);
    ul.appendChild(li);
}

function editContact(name, tel, id) {
    const contact = contacts.filter(contact => contact.id == id)[0];

    if (contact.name != name) {
        contact.name = name;
    }
    if (contact.tel != tel) {
        contact.tel = tel;
    }

    localStorage.setItem('contacts', JSON.stringify(contacts));
    reload();
    btn.innerText = "Cadastrar";
    form.removeChild(btnCancel);
}

function deletContact(id) {
    const contact = contacts.filter(contact => contact.id == id)[0];
    contacts.splice(contacts.indexOf(contact), 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    reload();
}

function nameValidate() {
    const contactName = nome.value.length >= 4 || nome.value.length == 0;

    if (!contactName) {
        alert.innerText = 'O nome precisa conter 4 ou mais caracteres.';
        alert.style.display = 'block';
        btn.disabled = 'true';
    } else {
        alert.style.display = 'none';
        btn.disabled = '';
    }
}

function telValidate() {
    const contactTel = tel.value.length == 15 || nome.value.length == 0;

    if (!contactTel) {
        alert.innerText = 'Telefone inválido, preencha seguindo o formato 99 9 99999999';
        alert.style.display = 'block';
        btn.disabled = 'true';
    } else {
        alert.style.display = 'none';
        btn.disabled = '';
    }
}

function reset() {
    nome.value = '';
    tel.value = '';
    id = null;
}

function generateId() {
    return parseInt(contacts.length * Math.random() * 100);
}

reload();
function reload() {
    const li = ul.getElementsByTagName('li');

    if (ul.children.length > 0) {
        while (ul.children.length > 0) {
            ul.removeChild(li[0]);
        }
    }

    contacts.forEach(contact => {
        addContact(contact);
    });
}