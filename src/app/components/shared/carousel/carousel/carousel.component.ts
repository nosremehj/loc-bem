import { Component, Input, OnInit } from '@angular/core';
import { carouselImage } from './carousel';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() imagens: carouselImage[] = [];
  @Input() indicators: boolean = true;
  @Input() controls: boolean = true;
  @Input() autoSlide: boolean = false;
  @Input() slideInterval = 3000;

  selectedIndex: number = 0;

  ngOnInit(): void {
    if (this.autoSlide) {
      this.autoSlideImagens();
    }
  }
  autoSlideImagens(): void {
    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval);
  }
  selectImage(index: number): void {
    this.selectedIndex = index;
  }

  onPrevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.imagens.length - 1;
    } else {
      this.selectedIndex--;
    }
  }
  onNextClick(): void {
    if (this.selectedIndex === this.imagens.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }
}
