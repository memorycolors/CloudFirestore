import { Component, OnInit } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { FirestoreService } from '../firestore.service';
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { Movil } from '../movil';

@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.page.html',
  styleUrls: ['./pagina2.page.scss'],
})
export class Pagina2Page implements OnInit {

  id = null;
  movilEditando = null;

  document: any = {
    id: "",
    data: {} as Movil
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private firestoreService: FirestoreService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.firestoreService.consultarPorId("moviles", this.id).subscribe((resultado) => {
      // Preguntar si se hay encontrado un document con ese ID
      if (resultado.payload.data() != null) {
        this.document.id = resultado.payload.id
        this.document.data = resultado.payload.data();

      } else {
        // No se ha encontrado un document con ese ID. Vaciar los datos que hubiera
        this.document.data = {} as Movil;
      }
    });

  }

  clicBotonModificar() {
    this.firestoreService.actualizar("moviles", this.id, this.document.data).then(() => {
      // Actualizar la lista completa
      console.log("Id: " + this.id);
      console.log(this.document.data);
      // Limpiar datos de pantalla
      this.document.data = {} as Movil;
      this.router.navigate(["/home/"]);

    })
  }
  clicBotonBorrar() {
    this.firestoreService.borrar("moviles", this.id).then(() => {
      // Limpiar datos de pantalla
      this.document.data = {} as Movil;
      this.router.navigate(["/home/"]);
    })
  }

  clicBotonInsertar() {
    this.firestoreService.insertar("moviles", this.document.data).then(() => {
      console.log('movil creado correctamente!');
      this.document.data = {} as Movil;
      this.document.data.repetidor = false;
      this.router.navigate(["/home/"]);
    }, (error) => {
      console.error(error);
    });
  }
}








/* const routes: Routes = [
   { path: "", redirectTo: "home", pathMatch: "full" },
   { path: "home", loadChildren: "./home/home.module#HomePageModule" },
   { path: "pagina2/:id", loadChildren: "./pagina2/pagina2.module#Pagina2PageModule" }
 ];*/


