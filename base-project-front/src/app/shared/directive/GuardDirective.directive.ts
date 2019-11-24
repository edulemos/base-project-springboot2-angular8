import { Directive, Input, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/core/guards/auth.service';

@Directive({
  selector: '[appGuard]'
})
export class GuardDirective {

  @Input() path: string;

  constructor(
    private guard: AuthService,
    private elementRef: ElementRef
  ) {

    const b = this.guard.isAuthorized(this.path);

    if (!b) {
      this.elementRef.nativeElement.style.display = 'none';
    }

  }





}
