import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

const SITE_TITLE = 'Eric King';
const TITLE_SEPARATOR = '|';
export const generateTitle = function(title: string): string {
  return `${title} ${TITLE_SEPARATOR} ${SITE_TITLE}`;
};

/**
 * Head Service - For dealing with traditional <head> tag issues like scripts,
 *  title, meta tag.
 */
@Injectable({
  providedIn: 'root'
})
export class HeadService {
  constructor(public title: Title, public meta: Meta) {}

  setTitle(title: string) {
    //Generate site title with attachments
    this.title.setTitle(generateTitle(title));
  }
}
