import { Injectable } from '@nestjs/common';
import admin from '../firebase-admin';

@Injectable()
export class UsuarioService {
    private db = admin.firestore();

    async addUsuario(nombre: string, correo: string) {
        const usuario = { nombre, correo };
        await this.db.collection('usuarios').add(usuario);
    }

    async getUsuarios() {
        const snapshot = await this.db.collection('usuarios').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
}
