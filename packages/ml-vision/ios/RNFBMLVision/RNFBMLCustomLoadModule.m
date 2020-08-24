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
) {
  printf("rentré load model obj-c");

  FIRCustomRemoteModel *remoteModel =
    [[FIRCustomRemoteModel alloc] initWithName:@"Drug-Detector"];

  FIRModelDownloadConditions *downloadConditions =
    [[FIRModelDownloadConditions alloc] initWithAllowsCellularAccess:YES
                                         allowsBackgroundDownloading:YES];

  NSProgress *downloadProgress =
    [[FIRModelManager modelManager] downloadModel:remoteModel
                                             conditions:downloadConditions];

  printf("fini load model obj-c");
  return true;
}

@end