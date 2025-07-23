import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../chat.service';
import { UserInfoResponse } from '../app/models/userInfo.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  
})

export class ChatComponent {
 isOpen = false;
  message = '';
  messages: ChatMessage[] = [];
  loading = false;
  initialized = false;
  userInfo: UserInfoResponse | null = null;
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getUserInfo().subscribe({
      next: (userInfo) => {
        console.log('User info retrieved:', userInfo);
        this.userInfo = userInfo;
      }
    });
    this.chatService.initialize().subscribe({
      next: res => {
        console.log('System initialized:', res);
        this.initialized = true;
      },
      error: err => {
        console.error('Error initializing system', err);
        this.messages.push({
          sender: 'bot',
          content: 'אירעה שגיאה באתחול המערכת.'
        });
      }
    });
  }

  toggleChat() {
    this.messages = [];
    this.message = '';
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    const trimmed = this.message.trim();
    if (!trimmed || !this.initialized) return;

    const userMsg: ChatMessage = { sender: 'user', content: trimmed };
    this.messages.push(userMsg);
    this.message = '';
    this.loading = true;


    this.chatService.askQuestion(trimmed, this.userInfo,[]).subscribe({
      next: (res) => {
        let finalAnswer = "";
        try{
          finalAnswer = JSON.parse(res.answer);
        } 
        
        catch {
          finalAnswer = res.answer  || 'לא התקבלה תשובה.';
        }
        
        const botMsg: ChatMessage = {
          sender: 'bot',
          content: finalAnswer
        };
        this.messages.push(botMsg);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error asking question:', err);
        this.messages.push({
          sender: 'bot',
          content: 'אירעה שגיאה בטיפול בשאלה.'
        });
        this.loading = false;
      }
    });
  }

  openResponses(maanimList:string){
    alert(`פתיחת מענים:  ${maanimList}`);
  }
}

interface ChatMessage {
  sender: 'user' | 'bot';
  content: any;
}