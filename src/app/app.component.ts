import { Component, OnInit } from '@angular/core';
import { BaseComponentLogic } from '../base/BaseComponentLogic';
import { Subject } from 'rxjs';
import { NewChatComponent } from '../new-chat/new-chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NewChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent extends BaseComponentLogic implements OnInit{
  ngOnInit(): void {
    //   this.saveOfenTashlumSuccessSubject.subscribe(res => {
    //     alert("sub 1111");
    //     this.saveOfenTashlumWithDivuachSubject.subscribe(res2 => {
    //         alert("sub 2222");
    //     })
    //   })

    // this.saveOfenTashlumSuccessSubject.next(true);
    // this.saveOfenTashlumWithDivuachSubject.next(true);
    // this.saveOfenTashlumSuccessSubject.next(true);


  }
  private saveOfenTashlumSuccessSubject: Subject<boolean> = new Subject<boolean>();
  private saveOfenTashlumWithDivuachSubject: Subject<boolean> = new Subject<boolean>();

  // title = 'demo';
}
