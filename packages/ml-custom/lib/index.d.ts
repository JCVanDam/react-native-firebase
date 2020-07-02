/*
 * Copyright (c) 2016-present Invertase Limited & Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this library except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { ReactNativeFirebase } from '@react-native-firebase/app';

/**
 * Firebase ML Kit package for React Native.
 *
 * #### Example 1
 *
 * Access the firebase export from the `ml-vision` package:
 *
 * ```js
 * import { firebase } from '@react-native-firebase/ml-vision';
 *
 * // firebase.vision().X
 * ```
 *
 * #### Example 2
 *
 * Using the default export from the `ml-vision` package:
 *
 * ```js
 * import vision from '@react-native-firebase/ml-vision';
 *
 * // vision().X
 * ```
 *
 * #### Example 3
 *
 * Using the default export from the `app` package:
 *
 * ```js
 * import firebase from '@react-native-firebase/app';
 * import '@react-native-firebase/ml-vision';
 *
 * // firebase.vision().X
 * ```
 *
 * @firebase ml-vision
 */
export namespace FirebaseVisionTypes {
  import FirebaseModule = ReactNativeFirebase.FirebaseModule;

  export class Module extends FirebaseModule {

    customModelLoadModel(modelName: string): Void;
    /**
     * Detects faces from a local image file.
     *
     * @param imageFilePath A local path to an image on the device.
     * @param faceDetectorOptions An optional instance of `VisionFaceDetectorOptions`.
     */
    
  }
}

declare module '@react-native-firebase/ml-custom' {
  // tslint:disable-next-line:no-duplicate-imports required otherwise doesn't work
  import { ReactNativeFirebase } from '@react-native-firebase/app';
  import ReactNativeFirebaseModule = ReactNativeFirebase.Module;
  import FirebaseModuleWithStaticsAndApp = ReactNativeFirebase.FirebaseModuleWithStaticsAndApp;

  const firebaseNamedExport: {} & ReactNativeFirebaseModule;
  export const firebase = firebaseNamedExport;

  const defaultExport: FirebaseModuleWithStaticsAndApp<
    FirebaseVisionTypes.Module,
    FirebaseVisionTypes.Statics
  >;
  export default defaultExport;
}

/**
 * Attach namespace to `firebase.` and `FirebaseApp.`.
 */
declare module '@react-native-firebase/app' {
  namespace ReactNativeFirebase {
    import FirebaseModuleWithStaticsAndApp = ReactNativeFirebase.FirebaseModuleWithStaticsAndApp;
    interface Module {
      vision: FirebaseModuleWithStaticsAndApp<
        FirebaseVisionTypes.Module,
        FirebaseVisionTypes.Statics
      >;
    }

    interface FirebaseApp {
      customML(): FirebaseVisionTypes.Module;
    }
  }
}

namespace ReactNativeFirebase {
  interface FirebaseJsonConfig {

  }
}
