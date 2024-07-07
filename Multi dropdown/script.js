document.getElementById('platforms').addEventListener('click', function() {
  var content = document.querySelector('.dropdown-content');
  content.style.display = content.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', function(event) {
  var dropdown = document.querySelector('.dropdown');
  var content = document.querySelector('.dropdown-content');
  if (!dropdown.contains(event.target) && event.target.id !== 'platforms') {
    content.style.display = 'none';
  }
});

// Обробник подій для всіх стрілок
document.querySelectorAll('.arrow').forEach(arrow => {
  arrow.addEventListener('click', function() {
    var parentItem = this.parentNode;
    parentItem.classList.toggle('open');
    this.textContent = parentItem.classList.contains('open') ? '▼' : '►';

    // Перевірка для відкривання вкладених рівнів
    var nestedContent = parentItem.querySelector('.nested-content');
    if (nestedContent) {
      nestedContent.style.display = nestedContent.style.display === 'flex' ? 'none' : 'flex';
    }
  });
});

// Обробник подій для чекбоксів
document.querySelectorAll('.dropdown-item > input[type="checkbox"]').forEach(item => {
  item.addEventListener('change', function() {
    const nestedContent = this.parentNode.querySelector('.nested-content');
    if (nestedContent) {
      const checkboxes = nestedContent.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
      });
    }
    updateParentCheckboxes(this);
  });
});

function updateParentCheckboxes(checkbox) {
  let parentCheckbox = checkbox.closest('.nested-content')?.closest('.dropdown-item').querySelector('input[type="checkbox"]');
  while (parentCheckbox) {
    const nestedCheckboxes = parentCheckbox.closest('.dropdown-item').querySelectorAll('.nested-content input[type="checkbox"]');
    const allChecked = Array.from(nestedCheckboxes).every(cb => cb.checked);
    const someChecked = Array.from(nestedCheckboxes).some(cb => cb.checked);

    if (allChecked) {
      parentCheckbox.checked = true;
      parentCheckbox.indeterminate = false;
    } else if (someChecked) {
      parentCheckbox.checked = false;
      parentCheckbox.indeterminate = true;
    } else {
      parentCheckbox.checked = false;
      parentCheckbox.indeterminate = false;
    }

    parentCheckbox = parentCheckbox.closest('.nested-content')?.closest('.dropdown-item').querySelector('input[type="checkbox"]');
  }
}