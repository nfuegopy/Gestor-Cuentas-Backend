import { Injectable } from '@nestjs/common';
import admin from '../firebase-admin';

@Injectable()
export class FrecuenciaService {
    private db = admin.firestore();

    async addFrecuencia(descripcion: string) {
        const frecuencia = { descripcion };
        await this.db.collection('frecuencias').add(frecuencia);
    }

    async getFrecuencias() {
        const snapshot = await this.db.collection('frecuencias').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
}
