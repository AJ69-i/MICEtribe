import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", loadChildren: () =>import("./pages/form/form.module").then((m) => m.FormModule)},
  {path: "**", loadChildren: () =>import("./pages/form/form.module").then((m) => m.FormModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
