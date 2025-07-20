import { Component } from '@angular/core';
import { BaseComponentLogic } from '../base/BaseComponentLogic';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-implement1',
  standalone: true,
  imports: [BaseComponent],
  templateUrl: './implement1.component.html',
  styleUrl: './implement1.component.scss'
})
export class Implement1Component extends BaseComponentLogic {
  override colors: string[] = [ 'blue', 'yellow'];
}
