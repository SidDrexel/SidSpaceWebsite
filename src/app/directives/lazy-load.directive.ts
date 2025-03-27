import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]',
  standalone: true
})
export class LazyLoadDirective implements OnInit {
  @Input() appLazyLoad!: string; // Background image URL

  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Check if IntersectionObserver is available (browser environment)
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      // Setup intersection observer for lazy loading
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          // If element is visible
          if (entry.isIntersecting) {
            // Apply the background image
            this.el.nativeElement.style.backgroundImage = `url(${this.appLazyLoad})`;
            // Add a class for fade-in animation
            this.el.nativeElement.classList.add('fade-in');
            // Stop observing once loaded
            if (this.observer) {
              this.observer.unobserve(this.el.nativeElement);
            }
          }
        });
      });

      // Start observing the element
      this.observer.observe(this.el.nativeElement);
    } else {
      // Fallback for environments without IntersectionObserver
      // Just load the image immediately
      this.el.nativeElement.style.backgroundImage = `url(${this.appLazyLoad})`;
    }
  }
}