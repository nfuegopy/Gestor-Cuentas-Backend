import { Injectable } from '@nestjs/common';
import admin from '../firebase-admin';

@Injectable()
export class GastoService {
    private db = admin.firestore();

    async addGasto(usuarioId: string, categoriaId: string, frecuenciaId: string, fecha: string, monto: number, notas: string) {
        const gasto = { usuarioId, categoriaId, frecuenciaId, fecha, monto, notas };
        await this.db.collection('gastos').add(gasto);
    }

    async getGastos() {
        const snapshot = await this.db.collection('gastos').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
}
