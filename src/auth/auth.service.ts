import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import admin from '../firebase-admin';
import * as firebase from 'firebase/app';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "your_api_key",
    authDomain: "your_project_id.firebaseapp.com",
    projectId: "your_project_id",
    storageBucket: "your_project_id.appspot.com",
    messagingSenderId: "your_messaging_sender_id",
    appId: "your_app_id"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

@Injectable()
export class AuthService {
    private db = admin.firestore();

    constructor(private readonly jwtService: JwtService) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const userSnapshot = await this.db.collection('users').where('email', '==', email).get();
        if (!userSnapshot.empty) {
            const user = userSnapshot.docs[0].data();
            const isPasswordMatching = await bcrypt.compare(pass, user.password);
            if (isPasswordMatching) {
                const { password, ...result } = user;
                return result;
            }
        }
        return null;
    }

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);
        if (user) {
            const payload = { email: user.email, sub: user.uid };
            return {
                access_token: this.jwtService.sign(payload),
            };
        } else {
            throw new Error('Invalid credentials');
        }
    }

    async register(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { email, password: hashedPassword };
        const userRef = await this.db.collection('users').add(newUser);
        return { id: userRef.id, ...newUser };
    }

    async googleLogin(idToken: string) {
        const credential = GoogleAuthProvider.credential(idToken);
        const firebaseUser = await signInWithCredential(auth, credential);
        const userSnapshot = await this.db.collection('users').doc(firebaseUser.user!.uid).get();
        if (!userSnapshot.exists) {
            const newUser = {
                email: firebaseUser.user!.email,
                uid: firebaseUser.user!.uid
            };
            await this.db.collection('users').doc(firebaseUser.user!.uid).set(newUser);
        }
        const payload = { email: firebaseUser.user!.email, sub: firebaseUser.user!.uid };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
