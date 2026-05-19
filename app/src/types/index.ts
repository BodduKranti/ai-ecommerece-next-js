// color
export type color = 'white' | 'blue' | 'yellow' | 'red' | 'orange' | 'purple' | 'pink' | 'black' | 'green' | 'darkBlue'

// sizes
export type sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// inputFieldTypes
export type inputFieldTypes = 'text' | 'number' | 'password' | 'email' | 'date' | 'time' | "datetime-local" | 'file' | 'checkbox' | 'radio'


// Authentication types
export enum AUTH_STATUS {
    AUTHENTICATED = 'authenticated',
    UNAUTHENTICATED = 'unauthenticated',
    ADMIN = 'Admin',
    VOTER = 'Voter',
}


// Cart Items Interface
export interface CartItem {
    id: string;
    title: string;
    price: number;
    thumbnail: string;
    quantity: number;
}



// Api urls
export enum Routesurl {
    PRODUCTAPI = `/api/products`,
    CHATBOTAPI = `/api/ai/chat`
}

// Successfull popup messages
export enum ErrorToastMessage {
    loginFailed = 'Login failed. Please check your credentials and try again.',
    somethingWentWrong = 'Something went wrong. Please try again later.',
}

// Breadcrumb types
export interface BreadcrumbItemprops {
    id: number,
    pagename: string,
    href: string
}