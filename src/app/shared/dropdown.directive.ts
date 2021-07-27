import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  readonly element;
  open = false;

  constructor(elRef: ElementRef, private renderer: Renderer2) {
    this.element = elRef.nativeElement;
  }

  @HostListener("click")
  toggleOpen() {
    this.open
      ? this.renderer.removeClass(this.element,"open")
      : this.renderer.addClass(this.element, "open");
    this.open = !this.open;
  }
}
