import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: 'input[numbersOnly]', // Use as <input numbersOnly>
    standalone: true // Angular 19 standard
})
export class NumbersOnlyDirective {
    constructor(private _el: ElementRef) { }

    @HostListener('input', ['$event']) onInputChange(event: any) {
        const initialValue = this._el.nativeElement.value;

        const newValue = initialValue.replace(/[^0-9.]/g, '');

        if (initialValue !== newValue) {
            this._el.nativeElement.value = newValue;

            this._el.nativeElement.dispatchEvent(new Event('input'));
        }
    }
}