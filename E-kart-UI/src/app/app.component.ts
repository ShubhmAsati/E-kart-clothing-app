import { Component } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';
import { MessagingService } from './shared/services/messaging/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'markhor';
  message;
  constructor(private messagingService: MessagingService,private matIconRegistry: MatIconRegistry,private domSanitizer: DomSanitizer){
    this.matIconRegistry.addSvgIcon(
      'fb',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons8-facebook.svg")
    
    );
    this.matIconRegistry.addSvgIcon(
      'gmail',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons8-google.svg")
    
    );
    this.matIconRegistry.addSvgIcon(
      'black-t-shirt',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons8-t-shirt-black.svg")
    
    );
    this.matIconRegistry.addSvgIcon(
      'blue-t-shirt',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons8-t-shirt-blue.svg")
    
    );
    this.matIconRegistry.addSvgIcon(
      'green-t-shirt',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons8-t-shirt-green.svg")
    
    );
    this.matIconRegistry.addSvgIcon(
      'grey-t-shirt',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons8-t-shirt-grey.svg")
    
    );
    this.matIconRegistry.addSvgIcon(
      'orange-t-shirt',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons8-t-shirt-orange.svg")
    
    );
    this.matIconRegistry.addSvgIcon(
      'purple-t-shirt',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons8-t-shirt-purple.svg")
    
    );
    this.matIconRegistry.addSvgIcon(
      'red-t-shirt',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons8-t-shirt-red.svg")
    
    );
    this.matIconRegistry.addSvgIcon(
      'yellow-t-shirt',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons8-t-shirt-yellow.svg")
    
    );
    this.matIconRegistry.addSvgIcon(
      'box-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/open-cardboard-box.svg")
    
    );
  }
  ngOnInit() {
    const userId = 'user001';
    this.messagingService.requestPermission(userId)
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
  }
}
