import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// CoreUI Modules
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
// Iconos requeridos para la UI
import { cilCommentSquare, cilSave, cilCalendar } from '@coreui/icons';

import { InteractionService } from '../../services/interaction.service';
import { InteractionTypeService } from '../../services/interactiontype.service';
import { InteractionType } from '../../models/interactiontype.model';
import { Interaction } from '../../models/interaction.model';

@Component({
  selector: 'app-interaction-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GridModule,
    FormModule,
    ButtonModule,
    CardModule, // Necesario para la tarjeta
    IconModule  // Necesario para los iconos
  ],
  providers: [IconSetService],
  templateUrl: './interaction-form.component.html',
})
export class InteractionFormComponent implements OnInit {
  
  @Input() contactId!: number;
  @Input() dealId?: number;
  @Output() interactionSaved = new EventEmitter<Interaction>();

  interactionForm: FormGroup;
  interactionTypes: InteractionType[] = [];

  constructor(
    private fb: FormBuilder,
    private interactionService: InteractionService,
    private interactionTypeService: InteractionTypeService,
    public iconSet: IconSetService
  ) {
    // Registramos iconos para usarlos en el HTML
    this.iconSet.icons = { cilCommentSquare, cilSave, cilCalendar };

    this.interactionForm = this.fb.group({
      interactionTypeId: [null, Validators.required],
      notes: ['', Validators.required],
      date: [this.getTodayDateString(), Validators.required],
    });
  }

  ngOnInit(): void {
    this.interactionTypeService.getInteractionTypes().subscribe(data => {
      this.interactionTypes = data;
    });
  }

  onSubmit(): void {
    if (this.interactionForm.invalid) {
      this.interactionForm.markAllAsTouched();
      return;
    }

    const newInteractionData: Omit<Interaction, 'id'> = {
      ...this.interactionForm.value,
      contactId: this.contactId,
    };
    
    if (this.dealId) {
      newInteractionData.dealId = this.dealId;
    }

    this.interactionService.addInteraction(newInteractionData).subscribe((savedInteraction) => {
      this.interactionSaved.emit(savedInteraction);
      this.resetForm();
    });
  }
  
  // Función auxiliar para limpiar formulario tras guardar o al dar click en limpiar
  resetForm(): void {
    this.interactionForm.reset({
      interactionTypeId: null,
      notes: '',
      date: this.getTodayDateString(),
    });
    this.interactionForm.markAsPristine();
    this.interactionForm.markAsUntouched();
  }

  private getTodayDateString(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}