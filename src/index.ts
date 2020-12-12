// By Henrique Bruno Fantauzzi de Almeida, aka SrBrama. December 12, 2020.

// Full Example:
// 'app_myApp.os_ios.id_license.id2_0.t_3m.loc_br.v_1';


function getFieldValue(source: string, field: string): string | undefined {
  const r = new RegExp(`(?<!\\w)${field}_(\\w+)`);
  return r.exec(source)?.[1] ?? undefined;
}


export function getValAndValidate<T extends ('required' | 'optional')>(
  sku: string, field: string, required: T, validation?: RegExp
): (T extends 'optional' ? string | undefined : string) {
  if (required !== 'required' && required !== 'optional')
    throw new Error(`"required" parameter is neither "required" or "optional". Value="${required}"`);

  const val = getFieldValue(sku, field);
  if (val === undefined) {
    if (required === 'required')
      throw new Error(`"${field}" SKU required field not found. SKU="${sku}"`);
  }

  else {
    if (validation) {
      if (!validation.test(val))
        throw new Error(`"${field}" SKU field doesn't match the regex. SKU="${sku}", value="${val}", regex="${validation}"`);
    }
  }

  return val as T extends 'optional' ? string | undefined : string;
}


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
  /** Locale. Lowercase [ISO 3166–1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or another pattern you may preffer. Useful for iOS specific pricing. Optional. Omitting it means default / international value. Optional.  */
  loc?: string;
  /** The version of this SKU. Useful for deprecating an older one. A number. */
  v: number;
  /** The raw SKU you inputted. Useful for retrieving it after some filtrations. */
  sku: string;
}


export function decomposeSku(sku: string): DescomposedSku {

  function getVal<T extends 'required' | 'optional'>(
    field: string, required: T, validation?: RegExp
  ): (T extends 'optional' ? string | undefined : string) {
    return getValAndValidate(sku, field, required, validation);
  }

  const app = getVal('app', 'optional');
  const os = getVal('os', 'required', new RegExp('(android)|(ios)')) as 'android' | 'ios';
  const duration = getVal('t', 'required');
  const id = getVal('id', 'required');
  const id2 = getVal('id2', 'optional');
  const loc = getVal('loc', 'optional');
  const vStr = getVal('v', 'required');
  const v = Number(vStr);
  if (isNaN(v)) {
    throw new Error(`"v" SKU field is not a valid number. Value="${vStr}"`);
  }

  return {
    app,
    duration,
    id,
    id2,
    loc,
    v,
    os,
    sku
  };
}
