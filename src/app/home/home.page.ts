import { Component } from '@angular/core';
import { Movil } from '../movil';
import {FirestoreService} from '../firestore.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  movilEditando: Movil;
  arrayColeccionMoviles: any = [{
    id: "",
    data: {} as Movil
   }];

  idMovilSelec:string;
  selecMovil(movilSelec) {
    console.log("Tarea seleccionada: ");
    console.log(movilSelec);
    this.idMovilSelec = movilSelec.id;
    this.movilEditando.titulo = movilSelec.data.titulo;
    this.movilEditando.descripcion = movilSelec.data.descripcion;
  }

  constructor(private firestoreService: FirestoreService) {
    // Crear un movil vacio al empezar 
    this.movilEditando = {} as Movil;
    this.obtenerListaMoviles();
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
    this.firestoreService.borrar("tareas", this.idMovilSelec).then(() => {
      // Actualizar la lista completa
      this.obtenerListaMoviles();
      // Limpiar datos de pantalla
      this.movilEditando = {} as Movil;
    })
  }
  clicBotonModificar() {
    this.firestoreService.actualizar("tareas", this.idMovilSelec, this.movilEditando).then(() => {
      // Actualizar la lista completa
      this.obtenerListaMoviles();
      // Limpiar datos de pantalla
      this.movilEditando = {} as Movil;
    })
  }



  obtenerListaMoviles(){
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
}

