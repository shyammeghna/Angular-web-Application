import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../../services/persona.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Skill } from '../../../entities/Skill';
import { SkillService } from '../../../services/skill.service';
import { Persona, PersonaSkills } from 'src/app/entities/Persona';

@Component({
  selector: 'app-persona-assign-skill',
  templateUrl: './assign-skill.component.html',
})
export class AssignSkillComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private skillService: SkillService,
    public personaService: PersonaService,
    private router: Router
  ) {}

  skill: Skill[];
  selectedValues: Skill[] = [];
  assignedSkills: PersonaSkills[] = [];
  persona: Persona = new Persona()
 

  ngOnInit() {
    this.persona = this.personaService.personaInformation.persona;
    // this.assignedSkills = this.personaService.personaInformation.assignedSkills;
    // this.selectedValues = this.personaService.personaInformation.selectedValues;
    console.log(this.persona);
    // console.log(this.assignedSkills);
    // console.log(this.selectedValues);

    this.skillService.getListSkill().subscribe(
      (res) => {
        if (res.status === 200) {
          this.skill = res.body;
          this.skill.sort( (a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
        }
      },
      (error) => {
        if (error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Échec de l’opération : veuillez réessayer',
          });
        }
      },
      () => {}
    );
  }

  prevPage() {
    // this.personaService.personaInformation.assignedSkills = this.assignedSkills
    // this.personaService.personaInformation.selectedValues = this.selectedValues
    this.router.navigate(['/phoenix/new-persona/persona']);
  }

  save(){
    this.persona.listSkill = this.assignedSkills
    //console.log(this.persona)
    this.personaService
      .createPersona(this.persona).subscribe(data => {
        if (data.status === 200) {
          this.messageService.add({severity: 'success', summary: 'Opération réussie', detail: data.message});
          //console.log(data)
          this.persona = new Persona();
          this.personaService.personaInformation.persona = this.persona
          this.gotoList();
        }
      },
      error => {
        if (error.status === 409) {
          this.messageService.add({severity: 'error', summary: 'Erreur', detail: "Email déjà utilisé"});
        }
      }, () => {

      }
    )
  }

  gotoList() {
    this.router.navigate(['/phoenix/persona']);
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
