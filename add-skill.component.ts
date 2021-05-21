import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PersonaService } from '../../../services/persona.service';
import { Skill } from '../../../entities/Skill';
import { Persona, PersonaSkills } from 'src/app/entities/Persona';

@Component({
  selector: 'app-persona-add-skill',
  templateUrl: './add-skill.component.html',
})
export class AddSkillComponent implements OnInit {
  constructor(  
    public personaService: PersonaService,
    private ref : DynamicDialogRef
  ) {}

  skill: Skill[];
  selectedValues: Skill[] = [];
  assignedSkills: PersonaSkills[] = [];
  persona: Persona = new Persona()

  ngOnInit() {
    this.persona = this.personaService.personaInformation.persona;

    this.skill = this.personaService.listSelectableSkills  
    this.skill.sort( (a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
    
  }


  save(){
    for(let i =0; i<this.assignedSkills.length;i++){
        this.assignedSkills[i].idPersona = this.persona.id;
    }
    this.ref.close(this.assignedSkills);        
  }

 

  // Calculate end date based on parameters values
  calculateEndDate(date, days, months, years) {
    var d = new Date(date);

    d.setDate(d.getDate() + days);
    d.setFullYear(d.getFullYear() + years);
    d.setMonth(d.getMonth() + +months);

    return d;
  }

  // Add or remove skill of assignedSkill based on checkbox event
  assignSkills(event: any, skill: Skill) {

    if (event.checked) {
      var now = new Date(Date.now());
      let personaSkill = {
        id: null,
        idPersona: null,
        idSkill: skill.id,
        startDate: now,
        endDate: this.calculateEndDate(
          now,
          skill.day_duration,
          skill.month_duration,
          skill.year_duration
        ),
      };
      this.assignedSkills.push(personaSkill);
      //console.log(personaSkill)
    } else {
      this.assignedSkills = this.assignedSkills.filter(item => item.idSkill !== skill.id);
    }
  }

  // Removed skill from checkbox and assignedSkills when removing a chip
  removeSkill(event: any, skill: Skill) {
    this.selectedValues = this.selectedValues.filter(item => item !== skill);
    this.assignedSkills = this.assignedSkills.filter(item => item.idSkill !== skill.id);
  }

}
