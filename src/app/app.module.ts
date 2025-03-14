import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsideComponent } from './components/aside/aside.component';
import { ButtonComponent } from './components/button/button.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { ModalComponent } from './components/modal/modal.component';
import { TitleComponent } from './components/title/title.component';
import { WinnerScreenComponent } from './components/winner-screen/winner-screen.component';
import { HomeComponent } from './pages/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    ButtonComponent,
    CanvasComponent,
    FooterBarComponent,
    ModalComponent,
    TitleComponent,
    WinnerScreenComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
