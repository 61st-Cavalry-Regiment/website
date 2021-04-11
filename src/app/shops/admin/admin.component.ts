import { Component, OnInit, ViewChild } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { Title } from '@angular/platform-browser'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Code } from 'src/app/models/codes.model'
import { roles } from 'src/app/models/roles.model'
import { User } from 'src/app/models/user.model'
import { AuthService } from 'src/app/services/auth/auth.service'
import { GenerateCodeComponent } from './generate-code/generate-code.component'

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  user: Observable<User>
  codes: Code[]
  displayedColums = ['code', 'access', 'createdBy', 'blank']

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(
    private auth: AuthService,
    private firestore: AngularFirestore,
    private title: Title,
    private dialog: MatDialog
  ) {
    this.title.setTitle('Admin - 61st Cavalry Regiment')
  }

  ngOnInit(): void {
    this.user = this.auth.user$
    this.firestore
      .collection<Code>('codes')
      .valueChanges()
      .subscribe((codes) => {
        this.codes = codes
      })
  }

  generateCode() {
    const dialogRef = this.dialog.open(GenerateCodeComponent)
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result:', result)
      if (result) {
        for (var key in result) {
          result[key] = {
            access: result[key],
          }
        }
        console.log('Dialog result:', result)
        this.auth.generateCode(result)
      }
    })
  }

  deleteCode(row: Code) {
    this.auth.deleteCode(row)
  }

  getRoles(roles: roles) {
    let result: string[] = []
    for (const [k, v] of Object.entries(roles)) {
      if (v.access) {
        result.push(k)
      }
    }
    result.forEach((s, i, arr) => {
      arr[i] = s.substring(0, 1).toUpperCase() + s.substring(1)
    })
    return result.join(', ')
  }
}
