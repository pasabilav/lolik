// ─── Свайп між картками ───
(function() {
    const track = document.getElementById('cardsTrack');
    if (!track) return;

    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;
    let startTranslate = 0;
    let currentTranslate = 0;

    const scenes = track.querySelectorAll('.scene, .scene-next');
    const cardWidth = scenes[0].offsetWidth + 12; // width + gap
    const maxIndex = scenes.length - 1;

    function goTo(index) {
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        currentTranslate = -currentIndex * cardWidth;
        track.style.transition = 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        track.style.transform = `translateX(${currentTranslate}px)`;

        dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
    }

    // Touch
    track.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        startTranslate = currentTranslate;
        isDragging = true;
        track.style.transition = 'none';
    }, { passive: true });

    track.addEventListener('touchmove', e => {
        if (!isDragging) return;
        const diff = e.touches[0].clientX - startX;
        track.style.transform = `translateX(${startTranslate + diff}px)`;
    }, { passive: true });

    track.addEventListener('touchend', e => {
        if (!isDragging) return;
        isDragging = false;
        const diff = e.changedTouches[0].clientX - startX;
        if (diff < -50) goTo(currentIndex + 1);
        else if (diff > 50) goTo(currentIndex - 1);
        else goTo(currentIndex);
    });

    // Mouse (для десктопу/тестування)
    track.addEventListener('mousedown', e => {
        startX = e.clientX;
        startTranslate = currentTranslate;
        isDragging = true;
        track.style.transition = 'none';
        track.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', e => {
        if (!isDragging) return;
        const diff = e.clientX - startX;
        track.style.transform = `translateX(${startTranslate + diff}px)`;
    });

    window.addEventListener('mouseup', e => {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = '';
        const diff = e.clientX - startX;
        if (diff < -50) goTo(currentIndex + 1);
        else if (diff > 50) goTo(currentIndex - 1);
        else goTo(currentIndex);
    });
})();