
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../chat.service';
import { UserInfoResponse } from '../app/models/userInfo.model';
  
@Component({
  selector: 'app-new-chat',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './new-chat.component.html',
  styleUrl: './new-chat.component.scss'
})
export class NewChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  @ViewChild('messageInput') private messageInput!: ElementRef;

  isOpen = false;
  message = '';
  messages: ChatMessage[] = [];
  loading = false;
  initialized = false;
  private shouldScrollToBottom = false;
  @Input() userName: string = "ישראל";
  userInfo: UserInfoResponse | null = null;
  chat_history: any[] = [];

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
          content: 'אירעה שגיאה באתחול המערכת.',
          timestamp: new Date()
        });
      }
    });
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      // Clear messages when opening
      const botMsg: ChatMessage = {
        sender: 'bot',
        content: `הי ${this.userName} אני הסוכן החכם של גפן. מה תרצה לעשות היום? `,
        timestamp: new Date()
      };
      this.messages = [botMsg];
      this.message = '';
      
      // Focus on input after a short delay to ensure the chat window is rendered
      setTimeout(() => {
        if (this.messageInput) {
          this.messageInput.nativeElement.focus();
        }
      }, 100);
    }
  }

  sendMessage(): void {
    const trimmed = this.message.trim();
    if (!trimmed || !this.initialized) return;

    const userMsg: ChatMessage = { 
      sender: 'user', 
      content: trimmed,
      timestamp: new Date()
    };
    
    this.messages.push(userMsg);
    this.message = '';
    this.loading = true;
    this.shouldScrollToBottom = true;

    this.chatService.askQuestion(trimmed, this.userInfo,this.chat_history).subscribe({
      next: (res) => {
        let finalAnswer = "";
        try {
          res.answer = res.answer.replace('\"', '"')
          finalAnswer = JSON.parse(res.answer);
          this.chat_history.push(res.summary);
        } catch {
          // finalAnswer = res.answer || 'לא התקבלה תשובה.';
           const jsonMatch = this.extractJsonFromText(res.answer);
      
      if (jsonMatch) {
        try {
          finalAnswer = JSON.parse(jsonMatch);
          this.chat_history.push(res.summary);
        } catch {
          // אם גם החלק שנראה כמו JSON לא תקין
          finalAnswer = res.answer || 'לא התקבלה תשובה.';
        }
      } else {
        // אם לא נמצא JSON כלל
        finalAnswer = res.answer || 'לא התקבלה תשובה.';
      }
        }
        
        const botMsg: ChatMessage = {
          sender: 'bot',
          content: finalAnswer,
          timestamp: new Date()
        };
        
        this.messages.push(botMsg);
        this.loading = false;
        this.shouldScrollToBottom = true;
      },
      error: (err) => {
        console.error('Error asking question:', err);
        this.messages.push({
          sender: 'bot',
          content: 'אירעה שגיאה בטיפול בשאלה.',
          timestamp: new Date()
        });
        this.loading = false;
        this.shouldScrollToBottom = true;
      }
    });
  }

  private extractJsonFromText(text: string): string | null {
  if (!text) return null;
  
  // חיפוש תחילת האובייקט הראשון
  const startIndex = text.indexOf('{');
  if (startIndex === -1) return null;
  
  // חיפוש סוף האובייקט - ספירת סוגריים
  let braceCount = 0;
  let endIndex = -1;
  
  for (let i = startIndex; i < text.length; i++) {
    if (text[i] === '{') {
      braceCount++;
    } else if (text[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        endIndex = i + 1;
        break;
      }
    }
  }
  
  if (endIndex === -1) return null;
  
  return text.substring(startIndex, endIndex);
}

  openResponses(maanimList: string): void {
    alert(`פתיחת מענים: ${maanimList}`);
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString('he-IL', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  trackByIndex(index: number, item: ChatMessage): number {
    return index;
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        const container = this.messagesContainer.nativeElement;
        container.scrollTop = container.scrollHeight;
      }
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }
}

interface ChatMessage {
  sender: 'user' | 'bot';
  content: any;
  timestamp: Date;
}
