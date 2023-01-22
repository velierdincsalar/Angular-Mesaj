import { Uye } from './../../models/Uye';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { Sonuc } from 'src/app/models/Sonuc';
import { FbservisService } from 'src/app/services/fbservis.service';
import { MytoastService } from 'src/app/services/mytoast.service';
import {   combineLatest,from, Observable, of, switchMap } from 'rxjs';
import { Uyenew } from 'src/app/models/Uyenew';
import { newUye } from 'src/app/models/newUye';
import { HotToastService } from '@ngneat/hot-toast';

import { UsersService } from 'src/app/services/users.service';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  query,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-uye',
  templateUrl: './uye.component.html',
  styleUrls: ['./uye.component.scss']
})
export class UyeComponent implements OnInit {

  uyeler!: Uye[];
  uyeler2!: newUye[];
  modal!: Modal;
  modalBaslik: string = "";
  secUye!: Uye;
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    adsoyad: new FormControl(),
    mail: new FormControl(),
    admin: new FormControl(),
    parola: new FormControl(),
    kaytarih: new FormControl(),
    duztarih: new FormControl(),
  });
  constructor(
    public fireAuth: AuthenticationService,
    public firestore : Firestore,
    public servis: FbservisService,
    public toast: MytoastService,
    public hotToast: HotToastService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.UyeListele();

  }
  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({ admin: 0 });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Üye Ekle";
    this.modal.show();
  }
  Duzenle(uye: Uye, el: HTMLElement) {
    this.frm.patchValue(uye);
    this.modalBaslik = "Üye Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(uye: Uye, el: HTMLElement) {
    this.secUye = uye;
    this.modalBaslik = "Üye Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  UyeListele() {
 
    this.allUsers().subscribe(d => {
      this.uyeler2 = d;
    });
  }

  allUsers(): Observable<newUye[]> {
    const ref = collection(this.firestore, 'users');
    const queryAll = query(ref);
    return collectionData(queryAll) as Observable<newUye[]>;
  }
  addUser(){
   
    var uye: Uyenew = this.frm.value
    var adsoyad= uye.mail.split("@")[0];
    var mail = uye.mail;
    var parola = uye.parola;
    var admin =0;
    this.fireAuth
    .signUp(uye.mail, uye.parola)
    .pipe(
      switchMap(({ user : { uid } }) =>
    
        this.addUserServis({ uid , adsoyad , mail , parola, admin})
      ),
      this.hotToast.observe({
        success: 'Congrats! You are all signed up',
        loading: 'Signing in',
        error: ({ message }) => `${message}`,
      })
    
    )
    .subscribe(d => {
      localStorage.setItem("adsoyad", "havva");
      localStorage.setItem("admin", "1");
      location.href = "/";
    });

   

  }
  addUserServis(uye: Uyenew): Observable<any> {
    const ref = doc(this.firestore, 'uye', uye?.uid);
    return from(setDoc(ref, uye));
  }




  UyeEkleDuzenle() {
    var uye: Uye = this.frm.value
    var tarih = new Date();
    if (!uye.id) {
      var filtre = this.uyeler.filter(s => s.mail == uye.mail);
      if (filtre.length > 0) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Girilen E-Posta Adresi Kayıtlıdır!";
        this.toast.ToastUygula(this.sonuc);
      } else {
        uye.kaytarih = tarih.getTime().toString();
        uye.duztarih = tarih.getTime().toString();
        this.servis.UyeEkle(uye).subscribe(d => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = "Uye Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.UyeListele();
          this.modal.toggle();
        });
      }
    } else {
      uye.duztarih = tarih.getTime().toString();
      this.servis.UyeDuzenle(uye).subscribe(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Üye Düzenlendi";
        this.toast.ToastUygula(this.sonuc);
        this.UyeListele();
        this.modal.toggle();
      });
    }

  }

  UyeSil() {
      /*
    this.servis.UyeSil(this.secUye.id).subscribe(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Üye Silindi";
      this.toast.ToastUygula(this.sonuc);
      this.UyeListele();
      this.modal.toggle();
    });
      */
  }

}
