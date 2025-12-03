import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Queue } from '../../services/queue';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display',
  imports: [CommonModule],
  templateUrl: './display.html',
  styleUrl: './display.css',
})
export class Display implements OnInit,OnDestroy {

  tokens: any[]= [];
  currentServing: any= null;
  pendingTokens: any[]= [];
  tokenSubscripton!: Subscription;

  constructor(private queueService: Queue, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
      this.loadTokens();
      this.listenForUpdates();
  }

  loadTokens() {
    this.queueService.getAllTokens().subscribe((data)=> {
      this.tokens= data;
      this.updateView();
      this.cdr.detectChanges()
    })
  }

  listenForUpdates() {
    this.tokenSubscripton = this.queueService.tokenUpdates$.subscribe((event)=>{
      if(event.type === 'create') {
        this.tokens.push(event.token);
      } else if (event.type === 'update') {
        const index = this.tokens.findIndex(t=> t._id === event.token._id);
        if(index !== -1) {
          this.tokens[index] = event.token;
        }
      }

      this.updateView();
      this.cdr.detectChanges()
    })
  };

  updateView() {
    this.currentServing= this.tokens.find(t=> t.status === 'SERVING');

    this.pendingTokens= this.tokens.filter(t=> t.status === 'PENDING').slice(0,5);
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
      if(this.tokenSubscripton) this.tokenSubscripton.unsubscribe()
  }
}
