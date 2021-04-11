import {
  Directive,
  HostBinding,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core'

@Directive({
  selector: '[appDragNDrop]',
})
export class DragNDropDirective {
  @HostBinding('class.fileover') fileOver: boolean
  @Output() fileDropped = new EventEmitter<any>()
  constructor() {}

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault()
    evt.stopPropagation()
    this.fileOver = true
    console.log('Drag Over')
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault()
    evt.stopPropagation()
    this.fileOver = false
    // console.log('Drag Leave')
  }

  @HostListener('drop', ['$event']) public onDrop(evt) {
    evt.preventDefault()
    evt.stopPropagation()
    this.fileOver = false
    const files: [] = evt.dataTransfer.files
    if (files.length > 0) {
      this.fileDropped.emit(files)
      console.log(`You dropped ${files.length} files.`, files)
    }
  }
}
