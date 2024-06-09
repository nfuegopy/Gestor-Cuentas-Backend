import { Injectable } from '@nestjs/common';
import admin from '../firebase-admin';

@Injectable()
export class IngresoService {
    private db = admin.firestore();

    async addIngreso(usuarioId: string, categoriaId: string, fecha: string, monto: number, notas: string) {
        const ingreso = { usuarioId, categoriaId, fecha, monto, notas };
        await this.db.collection('ingresos').add(ingreso);
    }

    async getIngresos() {
        const snapshot = await this.db.collection('ingresos').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
}
