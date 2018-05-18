import { Injectable } from '@angular/core';

import { WpService }  from 'src/app/services/wp.service';
import { WpResolverService } from 'src/app/services/wp-resolver.service';

@Injectable()
export class WpPageResolver extends WpResolverService {
  url: string = 'pages';
  setParams = {
    _embed: 1
  };
  paramMap = {
    slug: 'slug'
  };
}
