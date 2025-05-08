import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: Date;
  read: boolean;
}

@Component({
  selector: 'app-messages-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  template: `
    <div class="messages-admin">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Mensajes Recibidos</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="messages" class="messages-table">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Nombre</th>
              <td mat-cell *matCellDef="let message">{{message.name}}</td>
            </ng-container>

            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef>Email</th>
              <td mat-cell *matCellDef="let message">{{message.email}}</td>
            </ng-container>

            <ng-container matColumnDef="subject">
              <th mat-header-cell *matHeaderCellDef>Asunto</th>
              <td mat-cell *matCellDef="let message">{{message.subject}}</td>
            </ng-container>

            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Fecha</th>
              <td mat-cell *matCellDef="let message">{{message.date | date:'short'}}</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Estado</th>
              <td mat-cell *matCellDef="let message">
                <mat-icon [class.read]="message.read">
                  {{message.read ? 'mark_email_read' : 'mark_email_unread'}}
                </mat-icon>
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Acciones</th>
              <td mat-cell *matCellDef="let message">
                <button mat-icon-button color="primary" (click)="viewMessage(message)">
                  <mat-icon>visibility</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="deleteMessage(message.id)">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"
                [class.unread]="!row.read"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .messages-admin {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    mat-card {
      background-color: #112240;
      color: #ccd6f6;
    }

    mat-card-header {
      margin-bottom: 20px;

      mat-card-title {
        color: #64ffda;
      }
    }

    .messages-table {
      width: 100%;
      background-color: transparent;

      th {
        color: #64ffda;
        font-weight: 500;
      }

      td {
        color: #8892b0;
      }

      .mat-column-actions {
        width: 120px;
        text-align: center;
      }

      .mat-column-status {
        width: 80px;
        text-align: center;

        mat-icon {
          color: #8892b0;

          &.read {
            color: #64ffda;
          }
        }
      }

      tr.unread {
        background-color: rgba(100, 255, 218, 0.1);
      }
    }

    @media (max-width: 768px) {
      .messages-table {
        display: block;
        overflow-x: auto;
      }
    }
  `]
})
export class MessagesAdminComponent implements OnInit {
  messages: Message[] = [];
  displayedColumns: string[] = ['name', 'email', 'subject', 'date', 'status', 'actions'];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    // Aquí implementarías la carga de mensajes desde el backend
    this.messages = [
      {
        id: 1,
        name: 'Juan Pérez',
        email: 'juan@ejemplo.com',
        subject: 'Propuesta de trabajo',
        message: 'Me gustaría discutir una oportunidad de trabajo...',
        date: new Date('2024-03-15'),
        read: false
      },
      {
        id: 2,
        name: 'María García',
        email: 'maria@ejemplo.com',
        subject: 'Consulta sobre servicios',
        message: 'Estoy interesada en tus servicios de desarrollo...',
        date: new Date('2024-03-14'),
        read: true
      }
    ];
  }

  viewMessage(message: Message) {
    // Aquí implementarías la visualización del mensaje en un diálogo
    this.snackBar.open('Funcionalidad en desarrollo', 'Cerrar', {
      duration: 3000
    });
  }

  deleteMessage(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este mensaje?')) {
      // Aquí implementarías la eliminación del mensaje
      this.snackBar.open('Mensaje eliminado correctamente', 'Cerrar', {
        duration: 3000
      });
      this.loadMessages();
    }
  }
} 