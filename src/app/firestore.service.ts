import { Injectable } from '@angular/core';

import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  consultaPorId(arg0: string, id: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private angularFIrestore: AngularFirestore) { }

  public insertar(coleccion,datos){
    return  this.angularFIrestore.collection(coleccion).add(datos)
  } 
  public consultar(coleccion){
    return this.angularFIrestore.collection(coleccion).snapshotChanges();
  }
  public borrar(coleccion, documentId) {
    return this.angularFIrestore.collection(coleccion).doc(documentId).delete();
  }
  public actualizar(coleccion, documentId, datos) {
    return this.angularFIrestore.collection(coleccion).doc(documentId).set(datos);
   }
   public consultarPorId(coleccion, documentId) {
    return this.angularFIrestore.collection(coleccion).doc(documentId).snapshotChanges();
  }
}

