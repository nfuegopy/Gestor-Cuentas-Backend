import { Injectable } from '@nestjs/common';
import admin from '../firebase-admin';

@Injectable()
export class CategoriaService {
    private db = admin.firestore();

    async addCategoria(nombre: string, tipo: string) {
        const categoria = { nombre, tipo };
        await this.db.collection('categorias').add(categoria);
    }

    async getCategorias() {
        const snapshot = await this.db.collection('categorias').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
}
