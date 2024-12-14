import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() label: string = 'Button'; // Text for the button
  @Input() type: 'button' | 'submit' | 'reset' = 'button'; // Button type
  @Input() isDisabled: boolean = false; // Disabled state
  @Input() customClass: string = ''; // Custom CSS classes for styling

  @Output() onClick = new EventEmitter<void>(); // Event emitter for button click

  // Emit the click event if the button is not disabled
  handleClick(): void {
    if (!this.isDisabled) {
      this.onClick.emit();
    }
  }
}
