package io.invertase.firebase.ml.vision;

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


import android.content.Context;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.android.gms.tasks.Tasks;
import com.google.firebase.FirebaseApp;
import io.invertase.firebase.common.UniversalFirebaseModule;

import com.google.firebase.ml.custom.FirebaseCustomRemoteModel;
import com.google.firebase.ml.common.modeldownload.FirebaseModelDownloadConditions;
import com.google.firebase.ml.common.modeldownload.FirebaseModelManager;

import com.google.android.gms.tasks.OnCompleteListener;
import androidx.annotation.NonNull;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Semaphore;

class UniversalFirebaseMLCustomLoadModule extends UniversalFirebaseModule {

  UniversalFirebaseMLCustomLoadModule(Context context, String serviceName) {
    super(context, serviceName);
  }

  Semaphore semaphore = new Semaphore(0);

  List<Boolean> statusDownload = new ArrayList<>(1);

  Task<Boolean> customModelLoadModel(
    String appName,
    String modelName
  ) {
    return Tasks.call(getExecutor(), () -> {

      FirebaseApp firebaseApp = FirebaseApp.getInstance(appName);

      FirebaseCustomRemoteModel remoteModel = new FirebaseCustomRemoteModel.Builder(modelName).build();

      FirebaseModelDownloadConditions conditions = new FirebaseModelDownloadConditions.Builder()
              .build();

      FirebaseModelManager.getInstance().download(remoteModel, conditions)
              .addOnCompleteListener(new OnCompleteListener<Void>() {
                private Semaphore semaphore2 = semaphore;
                @Override
                public void onComplete(@NonNull Task<Void> task) {
                  statusDownload.add(true);
                  this.semaphore2.release();
                }
              });

      this.semaphore.acquire();

      FirebaseModelManager.getInstance().isModelDownloaded(remoteModel)
        .addOnSuccessListener(new OnSuccessListener<Boolean>() {
          private Semaphore semaphore2 = semaphore;
          @Override
          public void onSuccess(Boolean isDownloaded) {
            statusDownload.add(isDownloaded);
            this.semaphore2.release();
          }
        });

      this.semaphore.acquire();
      return statusDownload.get(0);
    });
  }

}
