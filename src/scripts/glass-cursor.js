// Glass Cursor Effect
function initGlassCursor() {
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        console.log('Glass cursor disabled: reduced motion preference');
        return;
    }

    // Only on desktop (min-width: 1024px)
    if (window.innerWidth < 1024) {
        console.log('Glass cursor disabled: screen width', window.innerWidth);
        return;
    }

    console.log('Glass cursor initializing...');

    // Create cursor elements
    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    cursorOutline.style.left = '50%';
    cursorOutline.style.top = '50%';
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorDot.style.left = '50%';
    cursorDot.style.top = '50%';

    document.body.appendChild(cursorOutline);
    document.body.appendChild(cursorDot);

    console.log('Cursor elements added:', { outline: cursorOutline, dot: cursorDot });

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;

    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Dot follows instantly (no offset needed, CSS handles centering)
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth animation loop for outline
    function animate() {
        const delay = 0.12;
        outlineX += (mouseX - outlineX) * delay;
        outlineY += (mouseY - outlineY) * delay;

        // Outline follows with delay (no offset needed, CSS handles centering)
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;

        requestAnimationFrame(animate);
    }

    animate();

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .tag, .accordion-header, .q-btn, input, textarea');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover');
            cursorDot.classList.add('hover');
        });

        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover');
            cursorDot.classList.remove('hover');
        });
    });

    // Hide default cursor
    document.body.style.cursor = 'none';
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
        el.style.cursor = 'none';
    });

    // Handle viewport leave/enter
    document.addEventListener('mouseleave', () => {
        cursorOutline.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursorOutline.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
}

// Initialize on DOM ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGlassCursor);
    } else {
        initGlassCursor();
    }
}

export { initGlassCursor };
