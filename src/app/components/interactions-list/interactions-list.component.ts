import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

// CoreUI Modules
import { CardModule, ListGroupModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

// App Services and Models
import { Interaction } from '../../models/interaction.model';
import { InteractionType } from '../../models/interactiontype.model';
import { InteractionService } from '../../services/interaction.service';
import { InteractionTypeService } from '../../services/interactiontype.service';

@Component({
  selector: 'app-interactions-list',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ListGroupModule,
    IconModule
  ],
  templateUrl: './interactions-list.component.html',
})
export class InteractionsListComponent implements OnInit, OnChanges {
  // Recibe el ID del contacto desde un componente padre.
  @Input() contactId?: number;

  public interactions: Interaction[] = [];
  private interactionTypes = new Map<number, InteractionType>();

  constructor(
    private interactionService: InteractionService,
    private interactionTypeService: InteractionTypeService
  ) {}

  ngOnInit(): void {
    // Carga los tipos de interacción una sola vez.
    this.interactionTypeService.getInteractionTypes().subscribe(types => {
      types.forEach(type => this.interactionTypes.set(type.id, type));
    });
  }
  
  // Se ejecuta cada vez que el valor de un @Input cambia.
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contactId'] && this.contactId) {
      this.loadInteractions();
    }
  }

  loadInteractions(): void {
    if (!this.contactId) return;

    this.interactionService.getInteractionsByContactId(this.contactId).subscribe(data => {
      // Ordenar por fecha, de más reciente a más antiguo
      this.interactions = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  }

  getInteractionType(id: number): InteractionType | undefined {
    return this.interactionTypes.get(id);
  }
}