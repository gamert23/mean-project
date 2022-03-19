import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  Books: any = [];

  constructor(
    private crudService: CrudService
  ) { }

  ngOnInit(): void {
    this.crudService.GetBooks().subscribe((res) => {
      console.log(res)
      this.Books = res
    })
  }

  delete(id: any, i: any) {
    if (window.confirm('Do you want to delete this item ?')) {
      this.crudService.DeleteBook(id).subscribe((res) => {
        this.Books.splice(i, 1)
      })
    }
  }

}
