document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('.sidebar-nav li a');
    const contentSections = document.querySelectorAll('.content-display .content-section');
    const homeLink = document.querySelector('.main-nav a[href="#home"]'); // Link to Home in header

    // Function to switch sections
    function showSection(sectionId) {
        // Hide all sections
        contentSections.forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('active-section');
        });

        // Show the target section
        const targetSection = document.getElementById(sectionId + '-content');
        if (targetSection) {
            targetSection.classList.remove('hidden');
            targetSection.classList.add('active-section');
        } else {
            // Fallback to home if section not found (e.g., for Avatar Shop link in header)
             const homeSection = document.getElementById('home-content');
             if(homeSection) {
                homeSection.classList.remove('hidden');
                homeSection.classList.add('active-section');
             }
        }

        // Update active link in sidebar
        sidebarLinks.forEach(link => {
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        });

         // Deactivate header links (optional, depends on desired behavior)
         document.querySelectorAll('.main-nav .nav-item').forEach(link => link.classList.remove('active'));
         // Activate header home link if home is selected
         if(sectionId === 'home' || !targetSection) {
             if(homeLink) homeLink.classList.add('active');
         }


    }

    // Add click listeners to sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor jump
            const sectionId = link.getAttribute('data-section');
            if (sectionId) {
                showSection(sectionId);
                 // Update URL hash (optional)
                // window.location.hash = sectionId;
            }
        });
    });

     // Add click listeners to header links (Basic: Assume they mostly map to sidebar sections or home)
     document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                const sectionId = href.substring(1); // Remove #
                 // Simple mapping: 'games' header link shows 'games-content', etc.
                 // Default to 'home' if no direct match in sidebar/content structure yet
                 const sidebarMatch = document.querySelector(`.sidebar-nav a[data-section="${sectionId}"]`);
                 if (sidebarMatch) {
                    showSection(sectionId);
                 } else if (sectionId === 'home') {
                     showSection('home');
                 } else if (sectionId === 'avatar-shop') {
                    showSection('avatar-shop'); // Show avatar shop section
                 }
                 // Add more specific handling for 'Create' etc. if needed
            }
        });
    });


    // Show the initial section (Home) and set active link
    const initialSection = 'home'; // Start with home
    showSection(initialSection);
     // Find the corresponding sidebar link for home (if one existed, which it doesn't in the concept)
     // Instead, just ensure the top Home nav is active
     if(homeLink) homeLink.classList.add('active');
     // If you had a 'Home' item in the sidebar, you'd activate it here:
     // document.querySelector('.sidebar-nav a[data-section="home"]')?.classList.add('active-link');

});
