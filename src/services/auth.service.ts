
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import {IUser} from '../provider/user';
import {Storage} from '@ionic/storage';

@Injectable()
export class AuthService {
	user:IUser = {
		email:""
	};
	constructor(public afAuth: AngularFireAuth,
		private storage:Storage
		) {
		afAuth.authState.subscribe(user => {
			this.storage.get('user').then( (user)=>{
				/*this.user = user.toJSON()*/;
				console.log(this.user);
			})

		});
	}

	signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password).then(
				 ()=> 	
				 {
						 return this.afAuth.authState.subscribe(user => {
							 this.storage.set('user',JSON.stringify(user));
							 this.user = credentials;
							 console.log(this.user);
						 });
					 }
			 );
	}

	signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
	}
	authenticated() {
		return this.storage.get('user').then( credentials =>
			JSON.parse(credentials));
	}
	getEmail() {
		return this.user && this.user.email;
	}
	signOut() {
		console.log(this.user);
		this.user= null;
		this.storage.remove('user');
		//return this.afAuth.auth.signOut();
	}
	signInWithGoogle() {
		console.log('Sign in with google');
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
	}

	private oauthSignIn(provider: AuthProvider) {
		if (!(<any>window)) {
			return this.afAuth.auth.signInWithPopup(provider);
		} else {
			return this.afAuth.auth.signInWithRedirect(provider)
			.then(() => {
				return this.afAuth.auth.getRedirectResult().then( result => {
					// This gives you a Google Access Token.
					// You can use it to access the Google API.
					let token = result.credential;
					// The signed-in user info.
					let user = result.user;
					console.log(token, user);
				}).catch(function(error) {
					// Handle Errors here.
					alert(error.message);
				});
			});
		}
	}
}