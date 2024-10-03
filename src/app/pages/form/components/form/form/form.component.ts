import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UndoRedoService } from 'src/app/core/services/undo-redo/undo-redo.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup = new FormGroup({}); // Reactive form group

  constructor(private fb: FormBuilder, private UndoRedo: UndoRedoService) { }

  ngOnInit(): void {
    // Initialize the form with controls and their validators
    this.form = this.fb.group({
      email: ["", [Validators.email]], // Email field with email validation
      password: [""], // Password field
      agree: [false], // Checkbox for agreement
      gender: ["", Validators.required], // Gender field
      role: [""] // New role field
    });

    // Push the initial state to the undo stack
    this.UndoRedo.pushToUndoStack(this.form);

    // Track changes in the form
    // Subscribe to value changes in the form
    this.form.valueChanges.subscribe(() => {
      // Track changes only if not restoring a previous state
      this.UndoRedo.trackChanges(this.form);
    });
  }

  undo(): void {
    this.UndoRedo.undo(this.form);
  }

  redo(): void {
    this.UndoRedo.redo(this.form);
  }

  canUndo(): boolean {
    return this.UndoRedo.canUndo();
  }

  canRedo(): boolean {
    return this.UndoRedo.canRedo();
  }

  // Function Update the gender form control value
  selectRole(role: string) {
    this.form.get('role')?.setValue(role); // Set the role value
  }
}





// form: FormGroup = new FormGroup({}); // Reactive form group
// undoStack: any[] = []; // Stack to hold previous form states for undo functionality
// redoStack: any[] = []; // Stack to hold states that have been undone for redo functionality
// isRestoringState: boolean = false; // Flag to indicate if the form is currently restoring a previous state

// constructor(private fb: FormBuilder) { }

// ngOnInit(): void {
//   // Initialize the form with controls and their validators
//   this.form = this.fb.group({
//     email: ["", [Validators.email]], // Email field with email validation
//     password: [""], // Password field
//     agree: [false], // Checkbox for agreement
//     gender: ["", Validators.required], // Gender field
//     role: [""] // New role field
//   });

//   // Push the initial state to the undo stack
//   this.pushToUndoStack();

//   // Track changes in the form
//   // Subscribe to value changes in the form
//   this.form.valueChanges.subscribe(() => {
//     // Track changes only if not restoring a previous state
//     if (!this.isRestoringState) {
//       this.trackChanges();
//     }
//   });
// }

// // Separate function to push the current form state to the undo stack
// // Push the current form state to the undo stack
// private pushToUndoStack(): void {
//   // Push the current form state to the undo stack (deep clone to avoid reference issues)
//   this.undoStack.push(JSON.parse(JSON.stringify(this.form.value))); // Deep copy of current form value
//   // Push the initial state to the undo stack
//   //The use of JSON.parse(JSON.stringify(this.form.value)) is a common technique for creating a deep copy of the form's current state.  
//   //a common technique for creating a deep copy of the form's current state
//   // Shallow vs. Deep Copy
// }

// clearRedoStack() {
//   // Reset and Clear redo stack whenever a new action is performed
//   this.redoStack = [];
// }

// // Track changes to the form
// trackChanges(): void {
//   this.pushToUndoStack(); // Push current form state to undo stack
//   // Clear the redo stack since new changes invalidate redo history
//   this.clearRedoStack(); // Clear redo stack as new changes invalidate previous redo history
// }

// // Undo the last action
// undo(): void {
//   if (this.undoStack.length > 1) { // Keep the initial state in the stack // Ensure there's more than the initial state in the stack
//     this.isRestoringState = true; // Temporarily disable valueChanges // Temporarily disable valueChanges to avoid triggering events
//     // Push the current state to the redo stack
//     this.redoStack.push(JSON.parse(JSON.stringify(this.form.value)));
//     // Pop the previous state from the undo stack // Peek at the second last state
//     const previousState = this.undoStack[this.undoStack.length - 2]; // Peek the second last state
//     this.undoStack.pop(); // Remove the current state // Remove the current state from the undo stack
//     this.form.setValue(previousState); // Revert form to the previous state // Restore the form to the previous state
//     this.isRestoringState = false; // Re-enable valueChanges
//   }
// }


// // Redo the last undone action
// redo(): void {
//   if (this.redoStack.length > 0) { // Check if there's an action to redo
//     this.isRestoringState = true; // Temporarily disable valueChanges
//     // Push the current state to the undo stack
//     this.undoStack.push(JSON.parse(JSON.stringify(this.form.value)));
//     // Pop the next state from the redo stack
//     const nextState = this.redoStack.pop();
//     this.form.setValue(nextState); // Restore the form to the next state
//     this.isRestoringState = false; // Re-enable valueChanges
//   }
// }

// // Check if undo is possible
// canUndo(): boolean {
//   return this.undoStack.length > 1; // Disable undo if only the initial state is in the stack
//   // Allow undo if more than the initial state is in the stack
// }

// // Check if redo is possible
// canRedo(): boolean {
//   return this.redoStack.length > 0; // Allow redo if there's an action in the redo stack
// }

// // Function Update the gender form control value
// selectRole(role: string) {
//   this.form.get('role')?.setValue(role); // Set the role value
// }