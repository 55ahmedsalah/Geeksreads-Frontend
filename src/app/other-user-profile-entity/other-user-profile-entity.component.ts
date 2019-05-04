import { Component, OnInit } from '@angular/core';
import {OtherUserService} from './other-user.service';
import { User } from '../profile-entity/profile.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-other-user-profile-entity',
  templateUrl: './other-user-profile-entity.component.html',
  styleUrls: ['./other-user-profile-entity.component.css']
})
export class OtherUserProfileEntityComponent implements OnInit {

  /**
   *
   * sub for getting user info
   * @private
   * @type {Subscription}
   * @memberof OtherUserProfileEntityComponent
   */
  private subProfile: Subscription;

  /**
   *
   * to store user info
   * @type {User}
   * @memberof OtherUserProfileEntityComponent
   */
  userInfo: User;            // user object contains user info

  /**
   *
   * user cover photo recieved
   * @type {string}
   * @memberof OtherUserProfileEntityComponent
   */
  userCoverPhoto: string ;

  /**
   *
   * user name recieved
   * @type {string}
   * @memberof OtherUserProfileEntityComponent
   */
  userName: string;
  userEmail: string;
  userFollowers: number;
  userFollowing: number;
  userBirthDay: string;
  IsFollowing: boolean;
  /**
   * Creates an instance of ProfileEntityComponent.
   * @param {TitlesService} titlesService
   * @memberof OtherUserProfileEntityComponent
   */
  constructor(public OtherUserService: OtherUserService,private route: ActivatedRoute) { }  // constructor of that class

  /**
   *
   * on initializing that class implement this function
   * to get the user info from the service
   *  once the class is initialized
   * supscripe the value recieved
   * @memberof OtherUserProfileEntityComponent
   */
  userId: string;
  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userid');
    this.OtherUserService.get_other_user_info(this.userId);                                  // to get the user info from the service
    this.subProfile = this.OtherUserService.get_User_Info_updated().       // once the class is initialized
      subscribe((userInformation: User) => {                            //  supscripe the value recieved
        this.userInfo = userInformation;
        this.userCoverPhoto = this.userInfo.Photo;
        this.userName = this.userInfo.UserName;
        this.userEmail = this.userInfo.UserEmail;
        this.userFollowers = this.userInfo.NoOfFollowers;
        this.userFollowing = this.userInfo.NoOfFollowings;
       // this.userBirthDay = this.userInfo.UserBirthDate;
       // console.log(this.userInfo.UserPhoto)
         /*console.log(this.userInfo.userName)
         console.log(this.userInfo.user_id)
         console.log(this.userInfo.User_Photo)*/
      });
  }

}

