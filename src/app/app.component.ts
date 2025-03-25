import { Component, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass, NgFor],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChildren('slide') slideElements!: QueryList<any>;
  articles = Array(4).fill(0); // Creates array for 4 articles
  private activeIndex = 0;

  ngAfterViewInit() {
    this.setupSlides();
  }

  setupSlides() {
    this.slideElements.forEach((slide, index) => {
      slide.nativeElement.setAttribute('data-status', index === 0 ? 'active' : 'inactive');
    });
  }

  handleSlide(direction: 'left' | 'right') {
    const currentSlide = this.slideElements.get(this.activeIndex)?.nativeElement;
    if (!currentSlide) return;

    this.activeIndex = direction === 'left'
      ? (this.activeIndex - 1 + this.articles.length) % this.articles.length
      : (this.activeIndex + 1) % this.articles.length;

    const nextSlide = this.slideElements.get(this.activeIndex)?.nativeElement;
    if (!nextSlide) return;

    // Prepare next slide
    nextSlide.style.transition = 'none';
    nextSlide.setAttribute('data-status', direction === 'left' ? 'before' : 'after');
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        nextSlide.style.transition = '';
        currentSlide.setAttribute('data-status', direction === 'left' ? 'after' : 'before');
        nextSlide.setAttribute('data-status', 'active');
      });
    });
  }

  handleLeftClick() { this.handleSlide('left'); }
  handleRightClick() { this.handleSlide('right'); }
}