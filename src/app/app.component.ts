import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LazyLoadDirective } from './directives/lazy-load.directive';

// Define interface types
interface SocialLink {
  url: string;
  icon: string;
  label: string;
}

interface Article {
  id: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LazyLoadDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // UI state
  isLoading = true;
  isDarkTheme = true;
  isMobileMenuOpen = false;
  
  // Active states
  activeIndex = 0;
  educationTab = 'grad';
  experienceTab = 'drexel';
  projectsTab = 'charades';
  
  // Fixed data
  articles: Article[] = [
    { id: 'about', title: 'About Me', icon: 'user' },
    { id: 'education', title: 'Education', icon: 'graduation-cap' },
    { id: 'experience', title: 'Experience', icon: 'briefcase' },
    { id: 'projects', title: 'Projects', icon: 'code' }
  ];
  
  socialLinks: SocialLink[] = [
    { url: 'https://www.linkedin.com/in/siddhantshivdikar/', icon: 'fa-brands fa-linkedin', label: 'LinkedIn' },
    { url: 'mailto:siddhant.shivdikar@gmail.com', icon: 'fa-solid fa-envelope', label: 'Gmail' },
    { url: 'https://github.com/SidDrexel', icon: 'fa-brands fa-github', label: 'Github' }
  ];
  
  // About me content
  aboutMeContent: string[] = [
    "👋 Hi there! I'm a tech-passionate graduate student currently completing my M.S. in Computer Science 🎓 at Drexel University. I'm deeply fascinated by the power of Machine Learning and Artificial Intelligence, and I love transforming data into actionable insights through mobile and web app development.",
    "My toolkit includes Android Studio, Angular, and Python, and I have previous experience in the Healthcare tech sector.",
    "When I'm not coding or exploring AI, you'll find me enjoying the outdoors 🚴‍♀️ – biking, swimming 🏊‍♀️, ice skiing ⛷️, and hiking ⛰️ are my go-to activities. And yes, I'm a huge dog lover 🐾!"
  ];
  
  // Education tabs
  educationTabs = [
    {
      id: 'grad',
      name: 'Graduate',
      school: 'Drexel University 🐉',
      degree: 'M.S. in Computer Science | 2023 – 2025',
      location: 'Philly, PA',
      details: 'Cool stuff: AI, ML, Databases, IoT & Neural Networks',
      achievement: '✨ Dean\'s Fellowship (2023) ✨'
    },
    {
      id: 'undergrad',
      name: 'Undergrad',
      school: 'Mumbai University',
      degree: 'B.E. in Electronics Engineering | 2017 – 2021',
      location: 'Mumbai, India',
      details: 'Core Technical Member (Project Cell, 2021)'
    }
  ];
  
  // Experience tabs
  experienceTabs = [
    {
      id: 'drexel',
      name: 'Drexel CCI',
      company: 'Drexel University, CCI ✨',
      position: 'Tech Wizard | June 2024 – Present',
      location: 'Philly, PA',
      responsibilities: [
        'Tech troubleshooter & student life-saver',
        '3D printing guru making student ideas real',
        'IT ninja keeping systems happy & faculty smiling'
      ]
    },
    {
      id: 'hnci',
      name: 'HNCI',
      company: 'HNCI India',
      position: 'Software Consultant | Jan 2023 – Sept 2023',
      location: 'Mumbai, India',
      responsibilities: [
        'Built a web app that makes life easier for doctors and medical staff',
        'Chatted with healthcare pros to understand what they really needed',
        'Bridged the gap between medical teams and developers'
      ]
    },
    {
      id: 'sofscript',
      name: 'Sofscript',
      company: 'Sofscript Systems',
      position: 'Healthcare Solutions Consultant | June 2021 – Mar 2022',
      location: 'Mumbai, India',
      responsibilities: [
        'Developed healthcare applications including Patient Portal and Dashboard',
        'Conducted consultations with hospital staff to gather requirements',
        'Translated medical processes into user-friendly digital solutions'
      ]
    }
  ];
  
  // Project tabs
  projectTabs = [
    {
      id: 'charades',
      name: 'Indian Charades',
      title: 'Indian Charades (2025)',
      description: 'A fun game app featuring Indian cultural elements and phrases!',
      highlights: [
        'Used modern web tech to create an engaging experience',
        'Added authentic cultural elements from all over India',
        'Made it multiplayer and educational (but mostly fun)'
      ]
    },
    {
      id: 'classroom',
      name: 'Classroom Watch',
      title: 'Classroom Watch (2024)',
      description: 'Angular app using computer vision to track classroom items in real-time.',
      highlights: [
        'Created a slick UI with material design',
        'Set up HTTP interceptors and REST APIs for backend talks',
        'Made it super easy to find and track items across locations'
      ]
    },
    {
      id: 'gesture',
      name: 'Hand Gesture',
      title: 'Hand Gesture Recognition App',
      description: 'Mobile app translating ASL to multiple languages using Android & Mediapipe.',
      highlights: [
        'Got my research paper published in IRJET! 🎉',
        'Used ML models to recognize hand gestures in real-time',
        'Created an intuitive UI for sign language translation'
      ]
    }
  ];
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('click', this.handleOutsideClick);
    }
  }
  
  ngOnInit(): void {
    // Only execute browser-specific code
    if (isPlatformBrowser(this.platformId)) {
      // Simulate loading
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
      
      // Load theme from localStorage if available
      this.loadTheme();
    } else {
      // Server-side rendering
      this.isLoading = false;
    }
  }
  
  loadTheme(): void {
    // Only execute in browser environment
    if (!isPlatformBrowser(this.platformId)) return;
    
    try {
      const savedTheme = localStorage.getItem('darkTheme');
      if (savedTheme !== null) {
        this.isDarkTheme = JSON.parse(savedTheme);
        document.documentElement.classList.toggle('light-theme', !this.isDarkTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  }
  
  toggleTheme(): void {
    // Only execute in browser environment
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.isDarkTheme = !this.isDarkTheme;
    document.documentElement.classList.toggle('light-theme', !this.isDarkTheme);
    
    // Add animation class
    document.body.classList.add('theme-transition');
    
    // Store preference
    localStorage.setItem('darkTheme', JSON.stringify(this.isDarkTheme));
    
    // Remove animation class after transition
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 500);
  }
  
  toggleMobileMenu(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    if (this.isMobileMenuOpen) {
      // Add click outside handler
      setTimeout(() => {
        document.addEventListener('click', this.handleOutsideClick);
      }, 0);
    }
  }
  
  // Handler for clicking outside menu
  private handleOutsideClick = (e: MouseEvent) => {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const target = e.target as HTMLElement;
    const isMenuClick = target.closest('nav');
    
    if (!isMenuClick) {
      this.isMobileMenuOpen = false;
      document.removeEventListener('click', this.handleOutsideClick);
    }
  }
  
  handleLeftClick(): void {
    this.activeIndex = (this.activeIndex - 1 + this.articles.length) % this.articles.length;
  }
  
  handleRightClick(): void {
    this.activeIndex = (this.activeIndex + 1) % this.articles.length;
  }
  
  downloadResume(event: Event): void {
    event.preventDefault();
    alert('Resume download feature will be implemented soon!');
  }
}