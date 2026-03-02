// Progressive color change on scroll
function initColorTransition() {
    // Color inicial (rojo) y final (azul navy)
    const startColor = { r: 173, g: 0, b: 0 }; // #ad0000
    const endColor = { r: 227, g: 114, b: 1 }; //rgb(227, 114, 1) (navy blue)
    
    let ticking = false;

    function lerp(start, end, progress) {
        return Math.round(start + (end - start) * progress);
    }

    function updateColor() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min(window.scrollY / scrollHeight, 1);
        
        const r = lerp(startColor.r, endColor.r, scrollProgress);
        const g = lerp(startColor.g, endColor.g, scrollProgress);
        const b = lerp(startColor.b, endColor.b, scrollProgress);
        
        const newColor = `rgb(${r}, ${g}, ${b})`;
        document.documentElement.style.setProperty('--color-primary', newColor);
        
        ticking = false;
    }

    function handleScroll() {
        if (!ticking) {
            window.requestAnimationFrame(updateColor);
            ticking = true;
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial update
    updateColor();
}

// Initialize on DOM ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initColorTransition);
    } else {
        initColorTransition();
    }
}

export { initColorTransition };
