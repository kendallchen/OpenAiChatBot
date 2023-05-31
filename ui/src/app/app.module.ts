import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './common/material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppConfigService } from './service/app-config.service';
import { ChatComponent } from './chat/chat.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

export function initConfig(appConfig: AppConfigService) {
    return () => appConfig.load();
}

const routes: Routes = [{ path: '', component: ChatComponent
                        }];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    ChatComponent,
    FooterComponent   
  ],
  bootstrap: [ AppComponent ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppConfigService],
      multi: true,
    }]
})
export class AppModule { }
