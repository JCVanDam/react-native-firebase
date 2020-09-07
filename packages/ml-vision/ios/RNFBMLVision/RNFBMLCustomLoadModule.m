#import <React/RCTUtils.h>
#import <RNFBApp/RNFBSharedUtils.h>
#import "RNFBMLCustomLoadModule.h"
#import "RNFBMLVisionCommon.h"

@implementation RNFBMLCustomLoadModule
#pragma mark -
#pragma mark Module Setup

RCT_EXPORT_MODULE();

#pragma mark -
#pragma mark Firebase ML Kit Vision Methods

RCT_EXPORT_METHOD(customModelLoadModel:
  (FIRApp *) firebaseApp
    : (NSString *)modelName
    : (RCTPromiseResolveBlock)resolve
    : (RCTPromiseRejectBlock)reject
) {

  // On récupere le nom du modèle et on le télécharge

  FIRCustomRemoteModel *remoteModel =
    [[FIRCustomRemoteModel alloc] initWithName:modelName];

  FIRModelDownloadConditions *downloadConditions =
    [[FIRModelDownloadConditions alloc] initWithAllowsCellularAccess:YES
                                         allowsBackgroundDownloading:YES];

  NSProgress *downloadProgress =
    [[FIRModelManager modelManager] downloadModel:remoteModel
                                             conditions:downloadConditions];

    
    // verifie si le modèle est téléchargé ou non n'attend pas la fin du téléchargement du dessus
    // ce props n'est pas nécessaire car sous iOS on peut faire cette verification dans React-Native-Camera comme expliqué dans la note du drive
    if ([[FIRModelManager modelManager] isModelDownloaded:remoteModel]) {
        resolve(@true);
    } else {
        resolve(@false);
    }
}

@end
