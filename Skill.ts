export class Skill {

  id: number;
  type: string;
  name: string;
  description: string;
  validity: boolean;
  month_duration: number;
  year_duration: number;
  day_duration: number;

  constructor() {
    this.name = "";
    this.type = "";
    this.description = "";
    this.validity = false;
    this.month_duration = null;
    this.year_duration = null;
    this.day_duration = null;
  }

}


export interface TypeSkill {
  name: string,
  value: string
}

export class SelectTypeSkill {

  typeOptions: TypeSkill[];

  selectedType: string;

  constructor() {
      this.typeOptions = [
        {name: 'Habilitation', value: 'HABILITATION'},
        {name: 'Savoir-être', value: 'SAVOIR_ETRE'},
        {name: 'Savoir-faire', value: 'SAVOIR_FAIRE'},
      ];
  }

}
