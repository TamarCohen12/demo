import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ChatComponent } from './chat/chat.component';
bootstrapApplication(AppComponent, {
  // ...appConfig,
  providers: [
    provideHttpClient(withFetch())
  ]
}).catch(err => console.error(err));
