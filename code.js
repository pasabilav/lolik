document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('mainCard');
    const menuBtn = document.getElementById('menuBtn');

    // Переворот карточки по клику
    card.addEventListener('click', function(e) {
        // Если кликнули по кнопке "...", не переворачиваем карту
        if (e.target.closest('#menuBtn')) {
            return;
        }
        this.classList.toggle('is-flipped');
    });

    // Обработка кнопки меню
    menuBtn.addEventListener('click', (e) => {
        // В будущем здесь можно открыть модальное окно или выпадающий список
        alert('Функция меню будет добавлена позже');
    });
});