// I am/was not with the time and the will to create a proper test.

import { decomposeSku } from '../src/index';

// skuFullExample
// console.log(decomposeSku('app_myapp.os_ios.id_license.id2_0.t_3m.loc_br.v_1'));
// noName
// console.log(decomposeSku('os_ios.id_license.id2_0.t_3m.loc_br.v_1'));
// noOs
// console.log(decomposeSku('app_myapp.id_license.id2_0.t_3m.loc_br.v_1'));
// noId
// console.log(decomposeSku('app_myapp.os_ios.id2_0.t_3m.loc_br.v_1'));
// noId2
// console.log(decomposeSku('app_myapp.os_ios.id_license.t_3m.loc_br.v_1'));
// noDuration
// console.log(decomposeSku('app_myapp.os_ios.id_license.id2_0.loc_br.v_1'));
// noLoc
// console.log(decomposeSku('app_myapp.os_ios.id_license.id2_0.t_3m.v_1'));
// noVersion
// console.log(decomposeSku('app_myapp.os_ios.id_license.id2_0.t_3m.loc_br'));
// versionNotANumber
// console.log(decomposeSku('app_myapp.os_ios.id_license.id2_0.t_3m.loc_br.v_a'));
// androidOs
// console.log(decomposeSku('app_myapp.os_android.id_license.id2_0.t_3m.loc_br.v_1'));
// invalidOs
// console.log(decomposeSku('app_myapp.os_linux.id_license.id2_0.t_3m.loc_br.v_1'));