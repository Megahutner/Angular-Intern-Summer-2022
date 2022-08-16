import { Injectable } from "@angular/core";
export class statusType{
    ID: number;
    Name:string;
}
export class onlineStatus{
    ID: number;
    Name:string;
}
export class typeID{
    ID: number;
    Name:string;
}


const status: statusType[]=[
    {
        ID: 1,
        Name:"Active "
    },
    {ID: 0,
    Name:"Disabled"
}
]


const online: onlineStatus[]=[
    {
        ID: 1,
        Name:"Online"
    },
    {ID: 0,
    Name:"Unknown"
}
]

const typeid: typeID[]=[
    {
        ID: 1,
        Name:"Special"
    },
    {ID: 0,
    Name:"Standard"
}
]



@Injectable()
export class typeService{
    getOnlineStatus(){
        return online;
    }
    getType(){
        return typeid;
    }
    getStatus(){
        return status;
    }
}