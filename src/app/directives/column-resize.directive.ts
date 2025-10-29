import {
    Directive,
    ElementRef,
    Renderer2,
    OnInit,
    OnDestroy
} from '@angular/core';


@Directive({
    selector: '[appColumnResize]'
})
export class ColumnResizeDirective implements OnInit, OnDestroy {

    private mouseMoveListener: (() => void) | null = null;
    private mouseUpListener: (() => void) | null = null;

    private startX: number = 0;
    private startWidth: number = 0;

    private resizeHandle: HTMLElement;

    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.resizeHandle = this.renderer.createElement('span');
        this.renderer.addClass(this.resizeHandle, 'resize-handle');
    }

    ngOnInit(): void {
        this.renderer.appendChild(this.el.nativeElement, this.resizeHandle);
        this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
        this.renderer.listen(this.resizeHandle, 'mousedown', this.onMouseDown.bind(this));
    }

    ngOnDestroy(): void {
        // Curăță listener-ele dacă directiva e distrusă
        this.clearListeners();
    }

    private onMouseDown(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation(); // <-- MODIFICARE 1: Oprește propagarea evenimentului

        // Măsură de siguranță: curăță listener-ii vechi dacă au rămas agățați
        this.clearListeners();

        this.startX = event.clientX;
        this.startWidth = this.el.nativeElement.offsetWidth;

        // Atașează listener-ele la nivel de 'window' pentru a prinde mișcarea oriunde
        // <-- MODIFICARE 2: Am schimbat 'document' cu 'window'
        this.mouseMoveListener = this.renderer.listen('window', 'mousemove', this.onMouseMove.bind(this));
        this.mouseUpListener = this.renderer.listen('window', 'mouseup', this.onMouseUp.bind(this));
    }

    private onMouseMove(event: MouseEvent): void {
        const deltaX = event.clientX - this.startX;
        const newWidth = this.startWidth + deltaX;

        if (newWidth > 50) { // O lățime minimă de siguranță
            this.renderer.setStyle(this.el.nativeElement, 'width', `${newWidth}px`);
            this.renderer.setStyle(this.el.nativeElement, 'min-width', `${newWidth}px`);
        }
    }

    private onMouseUp(event: MouseEvent): void {
        // Dezatașează (unsubscribe) listener-ele globale
        this.clearListeners();
    }

    // Funcție ajutătoare pentru a curăța listener-ele
    private clearListeners(): void {
        if (this.mouseMoveListener) {
            this.mouseMoveListener();
            this.mouseMoveListener = null;
        }
        if (this.mouseUpListener) {
            this.mouseUpListener();
            this.mouseUpListener = null;
        }
    }
}
