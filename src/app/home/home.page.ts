import { Component } from '@angular/core';
import { Movil } from '../movil';
import { FirestoreService } from '../firestore.service';
import { Router } from "@angular/router";



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  movilEditando: Movil;

  idMovilSelec: string;

  arrayColeccionMoviles: any = [{
    id: "",
    data: {} as Movil
  }];


  

  constructor(
    private firestoreService: FirestoreService,
    private router: Router,)
    {

    // Crear un movil vacio al empezar 
    this.movilEditando = {} as Movil;
    this.obtenerListaMoviles();
  }

  navigateToMovil() {
    this.router.navigate(["/pagina2/", this.idMovilSelec]);
  }
  navigateToAdd() {
    this.router.navigate(["/pagina2/", "nuevo"]);
  }

  obtenerListaMoviles() {
    this.firestoreService.consultar("moviles").subscribe((resultadoConsultaMoviles) => {
      this.arrayColeccionMoviles = [];
      resultadoConsultaMoviles.forEach((datosMovil: any) => {
        this.arrayColeccionMoviles.push({
          id: datosMovil.payload.doc.id,
          data: datosMovil.payload.doc.data()
        });
      })
    });

  }

  selecMovil(movilSelec) {
    console.log("Tarea seleccionada: ");
    console.log(movilSelec);
    this.idMovilSelec = movilSelec.id;
    this.movilEditando.titulo = movilSelec.data.titulo;
    this.movilEditando.descripcion = movilSelec.data.descripcion;
    this.movilEditando.precio = movilSelec.data.precio;
    this.movilEditando.fechasalida = movilSelec.data.fechasalida;

  }
  clicBotonInsertar() {
    this.firestoreService.insertar("moviles", this.movilEditando)
      .then(() => {
        console.log("Movil creado con exito")
        // Limpiar el contenido de los moviles que se estaban editando 
        this.movilEditando = {} as Movil;
      }, (error) => {
        console.error(error);
      });
  }

  clicBotonBorrar() {
    this.firestoreService.borrar("moviles", this.idMovilSelec).then(() => {
      // Actualizar la lista completa
      this.obtenerListaMoviles();
      // Limpiar datos de pantalla
      this.movilEditando = {} as Movil;

    });

  }
  clicBotonModificar() {
    this.firestoreService.actualizar("moviles", this.idMovilSelec, this.movilEditando).then(() => {
      // Actualizar la lista completa
      this.obtenerListaMoviles();
      // Limpiar datos de pantalla
      this.movilEditando = {} as Movil;
    });
  }
  


  

}