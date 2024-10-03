import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UndoRedoService {

  private undoStack: any[] = []; // Stack to hold previous form states for undo functionality
  private redoStack: any[] = []; // Stack to hold states that have been undone for redo functionality
  isRestoringState: boolean = false; // Flag to indicate if the form is currently restoring a previous state

  constructor() { }

  // Push the current form state to the undo stack
  pushToUndoStack(form: FormGroup): void {
    this.undoStack.push(JSON.parse(JSON.stringify(form.value))); // Deep copy of current form value
    // Push the current form state to the undo stack (deep clone to avoid reference issues)
    // Push the initial state to the undo stack
    //The use of JSON.parse(JSON.stringify(this.form.value)) is a common technique for creating a deep copy of the form's current state.  
    //a common technique for creating a deep copy of the form's current state
    // Shallow vs. Deep Copy
  }

  clearRedoStack(): void {
    // Reset and Clear redo stack whenever a new action is performed
    this.redoStack = []; // Reset redo stack
  }

  // Track changes to the form
  trackChanges(form: FormGroup): void {
    if (!this.isRestoringState) {
      this.pushToUndoStack(form); // Push current form state to undo stack
      // Clear the redo stack since new changes invalidate redo history
      this.clearRedoStack(); // Clear redo stack as new changes invalidate previous redo history
    }
  }


  // Undo the last action
  undo(form: FormGroup): void {
    if (this.undoStack.length > 1) { // Keep the initial state in the stack // Ensure there's more than the initial state in the stack
      this.isRestoringState = true; // Temporarily disable valueChanges // Temporarily disable valueChanges to avoid triggering events
      // Push the current state to the redo stack
      this.redoStack.push(JSON.parse(JSON.stringify(form.value)));
      // Pop the previous state from the undo stack // Peek at the second last state
      const previousState = this.undoStack[this.undoStack.length - 2]; // Peek the second last state
      this.undoStack.pop(); // Remove the current state // Remove the current state from the undo stack
      form.setValue(previousState); // Revert form to the previous state // Restore the form to the previous state
      this.isRestoringState = false; // Re-enable valueChanges
    }
  }


  // Redo the last undone action
  redo(form: FormGroup): void {
    if (this.redoStack.length > 0) { // Check if there's an action to redo
      this.isRestoringState = true; // Temporarily disable valueChanges
      // Push the current state to the undo stack
      this.undoStack.push(JSON.parse(JSON.stringify(form.value)));
      // Pop the next state from the redo stack
      const nextState = this.redoStack.pop();
      form.setValue(nextState); // Restore the form to the next state
      this.isRestoringState = false; // Re-enable valueChanges
    }
  }

  // Check if undo is possible
  canUndo(): boolean {
    return this.undoStack.length > 1; // Disable undo if only the initial state is in the stack
    // Allow undo if more than the initial state is in the stack
  }

  // Check if redo is possible
  canRedo(): boolean {
    return this.redoStack.length > 0; // Allow redo if there's an action in the redo stack
  }


  //     // Redo the last undone action
  // redo(form: FormGroup): void {
  //   if (this.redoStack.length > 0) { // Check if there's an action to redo
  //     this.isRestoringState = true; // Temporarily disable valueChanges
  //     try {
  //       // Push the current state to the undo stack
  //       this.undoStack.push(JSON.parse(JSON.stringify(form.value)));
  //       // Pop the next state from the redo stack
  //       const nextState = this.redoStack.pop();
  //       // Restore the form to the next state
  //       form.setValue(nextState); // Restore the form to the next state
  //     } catch (error) {
  //       console.error('Error during redo:', error); // Handle any errors that may occur
  //     } finally {
  //       this.isRestoringState = false; // Re-enable valueChanges
  //     }
  //   }
  // }

}
