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
  
  async clicAlertConfirmar() {
    const alert = await this.alertController.create({
     // cssClass: 'my-custom-class',
      header: 'Confirmar Borrado',
      message: '¿Desea borrar el movil ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirmar Cancelar: blah');
            this.router.navigate(["/home/"]);
            
          }
        }, 
        {
          text: 'OK',
          handler: () => {
            this.firestoreService.borrar("moviles", this.id).then(() => {
              // Limpiar datos de pantalla
              this.document.data = {} as Movil;
              this.router.navigate(["/home/"]);
            console.log('¿Seguro que desea borrar a' + this.document.data.nombre);
            })
          }
        
          }
    
      ]
    });
    await alert.present();
 }
  
  clicBotonInsertar() {
    this.firestoreService.insertar("moviles", this.document.data).then(() => {
      console.log('movil creado correctamente!');
      this.document.data = {} as Movil;
      this.router.navigate(["/home/"]);
    }, (error) => {
      console.error(error);
    });
  }
  

}

