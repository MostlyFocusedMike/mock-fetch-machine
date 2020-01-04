type urlTp = string;

interface mockReturnValueIntf {
    body: any;
    code?: number;
    method?: string;
}

export type RouteTupleT = [
    urlTp,
    mockReturnValueIntf
]

export interface MockAdaptersIntf {
    [ key: string ]: {
        [ key: string ]: RouteTupleT[];
    }
}