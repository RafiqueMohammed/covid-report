import { UrlSerializer, UrlTree, DefaultUrlSerializer } from '@angular/router';

export default class CustomUrlSerialize implements UrlSerializer {
    defaultUrlSerializer = new DefaultUrlSerializer();
    parse(url: string): UrlTree {
        // Change plus signs to encoded spaces
        url = url.replace(/\(/g, '%28').replace(/\)/g, '%29');
        // Use the default serializer that you can import to just do the
        // default parsing now that you have fixed the url.
        return this.defaultUrlSerializer.parse(url);
    }

    serialize(tree: UrlTree): string {
        // Use the default serializer to create a url and replace any spaces with + signs
        return this.defaultUrlSerializer.serialize(tree).replace(/%28/g, '(').replace(/%29/g, ')');
    }
}
