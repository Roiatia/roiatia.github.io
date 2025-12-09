/**
 * Responsive Auto-Adjust Function
 * Automatically adjusts the layout based on screen resolution
 */

class ResponsiveManager {
    constructor() {
        this.screenSize = this.getScreenSize();
        this.init();
    }

    /**
     * Initialize the responsive manager
     */
    init() {
        // Listen for window resize events
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('orientationchange', () => this.handleOrientationChange());

        // Initial adjustment
        this.adjustLayout();
    }

    /**
     * Get current screen size category
     */
    getScreenSize() {
        const width = window.innerWidth;

        if (width < 480) return 'xs'; // Extra small
        if (width < 768) return 'sm'; // Small
        if (width < 1024) return 'md'; // Medium
        if (width < 1440) return 'lg'; // Large
        return 'xl'; // Extra large
    }

    /**
     * Handle window resize event
     */
    handleResize() {
        const newSize = this.getScreenSize();

        if (newSize !== this.screenSize) {
            this.screenSize = newSize;
            this.adjustLayout();
            console.log(`Screen size changed to: ${newSize}`);
        }
    }

    /**
     * Handle orientation change
     */
    handleOrientationChange() {
        console.log(`Orientation: ${window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'}`);
        this.adjustLayout();
    }

    /**
     * Main layout adjustment function
     */
    adjustLayout() {
        this.adjustNavigation();
        this.adjustGrids();
        this.adjustFontSizes();
        this.adjustSpacing();
        this.adjustImages();
    }

    /**
     * Adjust navigation for mobile
     */
    adjustNavigation() {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelectorAll('nav a');

        if (this.screenSize === 'xs' || this.screenSize === 'sm') {
            nav?.style.setProperty('gap', '0.5rem', 'important');
            navLinks.forEach(link => {
                link.style.fontSize = '0.85rem';
            });
        } else {
            nav?.style.removeProperty('gap');
            navLinks.forEach(link => {
                link.style.fontSize = '';
            });
        }
    }

    /**
     * Adjust grid layouts responsively
     */
    adjustGrids() {
        const skillsContainer = document.querySelector('#skills div[style*="display: grid"]');
        const projectsContainer = document.querySelector('#projects div[style*="display: grid"]');

        if (skillsContainer) {
            if (this.screenSize === 'xs' || this.screenSize === 'sm') {
                skillsContainer.style.setProperty('grid-template-columns', '1fr', 'important');
            } else if (this.screenSize === 'md') {
                skillsContainer.style.setProperty('grid-template-columns', 'repeat(2, 1fr)', 'important');
            } else {
                skillsContainer.style.setProperty('grid-template-columns', 'repeat(auto-fit, minmax(250px, 1fr))', 'important');
            }
        }

        if (projectsContainer) {
            if (this.screenSize === 'xs' || this.screenSize === 'sm') {
                projectsContainer.style.setProperty('grid-template-columns', '1fr', 'important');
            } else if (this.screenSize === 'md') {
                projectsContainer.style.setProperty('grid-template-columns', 'repeat(2, 1fr)', 'important');
            } else {
                projectsContainer.style.setProperty('grid-template-columns', 'repeat(auto-fit, minmax(300px, 1fr))', 'important');
            }
        }
    }

    /**
     * Adjust font sizes based on screen size
     */
    adjustFontSizes() {
        const headings = {
            h1: { xs: '1.8rem', sm: '2rem', md: '2.2rem', lg: '2.8rem', xl: '3rem' },
            h2: { xs: '1.4rem', sm: '1.5rem', md: '1.7rem', lg: '2rem', xl: '2rem' },
            h3: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem', lg: '1.5rem', xl: '1.5rem' }
        };

        Object.entries(headings).forEach(([tag, sizes]) => {
            document.querySelectorAll(tag).forEach(el => {
                el.style.fontSize = sizes[this.screenSize];
            });
        });
    }

    /**
     * Adjust padding and margins
     */
    adjustSpacing() {
        const container = document.querySelector('.container');
        const sections = document.querySelectorAll('section');

        const spacing = {
            xs: { containerPadding: '1rem', sectionMargin: '1.5rem' },
            sm: { containerPadding: '1.2rem', sectionMargin: '2rem' },
            md: { containerPadding: '1.5rem', sectionMargin: '2rem' },
            lg: { containerPadding: '2rem', sectionMargin: '3rem' },
            xl: { containerPadding: '2.5rem', sectionMargin: '3rem' }
        };

        const currentSpacing = spacing[this.screenSize];

        if (container) {
            container.style.padding = currentSpacing.containerPadding;
        }

        sections.forEach(section => {
            section.style.marginBottom = currentSpacing.sectionMargin;
        });
    }

    /**
     * Adjust images and media
     */
    adjustImages() {
        const images = document.querySelectorAll('img');

        images.forEach(img => {
            if (this.screenSize === 'xs' || this.screenSize === 'sm') {
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
            }
        });
    }

    /**
     * Get current screen info for debugging
     */
    getScreenInfo() {
        return {
            size: this.screenSize,
            width: window.innerWidth,
            height: window.innerHeight,
            orientation: window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
        };
    }
}

// Initialize responsive manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const responsiveManager = new ResponsiveManager();

    // Make it globally accessible for debugging
    window.responsiveManager = responsiveManager;

    console.log('Responsive Auto-Adjust loaded');
    console.log('Screen Info:', responsiveManager.getScreenInfo());
});


