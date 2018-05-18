import { Injectable } from '@angular/core';

import { WpService }  from 'src/app/services/wp.service';
import { WpResolverService } from 'src/app/services/wp-resolver.service';

@Injectable()
export class WpPostResolver extends WpResolverService {
  url = 'posts';
  setParams = {
    _embed: 1
  };
  paramMap = {
    slug: 'slug'
  };
}
