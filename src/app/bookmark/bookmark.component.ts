import { Component, OnInit, Input, Inject, ElementRef } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { Link } from '../shared/link';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})

export class BookmarkComponent implements OnInit {

  @Input() linkUUid: string; url: string; title: string;

  link: Link;
  isBookmarked: boolean = false;
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
    console.log(this.link);

  }


  checkUUid(linkUUid) {
    console.log(linkUUid);
    
    return this.restApi.getBookmark(linkUUid).subscribe((data: {}) => {
     // this.bookmarkDetails = data;
     if (data && data instanceof Array && data.length > 0) {
      this.link = data[0];
      this.isBookmarked = true;
    }
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
      let newLink: Link;
      newLink = new Link();
      newLink.linkUUid = this.linkUUid;
      newLink.linkType = "Ikon";

      this.restApi.createBookmark(newLink).subscribe((data: {}) => {});
    } else {
      this.restApi.deleteBookmark(this.link.id).subscribe(data => {});
    }
  }

}
