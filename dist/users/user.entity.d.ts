import { Location } from 'src/location/location.entity';
export declare class User {
    id: string;
    username: string;
    email: string;
    password: string;
    locationId: number;
    location: Location;
    created_at: Date;
    last_login: Date;
}
