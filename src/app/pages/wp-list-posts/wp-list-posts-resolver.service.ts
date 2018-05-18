import { Injectable } from '@angular/core';

import { WpResolverService } from 'src/app/services/wp-resolver.service';

@Injectable()
export class WpListPostsResolver extends WpResolverService {
  url: string = 'posts';
}
