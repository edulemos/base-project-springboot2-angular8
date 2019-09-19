import { TokenHttpInterceptor } from './core/interceptors/token-http.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TabMenuModule } from 'primeng/tabmenu';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { PickListModule } from 'primeng/picklist';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MainComponent } from './shared/layout/main/main.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { UsersComponent } from './pages/users/users.component';
import { LoginService } from './core/services/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { AuthService } from './core/guards/auth.service';
import { JwtHelperService, JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { RecoverComponent } from './pages/recover/recover.component';


export function tokenGetter() {
  return localStorage.getItem('token');
}

const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter: tokenGetter
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    MainComponent,
    ProfilesComponent,
    UsersComponent,
    ForbiddenComponent,
    RecoverComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TabMenuModule,
    CardModule,
    PanelModule,
    ButtonModule,
    FieldsetModule,
    BreadcrumbModule,
    MenubarModule,
    PasswordModule,
    InputTextModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    SidebarModule,
    MessagesModule,
    MessageModule,
    PickListModule,
    DialogModule,
    ConfirmDialogModule,
    JwtModule.forRoot(JWT_Module_Options)

  ],
  providers: [
    LoginService,
    MessageService,
    AuthGuardService,
    AuthService,
    JwtHelperService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
