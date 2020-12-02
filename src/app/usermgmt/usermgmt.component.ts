import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'

@Component({
  templateUrl: './usermgmt.component.html',
  styleUrls: ['./usermgmt.component.scss'],
})
export class UsermgmtComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe((params) => {
      switch (params.mode) {
        case 'resetPassword':
          this.router.navigate(['/forgot-password'], {
            queryParams: {
              mode: params.mode,
              oobCode: params.oobCode,
              apiKey: params.apiKey,
            },
          })
          break

        default:
          break
      }
    })
  }

  ngOnInit(): void {}
}
