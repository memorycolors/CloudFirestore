import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Movil } from '../movil';
import { FirestoreService } from '../firestore.service';

import { Router } from "@angular/router";

@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.page.html',
  styleUrls: ['./pagina2.page.scss'],
})
export class Pagina2Page implements OnInit {
  id = null;

  document: any = {
    id: "",
    data: {} as Movil
  };

  constructor(private activatedRoute: ActivatedRoute, private firestoreService: FirestoreService, private router: Router) { 

  }

  ngOnInit() {
   //Recoge el id y el tipo de acción que realizamos
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    console.log(this.id);

    this.firestoreService.consultarPorId("moviles", this.id).subscribe((resultado) => {

      // Preguntar si se hay encontrado un document con ese ID
      if(resultado.payload.data() != null) {
        this.document.id = resultado.payload.id
        this.document.data = resultado.payload.data();
        console.log("datos encontrados");

        // Como ejemplo, mostrar el título de la tarea en consola
        console.log(this.document.data.titulo);
      } else {
        
        // No se ha encontrado un document con ese ID. Vaciar los datos que hubiera
        this.document.data = {} as Movil;
        console.log("datos no encontrados");
      } 
    });
  } 

  clicBotonBorrar() {
    //Borramos el movil
    this.firestoreService.borrar("moviles", this.id).then(() => {
      // Limpiar datos de pantalla
      this.document.data = {} as Movil;
      //Cuando eliminemos el artículo volvemos a home
      this.router.navigate(["/home"]); 
    })
  }

  clicBotonModificar() {
    //Modificamos el Movil seleccionado
    this.firestoreService.actualizar("moviles", this.id, this.document.data).then(() => {
      // Limpiar datos de pantalla
      this.document.data = {} as Movil;
    })
  }

  clicBotonInsertar() {
    //Inserta un objeto de tipo Movil en la base de datos, llamando al método insertar (en el archivo firestore.service.ts)
    this.firestoreService.insertar("moviles", this.document.data).then(() => {
      console.log('Movil creada correctamente!');
      //Limpiamos el contenido de la Movil que se estaba editando en el navegador
      this.document.data= {} as Movil;
    }, (error) => {
      console.error(error);//Si da error
    });
    //Cuando creemos el artículo volvemos a home
    this.router.navigate(["/home"]); 
  }
 

}