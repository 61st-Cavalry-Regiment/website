import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { StateService } from '../services/state.service'

@Component({
  templateUrl: './usermgmt.component.html',
  styleUrls: ['./usermgmt.component.scss'],
})
export class UsermgmtComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private state: StateService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.state.userMgmnt = {
        mode: params.mode,
        oobCode: params.oobCode,
        apiKey: params.apiKey,
      }
      switch (params.mode) {
        case 'resetPassword':
          this.router.navigate(['/forgot-password'], {})
          break

        default:
          break
      }
    })
  }
}
