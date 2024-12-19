import { Component, OnInit } from '@angular/core';
import { TasksInterface } from 'src/app/core/interfaces/tasks';
import { RestClientService } from 'src/app/core/services/rest-client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks : any = {}

  constructor(
    private restClientService : RestClientService
  ) { }

  getUserConnected(): number{
    return JSON.parse(localStorage.getItem("userConnected")!).id
  }

  getTasks(): any {
    this.restClientService.executeGet('list').subscribe(
      (res:any) => {
        this.tasks = res
        console.log(`retour de toute les taches ${this.tasks}`)
      },
      (error:any) => {
        console.log('Erreur sur le retour des taches')
      }
    )
  }

  addTask() : any {
    if (!this.tasks.title){
      Swal.fire({
        title: 'Erreur!',
        text: `Renseigner le champ Title!`,
        icon: 'error',
        confirmButtonText: 'Cool'
      });
      return
    }
    if (!this.tasks.description){
      Swal.fire({
        title: 'Erreur!',
        text: `Renseigner le champ Description!`,
        icon: 'error',
        confirmButtonText: 'Cool'
      });
      return
    }
    console.log('Tache supprimé')
    const request = {
      title : this.tasks.title,
      description : this.tasks.description,
      completed : false,
      user: this.getUserConnected()
    }

    this.restClientService.execute('/create/', request).subscribe(
      (res:any) => {
        this.tasks = res
        Swal.fire({
          title: "Votre tache a été bien ajoutée !",
          text: "Tache créé  !",
          icon: "success"
        });
      },
      (error:any) => {
        Swal.fire({
          title: 'Erreur!',
          text: `Probleme sur l'ajout de la tache !`,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    )
  }

  updateTask(task:any) : any {
    const request = {
      title : task.title,
      description : task.description,
      completed : task.completed,
      user: this.getUserConnected()
    }

    this.restClientService.executeUpdate(`${task}`, request).subscribe(
      (res:any) => {
        Swal.fire({
          title: `Votre modification a été bien appliqué`,
          text: "Modification validée !",
          icon: "success"
        });
        this.getTasks()
      },
      (error:any) => {
        Swal.fire({
          title: 'Erreur!',
          text: `Probleme sur la modification de la tache !`,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    )
  }

  deleteTask(task:any): any {
    this.restClientService.executeDelete(`delete/${task}`).subscribe(
      (res:any) => {
        console.log('Tache supprimé')
        Swal.fire({
          title: `Votre suppression a été bien appliqué`,
          text: "suppression validée !",
          icon: "success"
        });
        this.getTasks()
      },
      (error:any) => {
        console.log('Probleme sur la suppression de tache')
        Swal.fire({
          title: 'Erreur!',
          text: `Probleme sur la suppression de la tache !`,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    )
  }

  ngOnInit(): void {
    this.getTasks()
  }

}
