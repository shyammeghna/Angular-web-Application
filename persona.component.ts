import { Component, OnInit } from '@angular/core';
import { MessageService } from "primeng/api";
import { ButtonModule } from 'primeng/button';
import { PersonaService } from "../../services/persona.service";
import { Persona } from "../../entities/Persona";

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  persona: Persona[];
  disabled: boolean;
  display: string;
  qrcode: any;
  personas: Persona;
  displays: boolean = false;
  datas: string[] = [];
  ri: number;
  allowEmptyString: boolean;

  //showDialog box details on button click in persona list
  showDialog(ri: number) {
    this.displays = true;
    this.ri = ri;
    this.getDetailById(ri);
  }


  getRi() {
    return this.ri;
  }

  // Get the details from persona id (on QR code)

  private getDetailById(ri: number) {
    this.personas = this.persona[ri];
  }
  protected isValidQrCodeText = (data: string): boolean => {
    if (this.allowEmptyString === false) {
      return !(typeof data === 'undefined' || data === '');
    }
    return !(typeof data === 'undefined');
  }

  constructor(private buttonModule: ButtonModule, private messageService: MessageService, private personaService: PersonaService) {
  }

  onPress() {
    if (this.disabled == false) {

      this.personaService.getListDisabledPersona().subscribe(res => {

        if (res.status === 200) {
          this.persona = res.body;
        }

      },
        error => {
          if (error) {

            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Échec de l’opération : veuillez réessayer'
            });

          }
        },
        () => {
        })
      this.disabled = true;
      this.display = "Montrer Actif";
    } else {
      this.personaService.getListEnabledPersona().subscribe(res => {
        if (res.status === 200) {
          this.persona = res.body;
        }

      },
        error => {
          if (error) {

            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Échec de l’opération : veuillez réessayer'
            });

          }
        },
        () => {
        })
      this.disabled = false;
      this.display = "Montrer Inactif";
    }

  }

  ngOnInit() {

    this.disabled = false;
    this.display = "Montrer Inactif";

    this.personaService.getListEnabledPersona().subscribe(res => {

      if (res.status === 200) {
        this.persona = res.body;
        if (!this.isValidQrCodeText(this.datas[''])) {
          this.transformPersonaOnQrCode(this.persona);

        }
      }
  

    },
      error => {
        if (error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Échec de l’opération : veuillez réessayer'
          });

        }
      },
      () => {})

  }

  //Get the following information from QR code

  transformPersonaOnQrCode(persona: Persona[]) {
    for (let i = 0; i < persona.length; i++) {
      this.datas.push("id = " + persona[i].id + " \n"
        + " Prénom = " + persona[i].firstName + " \n"
        + "Nom = " + persona[i].lastName + " \n"
        + "2e nom = " + persona[i].middleName + " \n"
        + " Nom public = " + persona[i].publicName + " \n"
        + " Email = " + persona[i].mail + " \n"
        + " Genre= " + persona[i].gender + " \n"
        + " Numéro personnel = " + persona[i].personalNumber
      )
    }
  }
}
