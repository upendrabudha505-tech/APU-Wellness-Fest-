/**
 * APU WELLNESS FEST 2026 - Master JavaScript
 * Academic Demonstration Project | Pure Vanilla JavaScript
 * Features: All 22 Required Client-Side Interactive Workflows
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Theme Management (Dark / Light Mode)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const storedTheme = localStorage.getItem('apu_wellness_theme') || 'light';
  
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
      }
    }
  }

  applyTheme(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('apu_wellness_theme', newTheme);
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    });
  }

  // --------------------------------------------------------------------------
  // 2. Mobile Navigation & Sticky Header
  // --------------------------------------------------------------------------
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const siteHeader = document.querySelector('.site-header');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      const isOpen = mainNav.classList.contains('open');
      menuToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside or on a nav link
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !menuToggle.contains(e.target) && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (siteHeader) {
      if (window.scrollY > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }
  });

  // --------------------------------------------------------------------------
  // 3. Active Navigation Link Highlighting
  // --------------------------------------------------------------------------
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // --------------------------------------------------------------------------
  // 4. Scroll To Top Button
  // --------------------------------------------------------------------------
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --------------------------------------------------------------------------
  // 5. Toast Notifications
  // --------------------------------------------------------------------------
  window.showToast = function(message, type = 'success') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'info' ? 'toast-info' : ''}`;
    
    let icon = '<i class="fa-solid fa-circle-check" style="color: var(--primary);"></i>';
    if (type === 'error') {
      icon = '<i class="fa-solid fa-circle-exclamation" style="color: #ef4444;"></i>';
    } else if (type === 'info') {
      icon = '<i class="fa-solid fa-circle-info" style="color: var(--secondary);"></i>';
    }

    toast.innerHTML = `
      ${icon}
      <div style="flex-grow: 1; font-size: 0.9rem; font-weight: 500;">${message}</div>
      <button style="background: none; border: none; cursor: pointer; color: var(--text-subtle); padding: 0.2rem;" aria-label="Close">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    const closeBtn = toast.querySelector('button');
    closeBtn.addEventListener('click', () => toast.remove());

    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }
    }, 4500);
  };

  // --------------------------------------------------------------------------
  // 6. Countdown Timer (Target: Nov 20, 2026 08:30:00)
  // --------------------------------------------------------------------------
  const daysEl = document.getElementById('countdownDays');
  const hoursEl = document.getElementById('countdownHours');
  const minutesEl = document.getElementById('countdownMinutes');
  const secondsEl = document.getElementById('countdownSeconds');

  if (daysEl && hoursEl && minutesEl && secondsEl) {
    const targetDate = new Date('2026-11-20T08:30:00+08:00').getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minutesEl.textContent = String(minutes).padStart(2, '0');
      secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // --------------------------------------------------------------------------
  // 7. Schedule Tabs & Category Filtering
  // --------------------------------------------------------------------------
  const scheduleCards = document.querySelectorAll('.schedule-card');
  const dateTabBtns = document.querySelectorAll('.date-tabs .tab-btn');
  const filterBtns = document.querySelectorAll('.filter-bar .filter-btn');

  let activeDay = 'day-1';
  let activeCategory = 'all';

  function filterSchedule() {
    scheduleCards.forEach(card => {
      const cardDay = card.getAttribute('data-day');
      const cardCategory = card.getAttribute('data-category');

      const matchesDay = (cardDay === activeDay);
      const matchesCategory = (activeCategory === 'all' || cardCategory === activeCategory);

      if (matchesDay && matchesCategory) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (dateTabBtns.length > 0) {
    dateTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        dateTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeDay = btn.getAttribute('data-day');
        filterSchedule();
      });
    });
  }

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-category');
        filterSchedule();
      });
    });
    // Run initial filter
    filterSchedule();
  }

  // --------------------------------------------------------------------------
  // 8. Download Schedule (Text/CSV Generator)
  // --------------------------------------------------------------------------
  const downloadScheduleBtn = document.getElementById('downloadScheduleBtn');
  if (downloadScheduleBtn) {
    downloadScheduleBtn.addEventListener('click', () => {
      const scheduleData = [
        ['Day', 'Time', 'Event / Activity', 'Category', 'Location', 'Presenter / Host'],
        ['Day 1 (20 Nov)', '08:30 AM', 'Opening Ceremony & Keynote Address', 'Community', 'APU Atrium', 'Event Committee & Student Council'],
        ['Day 1 (20 Nov)', '09:30 AM', 'Campus Fitness Challenge Kickoff', 'Fitness', 'Sports Arena', 'APU Sports Club'],
        ['Day 1 (20 Nov)', '11:00 AM', 'Practical Student Nutrition Workshop', 'Nutrition', 'Auditorium 2', 'Ms. Michelle Chang, Clinical Nutritionist'],
        ['Day 1 (20 Nov)', '01:00 PM', 'Vegan & Sustainable Food Exhibition', 'Nutrition', 'Central Courtyard', 'Campus Green Culinary Team'],
        ['Day 1 (20 Nov)', '03:00 PM', 'Outdoor Hatha Yoga Session', 'Yoga', 'East Green Lawn', 'Master Arjun Dev'],
        ['Day 1 (20 Nov)', '04:30 PM', 'Mental Health Awareness Talk', 'Mental Health', 'Lecture Hall 1', 'Student Wellbeing Department'],
        ['Day 1 (20 Nov)', '06:00 PM', 'Sunset Guided Meditation & Sound Healing', 'Yoga', 'East Green Lawn', 'Mindful Campus Initiative'],
        ['Day 2 (21 Nov)', '09:00 AM', '5K Campus Wellness Walk & Run', 'Fitness', 'Campus Boundary Track', 'Running Club'],
        ['Day 2 (21 Nov)', '11:00 AM', 'Overcoming Academic Burnout Seminar', 'Mental Health', 'Auditorium 1', 'Dr. Kenneth Wong, Psychologist'],
        ['Day 2 (21 Nov)', '01:30 PM', 'Healthy Student Cooking Challenge', 'Nutrition', 'Culinary Lab 3', 'Chef Nadira Azman'],
        ['Day 2 (21 Nov)', '03:30 PM', 'Vinyasa Flow & Breathwork Class', 'Yoga', 'Wellness Pavilion', 'Coach Sofia Lee'],
        ['Day 2 (21 Nov)', '05:00 PM', 'Wellness Trivia & Interactive Quiz', 'Community', 'Student Hub', 'Peer Mentors'],
        ['Day 3 (22 Nov)', '09:00 AM', 'Annual Voluntary Blood Donation Drive', 'Community', 'MPH Hall A', 'National Blood Centre & APU Red Crescent'],
        ['Day 3 (22 Nov)', '11:30 AM', 'Mindfulness & Exam Stress Mastery', 'Mental Health', 'Auditorium 3', 'Counseling Services Team'],
        ['Day 3 (22 Nov)', '02:00 PM', 'Calisthenics & Strength Exhibition', 'Fitness', 'Sports Complex', 'Fitness Ambassadors'],
        ['Day 3 (22 Nov)', '04:30 PM', 'Closing Awards & Celebration Ceremony', 'Community', 'Main Atrium', 'Organizing Committee']
      ];

      let csvContent = 'data:text/csv;charset=utf-8,';
      scheduleData.forEach(row => {
        csvContent += row.map(val => `"${val}"`).join(',') + '\r\n';
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'APU_Wellness_Fest_2026_Schedule.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast('Schedule downloaded successfully! (APU_Wellness_Fest_2026_Schedule.csv)', 'success');
    });
  }

  // --------------------------------------------------------------------------
  // 9. FAQ Accordion Functionality
  // --------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Optional: close other accordions for clean single-view accordion
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherAns = otherItem.querySelector('.faq-answer');
            if (otherAns) otherAns.style.maxHeight = null;
          }
        });

        if (isActive) {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 10. Gallery Filtering & Lightbox
  // --------------------------------------------------------------------------
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentGalleryIndex = 0;
  let visibleGalleryItems = [];

  function updateVisibleGallery() {
    visibleGalleryItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
  }

  if (galleryFilterBtns.length > 0) {
    galleryFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        galleryFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
        updateVisibleGallery();
      });
    });
    updateVisibleGallery();
  }

  if (lightbox && galleryItems.length > 0) {
    function openLightbox(index) {
      updateVisibleGallery();
      if (visibleGalleryItems.length === 0) return;
      currentGalleryIndex = index;
      const item = visibleGalleryItems[currentGalleryIndex];
      const img = item.querySelector('img');
      const caption = item.getAttribute('data-caption') || img.getAttribute('alt') || 'APU Wellness Fest 2026';

      lightboxImg.src = img.src;
      lightboxCaption.textContent = caption;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    function showNextImage() {
      if (visibleGalleryItems.length === 0) return;
      currentGalleryIndex = (currentGalleryIndex + 1) % visibleGalleryItems.length;
      openLightbox(currentGalleryIndex);
    }

    function showPrevImage() {
      if (visibleGalleryItems.length === 0) return;
      currentGalleryIndex = (currentGalleryIndex - 1 + visibleGalleryItems.length) % visibleGalleryItems.length;
      openLightbox(currentGalleryIndex);
    }

    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        updateVisibleGallery();
        const itemIdx = visibleGalleryItems.indexOf(item);
        if (itemIdx !== -1) {
          openLightbox(itemIdx);
        }
      });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Add keyboard hint badge to lightbox
    if (!lightbox.querySelector('.lightbox-key-hints')) {
      const keyHints = document.createElement('div');
      keyHints.className = 'lightbox-key-hints';
      keyHints.innerHTML = '<span><kbd>⌫ Backspace</kbd> / <kbd>←</kbd> Prev</span> · <span><kbd>→</kbd> Next</span> · <span><kbd>Esc</kbd> Close</span>';
      lightbox.appendChild(keyHints);
    }

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        showNextImage();
      } else if (e.key === 'ArrowLeft') {
        showPrevImage();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        if (e.shiftKey) {
          closeLightbox();
        } else {
          showPrevImage();
          showToast('Previous photo (⌫ Backspace)', 'info');
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 11. Activity Detail Modal
  // --------------------------------------------------------------------------
  const activityModal = document.getElementById('activityModal');
  const activityModalTitle = document.getElementById('activityModalTitle');
  const activityModalContent = document.getElementById('activityModalContent');
  const activityModalClose = document.getElementById('activityModalClose');
  const activityModalRegisterBtn = document.getElementById('activityModalRegisterBtn');

  const activityDataMap = {
    'fitness-challenge': {
      title: 'Campus Fitness Challenge',
      category: 'Fitness & Athletics',
      time: 'Day 1 & Day 2 (09:30 AM - 12:30 PM)',
      location: 'APU Sports Arena & Outdoor Track',
      eligibility: 'Open to all APU undergraduate and postgraduate students with a valid Student ID.',
      rules: 'Teams of 4 or individual heats. Competitors must wear appropriate athletic shoes and sportswear. Points awarded for agility ladder, team plank challenge, medicine ball relays, and timed obstacle course.',
      description: 'Test your strength, stamina, and teamwork in this high-energy athletic competition! Designed for all fitness levels with modified scaling options. Medals and wellness gift hampers will be awarded to top podium finishers.',
      gear: 'Athletic attire, running shoes, personal sweat towel, and hydration flask.'
    },
    'yoga-meditation': {
      title: 'Outdoor Yoga & Meditation Retreat',
      category: 'Mindfulness & Flexibility',
      time: 'Day 1 (03:00 PM) & Day 2 (03:30 PM)',
      location: 'East Green Lawn & Wellness Pavilion',
      eligibility: 'All students and university staff welcome. Zero prior yoga experience necessary.',
      rules: 'Please arrive 10 minutes before the session to settle your mat. Respect silence during guided meditation and sound healing portions. Electronic devices must remain in silent mode.',
      description: 'Immerse your body and mind in refreshing outdoor Vinyasa flows and calming guided meditation led by certified yoga masters. Unwind academic tension, enhance posture, and leave feeling revitalized.',
      gear: 'Complimentary yoga mats provided on first-come basis, or bring your own. Comfortable stretchable clothing recommended.'
    },
    'wellness-walk': {
      title: '5K Campus Wellness Walk & Run',
      category: 'Cardio & Community',
      time: 'Day 2 (09:00 AM - 10:30 AM)',
      location: 'Flag-off: APU Campus Main Atrium',
      eligibility: 'All registered festival participants and university community members.',
      rules: 'Follow designated safety marshals and paved course signs. Self-paced: participants may walk, jog, or run. Water stations provided at every 1.5K mark.',
      description: 'A non-competitive scenic 5K walk and run around the lush campus perimeters to champion daily movement and social connection. Commemorative finisher badges awarded to all participants.',
      gear: 'Comfortable walking or running shoes, campus pass, sun visor or cap.'
    },
    'cooking-challenge': {
      title: 'Healthy Cooking Challenge',
      category: 'Culinary & Nutrition',
      time: 'Day 2 (01:30 PM - 03:30 PM)',
      location: 'Culinary Demonstration Lab 3',
      eligibility: 'Student pairs (2 members per team). Limited to 12 teams due to workstation capacities.',
      rules: 'Participants are provided with a mystery basket of seasonal vegetables, legumes, whole grains, and spices. 45-minute cooking window followed by plating and 3-minute presentation to nutritionist judges.',
      description: 'Showcase your creativity crafting nutritious, student-budget-friendly meals! Dishes will be judged on balance, flavor, presentation, and practicality for dorm living.',
      gear: 'Aprons and cooking equipment provided on-site. Hairnets and closed-toe kitchen shoes mandatory.'
    },
    'vegan-food-expo': {
      title: 'Vegan & Plant-Based Food Exhibition',
      category: 'Sustainable Living',
      time: 'Day 1 (01:00 PM - 04:00 PM)',
      location: 'Central Courtyard & Food Hub',
      eligibility: 'Open walk-in for all festival attendees.',
      rules: 'Free tasting samples available with your festival wristband or QR pass. Please dispose of compostable utensils in designated green recycling bins.',
      description: 'Discover the delicious variety and environmental benefits of plant-forward dining. Meet student chefs, sample wholesome smoothies and plant-protein dishes, and receive recipe booklets.',
      gear: 'Bring your own reusable tumbler or bowl for extra wellness points!'
    },
    'mindfulness-workshop': {
      title: 'Mindfulness & Stress Management Seminar',
      category: 'Mental Wellness',
      time: 'Day 2 (11:00 AM) & Day 3 (11:30 AM)',
      location: 'Auditorium 1 & Counseling Lounge',
      eligibility: 'Open to all students seeking practical stress-relief strategies.',
      rules: 'A safe, inclusive space for open dialogue. Confidentiality and mutual respect maintained across all discussions.',
      description: 'Led by licensed clinical psychologists and student wellbeing advisors, this interactive workshop delivers evidence-based cognitive strategies, breathing techniques, and time management habits to conquer academic overwhelm.',
      gear: 'A notebook and pen will be provided for guided reflection exercises.'
    },
    'mental-health-talk': {
      title: 'Mental Health Awareness: Student Voices',
      category: 'Community & Dialogue',
      time: 'Day 1 (04:30 PM - 05:45 PM)',
      location: 'Lecture Hall 1',
      eligibility: 'All students, peer counselors, and faculty.',
      rules: 'Live Q&A will feature anonymous question submission via Slido for student comfort.',
      description: 'Break the stigma surrounding mental health on campus. Hear inspiring student stories, expert mental wellness insights, and discover APU on-campus mental health support resources.',
      gear: 'Open mind and supportive attitude.'
    },
    'wellness-quiz': {
      title: 'Campus Wellness & Nutrition Quiz',
      category: 'Interactive Trivia',
      time: 'Day 2 (05:00 PM - 06:00 PM)',
      location: 'Student Hub & Online App',
      eligibility: 'Solo participants or teams of up to 3.',
      rules: 'Fastest finger digital buzzer round using your smartphone. 30 questions covering general health, sports history, mental wellbeing, and nutrition facts.',
      description: 'A fun, fast-paced trivia competition celebrating health literacy. Win wellness vouchers, sports club memberships, and smart water bottles!',
      gear: 'Charged smartphone or tablet with web browser.'
    },
    'blood-donation': {
      title: 'National Voluntary Blood Donation Drive',
      category: 'Community Health',
      time: 'Day 3 (09:00 AM - 04:00 PM)',
      location: 'Multi-Purpose Hall A',
      eligibility: 'Healthy individuals aged 18+, weighing >= 45kg, with adequate sleep (>=5 hrs).',
      rules: 'Identity card or Student ID required. Pre-screening consultation and hemoglobin check conducted on site by medical doctors.',
      description: 'Give the gift of life. In partnership with the National Blood Centre and APU Red Crescent Society, this voluntary drive supports local blood banks and community emergency care.',
      gear: 'Ensure you have had a nutritious meal and drank plenty of water before donating.'
    },
    'stress-management': {
      title: 'Exam Stress Mastery & Sound Bath',
      category: 'Relaxation & Recovery',
      time: 'Day 3 (01:00 PM - 02:30 PM)',
      location: 'Wellness Pavilion',
      eligibility: 'All students preparing for assignments and upcoming semester finals.',
      rules: 'Shoes removed before entering the carpeted sound bath area. Gentle lying postures.',
      description: 'Soothe the nervous system with Himalayan singing bowls, gentle binaural sound waves, and deep progressive muscle relaxation techniques tailored for student recovery.',
      gear: 'Warm comfortable hoodie or light blanket recommended.'
    }
  };

  const activityDetailBtns = document.querySelectorAll('.view-activity-btn');
  if (activityDetailBtns.length > 0 && activityModal) {
    activityDetailBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const activityKey = btn.getAttribute('data-activity');
        const data = activityDataMap[activityKey];

        if (data) {
          activityModalTitle.textContent = data.title;
          activityModalContent.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
              <button type="button" class="modal-back-btn" id="activityModalBackBtn" title="Close and return (Backspace or Esc)">
                <i class="fa-solid fa-arrow-left"></i> Back <kbd class="kbd-subtle">⌫ Backspace</kbd>
              </button>
              <span style="font-size: 0.75rem; color: var(--text-subtle);">Close option: <kbd class="kbd-subtle">Esc</kbd> / <kbd class="kbd-subtle">⌫</kbd></span>
            </div>
            <div style="margin-bottom: 1.25rem;">
              <span style="display: inline-block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--primary); background: var(--primary-light); padding: 0.25rem 0.65rem; border-radius: 4px; margin-bottom: 0.75rem;">${data.category}</span>
              <p style="font-size: 1rem; color: var(--text-main); margin-bottom: 1.25rem; line-height: 1.6;">${data.description}</p>
            </div>
            
            <div style="background: var(--bg-body); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.9rem;">
              <div><strong><i class="fa-regular fa-clock" style="color: var(--primary); width: 20px;"></i> Schedule:</strong> ${data.time}</div>
              <div><strong><i class="fa-solid fa-location-dot" style="color: var(--primary); width: 20px;"></i> Venue:</strong> ${data.location}</div>
              <div><strong><i class="fa-solid fa-user-check" style="color: var(--primary); width: 20px;"></i> Eligibility:</strong> ${data.eligibility}</div>
              <div><strong><i class="fa-solid fa-shirt" style="color: var(--primary); width: 20px;"></i> Gear & Attire:</strong> ${data.gear}</div>
            </div>

            <div style="margin-bottom: 1.5rem;">
              <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-main);">Rules & Participation Guidelines:</h4>
              <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">${data.rules}</p>
            </div>
          `;

          const backBtn = activityModalContent.querySelector('#activityModalBackBtn');
          if (backBtn) {
            backBtn.addEventListener('click', () => {
              activityModal.classList.remove('open');
              document.body.style.overflow = '';
            });
          }

          if (activityModalRegisterBtn) {
            activityModalRegisterBtn.href = `registration.html?activity=${encodeURIComponent(data.title)}`;
          }

          activityModal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    function closeActivityModal() {
      if (activityModal.classList.contains('open')) {
        activityModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    }

    if (activityModalClose) {
      activityModalClose.addEventListener('click', closeActivityModal);
    }

    activityModal.addEventListener('click', (e) => {
      if (e.target === activityModal) {
        closeActivityModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!activityModal.classList.contains('open')) return;
      if (e.key === 'Escape' || e.key === 'Backspace') {
        const activeTag = document.activeElement ? document.activeElement.tagName : '';
        if (activeTag !== 'INPUT' && activeTag !== 'TEXTAREA') {
          e.preventDefault();
          closeActivityModal();
          showToast('Closed details (⌫ Backspace)', 'info');
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 12. News Read More Modal
  // --------------------------------------------------------------------------
  const newsModal = document.getElementById('newsModal');
  const newsModalTitle = document.getElementById('newsModalTitle');
  const newsModalContent = document.getElementById('newsModalContent');
  const newsModalClose = document.getElementById('newsModalClose');

  const newsDataMap = {
    'news-1': {
      title: 'Registration Opens for APU Wellness Fest 2026',
      date: '15 October 2026',
      category: 'Festival Announcement',
      content: `
        <p>We are thrilled to officially open participant registration for the highly anticipated <strong>APU Wellness Fest 2026</strong>, happening from 20 to 22 November across APU Campus grounds!</p>
        <br>
        <p>This year’s edition embraces our flagship theme: <em>“Move Better. Live Healthier. Feel Stronger.”</em> The 3-day festival unites fitness challenges, yoga immersions, nutrition cooking battles, mental health mindfulness circles, and voluntary community drives into one unforgettable campus experience.</p>
        <br>
        <p>All registered students receive a personalized <strong>Digital Event Pass</strong>, access to complimentary wellness workshops, hydration refreshments, and entry into daily wellness challenge prize draws.</p>
        <br>
        <p><em>Note: This is an academic demonstration project created for educational web development purposes.</em></p>
      `
    },
    'news-2': {
      title: '5 Simple Ways Students Can Manage Academic Stress',
      date: '02 October 2026',
      category: 'Student Wellbeing',
      content: `
        <p>Midterms and project deadlines often push students to compromise on sleep, nutrition, and mental peace. Here are 5 practical, science-backed strategies to safeguard your wellbeing:</p>
        <br>
        <ul style="list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
          <li><strong>The 45/15 Study Cadence:</strong> Protect your cognitive energy by taking intentional 15-minute screen-free breaks after every 45 minutes of focused study.</li>
          <li><strong>Mindful Hydration:</strong> Even mild 1.5% dehydration significantly impairs concentration and elevates cortisol levels. Keep a refillable water flask at your desk.</li>
          <li><strong>Box Breathing Technique:</strong> Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, and hold for 4 seconds. Repeat 4 times before entering exams.</li>
          <li><strong>Campus Nature Strolls:</strong> A brisk 15-minute walk around the APU courtyard greenery resets neural fatigue and boosts working memory.</li>
          <li><strong>Talk to Student Wellbeing Advisors:</strong> Reaching out is a sign of strength. APU’s counseling and peer support networks are confidential and always accessible.</li>
        </ul>
      `
    },
    'news-3': {
      title: 'Student Volunteer Applications Now Open',
      date: '28 September 2026',
      category: 'Volunteering',
      content: `
        <p>Want to develop leadership experience, gain recognized co-curricular points, and make friends across faculties? Join our enthusiastic crew of 20+ student volunteers at APU Wellness Fest 2026!</p>
        <br>
        <p>Volunteer roles include:</p>
        <ul style="list-style: disc; margin-left: 1.5rem; line-height: 1.8;">
          <li><strong>Activity Marshals:</strong> Assist judges and manage participant timing in fitness obstacle courses.</li>
          <li><strong>Hospitality & Check-In:</strong> Welcome attendees, issue festival wristbands, and guide guest speakers.</li>
          <li><strong>Media & Content Ambassadors:</strong> Capture dynamic photography, backstage reels, and student interviews.</li>
          <li><strong>Wellness Eco Champions:</strong> Ensure clean recycling sorting and zero single-use plastics across event venues.</li>
        </ul>
        <br>
        <p>All volunteers receive official certificates of appreciation, exclusive festival volunteer tees, and catered nutritious lunches.</p>
      `
    },
    'news-4': {
      title: 'New Outdoor Sunset Yoga Workshop Added to Day 2',
      date: '22 September 2026',
      category: 'Schedule Update',
      content: `
        <p>Due to high student interest, the organizing committee has expanded the Day 2 schedule with an additional <strong>Sunset Flow & Sound Healing Immersion</strong> on Saturday at 05:30 PM on the East Green Lawn!</p>
        <br>
        <p>The session will feature certified sound therapy practitioners utilizing Tibetan singing bowls paired with slow, restorative yoga stretches to promote deep relaxation before Sunday’s community activities.</p>
        <br>
        <p>Spots are limited to 60 students to maintain comfortable spacing. Reserve your spot early via the Activities registration portal!</p>
      `
    }
  };

  const newsReadMoreBtns = document.querySelectorAll('.news-read-more-btn');
  if (newsReadMoreBtns.length > 0 && newsModal) {
    newsReadMoreBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const newsKey = btn.getAttribute('data-news');
        const data = newsDataMap[newsKey];

        if (data) {
          newsModalTitle.textContent = data.title;
          newsModalContent.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
              <button type="button" class="modal-back-btn" id="newsModalBackBtn" title="Close article (Backspace or Esc)">
                <i class="fa-solid fa-arrow-left"></i> Back <kbd class="kbd-subtle">⌫ Backspace</kbd>
              </button>
              <span style="font-size: 0.75rem; color: var(--text-subtle);">Close option: <kbd class="kbd-subtle">Esc</kbd> / <kbd class="kbd-subtle">⌫</kbd></span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-subtle); margin-bottom: 1.25rem;">
              <span>${data.date}</span> · <span style="color: var(--primary); font-weight: 700;">${data.category}</span>
            </div>
            <div style="font-size: 0.95rem; color: var(--text-main); line-height: 1.7;">
              ${data.content}
            </div>
          `;

          const backBtn = newsModalContent.querySelector('#newsModalBackBtn');
          if (backBtn) {
            backBtn.addEventListener('click', () => {
              newsModal.classList.remove('open');
              document.body.style.overflow = '';
            });
          }

          newsModal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    function closeNewsModal() {
      if (newsModal.classList.contains('open')) {
        newsModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    }

    if (newsModalClose) {
      newsModalClose.addEventListener('click', closeNewsModal);
    }

    newsModal.addEventListener('click', (e) => {
      if (e.target === newsModal) {
        closeNewsModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!newsModal.classList.contains('open')) return;
      if (e.key === 'Escape' || e.key === 'Backspace') {
        const activeTag = document.activeElement ? document.activeElement.tagName : '';
        if (activeTag !== 'INPUT' && activeTag !== 'TEXTAREA') {
          e.preventDefault();
          closeNewsModal();
          showToast('Closed article (⌫ Backspace)', 'info');
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 13. Registration Form Handling (Validation & LocalStorage)
  // --------------------------------------------------------------------------
  const regForm = document.getElementById('registrationForm');
  const regSuccessBanner = document.getElementById('regSuccessBanner');
  const generatedRegId = document.getElementById('generatedRegId');
  const clearFormBtn = document.getElementById('clearFormBtn');

  // Pre-fill activity if URL parameter exists
  const urlParams = new URLSearchParams(window.location.search);
  const prefillActivity = urlParams.get('activity');
  const activitySelect = document.getElementById('regActivity');
  if (activitySelect && prefillActivity) {
    for (let i = 0; i < activitySelect.options.length; i++) {
      if (activitySelect.options[i].text.toLowerCase().includes(prefillActivity.toLowerCase())) {
        activitySelect.selectedIndex = i;
        break;
      }
    }
  }

  if (regForm) {
    function validateInput(input, condition, errorMsg) {
      const parent = input.closest('.form-group') || input.parentElement;
      let errEl = parent.querySelector('.error-message');
      if (!errEl) {
        errEl = document.createElement('div');
        errEl.className = 'error-message';
        parent.appendChild(errEl);
      }

      if (!condition) {
        input.classList.add('is-invalid');
        errEl.textContent = errorMsg;
        errEl.style.display = 'block';
        return false;
      } else {
        input.classList.remove('is-invalid');
        errEl.style.display = 'none';
        return true;
      }
    }

    regForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('regFullName');
      const studentId = document.getElementById('regStudentId');
      const email = document.getElementById('regEmail');
      const phone = document.getElementById('regPhone');
      const faculty = document.getElementById('regFaculty');
      const year = document.getElementById('regYear');
      const activity = document.getElementById('regActivity');
      const dietary = document.getElementById('regDietary');
      const emergencyContact = document.getElementById('regEmergencyContact');
      const agreement = document.getElementById('regAgreement');

      let isValid = true;

      // Validate Full Name
      if (!validateInput(fullName, fullName.value.trim().length >= 3, 'Please enter your full name (minimum 3 characters)')) isValid = false;

      // Validate Student ID
      if (!validateInput(studentId, studentId.value.trim().length >= 4, 'Please enter a valid Student ID (e.g., TP012345)')) isValid = false;

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!validateInput(email, emailRegex.test(email.value.trim()), 'Please enter a valid email address')) isValid = false;

      // Validate Phone
      const phoneRegex = /^[\d\s+\-()]{7,16}$/;
      if (!validateInput(phone, phoneRegex.test(phone.value.trim()), 'Please enter a valid phone number')) isValid = false;

      // Validate Faculty
      if (!validateInput(faculty, faculty.value !== '', 'Please select your Faculty or School')) isValid = false;

      // Validate Year
      if (!validateInput(year, year.value !== '', 'Please select your Year of Study')) isValid = false;

      // Validate Activity
      if (!validateInput(activity, activity.value !== '', 'Please select an activity to register for')) isValid = false;

      // Validate Emergency Contact
      if (!validateInput(emergencyContact, emergencyContact.value.trim().length >= 5, 'Please provide an emergency contact name and phone number')) isValid = false;

      // Validate Agreement Checkbox
      const agreementGroup = agreement.closest('.checkbox-group') || agreement.parentElement;
      let agreeErr = agreementGroup.querySelector('.error-message');
      if (!agreeErr) {
        agreeErr = document.createElement('div');
        agreeErr.className = 'error-message';
        agreementGroup.appendChild(agreeErr);
      }
      if (!agreement.checked) {
        agreeErr.textContent = 'You must accept the participant terms and code of conduct.';
        agreeErr.style.display = 'block';
        isValid = false;
      } else {
        agreeErr.style.display = 'none';
      }

      if (!isValid) {
        showToast('Please correct the highlighted form errors.', 'error');
        return;
      }

      // Generate Registration ID (e.g. APU-WF-2026-1045)
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const regId = `APU-WF-2026-${randomSuffix}`;

      // Save registration to localStorage
      const registrationRecord = {
        id: regId,
        fullName: fullName.value.trim(),
        studentId: studentId.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        faculty: faculty.value,
        year: year.value,
        activity: activity.value,
        dietary: dietary ? dietary.value : 'Standard',
        emergencyContact: emergencyContact.value.trim(),
        registeredAt: new Date().toISOString()
      };

      const existingRegistrations = JSON.parse(localStorage.getItem('apu_wellness_registrations') || '[]');
      existingRegistrations.push(registrationRecord);
      localStorage.setItem('apu_wellness_registrations', JSON.stringify(existingRegistrations));

      // Also update demo user pass data so the dashboard reflects this latest registration
      localStorage.setItem('apu_latest_registration', JSON.stringify(registrationRecord));

      // Show success state
      if (generatedRegId) generatedRegId.textContent = regId;
      if (regSuccessBanner) {
        regSuccessBanner.style.display = 'block';
        regSuccessBanner.scrollIntoView({ behavior: 'smooth' });
      }
      regForm.style.display = 'none';

      showToast(`Registration Successful! Registration ID: ${regId}`, 'success');
    });

    if (clearFormBtn) {
      clearFormBtn.addEventListener('click', () => {
        regForm.reset();
        const invalidInputs = regForm.querySelectorAll('.is-invalid');
        invalidInputs.forEach(i => i.classList.remove('is-invalid'));
        const errMessages = regForm.querySelectorAll('.error-message');
        errMessages.forEach(e => e.style.display = 'none');
        showToast('Form cleared.', 'info');
      });
    }
  }

  // --------------------------------------------------------------------------
  // 14. Demo Authentication & Login
  // --------------------------------------------------------------------------
  const loginForm = document.getElementById('loginForm');
  const autofillDemoBtn = document.getElementById('autofillDemoBtn');

  if (autofillDemoBtn) {
    autofillDemoBtn.addEventListener('click', () => {
      const emailField = document.getElementById('loginEmail');
      const passField = document.getElementById('loginPassword');
      if (emailField) emailField.value = 'student@apu-demo.com';
      if (passField) passField.value = 'wellness2026';
      showToast('Demo student credentials autofilled!', 'info');
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const pass = document.getElementById('loginPassword').value.trim();
      const loginError = document.getElementById('loginError');

      if (email === 'student@apu-demo.com' && pass === 'wellness2026') {
        const demoUser = {
          name: 'Alex Tan',
          email: 'student@apu-demo.com',
          studentId: 'TP054321',
          faculty: 'School of Computing & Technology',
          passId: 'APU-WF-2026-1045',
          isLoggedIn: true
        };
        localStorage.setItem('apu_wellness_user', JSON.stringify(demoUser));
        showToast('Login successful! Redirecting to dashboard...', 'success');
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1000);
      } else {
        if (loginError) {
          loginError.style.display = 'block';
          loginError.textContent = 'Invalid credentials. Please use student@apu-demo.com and password: wellness2026';
        }
        showToast('Invalid demo login credentials.', 'error');
      }
    });
  }

  // Header Dashboard & Profile session status indicator
  try {
    const activeSession = JSON.parse(localStorage.getItem('apu_wellness_user') || 'null');
    if (activeSession && activeSession.name) {
      const navDashBtn = document.getElementById('navDashboardBtn');
      if (navDashBtn && !navDashBtn.querySelector('.btn-badge-dot')) {
        const dot = document.createElement('span');
        dot.className = 'btn-badge-dot';
        dot.title = `Active Session: ${activeSession.name}`;
        navDashBtn.appendChild(dot);
      }
      const navLoginBtn = document.getElementById('navLoginBtn');
      if (navLoginBtn) {
        navLoginBtn.title = `${activeSession.name} (Active Session)`;
        navLoginBtn.setAttribute('data-tooltip', activeSession.name.split(' ')[0]);
      }
    }
  } catch (err) {
    console.error('Session check error', err);
  }

  // --------------------------------------------------------------------------
  // 15. Dashboard Rendering & User Session
  // --------------------------------------------------------------------------
  const dashboardRoot = document.getElementById('dashboardRoot');
  if (dashboardRoot) {
    const userSession = JSON.parse(localStorage.getItem('apu_wellness_user') || 'null');
    const latestReg = JSON.parse(localStorage.getItem('apu_latest_registration') || 'null');

    // If no user is logged in, auto-seed the demo user so visitors can explore effortlessly
    let activeUser = userSession;
    if (!activeUser) {
      activeUser = {
        name: latestReg ? latestReg.fullName : 'Alex Tan',
        email: latestReg ? latestReg.email : 'student@apu-demo.com',
        studentId: latestReg ? latestReg.studentId : 'TP054321',
        faculty: latestReg ? latestReg.faculty : 'School of Computing & Technology',
        passId: latestReg ? latestReg.id : 'APU-WF-2026-1045',
        isLoggedIn: true
      };
      localStorage.setItem('apu_wellness_user', JSON.stringify(activeUser));
    }

    // Populate user details in dashboard
    const userNameElements = document.querySelectorAll('.dash-user-name');
    userNameElements.forEach(el => el.textContent = activeUser.name);

    const userPassIdElements = document.querySelectorAll('.dash-pass-id');
    userPassIdElements.forEach(el => el.textContent = activeUser.passId);

    const userStudentIdElements = document.querySelectorAll('.dash-student-id');
    userStudentIdElements.forEach(el => el.textContent = activeUser.studentId);

    const userFacultyElements = document.querySelectorAll('.dash-user-faculty');
    userFacultyElements.forEach(el => el.textContent = activeUser.faculty);

    // Logout button handler
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('apu_wellness_user');
        showToast('You have been logged out.', 'info');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 800);
      });
    }

    // Render registered activities from localStorage
    const registeredActivitiesList = document.getElementById('registeredActivitiesList');
    if (registeredActivitiesList) {
      const allRegs = JSON.parse(localStorage.getItem('apu_wellness_registrations') || '[]');
      const defaultActivities = [
        { title: 'Campus Fitness Challenge', time: 'Day 1 · 09:30 AM', venue: 'Sports Arena', status: 'Confirmed' },
        { title: 'Outdoor Hatha Yoga Session', time: 'Day 1 · 03:00 PM', venue: 'East Green Lawn', status: 'Confirmed' },
        { title: 'Overcoming Academic Burnout', time: 'Day 2 · 11:00 AM', venue: 'Auditorium 1', status: 'Confirmed' }
      ];

      // Merge dynamic registrations if any
      allRegs.forEach(reg => {
        defaultActivities.unshift({
          title: reg.activity,
          time: 'Day 1–3 Festival Pass',
          venue: 'APU Event Venue',
          status: 'Confirmed'
        });
      });

      registeredActivitiesList.innerHTML = defaultActivities.map(act => `
        <div style="background: var(--bg-body); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 0.75rem;">
          <div>
            <div style="font-weight: 700; color: var(--text-main); font-size: 0.95rem;">${act.title}</div>
            <div style="font-size: 0.8rem; color: var(--text-subtle);">${act.time} · ${act.venue}</div>
          </div>
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--primary); background: var(--primary-light); padding: 0.25rem 0.65rem; border-radius: 9999px;">${act.status}</span>
        </div>
      `).join('');
    }
  }

  // --------------------------------------------------------------------------
  // 16. Star Rating System (Feedback Page)
  // --------------------------------------------------------------------------
  const starRatingWidget = document.getElementById('starRatingWidget');
  const ratingValueInput = document.getElementById('feedbackRatingValue');

  if (starRatingWidget && ratingValueInput) {
    const stars = starRatingWidget.querySelectorAll('i');

    stars.forEach((star, index) => {
      star.addEventListener('mouseenter', () => {
        stars.forEach((s, i) => {
          if (i <= index) s.classList.add('hovered');
          else s.classList.remove('hovered');
        });
      });

      starRatingWidget.addEventListener('mouseleave', () => {
        stars.forEach(s => s.classList.remove('hovered'));
      });

      star.addEventListener('click', () => {
        const rating = index + 1;
        ratingValueInput.value = rating;
        stars.forEach((s, i) => {
          if (i < rating) s.classList.add('active');
          else s.classList.remove('active');
        });
        showToast(`Rated ${rating} out of 5 stars!`, 'info');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 17. Feedback Form Validation & Submission
  // --------------------------------------------------------------------------
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackSuccessBanner = document.getElementById('feedbackSuccessBanner');

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const ratingVal = document.getElementById('feedbackRatingValue').value;
      const favoriteActivity = document.getElementById('feedbackFavoriteActivity').value;
      const enjoyedText = document.getElementById('feedbackEnjoyed').value.trim();
      const improvementText = document.getElementById('feedbackImprovement').value.trim();
      const attendAgain = document.querySelector('input[name="attendAgain"]:checked');

      if (!ratingVal || ratingVal === '0') {
        showToast('Please select a star rating.', 'error');
        return;
      }

      if (!favoriteActivity) {
        showToast('Please select your favorite activity.', 'error');
        return;
      }

      if (enjoyedText.length < 5) {
        showToast('Please share what you enjoyed (minimum 5 characters).', 'error');
        return;
      }

      const feedbackData = {
        rating: ratingVal,
        favoriteActivity,
        enjoyed: enjoyedText,
        improvements: improvementText,
        attendAgain: attendAgain ? attendAgain.value : 'Yes',
        submittedAt: new Date().toISOString()
      };

      const existingFeedback = JSON.parse(localStorage.getItem('apu_wellness_feedback') || '[]');
      existingFeedback.push(feedbackData);
      localStorage.setItem('apu_wellness_feedback', JSON.stringify(existingFeedback));

      feedbackForm.style.display = 'none';
      if (feedbackSuccessBanner) {
        feedbackSuccessBanner.style.display = 'block';
        feedbackSuccessBanner.scrollIntoView({ behavior: 'smooth' });
      }

      showToast('Thank you! Your feedback has been submitted successfully.', 'success');
    });
  }

  // --------------------------------------------------------------------------
  // 18. Contact Form Validation
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const contactSuccessBanner = document.getElementById('contactSuccessBanner');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName');
      const email = document.getElementById('contactEmail');
      const subject = document.getElementById('contactSubject');
      const message = document.getElementById('contactMessage');

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (name.value.trim().length < 2) {
        showToast('Please enter your name.', 'error');
        return;
      }
      if (!emailRegex.test(email.value.trim())) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }
      if (subject.value.trim().length < 3) {
        showToast('Please enter a subject.', 'error');
        return;
      }
      if (message.value.trim().length < 10) {
        showToast('Please enter a message with at least 10 characters.', 'error');
        return;
      }

      // Front-end simulation (no backend)
      contactForm.reset();
      if (contactSuccessBanner) {
        contactSuccessBanner.style.display = 'block';
        contactSuccessBanner.scrollIntoView({ behavior: 'smooth' });
      }

      showToast('Your message has been submitted successfully! We will get back to you shortly.', 'success');
    });
  }

  // --------------------------------------------------------------------------
  // 19. Search Functionality & Overlay
  // --------------------------------------------------------------------------
  const searchToggleBtn = document.getElementById('searchToggleBtn');
  const searchModal = document.getElementById('searchModal');
  const searchInput = document.getElementById('searchInput');
  const searchCloseBtn = document.getElementById('searchCloseBtn');
  const searchResults = document.getElementById('searchResults');

  // Search index repository
  const searchIndex = [
    { title: 'Campus Fitness Challenge', category: 'Activities', desc: 'Obstacle courses, team relays, and strength competitions.', url: 'activities.html' },
    { title: 'Outdoor Hatha Yoga & Meditation', category: 'Activities', desc: 'Morning and sunset yoga on the campus green lawn.', url: 'activities.html' },
    { title: '5K Campus Wellness Walk', category: 'Activities', desc: 'Scenic morning walk and run around university grounds.', url: 'activities.html' },
    { title: 'Healthy Student Cooking Challenge', category: 'Activities', desc: 'Dorm-friendly nutrition and masterchef-style contest.', url: 'activities.html' },
    { title: 'Vegan & Sustainable Food Exhibition', category: 'Activities', desc: 'Plant-based street food, tastings, and recipes.', url: 'activities.html' },
    { title: 'Mindfulness & Stress Management Seminar', category: 'Activities', desc: 'Clinical psychologists guide exam anxiety relief.', url: 'activities.html' },
    { title: 'National Voluntary Blood Donation Drive', category: 'Activities', desc: 'Save lives with the National Blood Centre & Red Crescent.', url: 'activities.html' },
    { title: 'Opening Ceremony & Keynote Address', category: 'Schedule', desc: 'Day 1 at 08:30 AM in the APU Atrium.', url: 'schedule.html' },
    { title: 'Practical Nutrition Workshop', category: 'Schedule', desc: 'Day 1 at 11:00 AM with clinical nutritionists.', url: 'schedule.html' },
    { title: 'Sound Healing & Meditation Session', category: 'Schedule', desc: 'Day 1 at 06:00 PM and Day 2 sunset.', url: 'schedule.html' },
    { title: 'Participant Guide & Code of Conduct', category: 'Resources', desc: 'Downloadable PDF handbook with festival guidelines.', url: 'resources.html' },
    { title: 'Event Schedule (Full 3-Day Itinerary)', category: 'Resources', desc: 'Printable CSV/Text overview of all 15+ activities.', url: 'resources.html' },
    { title: 'Mental Health Emergency & Support Guide', category: 'Resources', desc: 'Campus counselor contacts and relaxation tips.', url: 'resources.html' },
    { title: 'Is the event free to attend?', category: 'FAQ', desc: 'Yes, APU Wellness Fest is 100% free for all students.', url: 'faq.html' },
    { title: 'Can I participate in multiple activities?', category: 'FAQ', desc: 'Yes! You can register for as many activities as schedule allows.', url: 'faq.html' },
    { title: 'Will certificates of participation be provided?', category: 'FAQ', desc: 'Digital certificates are issued to confirmed attendees.', url: 'faq.html' },
    { title: 'Registration Opens for Wellness Fest 2026', category: 'News', desc: 'Announcement for official festival registration kickoff.', url: 'news.html' },
    { title: '5 Simple Ways Students Can Manage Academic Stress', category: 'News', desc: 'Practical evidence-based tips for university students.', url: 'news.html' }
  ];

  if (searchToggleBtn && searchModal && searchInput) {
    searchToggleBtn.addEventListener('click', () => {
      searchModal.classList.add('open');
      searchInput.value = '';
      renderSearchResults('');
      setTimeout(() => searchInput.focus(), 100);
      document.body.style.overflow = 'hidden';
    });

    // Inject keyboard shortcut badge if not present
    const searchHeader = searchModal.querySelector('.search-input-header');
    if (searchHeader && !searchHeader.querySelector('.search-key-badge')) {
      const badge = document.createElement('span');
      badge.className = 'search-key-badge';
      badge.innerHTML = '<kbd>⌫ Backspace</kbd> or <kbd>Esc</kbd> to exit';
      if (searchCloseBtn) {
        searchHeader.insertBefore(badge, searchCloseBtn);
      } else {
        searchHeader.appendChild(badge);
      }
    }

    function closeSearchModal() {
      if (searchModal.classList.contains('open')) {
        searchModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    }

    if (searchCloseBtn) {
      searchCloseBtn.addEventListener('click', closeSearchModal);
    }

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        closeSearchModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!searchModal.classList.contains('open')) return;
      if (e.key === 'Escape') {
        closeSearchModal();
      } else if (e.key === 'Backspace' && searchInput.value === '') {
        e.preventDefault();
        closeSearchModal();
        showToast('Exited search (⌫ Backspace)', 'info');
      }
    });

    searchInput.addEventListener('input', (e) => {
      renderSearchResults(e.target.value.trim().toLowerCase());
    });

    function renderSearchResults(query) {
      if (!searchResults) return;

      if (!query) {
        searchResults.innerHTML = `
          <div style="text-align: center; padding: 2rem; color: var(--text-subtle); font-size: 0.9rem;">
            <i class="fa-solid fa-magnifying-glass" style="font-size: 1.75rem; margin-bottom: 0.75rem; opacity: 0.5;"></i>
            <p>Type keywords to search activities, schedule, news, FAQs, or resources...</p>
          </div>
        `;
        return;
      }

      const matches = searchIndex.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );

      if (matches.length === 0) {
        searchResults.innerHTML = `
          <div style="text-align: center; padding: 2.5rem; color: var(--text-subtle);">
            <p style="font-weight: 600; color: var(--text-main); margin-bottom: 0.25rem;">No matches found for "${query}"</p>
            <p style="font-size: 0.85rem;">Try searching for "yoga", "fitness", "nutrition", "schedule", or "rules".</p>
          </div>
        `;
        return;
      }

      searchResults.innerHTML = matches.map(item => `
        <a href="${item.url}" class="search-result-item">
          <div class="search-result-tag">${item.category}</div>
          <div class="search-result-title">${item.title}</div>
          <div class="search-result-desc">${item.desc}</div>
        </a>
      `).join('');
    }
  }

  // --------------------------------------------------------------------------
  // 20. Simulated Resource Downloads
  // --------------------------------------------------------------------------
  const downloadResourceBtns = document.querySelectorAll('.download-resource-btn');
  if (downloadResourceBtns.length > 0) {
    downloadResourceBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const resourceName = btn.getAttribute('data-resource') || 'APU_Wellness_Guide';
        const fileContent = `========================================================
APU WELLNESS FEST 2026 - OFFICIAL RESOURCE
Resource: ${resourceName.replace(/_/g, ' ')}
Tagline: "Move Better. Live Healthier. Feel Stronger."
Academic Demonstration Project - APU Student Event
========================================================

Overview:
Thank you for downloading this wellness resource for APU Wellness Fest 2026.
Event Dates: 20–22 November 2026
Venue: LBEF Campus, Maitidevi, Kathmandu, Nepal (APU Collaboration)

Key Highlights & Recommendations:
1. Stay hydrated: Refill stations available across campus.
2. Attend at least 1 mindfulness workshop to recharge.
3. Bring comfortable shoes and appropriate sports gear.
4. Have fun, make new friends, and explore wholesome living habits!

For inquiries: wellnessfest@lbef.edu.np
Website: APU Wellness Fest 2026 Demo Portal (LBEF Campus)
========================================================`;

        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${resourceName}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showToast(`Downloaded ${resourceName}.txt`, 'success');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 23. Footer Newsletter Subscription & Validation
  // --------------------------------------------------------------------------
  const newsletterForms = document.querySelectorAll('.footer-newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('.newsletter-input');
      const inputGroup = form.querySelector('.newsletter-input-group');
      const messageEl = form.querySelector('.newsletter-message');
      const email = emailInput ? emailInput.value.trim() : '';

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        if (inputGroup) inputGroup.classList.add('is-invalid');
        if (messageEl) {
          messageEl.className = 'newsletter-message error';
          messageEl.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Please enter your email address.';
        }
        if (typeof showToast === 'function') {
          showToast('Please enter an email address to subscribe.', 'error');
        }
        return;
      }

      if (!emailRegex.test(email)) {
        if (inputGroup) inputGroup.classList.add('is-invalid');
        if (messageEl) {
          messageEl.className = 'newsletter-message error';
          messageEl.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Please enter a valid email (e.g., student@mail.apu.edu.my).';
        }
        if (typeof showToast === 'function') {
          showToast('Invalid email format. Please check your address.', 'error');
        }
        return;
      }

      // Valid email submission
      if (inputGroup) inputGroup.classList.remove('is-invalid');
      
      // Save subscription in localStorage
      const existingSubscribers = JSON.parse(localStorage.getItem('apu_wellness_subscribers') || '[]');
      if (!existingSubscribers.includes(email)) {
        existingSubscribers.push(email);
        localStorage.setItem('apu_wellness_subscribers', JSON.stringify(existingSubscribers));
      }

      // Mock confirmation message
      if (messageEl) {
        messageEl.className = 'newsletter-message success';
        messageEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you for subscribing! A mock confirmation has been sent to <strong>${email}</strong>.`;
      }

      if (emailInput) {
        emailInput.value = '';
      }

      if (typeof showToast === 'function') {
        showToast('Subscription confirmed! You will receive APU Wellness Fest updates.', 'success');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 24. Subpage Back Navigation Bar & Key Option Indicator
  // --------------------------------------------------------------------------
  const isSubpage = !window.location.pathname.endsWith('index.html') &&
                    window.location.pathname !== '/' &&
                    window.location.pathname !== '' &&
                    !document.querySelector('.hero');

  function handleBackNavigation() {
    if (window.history.length > 1 && document.referrer && document.referrer.includes(window.location.host)) {
      window.history.back();
    } else {
      window.location.href = 'index.html';
    }
  }

  if (isSubpage) {
    const siteHeader = document.querySelector('.site-header');
    if (siteHeader && !document.querySelector('.subpage-back-bar')) {
      const backBar = document.createElement('div');
      backBar.className = 'subpage-back-bar';
      backBar.innerHTML = `
        <div class="container subpage-back-container">
          <button type="button" class="back-link-btn" id="globalBackBtn" title="Return to previous page (or press Backspace key)">
            <i class="fa-solid fa-arrow-left"></i>
            <span>Back</span>
            <kbd class="kbd-backspace"><span class="kbd-icon">⌫</span> Backspace</kbd>
          </button>
          <div class="subpage-key-tip">
            <i class="fa-solid fa-keyboard"></i>
            <span>Key Option: Press <kbd class="kbd-subtle">⌫ Backspace</kbd> anytime to go back</span>
          </div>
        </div>
      `;
      siteHeader.insertAdjacentElement('afterend', backBar);

      const backBtn = backBar.querySelector('#globalBackBtn');
      if (backBtn) {
        backBtn.addEventListener('click', (e) => {
          e.preventDefault();
          handleBackNavigation();
        });
      }
    }
  }

  // --------------------------------------------------------------------------
  // 25. Global Backspace Key Option & Form Reset Shortcuts
  // --------------------------------------------------------------------------
  // Add Alt+Backspace key badge to any clear form buttons
  const clearFormBtns = document.querySelectorAll('#clearFormBtn');
  clearFormBtns.forEach(btn => {
    if (!btn.querySelector('.kbd-subtle')) {
      const badge = document.createElement('kbd');
      badge.className = 'kbd-subtle';
      badge.style.marginLeft = '0.35rem';
      badge.textContent = 'Alt+⌫';
      btn.appendChild(badge);
      btn.title = 'Clear form inputs (or press Alt + Backspace)';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Backspace') return;

    const activeEl = document.activeElement;
    const isInputOrTextArea = activeEl && (
      activeEl.tagName === 'INPUT' ||
      activeEl.tagName === 'TEXTAREA' ||
      activeEl.tagName === 'SELECT' ||
      activeEl.isContentEditable
    );

    // If focused inside an editable form element
    if (isInputOrTextArea) {
      // Search input: if query is empty, Backspace closes the search overlay
      if (activeEl.id === 'searchInput' && activeEl.value === '') {
        e.preventDefault();
        const searchModalEl = document.getElementById('searchModal');
        if (searchModalEl && searchModalEl.classList.contains('open')) {
          searchModalEl.classList.remove('open');
          document.body.style.overflow = '';
          showToast('Exited search (⌫ Backspace)', 'info');
        }
        return;
      }

      // Alt + Backspace resets the active form
      if (e.altKey) {
        e.preventDefault();
        const form = activeEl.closest('form');
        if (form) {
          form.reset();
          form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
          form.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
          showToast('Form cleared (Alt + ⌫ Backspace)', 'info');
        }
        return;
      }

      // Allow normal character deletion inside inputs
      return;
    }

    // User is NOT focused on an editable element - handle Backspace as navigation key option
    e.preventDefault();

    // 1. Lightbox open
    const lightboxEl = document.getElementById('imageLightbox');
    if (lightboxEl && lightboxEl.classList.contains('open')) {
      if (e.shiftKey) {
        const closeBtn = document.getElementById('lightboxClose');
        if (closeBtn) closeBtn.click();
      } else {
        const prevBtn = document.getElementById('lightboxPrev');
        if (prevBtn) prevBtn.click();
      }
      return;
    }

    // 2. Activity Modal open
    const activityModalEl = document.getElementById('activityModal');
    if (activityModalEl && activityModalEl.classList.contains('open')) {
      activityModalEl.classList.remove('open');
      document.body.style.overflow = '';
      showToast('Closed details (⌫ Backspace)', 'info');
      return;
    }

    // 3. News Modal open
    const newsModalEl = document.getElementById('newsModal');
    if (newsModalEl && newsModalEl.classList.contains('open')) {
      newsModalEl.classList.remove('open');
      document.body.style.overflow = '';
      showToast('Closed article (⌫ Backspace)', 'info');
      return;
    }

    // 4. Search Modal open
    const searchModalEl = document.getElementById('searchModal');
    if (searchModalEl && searchModalEl.classList.contains('open')) {
      searchModalEl.classList.remove('open');
      document.body.style.overflow = '';
      showToast('Exited search (⌫ Backspace)', 'info');
      return;
    }

    // 5. Mobile Navigation Menu open
    const mainNavEl = document.getElementById('mainNav');
    if (mainNavEl && mainNavEl.classList.contains('open')) {
      mainNavEl.classList.remove('open');
      return;
    }

    // 5b. Options Drawer open
    const optionsDrawerBackdrop = document.getElementById('optionsDrawerBackdrop');
    if (optionsDrawerBackdrop && optionsDrawerBackdrop.classList.contains('open')) {
      optionsDrawerBackdrop.classList.remove('open');
      document.body.style.overflow = '';
      showToast('Closed options (⌫ Backspace)', 'info');
      return;
    }

    // 6. Subpage navigation back to previous page or home
    if (isSubpage) {
      showToast('Returning to previous page... (⌫ Backspace)', 'info');
      setTimeout(() => {
        handleBackNavigation();
      }, 150);
      return;
    }

    // 7. On homepage: if scrolled, smooth scroll to top
    if (window.scrollY > 300) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast('Scrolled to top (⌫ Backspace)', 'info');
    }
  });

  // --------------------------------------------------------------------------
  // 26. Brand Logo Touch / Click Handler -> Opens Demo Dashboard
  // "demo Dashboard lai logo ma touch garda tyo vitra open hunu paryo"
  // --------------------------------------------------------------------------
  const brandLogos = document.querySelectorAll('.brand-logo');
  brandLogos.forEach(logo => {
    logo.setAttribute('href', 'dashboard.html');
    logo.setAttribute('title', 'Demo Dashboard (Tap logo to open)');
    logo.addEventListener('click', (e) => {
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      if (currentPath !== 'dashboard.html') {
        e.preventDefault();
        showToast('Opening Demo Dashboard...', 'info');
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 120);
      } else {
        showToast('Demo Dashboard is currently active', 'info');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  // --------------------------------------------------------------------------
  // 27. Mobile Bottom Navigation Bar & Options Drawer
  // "phone ko lagi home,about,schedule ,activities,yati lai tala site icon banayara haldeu
  //  ani option vitra Gallery ,FAQ,Contact,Participant Guide, Event Schedule,Activity Rules,Feedback Survey lai Add gardeu"
  // --------------------------------------------------------------------------
  function setupMobileBottomNav() {
    if (document.getElementById('mobileBottomNav')) return;

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Create Bottom Navigation Bar
    const bottomNav = document.createElement('nav');
    bottomNav.id = 'mobileBottomNav';
    bottomNav.className = 'mobile-bottom-nav';
    bottomNav.setAttribute('aria-label', 'Mobile Bottom Navigation');

    const isHome = currentPath === 'index.html' || currentPath === '';
    const isAbout = currentPath === 'about.html';
    const isSchedule = currentPath === 'schedule.html';
    const isActivities = currentPath === 'activities.html';
    const isOptionActive = ['gallery.html', 'faq.html', 'contact.html', 'resources.html', 'feedback.html'].includes(currentPath);

    bottomNav.innerHTML = `
      <a href="index.html" class="mobile-nav-item ${isHome ? 'active' : ''}" aria-label="Home">
        <i class="fa-solid fa-house"></i>
        <span>Home</span>
      </a>
      <a href="about.html" class="mobile-nav-item ${isAbout ? 'active' : ''}" aria-label="About">
        <i class="fa-solid fa-circle-info"></i>
        <span>About</span>
      </a>
      <a href="schedule.html" class="mobile-nav-item ${isSchedule ? 'active' : ''}" aria-label="Schedule">
        <i class="fa-solid fa-calendar-days"></i>
        <span>Schedule</span>
      </a>
      <a href="activities.html" class="mobile-nav-item ${isActivities ? 'active' : ''}" aria-label="Activities">
        <i class="fa-solid fa-person-running"></i>
        <span>Activities</span>
      </a>
      <button type="button" class="mobile-nav-item ${isOptionActive ? 'active' : ''}" id="mobileOptionToggleBtn" aria-label="More Options">
        <i class="fa-solid fa-bars-staggered"></i>
        <span>Option</span>
        <span class="option-badge" title="Additional options available"></span>
      </button>
    `;
    document.body.appendChild(bottomNav);

    // Create Options Drawer Sheet & Backdrop
    const drawerBackdrop = document.createElement('div');
    drawerBackdrop.id = 'optionsDrawerBackdrop';
    drawerBackdrop.className = 'options-drawer-backdrop';
    drawerBackdrop.setAttribute('role', 'dialog');
    drawerBackdrop.setAttribute('aria-modal', 'true');
    drawerBackdrop.setAttribute('aria-label', 'Festival Options');

    drawerBackdrop.innerHTML = `
      <div class="options-drawer-sheet" id="optionsDrawerSheet">
        <div class="drawer-handle-bar" id="drawerHandleBar">
          <div class="drawer-handle"></div>
        </div>
        <div class="drawer-header">
          <div>
            <div class="drawer-header-title">
              <i class="fa-solid fa-sliders" style="color: var(--primary);"></i>
              <span>Festival Options</span>
            </div>
            <div class="drawer-header-subtitle">Quick mobile access to guides, activities & survey</div>
          </div>
          <button type="button" class="drawer-close-btn" id="drawerCloseBtn" aria-label="Close options">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div class="drawer-options-grid">
          <!-- 1. Gallery -->
          <a href="gallery.html" class="drawer-option-card ${currentPath === 'gallery.html' ? 'active' : ''}">
            <div class="drawer-card-icon" style="background: rgba(16, 185, 129, 0.12); color: #059669;">
              <i class="fa-solid fa-images"></i>
            </div>
            <div class="drawer-card-content">
              <span class="drawer-card-name">Gallery</span>
              <span class="drawer-card-desc">Photos & moments</span>
            </div>
          </a>

          <!-- 2. FAQ -->
          <a href="faq.html" class="drawer-option-card ${currentPath === 'faq.html' ? 'active' : ''}">
            <div class="drawer-card-icon" style="background: rgba(14, 165, 233, 0.12); color: #0284c7;">
              <i class="fa-solid fa-circle-question"></i>
            </div>
            <div class="drawer-card-content">
              <span class="drawer-card-name">FAQ</span>
              <span class="drawer-card-desc">Help & questions</span>
            </div>
          </a>

          <!-- 3. Contact -->
          <a href="contact.html" class="drawer-option-card ${currentPath === 'contact.html' ? 'active' : ''}">
            <div class="drawer-card-icon" style="background: rgba(245, 158, 11, 0.12); color: #d97706;">
              <i class="fa-solid fa-envelope"></i>
            </div>
            <div class="drawer-card-content">
              <span class="drawer-card-name">Contact</span>
              <span class="drawer-card-desc">Maitidevi Kathmandu</span>
            </div>
          </a>

          <!-- 4. Participant Guide -->
          <a href="resources.html#participant-guide" class="drawer-option-card">
            <div class="drawer-card-icon" style="background: rgba(139, 92, 246, 0.12); color: #7c3aed;">
              <i class="fa-solid fa-book-open"></i>
            </div>
            <div class="drawer-card-content">
              <span class="drawer-card-name">Participant Guide</span>
              <span class="drawer-card-desc">Check-in & protocols</span>
            </div>
          </a>

          <!-- 5. Event Schedule -->
          <a href="schedule.html" class="drawer-option-card ${currentPath === 'schedule.html' ? 'active' : ''}">
            <div class="drawer-card-icon" style="background: rgba(6, 182, 212, 0.12); color: #0891b2;">
              <i class="fa-solid fa-calendar-check"></i>
            </div>
            <div class="drawer-card-content">
              <span class="drawer-card-name">Event Schedule</span>
              <span class="drawer-card-desc">Full 3-day timeline</span>
            </div>
          </a>

          <!-- 6. Activity Rules -->
          <a href="resources.html#activity-rules" class="drawer-option-card">
            <div class="drawer-card-icon" style="background: rgba(239, 68, 68, 0.12); color: #dc2626;">
              <i class="fa-solid fa-scale-balanced"></i>
            </div>
            <div class="drawer-card-content">
              <span class="drawer-card-name">Activity Rules</span>
              <span class="drawer-card-desc">Safety & scoring</span>
            </div>
          </a>

          <!-- 7. Feedback Survey -->
          <a href="feedback.html" class="drawer-option-card ${currentPath === 'feedback.html' ? 'active' : ''}">
            <div class="drawer-card-icon" style="background: rgba(236, 72, 153, 0.12); color: #db2777;">
              <i class="fa-solid fa-clipboard-check"></i>
            </div>
            <div class="drawer-card-content">
              <span class="drawer-card-name">Feedback Survey</span>
              <span class="drawer-card-desc">Share student feedback</span>
            </div>
          </a>

          <!-- 8. Demo Dashboard (touch logo shortcut) -->
          <a href="dashboard.html" class="drawer-option-card ${currentPath === 'dashboard.html' ? 'active' : ''}">
            <div class="drawer-card-icon" style="background: rgba(16, 185, 129, 0.18); color: var(--primary);">
              <i class="fa-solid fa-gauge-high"></i>
            </div>
            <div class="drawer-card-content">
              <span class="drawer-card-name">Demo Dashboard</span>
              <span class="drawer-card-desc">Touch logo to open</span>
            </div>
          </a>
        </div>

        <div class="drawer-footer-actions">
          <a href="registration.html" class="drawer-footer-btn primary">
            <i class="fa-solid fa-id-card"></i>
            <span>Register Now</span>
          </a>
          <button type="button" class="drawer-footer-btn" id="drawerSearchBtn">
            <i class="fa-solid fa-magnifying-glass"></i>
            <span>Search</span>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(drawerBackdrop);

    // Event handlers for Options Drawer
    const optionToggleBtn = document.getElementById('mobileOptionToggleBtn');
    const drawerCloseBtn = document.getElementById('drawerCloseBtn');
    const drawerHandleBar = document.getElementById('drawerHandleBar');
    const drawerSearchBtn = document.getElementById('drawerSearchBtn');

    function openDrawer() {
      drawerBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (optionToggleBtn) optionToggleBtn.classList.add('active');
    }

    function closeDrawer() {
      drawerBackdrop.classList.remove('open');
      document.body.style.overflow = '';
      if (optionToggleBtn && !isOptionActive) {
        optionToggleBtn.classList.remove('active');
      }
    }

    if (optionToggleBtn) {
      optionToggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (drawerBackdrop.classList.contains('open')) {
          closeDrawer();
        } else {
          openDrawer();
        }
      });
    }

    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', closeDrawer);
    }

    if (drawerHandleBar) {
      drawerHandleBar.addEventListener('click', closeDrawer);
    }

    drawerBackdrop.addEventListener('click', (e) => {
      if (e.target === drawerBackdrop) {
        closeDrawer();
      }
    });

    const drawerLinks = drawerBackdrop.querySelectorAll('a.drawer-option-card, a.drawer-footer-btn');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    if (drawerSearchBtn) {
      drawerSearchBtn.addEventListener('click', () => {
        closeDrawer();
        const searchBtn = document.getElementById('searchToggleBtn');
        if (searchBtn) searchBtn.click();
      });
    }

    // Hash navigation smooth scroll and highlight
    function checkHashTarget() {
      if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          setTimeout(() => {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetEl.classList.add('anchor-highlight');
            setTimeout(() => {
              targetEl.classList.remove('anchor-highlight');
            }, 3600);
          }, 250);
        }
      }
    }
    checkHashTarget();
    window.addEventListener('hashchange', checkHashTarget);

    // Escape key to close options drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawerBackdrop.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  setupMobileBottomNav();
});
