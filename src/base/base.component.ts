import { CommonModule } from '@angular/common';
import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseModel } from './BaseComponentLogic';

@Component({
  selector: 'app-base',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent {
  @Input() model!: BaseModel;
  @ContentChild('customTitle') customTitleTemplate: TemplateRef<any> | undefined;
  @ContentChild('customColorItem') customColorItemTemplate: TemplateRef<any> | undefined;
  @ContentChild('customColor') customColorTemplate: TemplateRef<any> | undefined;
}
