import { Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { addDoc, updateDoc } from '@firebase/firestore';
import { Haberler } from '../models/Haberler';
import { Uye } from '../models/Uye';
import { Kategori } from '../models/Kategori';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FbservisService {

  public apiUrl = "http://localhost:3000/";
  public aktifUye: Uye = new Uye();;

  constructor(
    public fs: Firestore,
    public http: HttpClient

  ) { }

  OturumAc(mail: string, parola: string) {

    return this.http.get<Uye[]>(this.apiUrl + "users?mail=" + mail + "&parola=" + parola);
  }
  OturumKontrol() {
    if (localStorage.getItem("adsoyad")) {
      this.AktifUyeBilgi()
      return true;
    } else {
      return false;
    }
  }
  AktifUyeBilgi() {
    if (localStorage.getItem("adsoyad")) {
      this.aktifUye.adsoyad = localStorage.getItem("adsoyad") || "";
      var admin = localStorage.getItem("admin") || "0";
      this.aktifUye.admin = parseInt(admin);
    }
  }
  KategoriListele() {
    return this.http.get<Kategori[]>(this.apiUrl + "categories");
  }
  KategoriById(id: number) {
    return this.http.get<Kategori>(this.apiUrl + "categories/" + id);
  }
  KategoriEkle(kat: Kategori) {
    return this.http.post(this.apiUrl + "categories/", kat);
  }
  KategoriDuzenle(kat: Kategori) {
    return this.http.put(this.apiUrl + "categories/" + kat.id, kat);
  }
  KategoriSil(id: number) {
    return this.http.delete(this.apiUrl + "categories/" + id);
  }
  /* kategori servis bitiş*/

  /* Uye servis başla*/

  UyeListele() {
    return this.http.get<Uye[]>(this.apiUrl + "users");
  }
  UyeById(id: number) {
    return this.http.get<Uye>(this.apiUrl + "users/" + id);
  }
  UyeEkle(uye: Uye) {
    return this.http.post(this.apiUrl + "users/", uye);
  }
  UyeDuzenle(uye: Uye) {
    return this.http.put(this.apiUrl + "users/" + uye.id, uye);
  }
  UyeSil(id: number) {
    return this.http.delete(this.apiUrl + "users/" + id);
  }
  /* Uye servis bitiş*/


  /* Haber servis başla*/
  
  HaberleriListele() {
    return this.http.get<Haberler[]>(this.apiUrl + "news");
  }
  HaberleriListeleByKatId(katId: number) {
    return this.http.get<Haberler[]>(this.apiUrl + "categories/" + katId + "/news");
  }
  HaberlerById(id: number) {
    return this.http.get<Haberler>(this.apiUrl + "news/" + id);
  }
  HaberiEkle(hab: Haberler) {
    return this.http.post(this.apiUrl + "news/", hab);
  }
  HaberiDuzenle(hab: Haberler) {
    return this.http.put(this.apiUrl + "news/" + hab.id, hab);
  }
  HaberiSil(id: number) {
    return this.http.delete(this.apiUrl + "news/" + id);
  }
  /* Haber servis bitiş*/
}
