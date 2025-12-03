import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Queue } from '../../services/queue';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-kiosk',
  imports: [CommonModule],
  templateUrl: './kiosk.html',
  styleUrl: './kiosk.css',
})
export class Kiosk {

  latestToken: string | null=null;
  isLoading= false;

  constructor(private queueService:Queue, private cdr: ChangeDetectorRef) {};

  generateToken() {
    this.isLoading= true;
    const tokenNum= 'A-' + Math.floor(100 + Math.random()*900);
    this.queueService.createToken(tokenNum).subscribe({
      next:(res:any)=> {

        console.log('✅ API Response received:', res);
        console.log('👉 Token Number extracted:', res.tokenNumber);

        this.latestToken= res.tokenNumber;
        this.isLoading= false;

        this.cdr.detectChanges();

        setTimeout(()=>{
          console.log('⏲️ Resetting screen');
          this.latestToken= null;
          this.cdr.detectChanges()
        },3000);
      },
      error:(err)=> {
        console.error(err);
        this.isLoading= false;
        
        alert('Failed to get token. check Console.')
      this.cdr.detectChanges()
         }
    })
  }
}
