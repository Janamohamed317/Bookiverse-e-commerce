import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
    faFacebook,
    faTwitter,
    faInstagram,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";





interface page {
    id: number,
    page: number,
}

export const pages: page[] = [
    {
        id: 1,
        page: 1
    },
    {
        id: 2,
        page: 2,
    },
    {
        id: 3,
        page: 3,
    }


];


interface SideBarItem {
    label: string;
    id: number,
}

export const sideBarItems: SideBarItem[] = [
    {
        label: "Statistics",
        id: 6
    },
    {
        label: "Authors",
        id: 1,
    },
    {
        label: "Books",
        id: 2
    },
    {
        label: "Users",
        id: 3
    },
    {
        label: "Orders",
        id: 4
    },
    {
        label: "Promo Codes",
        id: 5
    },

]


export interface UserTypes {
    UserType: string,
    id: number,
    blocked: boolean
}


export const userTypes: UserTypes[] = [

    {
        UserType: "Blocked Users",
        id: 1,
        blocked: true
    },
    {
        UserType: "Unblocked Users",
        id: 2,
        blocked: false
    },

];


export interface OrderStatus {
    status: string,
    id: number
}

export const orderStatus: OrderStatus[] = [
    {
        id: 1,
        status: "Confirmed"
    },
    {
        id: 2,
        status: "Pending"
    },
]



export type QuickLink = {
    label: string;
    href: string;
};

export type SocialLink = {
    icon: IconDefinition;
    href: string;
};

export const quickLinks: QuickLink[] = [
    { label: "Home", href: "#" },
    { label: "Books", href: "#books" },
    { label: "Profile", href: "/user" },
    {
        label: "About Us", href: "#about"

    },
];

export const socialLinks: SocialLink[] = [
    { icon: faFacebook, href: "#" },
    { icon: faTwitter, href: "#" },
    { icon: faInstagram, href: "#" },
    {
        icon: faGithub, href: "#"





    },


];
