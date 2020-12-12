<div align="center">

# SKUcon-Decomposer

[![npm version](https://badge.fury.io/js/skucon-decomposer.svg)](https://www.npmjs.com/package/skucon-decomposer)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![TypeScript](https://badgen.net/npm/types/env-var)](http://www.typescriptlang.org/)

</div>

A simple **npm package** to decompose Android/iOS opinionated SKUs in my convetion/pattern, to allow information changes and additions to the SKUs easily and future-proofable.

In this pattern, each information in the SKU string isn't important, as it searchs for the key of the info to get its value. `'_'` separates the key from the value. `'.'` separates the key-value pair from another.

You can easily add a field you wish to the pattern, wrapping the `decomposeSku()` function and adding your fields (read `index.ts` to see how it's done there).


SKU full example:
`'app_myapp.os_ios.id_license.id2_0.t_3m.loc_br.v_1'`

```typescript
export interface DescomposedSku {
  // App identifier. To make easier the identification of the SKU from other apps. Optional.
  app?: string;
  // Operational System.
  os: 'android' | 'ios';
  // The duration of the subscription if it's one (you may pass like '3m' for 3 months), or 'consumable' if it's one. It's the `t` field with a better name.
  duration: string | 'consumable';
  // The main identifier of the SKU.
  id: string;
  // An additional identifier for the "same" product. Useful to have multiple active subscriptions of the same product for different targets.
  id2?: string;
  // Locale. Lowercase [ISO 3166–1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or another pattern you may preffer. Useful for iOS specific pricing. Optional. Omitting it means default / international value. Optional.
  loc?: string;
  // The version of this SKU. Useful for deprecating an older one. A number.
  v: number;
  // The raw SKU you inputted. Useful for retrieving it after some filtrations.
  sku: string;
}
```


## decomposeSku(sku: string): DescomposedSku

The function to decompose the SKU.

As it may throw errors for missing required fields or invalid values, you should wrap it in a try/catch block and at least console.error() the error to know what is wrong in your SKU in dev environment. You should even send this error to your backend so you can fix the SKU asap, decreasing the UX and gain losses.




# [IAPHUB](https://www.iaphub.com/) recommended!