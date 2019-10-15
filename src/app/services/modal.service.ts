import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

declare const Metro: any;

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private types: string[] = ['creado', 'editado', 'borrado'];

  constructor(private _router: Router) {}

  public successModal(
    type: number,
    data: any,
    redirect: string,
    params?: number
  ): void {
    Metro.dialog.create({
      title: `¡Registro ${this.types[type]}!`,
      content: `<div>${data} se ha ${this.types[type]} exitosamente.</div>`,
      clsDialog: 'success animated zoomIn faster',
      onClose: () => {
        if (params) {
          this._router.navigate([redirect, params]);
        } else {
          this._router.navigateByUrl(redirect);
        }
      }
    });
  }

  public errorModal(type: number): void {
    Metro.dialog.create({
      title: `¡Ha ocurrido un error!`,
      content: `<div>No se ha ${this.types[type]} el registro. Intentelo nuevamente.</div>`,
      clsDialog: 'alert animated zoomIn faster'
    });
  }

  public errorLoginModal(): void {
    Metro.dialog.create({
      title: `¡Ha ocurrido un error!`,
      content: `<div>Tal parece que los datos del usuario son incorrectos. Intentelo nuevamente.</div>`,
      clsDialog: 'alert animated zoomIn faster'
    });
  }

  public deleteModal(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      Metro.dialog.create({
        title: `¿Desea eliminar este registro?`,
        content: `<div>Si se elimina este registro, no podrá recuperar la información correspondiente a éste.</div>`,
        clsDialog: 'warning animated zoomIn faster',
        actions: [
          {
            caption: 'Aceptar',
            cls: 'js-dialog-close warning',
            onclick: () => {
              resolve(true);
            }
          },
          {
            caption: 'Cancelar',
            cls: 'js-dialog-close',
            onclick: () => {
              resolve(false);
            }
          }
        ]
      });
    });
  }

  public noDataModal(table: string, redirect: string): void {
    Metro.dialog.create({
      title: `¡No tiene ningún ${table} registrado!`,
      content: `<div>Es necesario tener al menos un ${table} para continuar.</div>`,
      clsDialog: 'primary animated zoomIn faster',
      onClose: () => this._router.navigate([redirect, 'new'])
    });
  }
}
