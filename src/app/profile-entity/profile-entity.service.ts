import { CountBooksService } from '../profile-book-entity/book.service';
import { DataSharingService } from '../nav-bar/data-sharing.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListOfBooks } from '../profile-book-entity/book.model';
import { Subject } from 'rxjs';
import { User } from './profile.model';
/**
 *
 * Injectable
 * @export
 * @class TitlesService
 */
@Injectable({ providedIn: 'root' })


export class TitlesService {
  /**
   * Creates an instance of TitlesService.
   * @param {HttpClient} http
   * @memberof TitlesService
   */
  constructor(public countBooksService: CountBooksService, private http: HttpClient, private dataSharingService: DataSharingService) { }

  /**
   * User data member to put user info inside
   * @private
   * @type {User}
   * @memberof TitlesService
   */
  private User: User;
  private List: ListOfBooks[];
  private listUpdated = new Subject<ListOfBooks[]>();
  /**
   * to update the user info on demand
   *
   * @private
   * @memberof TitlesService
   */
  private userUpdated = new Subject<User>();

  /**
   *
   * to get the json response from the mock service and update the user info
   * get response from this URL
   * subscribe the recived data
   * and put it in the user object to display it
   * @memberof TitlesService
   */
  get_User_Info() {    // give the signed in user id as a parameter
    const UserToken = {
      token: localStorage.getItem('token')
    };
    this.http.post('https://geeksreads.herokuapp.com/api/users/me', UserToken
    ).    // get response from this URL
      subscribe((UserData: User) => {       // subscribe the recived data
        // console.log(UserData);
        this.User = UserData;       // and put it in the user object to display it
        this.dataSharingService.userName.next(UserData.UserName);
        console.log(this.User);
        this.userUpdated.next(this.User);
      });
  }
  /**
   * to update the user info as observed
   * @returns
   * @memberof TitlesService
   */
  get_User_Info_updated() {            // to update the user info as observed
    return this.userUpdated.asObservable();
  }



  // get_Owned_books( Owned_books : string[]) {
  //   for(let i of Owned_books)
  //   {
  //     this.http.get<{ message: string, Books: ListOfBooks }>('http://localhost:3000/api/list/${i}').
  //     subscribe((bookData) => {          //  subscribe the list of books recieved
  //       this.List.push(bookData.Books);    // push the book into the list of books to display them
  //       this.listUpdated.next([...this.List]);
  //     });
  //   }
  // }

  // get_Owned_books_updated() {
  //   return this.listUpdated.asObservable();
  // }



}
