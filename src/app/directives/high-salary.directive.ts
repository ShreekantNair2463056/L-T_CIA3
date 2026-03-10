import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighSalary]',
  standalone: true
})
export class HighSalaryDirective implements OnChanges {
  @Input({ required: true }) appHighSalary = 0;
  @Input() salaryThreshold = 1000000;

  constructor(private readonly elementRef: ElementRef<HTMLElement>, private readonly renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appHighSalary']) {
      const isHighSalary = this.appHighSalary >= this.salaryThreshold;
      this.renderer.setStyle(this.elementRef.nativeElement, 'font-weight', isHighSalary ? '700' : '400');
      this.renderer.setStyle(this.elementRef.nativeElement, 'color', isHighSalary ? '#1b5e20' : '#1f2937');
    }
  }
}
