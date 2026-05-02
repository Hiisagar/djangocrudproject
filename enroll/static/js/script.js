  let records = [
    { id: 1, name: 'Arjun Sharma', age: 28, phone: '+91 98765 43210' },
    { id: 2, name: 'Priya Verma', age: 34, phone: '+91 91234 56789' },
    { id: 3, name: 'Rahul Gupta', age: 22, phone: '+91 87654 32109' },
  ];
  let nextId = 4;
  let editingId = null;

  function renderTable() {
    const q = document.getElementById('searchInput').value.toLowerCase();
    const body = document.getElementById('tableBody');
    const filtered = records.filter(r =>
      r.name.toLowerCase().includes(q) || r.phone.toLowerCase().includes(q)
    );
    document.getElementById('countBadge').textContent = filtered.length + ' records';
    document.getElementById('totalCount').textContent = records.length;
    const ages = records.filter(r => r.age).map(r => r.age);
    document.getElementById('avgAge').textContent = ages.length ? Math.round(ages.reduce((a,b)=>a+b,0)/ages.length) : '—';
    if (!filtered.length) {
      body.innerHTML = '<tr><td colspan="5"><div class="empty">No contacts found</div></td></tr>';
      return;
    }
    body.innerHTML = filtered.map((r, i) => `
      <tr id="row-${r.id}">
        <td>${i + 1}</td>
        <td style="font-weight:500">${esc(r.name)}</td>
        <td>${r.age}</td>
        <td>${esc(r.phone)}</td>
        <td>
          <div class="actions">
            <button class="act-btn act-edit" onclick="editRecord(${r.id})">Edit</button>
            <button class="act-btn act-del" onclick="deleteRecord(${r.id})">Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  function esc(s) { const d=document.createElement('div');d.textContent=s;return d.innerHTML; }

  function submitForm() {
    const name = document.getElementById('fname').value.trim();
    const age = parseInt(document.getElementById('fage').value);
    const phone = document.getElementById('fphone').value.trim();
    if (!name || !age || !phone) { showToast('Please fill all fields'); return; }
    if (editingId !== null) {
      const rec = records.find(r => r.id === editingId);
      rec.name = name; rec.age = age; rec.phone = phone;
      showToast('Contact updated');
      resetForm();
    } else {
      records.push({ id: nextId++, name, age, phone });
      showToast('Contact added');
      resetForm();
    }
    renderTable();
  }

  function editRecord(id) {
    const rec = records.find(r => r.id === id);
    editingId = id;
    document.getElementById('fname').value = rec.name;
    document.getElementById('fage').value = rec.age;
    document.getElementById('fphone').value = rec.phone;
    document.getElementById('formTitle').textContent = 'Edit contact';
    document.getElementById('submitBtn').textContent = 'Update contact';
    document.getElementById('formCard').classList.add('edit-mode');
  }

  function deleteRecord(id) {
    records = records.filter(r => r.id !== id);
    if (editingId === id) resetForm();
    renderTable();
    showToast('Contact deleted');
  }

  function resetForm() {
    editingId = null;
    ['fname','fage','fphone'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('formTitle').textContent = 'Add new contact';
    document.getElementById('submitBtn').textContent = 'Add contact';
    document.getElementById('formCard').classList.remove('edit-mode');
  }

  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
  }

  renderTable();