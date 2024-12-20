declare module 'yml-util' {
    // encrypt
    export function MD5(str: string, isUp?: boolean, num?: number): string;
    export function SHA256(data: string): string;
    export function SHA1(data: string): string;
    export function AES(str: string, mode: string, key: string, iv?: string, padding?: string, type?: string, outputType?: string): string;
    export function DES(str: string, mode: string, key: string, iv?: string, padding?: string): string;
    export function RSA(str: string, key: string, type?: string): string;
    export function RSADecrypt(encryptedStr: string, key: string): string;

    // random
    export function string(len: number, type?: number): string;
    export function element<T>(arr: T[]): T | undefined;
    export function int_range(min?: number, max?: number): number;
    export function uuid(len?: number, type?: number): string;
    export function ua_ios(): string;

    // time
    export function wait(second?: number): Promise<void>;
    export function waitRanTime(): Promise<void>;
    export function ts10(): number;
    export function ts13(): number;
    export function getHour(): number;
    export function getMinute(): number;
    export function getYear(): number;
    export function getMonth(padded?: boolean): string;
    export function getDayOfWeek(): number;
    export function getSecond(): number;
    export function getDayOfMonth(): number;
    export function timestampToDate(ts: number): string;
    export function dayjsFormat(str: string): string;

    // tools
    export function myCookie(cookieArray: string[]): string;

    // sort
    export function sortByKey(obj: Record<string, any>, sp?: string): string;
    export function joinSortedKeys(obj: Record<string, any>, sp?: string): string;
    export function parseQueryString(str: string, sp?: string): Record<string, string>;

    // request functions
    export function request(options: any): Promise<{ res_hd?: any, res?: any }>;
    export function request_Promise(options: any): Promise<{ res_hd?: any, res?: any }>;
    export function checkEnv(ck: string, name: string): Promise<string[]>;
    export function yiyan(): Promise<string>;
    export function b64_encode(data: string): string;
    export function b64_decode(data: string): string;
} 