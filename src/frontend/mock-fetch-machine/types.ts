type urlTp = string;

interface mockReturnValueIntf {
    body: any;
    status?: number;
    method?: string;
}

export type RouteTupleType = [
    urlTp,
    mockReturnValueIntf
]

export interface MockAdaptersIntf {
    [ key: string ]: {
        [ key: string ]: RouteTupleType[];
    }
}

export interface defaultOptsIntf {
    status: number,
    method: string,
}
