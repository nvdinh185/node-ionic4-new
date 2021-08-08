import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  postData = [];

  constructor(private httpClient: HttpClient) { }

  getItems() {
    this.httpClient.get('http://localhost:8080/db/get-items')
      .toPromise()
      .then(DataJSON => console.log(DataJSON))
      .catch(err => {
        console.log('err: ' + err);
      });
  }

  /**
   * Khi đã chọn files thì duyệt các files đã chọn và đưa vào mảng postData
   * @param event 
   */
  fileChange(event) {
    if (event.target && event.target.files) {
      const files: any = event.target.files;
      for (let key in files) { //duyệt qua hết các file đã chọn
        if (!isNaN(parseInt(key))) {
          this.postData.push({
            file: files[key]
          })
        }
      }
    }
  }

  /**
   * Đưa các file đã chọn vào đối tượng form_data và post lên server
   */
  onSubmit() {
    let form_data: FormData = new FormData();
    if (this.postData) {
      this.postData.forEach((el, idx) => {
        if (el.file) {
          let key = "file_" + idx;
          form_data.append(key, el.file);
        }
      });
    }

    /* var object = {};
    form_data.forEach((value, key) => { object[key] = value });
    var json = JSON.stringify(object);
    console.log(json); */

    this.httpClient.post('http://localhost:8080/db/upload-file', form_data)
      .toPromise()
      .then(DataJSON => console.log(DataJSON))
      .catch(err => {
        console.log('err: ', err);
      });
  }

}
