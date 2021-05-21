export class Persona {
  id: number;
  enable: boolean;
  personalNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  publicName: string;
  birthDate: Date;
  nationality: string;
  gender: string;
  mail: string;
  phone: string;
  address: string;
  manager: string;
  position: string;
  photo: string;
  subscription: string;
  globalRating: number;
  eligibility: string;
  listSkill: PersonaSkills[];

   constructor(persona?: Persona) {

    if (persona){
      this.id = persona.id;
      this.enable = persona.enable;
      this.personalNumber = persona.personalNumber;
      this.firstName = persona.firstName;
      this.middleName = persona.middleName;
      this.lastName = persona.lastName;
      this.publicName = persona.publicName;
      this.birthDate = new Date(persona.birthDate);
      this.nationality = persona.nationality;
      this.gender = persona.gender;
      this.mail = persona.mail;
      this.phone = persona.phone;
      this.address = persona.address;
      this.manager = persona.manager;
      this.position = persona.position;
      this.photo = persona.photo;
      this.subscription = persona.subscription;
      this.globalRating = persona.globalRating;
      this.eligibility = persona.eligibility;
      this.listSkill = persona.listSkill;



      for (let i=0; i< this.listSkill.length; i++){
        this.listSkill[i].startDate = new Date(this.listSkill[i].startDate);
        this.listSkill[i].endDate = new Date(this.listSkill[i].endDate);
      }


    }
    else{
      this.enable = true;
      this.personalNumber = Math.random().toString(36).substr(2, 9);  // Generate a random unique string chain
      this.middleName = "";
      this.publicName = "";
      this.birthDate = null;
      this.nationality = "";
      this.phone = "";
      this.address = "";
      this.manager = "";
      this.position = "";
      this.photo = "";
      this.gender = "";
      this.subscription = "";
      this.globalRating = 0;
      this.eligibility = "";
      this.listSkill = [];

    }

  }

  set setPhoto(newPhoto: string) {

    this.photo = newPhoto;

  }
}

export interface PersonaSkills{

  id: number;
  idPersona: number;
  idSkill: number;
  startDate: Date;
  endDate: Date;

}


