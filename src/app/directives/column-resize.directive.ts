import {
    Directive,
    ElementRef,
    Renderer2,
    OnInit,
    OnDestroy
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Directive({
    selector: '[appColumnResize]'
})
export class ColumnResizeDirective implements OnInit, OnDestroy {
    private resizer!: HTMLElement;
    private startX = 0;
    private startWidth = 0;
    private columnClass: string | null = null;
    private mouseMoveSub?: Subscription;
    private mouseUpSub?: Subscription;

    constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) { }

    ngOnInit(): void {
        const headerCell = this.el.nativeElement;

        // găsim clasa de columnă generată de mat-table (mat-column-<name>)
        const classes = Array.from(headerCell.classList);
        const colClass = classes.find(c => c.startsWith('mat-column-'));
        this.columnClass = colClass || null;

        // stil: header trebuie să fie relative pentru handle
        this.renderer.setStyle(headerCell, 'position', 'relative');

        // creăm handle-ul
        this.resizer = this.renderer.createElement('span');
        this.renderer.addClass(this.resizer, 'column-resizer-handle');

        // atașăm handle la header
        this.renderer.appendChild(headerCell, this.resizer);

        // mousedown pe handle
        const mousedown$ = fromEvent<MouseEvent>(this.resizer, 'mousedown');
        mousedown$.subscribe(e => this.onMouseDown(e));
    }

    private onMouseDown(event: MouseEvent) {
        event.preventDefault();
        // blocăm selectul text pe pagina (opțional)
        this.renderer.setStyle(document.body, 'user-select', 'none');

        this.startX = event.pageX;
        // folosim offsetWidth al header-ului
        this.startWidth = this.el.nativeElement.offsetWidth;

        // subscrieri globale
        this.mouseMoveSub = fromEvent<MouseEvent>(document, 'mousemove')
            .subscribe(e => this.onMouseMove(e));
        this.mouseUpSub = fromEvent<MouseEvent>(document, 'mouseup')
            .subscribe(() => this.onMouseUp());
    }

    private onMouseMove(event: MouseEvent) {
        const delta = event.pageX - this.startX;
        const newWidth = Math.max(40, this.startWidth + delta); // min 40px

        // aplicăm width pe header
        this.renderer.setStyle(this.el.nativeElement, 'width', `${newWidth}px`);
        this.renderer.setStyle(this.el.nativeElement, 'min-width', `${newWidth}px`);
        this.renderer.setStyle(this.el.nativeElement, 'max-width', `${newWidth}px`);

        // aplicăm width pe toate celulele din aceeași coloană (dacă am găsit clasa)
        if (this.columnClass) {
            // găsim tabelul părinte (closest)
            const table = this.findClosest(this.el.nativeElement, 'table');
            if (table) {
                const cells = Array.from(table.querySelectorAll(`.${this.columnClass}`)) as HTMLElement[];
                cells.forEach(cell => {
                    this.renderer.setStyle(cell, 'width', `${newWidth}px`);
                    this.renderer.setStyle(cell, 'min-width', `${newWidth}px`);
                    this.renderer.setStyle(cell, 'max-width', `${newWidth}px`);
                    // opțional: forțăm box-sizing
                    this.renderer.setStyle(cell, 'box-sizing', 'border-box');
                });
            }
        }
    }

    private onMouseUp() {
        // relaxăm selectul text
        this.renderer.removeStyle(document.body, 'user-select');

        if (this.mouseMoveSub) {
            this.mouseMoveSub.unsubscribe();
            this.mouseMoveSub = undefined;
        }
        if (this.mouseUpSub) {
            this.mouseUpSub.unsubscribe();
            this.mouseUpSub = undefined;
        }
    }

    private findClosest(el: HTMLElement, selector: string): HTMLElement | null {
        let current: HTMLElement | null = el;
        while (current) {
            if (current.matches && current.matches(selector)) return current;
            current = current.parentElement;
        }
        return null;
    }

    ngOnDestroy(): void {
        if (this.mouseMoveSub) this.mouseMoveSub.unsubscribe();
        if (this.mouseUpSub) this.mouseUpSub.unsubscribe();
    }
}
