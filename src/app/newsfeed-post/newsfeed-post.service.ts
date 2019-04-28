import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './newsfeed-post.model';
import { HttpClient } from '@angular/common/http';

/**
 * contains all the service functions
 * @export
 * @class PostsServices
 */
@Injectable({ providedIn: 'root' })


export class PostsServices {

  /**
   * Creates an instance of PostsServices
   * @param {HttpClient} http
   * @memberof PostsServices
   */
  constructor(private http: HttpClient) { }

  /**
   * Post
   * @private
   * @type {Post}
   * @memberof PostsServices
   */
  private post: Post;

  /**
   * Post Updated
   * @private
   * @memberof PostsServices
   */
  private postUpdated = new Subject<Post>();

  /**
   *
   * this functions gets the data required ftom the backend
   * @memberof PostsServices
   */
  getpost() {
    this.http.get('https://geeksreads.herokuapp.com/api/user_status/show', {
      params : {

      }
    })
      .subscribe((serverResponse: any) => {
        console.log(serverResponse);
        this.post.activitydate = serverResponse[0].ReviewDate;
        this.post.bookimage = serverResponse[0].BookPhoto;
        this.post.bookname = serverResponse[0].BookName;
        this.post.userimage = serverResponse[0].MakerPhoto;
        this.post.username = serverResponse[0].MakerName;
        this.post.review = serverResponse[0].ReviewBody;
        this.post.numberOfStars = serverResponse[0].NumberOfStars;
        const bookId = serverResponse[0].BookID;
      });

    }
  /**
   * This function makes sure that the newsfeed is updated
   * @returns
   * @memberof PostsServices
   */
  get_post_updated() {
    return this.postUpdated.asObservable();
  }
  }
