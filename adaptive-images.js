// Adaptive Images Handler
function initAdaptiveImages() {
    // Configuration for each image container
    const imageConfigs = {
        'minds-aligned-images': {
            images: [
                "images_minds_aligned/minds_aligned_1.png",
                "images_minds_aligned/minds_aligned_2.png",
                "images_minds_aligned/minds_aligned_3.png",
                "images_minds_aligned/minds_aligned_4.png",
                "images_minds_aligned/minds_aligned_5.png",
                "images_minds_aligned/minds_aligned_6.png"
            ]
        },
        'akshata-images': {
            images: [
                "images_akshata/akshata_1.png",
                "images_akshata/akshata_2.png",
                "images_akshata/akshata_3.png",
                "images_akshata/akshata_4.png",
                "images_akshata/akshata_5.png"
            ]
        },
        'vital-hope-images': {
            images: [
                "images_vital_hope/vital_hope_1.png",
                "images_vital_hope/vital_hope_2.png",
                "images_vital_hope/vital_hope_3.png",
                "images_vital_hope/vital_hope_4.png",
                "images_vital_hope/vital_hope_5.png"
            ]
        },
        'nus-images': {
            images: [
                "images_nus/nus_grip_1.png",
                "images_nus/nus_grip_2.png",
                "images_nus/nus_grip_3.png"
            ]
        },
        'evren-images': {
            images: [
                "images_evren/evren_1.png",
                "images_evren/evren_2.png"
            ]
        }
    };

    // Process each image container
    Object.keys(imageConfigs).forEach(containerId => {
        const container = document.getElementById(containerId);
        if (!container) return; // Skip if container not found
        
        const config = imageConfigs[containerId];
        const images = config.images;
        
        // Create the initial image element if it doesn't exist
        if (!container.querySelector('img')) {
            const img = document.createElement('img');
            img.alt = "Project Image";
            img.classList.add('active-image');
            container.appendChild(img);
        }
        
        // Get or create the navigation container
        let nav = document.getElementById(`${containerId}-nav`);
        if (!nav) {
            nav = document.createElement('div');
            nav.id = `${containerId}-nav`;
            nav.classList.add('image-nav');
            container.after(nav);
        } else {
            nav.innerHTML = ''; // Clear existing dots
        }
        
        // Create navigation dots
        images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('image-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showImage(containerId, index));
            nav.appendChild(dot);
        });
        
        // Add navigation buttons
        const prevButton = document.createElement('button');
        prevButton.classList.add('image-nav-btn', 'prev-btn');
        prevButton.innerHTML = '&larr;';
        prevButton.addEventListener('click', () => {
            const currentIndex = getCurrentImageIndex(containerId);
            const newIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(containerId, newIndex);
        });
        
        const nextButton = document.createElement('button');
        nextButton.classList.add('image-nav-btn', 'next-btn');
        nextButton.innerHTML = '&rarr;';
        nextButton.addEventListener('click', () => {
            const currentIndex = getCurrentImageIndex(containerId);
            const newIndex = (currentIndex + 1) % images.length;
            showImage(containerId, newIndex);
        });
        
        container.appendChild(prevButton);
        container.appendChild(nextButton);
        
        // Set up initial image
        showImage(containerId, 0);
        
        // Set up auto-rotation
        let autoRotate = setInterval(() => {
            const currentIndex = getCurrentImageIndex(containerId);
            const newIndex = (currentIndex + 1) % images.length;
            showImage(containerId, newIndex);
        }, 5000);
        
        // Pause auto-rotation on hover
        container.addEventListener('mouseenter', () => {
            clearInterval(autoRotate);
        });
        
        // Resume auto-rotation when mouse leaves
        container.addEventListener('mouseleave', () => {
            autoRotate = setInterval(() => {
                const currentIndex = getCurrentImageIndex(containerId);
                const newIndex = (currentIndex + 1) % images.length;
                showImage(containerId, newIndex);
            }, 5000);
        });
    });
}

function getCurrentImageIndex(containerId) {
    const nav = document.getElementById(`${containerId}-nav`);
    if (!nav) return 0;
    
    const activeDot = nav.querySelector('.image-dot.active');
    if (!activeDot) return 0;
    
    const dots = Array.from(nav.querySelectorAll('.image-dot'));
    return dots.indexOf(activeDot);
}

function showImage(containerId, index) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const img = container.querySelector('img');
    if (!img) return;
    
    const imageConfigs = {
        'minds-aligned-images': {
            images: [
                "images_minds_aligned/minds_aligned_1.png",
                "images_minds_aligned/minds_aligned_2.png",
                "images_minds_aligned/minds_aligned_3.png",
                "images_minds_aligned/minds_aligned_4.png",
                "images_minds_aligned/minds_aligned_5.png",
                "images_minds_aligned/minds_aligned_6.png"
            ]
        },
        'akshata-images': {
            images: [
                "images_akshata/akshata_1.png",
                "images_akshata/akshata_2.png",
                "images_akshata/akshata_3.png",
                "images_akshata/akshata_4.png",
                "images_akshata/akshata_5.png"
            ]
        },
        'vital-hope-images': {
            images: [
                "images_vital_hope/vital_hope_1.png",
                "images_vital_hope/vital_hope_2.png",
                "images_vital_hope/vital_hope_3.png",
                "images_vital_hope/vital_hope_4.png",
                "images_vital_hope/vital_hope_5.png"
            ]
        },
        'nus-images': {
            images: [
                "images_nus/nus_grip_1.png",
                "images_nus/nus_grip_2.png",
                "images_nus/nus_grip_3.png"
            ]
        },
        'evren-images': {
            images: [
                "images_evren/evren_1.png",
                "images_evren/evren_2.png"
            ]
        }
    };
    
    const config = imageConfigs[containerId];
    const images = config.images;
    
    // Update image source
    img.src = images[index];
    
    // Preload the next image for smoother transitions
    const nextIndex = (index + 1) % images.length;
    const preloadImage = new Image();
    preloadImage.src = images[nextIndex];
    
    // Update active dot
    const nav = document.getElementById(`${containerId}-nav`);
    if (nav) {
        const dots = nav.querySelectorAll('.image-dot');
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

// Initialize adaptive images when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAdaptiveImages();
});
