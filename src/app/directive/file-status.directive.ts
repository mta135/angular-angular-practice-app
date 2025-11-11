import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';



export interface ValidationStatus {
  isValid: boolean;
  error?: string;

  successText?: string;
}


@Directive({
  selector: '[appFileStatus]'
})
export class FileStatusDirective implements OnChanges {

  @Input('appFileStatus') status: ValidationStatus | null | undefined;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }


  ngOnChanges(changes: SimpleChanges): void {

    if (changes['status']) {
      this.updateDisplay();
    }

  }


  private updateDisplay() {

    this.renderer.removeClass(this.el.nativeElement, 'status-valid');
    this.renderer.removeClass(this.el.nativeElement, 'status-error');

    // Dacă statusul e null/undefined (ex: fișierul nu e încărcat)
    if (!this.status) {
      this.renderer.setProperty(this.el.nativeElement, 'textContent', '');
      return;
    }

    // --- AICI E LOGICA TA ---
    if (this.status.isValid) {
      // CAZUL VALID
      const text = this.status.successText || 'Fișier valid';
      this.renderer.setProperty(this.el.nativeElement, 'textContent', text);
      this.renderer.addClass(this.el.nativeElement, 'status-valid');

    } else {
      // CAZUL CU EROARE
      const text = this.status.error || 'Eroare necunoscută';
      this.renderer.setProperty(this.el.nativeElement, 'textContent', text);
      this.renderer.addClass(this.el.nativeElement, 'status-error');
    }
  }

}
