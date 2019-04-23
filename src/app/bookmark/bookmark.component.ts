import { Component, OnInit, Input, Inject, ElementRef } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { Link } from '../shared/link';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})

export class BookmarkComponent implements OnInit {

  @Input() linkUUid: String; url: String; title: String;

  Link: any = [];
  isBookmarked: any;
  bookmarkDetails: {}; 

  constructor(
    elm: ElementRef,
    public restApi: RestApiService,
    @Inject('ASSETURL') public ASSETURL
  ) {
    this.linkUUid = elm.nativeElement.getAttribute('linkUUid');
    this.url = elm.nativeElement.getAttribute('url');
    this.title = elm.nativeElement.getAttribute('title');
  }

  ngOnInit() {
    console.log(this.linkUUid);
    console.log(this.title);
    console.log(this.url);
    this.checkUUid(this.linkUUid);
    console.log(this.Link);
  }


  checkUUid(linkUUid) {
    console.log(linkUUid);
    
    return this.restApi.getBookmark(linkUUid).subscribe((data: {}) => {
     // this.bookmarkDetails = data;
      this.Link = data;
    });    

    // if(this.bookmarkDetails.length > 0) {
    //   return this.isBookmarked === true;
    // } else {
    //   return this.isBookmarked === false;
    // }
    
  }

  // Check Bookmark
  // showBookmarker() {

  //   // getBookmark linkUUid
  //   if(this.linkUUid.length > 0) {
  //     return this.isBookmarkable === true;
  //   } else {
  //     return this.isBookmarkable === false;
  //   }

  // }

  // Toggle Bookmark
  toggleBookmark(id) {
    if(this.isBookmarked = !this.isBookmarked) {
      this.restApi.createBookmark(this.Link).subscribe((data: {}) => {});
    } else {
      this.restApi.deleteBookmark(this.Link.id).subscribe(data => {});
    }
  }

}
