import { Component } from '@angular/core';
import { BaseComponentLogic } from '../base/BaseComponentLogic';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-implement2',
  standalone: true,
  imports: [BaseComponent],
  templateUrl: './implement2.component.html',
  styleUrl: './implement2.component.scss'
})
export class Implement2Component extends BaseComponentLogic {
  override colors: string[] = ['purple', 'orange'];
  override userInput: string = 'Initial input for Implement2';
  override title: string = 'Implement2 Title';
  // Additional logic specific to Implement2 can be added here
  customMethod() {
    console.log('Custom method in Implement2 called');
  }

}
