export declare function getValAndValidate<T extends ('required' | 'optional')>(sku: string, field: string, required: T, validation?: RegExp): (T extends 'optional' ? string | undefined : string);
export interface DescomposedSku {
    /** App identifier. To make easier the identification of the SKU from other apps. Optional. */
    app?: string;
    /** Operational System. */
    os: 'android' | 'ios';
    /** The duration of the subscription if it's one (you may pass like '3m' for 3 months), or 'consumable' if it's one. It's the `t` field with a better name.  */
    duration: string | 'consumable';
    /** The main identifier of the SKU. */
    id: string;
    /** An additional identifier for the "same" product. Useful to have multiple active subscriptions of the same product for different targets. */
    id2?: string;
    /** Locale. Lowercase [ISO 3166–1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or another pattern you may preffer. Useful for iOS specific pricing. Optional. Omitting it means default / international value. */
    loc?: string;
    /** The version of this SKU. Useful for deprecating an older one. A number. */
    v: number;
    /** The raw SKU you inputted. Useful for retrieving it after some filtrations. */
    sku: string;
}
export declare function decomposeSku(sku: string): DescomposedSku;
