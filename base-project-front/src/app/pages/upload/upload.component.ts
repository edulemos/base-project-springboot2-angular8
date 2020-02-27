import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UploadService } from 'src/app/core/services/upload.service';
import { FileDto } from 'src/app/core/models/FileDto';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  dto: FileDto;
  file: any;
  sent: boolean;

  constructor(private messageService: MessageService,
    private service: UploadService) {
  }

  onUpload(event): void {
    this.file = event.files[0];
    const formData = new FormData();
    formData.append('file', this.file);

    this.service.upload(formData).subscribe(
      (response) => {
        this.file = null;
        this.sent = true;
        this.dto = response;
      },
      (err) => {
        this.messageService.add({ severity: 'error', summary: 'Upload Error!', detail: err.message });
      });
  }

  reset() {
    this.sent = false;
    this.dto = new FileDto();
  }

  ngOnInit() {
  }

}