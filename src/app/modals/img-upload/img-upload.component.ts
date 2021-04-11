import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core'
import {
  AngularFireStorage,
  AngularFireStorageReference,
} from '@angular/fire/storage'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { of } from 'rxjs'
import { finalize, first, switchMap, take } from 'rxjs/operators'
import { AuthService } from 'src/app/services/auth/auth.service'

@Component({
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.scss'],
})
export class ImgUploadComponent implements OnInit {
  @ViewChild('fileDropRef', { static: false }) fileDropEl: ElementRef
  files: any[] = []
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private storage: AngularFireStorage,
    private auth: AuthService,
    private dialogRef: MatDialogRef<ImgUploadComponent>
  ) {}

  ngOnInit(): void {}

  onFileDropped($event) {
    this.prepareFilesList($event)
  }

  fileBrowserHandler(files) {
    this.prepareFilesList(files)
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = of(0)
      this.files.push(item)
    }
    this.fileDropEl.nativeElement.value = ''
    // this.uploadFilesSimulator(0)
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log('Upload in progress.')
      return
    }
    this.files.splice(index, 1)
  }

  startUpload() {
    if (this.files.length === 1) {
      this.uploadFile(this.data.path, this.files[0])
    } else {
      this.uploadFiles(this.data.path, this.data?.fileNames)
    }
  }

  async uploadFiles(path: string, fileNames: string[] = undefined) {
    const mainRef = this.storage.ref(path)
    const user = await this.auth.user$.pipe(take(1)).toPromise()
    const author = user.displayName
    let completed = 0
    if (fileNames) {
      if (fileNames.length != this.files.length)
        throw new Error(
          `Not given enough filenames! Filenames:${fileNames.length} Files:${this.files.length}`
        )
      for (let i = 0; i < this.files.length; i++) {
        const metaData = {
          author: author,
          orgFileName: this.files[i].name,
        }
        const ref: AngularFireStorageReference = mainRef.child(fileNames[i])
        const task = ref.put(this.files[i], {
          customMetadata: metaData,
        })
        this.files[i].progress = task.percentageChanges()
        await task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              this.files[i].progress = of(100)
              completed++
            })
          )
          .toPromise()
      }
    } else {
      for (let i = 0; i < this.files.length; i++) {
        const metaData = {
          author: author,
          orgFileName: this.files[i].name,
        }
        const ref: AngularFireStorageReference = mainRef.child(
          this.files[i].name
        )
        const task = ref.put(this.files[i], {
          customMetadata: metaData,
        })
        this.files[i].progress = task.percentageChanges()
        await task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              this.files[i].progress = of(100)
              completed++
            })
          )
          .toPromise()
      }
    }
    this.dialogRef.close(true)
  }

  /**
   * Upload single file to Firebase Storage
   * @param path (File Path)
   * @param file (File to upload)
   */
  async uploadFile(path: string, file: any) {
    console.log('Setup metadata')
    const user = await this.auth.user$.pipe(take(1)).toPromise()
    const author = user.displayName
    const metaData = {
      author: author,
      orgFileName: file.name,
    }
    console.log('Get ref')
    const ref = this.storage.ref(path)
    console.log(file)
    console.log('Start upload')
    const task = ref.put(file, {
      customMetadata: metaData,
    })
    file.progress = task.percentageChanges()
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          file.progress = of(100)
          this.dialogRef.close(true)
        })
      )
      .subscribe()
    // ref.put(file)
  }

  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval)
            this.uploadFilesSimulator(index + 1)
          } else {
            this.files[index].progress += 5
            // console.log(this.files[index], index)
          }
        }, 200)
      }
    }, 1000)
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes'
    }
    const k = 1024
    const dm = decimals <= 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ` ${sizes[i]}`
  }
}

interface DialogData {
  img: string
  path: string
  fileNames?: string[]
}
