import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Queue } from '../../services/queue';


@Component({
  selector: 'app-admin',
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit, OnDestroy {
  tokens:any[]= [];
  tokenSubscription!: Subscription;

  constructor(private queueService: Queue, private cdr:ChangeDetectorRef){};

  ngOnInit() {
    this.loadTokens();
    this.listenForUpdates();
  };

  loadTokens() {
    this.queueService.getAllTokens().subscribe((data)=>{
      this.tokens= data;
      this.cdr.detectChanges()
    })
  };

  listenForUpdates() {
    this.tokenSubscription = this.queueService.tokenUpdates$.subscribe((event) => {
      console.log('⚡ Socket Event Received:', event); // <--- DEBUG LOG

      // Safety Check: If token is null, stop here.
      if (!event.token) {
        console.warn('⚠️ Received event with null token. Ignoring.');
        return;
      }

      if (event.type === 'create') {
        this.tokens.push(event.token);
      } else if (event.type === 'update') {
        const index = this.tokens.findIndex(t => t._id === event.token._id);
        if (index !== -1) {
          this.tokens[index] = event.token; // Update the list
        }
      }
      this.cdr.detectChanges()
    });
  }

  // 3. Action: Change Status (FIXED)
  updateStatus(id: string, newStatus: string) {
    console.log('🖱️ Clicking Update. ID:', id, 'New Status:', newStatus); // <--- DEBUG LOG

    if (!id) {
      alert('❌ Error: Token ID is missing!');
      return;
    }

    this.queueService.updateStatus(id, newStatus).subscribe({
      next: (res) => {console.log('✅ Status updated successfully:', res)
        this.cdr.detectChanges()
      },
      error: (err) => {
        console.error('❌ Update failed:', err);
        alert('Failed to update: ' + (err.error?.message || err.message));
      }
    });
  }

  getTokensByStatus(status: string) {
    return this.tokens.filter(t=> t.status === status);
  }

  ngOnDestroy(): void {
      if(this.tokenSubscription) this.tokenSubscription.unsubscribe()
  }


}
