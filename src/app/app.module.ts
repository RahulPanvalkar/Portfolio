import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { Home2Component } from './components/home/home2/home2.component';
import { AboutComponent } from './components/about/about.component';
import { TechstackComponent } from './components/about/techstack/techstack.component';
import { ToolstackComponent } from './components/about/toolstack/toolstack.component';
import { GithubComponent } from './components/about/github/github.component';
import { ResumeComponent } from './components/resume/resume.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ProjectsComponent } from './components/projects/projects.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    Home2Component,
    AboutComponent,
    TechstackComponent,
    ToolstackComponent,
    GithubComponent,
    ResumeComponent,
    ProjectsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
