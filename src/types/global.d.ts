type UserType = 'ADMIN' | 'STAFF' | 'MERCHANT' | 'OUTLET_PIC' | 'CUSTOMER';

declare interface AuthData {
  id: number;
  type: UserType;
}

declare type GqlContext = { req: { headers: Record<string, string>; user: AuthData } };

declare interface Pagination {
  limit: number;
  offset: number;
}

declare interface AuthContext {
  req: {
    user: AuthData;
  };
}

declare type SocketEvents = 'event:';
