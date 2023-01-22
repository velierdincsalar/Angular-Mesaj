import { ActivatedRoute } from '@angular/router';
import { Kategori } from './../../models/Kategori';
import { Haberler } from './../../models/Haberler';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from './../../models/Sonuc';
import { MytoastService } from './../../services/mytoast.service';
import { FbservisService } from 'src/app/services/fbservis.service';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-haberler',
  templateUrl: './haberler.component.html',
  styleUrls: ['./haberler.component.scss']
})
export class HaberlerComponent implements OnInit {
  Haberler!: Haberler[];
  kategoriler!: Kategori[];
  modal!: Modal;
  modalBaslik: string = "";
  secHab!: Haberler;
  katId: number = 0;
  secKat: Kategori = new Kategori();
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    basligi: new FormControl(),
    categoryId: new FormControl(),
    yaytarihi: new FormControl(),
    duztarih: new FormControl(),
  });
  constructor(
    public servis: FbservisService,
    public toast: MytoastService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((p: any) => {
      if (p.katId) {
        this.katId = p.katId;
        this.KategoriGetir();

      }
    });
    this.HaberleriListele();
  }
  KatSec(katId: number) {
    this.katId = katId;
    this.KategoriGetir();

  }

  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({
      categoryId: this.katId
    });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Haberi Ekle";
    this.modal.show();
  }
  Duzenle(hab: Haberler, el: HTMLElement) {
    this.frm.patchValue(hab);
    this.modalBaslik = "Haberi Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(hab: Haberler, el: HTMLElement) {
    this.secHab = hab;
    this.modalBaslik = "Haberi Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  HaberleriListele() {
    this.servis.HaberleriListeleByKatId(this.katId).subscribe(d => {
      this.Haberler = d;
    });
  }
  KategoriListele() {
    this.servis.KategoriListele().subscribe(d => {
      this.kategoriler = d;
    });
  }
  KategoriGetir() {
    this.servis.KategoriById(this.katId).subscribe(d => {
      this.secKat = d;
      this.HaberleriListele();
    });
  }
  HaberlerEkleDuzenle() {
    var hab: Haberler = this.frm.value
    var tarih = new Date();
    if (!hab.id) {
      var filtre = this.Haberler.filter(s => s.basligi == hab.basligi);
      if (filtre.length > 0) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Girilen Haber Kayıtlıdır!";
        this.toast.ToastUygula(this.sonuc);
      } else {
        hab.yaytarih = tarih.getTime().toString();
        hab.duztarih = tarih.getTime().toString();
        this.servis.HaberiEkle(hab).subscribe(d => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = "Haber Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.HaberleriListele();
          this.modal.toggle();
        });
      }
    } else {
      hab.duztarih = tarih.getTime().toString();
      this.servis.HaberiDuzenle(hab).subscribe(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Haber Düzenlendi";
        this.toast.ToastUygula(this.sonuc);
        this.HaberleriListele();
        this.modal.toggle();
      });
    }

  }
  HaberiSil() {
    this.servis.HaberiSil(this.secHab.id).subscribe(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Haber Silindi";
      this.toast.ToastUygula(this.sonuc);
      this.HaberleriListele();
      this.modal.toggle();
    });
  }
}
